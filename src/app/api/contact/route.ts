import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { storeLead } from "@/lib/leads";
import {
  INTERESTS,
  BOTTLENECKS,
  TEAM_SIZES,
  TIMELINES,
  PREFERRED_CONTACT,
} from "@/data/quoteOptions";

// Qualifying selects validate against the exact option lists the form offered —
// an arbitrary string in a notification email is an injection surface, not a lead.
const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  // Optional and deliberately loose — "(850) 555-0199 x2" and "+1 850 555 0199"
  // are both fine. The field exists so "Call me" leads arrive callable.
  phone: z
    .string()
    .max(40)
    .regex(/^[0-9()+.\-\s#*xX/]*$/)
    .optional(),
  business: z.string().max(200).optional(),
  siteUrl: z.string().url().max(300).optional(),
  interest: z.enum(INTERESTS).optional(),
  preferredContact: z.enum(PREFERRED_CONTACT).optional(),
  bottleneck: z.enum(BOTTLENECKS).optional(),
  teamSize: z.enum(TEAM_SIZES).optional(),
  timeline: z.enum(TIMELINES).optional(),
  message: z.string().min(1).max(5000),
  // Honeypot — must be absent or empty; optional so missing key doesn't hard-fail
  company: z.string().optional().default(""),
  t: z.number(),
  // First-touch attribution (landing path · referrer · utm). Free text, so it is
  // length-capped and newline-stripped before entering the notification email.
  leadSource: z
    .string()
    .max(400)
    .transform((v) => v.replace(/[\r\n]+/g, " "))
    .optional(),
});

/*
 * Required Vercel env vars for this route:
 * RESEND_API_KEY      — Resend API key (re_...)
 * RESEND_FROM_EMAIL   — Verified sender: hello@saltwaterstudio.xyz
 * RESEND_TO_EMAIL     — Notification recipient: anguisheh1@gmail.com
 * Optional:
 * BLOB_READ_WRITE_TOKEN (or BLOB_STORE_ID via OIDC) — private Blob store the
 * lead archive writes to (src/lib/leads.ts). Absent = log + continue.
 *
 * Domain saltwaterstudio.xyz must be verified in Resend (DKIM record is set).
 * replyTo is set to the lead's email so Reply goes to them, not back to the sender.
 */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "hello@saltwaterstudio.xyz";
const TO_EMAIL = process.env.RESEND_TO_EMAIL ?? "anguisheh1@gmail.com";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    business,
    siteUrl,
    interest,
    preferredContact,
    bottleneck,
    teamSize,
    timeline,
    message,
    company,
    t,
    leadSource,
  } = parsed.data;

  // Honeypot — return ok silently so bots don't learn they were caught
  if (company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Time-trap: reject if submitted in under 3 seconds
  if (Date.now() - t < 3000) {
    return NextResponse.json({ error: "Slow down" }, { status: 400 });
  }

  // Archive the lead FIRST — before any email can fail. A Resend outage, a
  // revoked API key, or a bounce now leaves the lead in the Blob store instead
  // of only in a function log line. No-ops (with a log) when no store is set.
  const isPostPayment = leadSource?.startsWith("post-payment") ?? false;
  await storeLead(isPostPayment ? "post-payment" : "contact", {
    name,
    email,
    phone,
    business,
    siteUrl,
    interest,
    preferredContact,
    bottleneck,
    teamSize,
    timeline,
    message,
    leadSource,
  });

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not set — add it to Vercel env vars");
    return NextResponse.json(
      { error: `Something hiccuped on our end — call us directly.` },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const details = [
      ["Phone", phone],
      ["Business", business],
      ["Website", siteUrl],
      ["Wants", interest],
      ["Reply by", preferredContact],
      ["Bottleneck", bottleneck],
      ["Team", teamSize],
      ["Timeline", timeline],
      ["Source", leadSource],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    // Notify Travis
    await resend.emails.send({
      from: `Saltwater Studio <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: interest ? `New lead — ${name} · ${interest}` : `New lead — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n${details}\n\n${message}`,
    });
  } catch (err) {
    // Notification failed — the lead is archived above, but Travis doesn't
    // know it exists yet, so the visitor should still retry or call.
    console.error("[contact] Resend error (lead archived to Blob):", err);
    return NextResponse.json(
      { error: "Something hiccuped on our end — please try again or call us directly." },
      { status: 500 }
    );
  }

  // Autoresponder to lead (CONTENT.md thanks copy). Best-effort: the lead is
  // stored and Travis is notified, so a failure here must not show the visitor
  // an error for a submission that actually arrived.
  try {
    await resend.emails.send({
      from: `Saltwater Studio <${FROM_EMAIL}>`,
      to: email,
      subject: "Got it — talk soon",
      text: `Hi ${name},\n\nGot it. Expect a reply within one business day.\n\nIf anything changes before then, just reply to this email.\n\nTravis\nSaltwater Studio`,
    });
  } catch (err) {
    console.error("[contact] autoresponder failed (lead delivered):", err);
  }

  return NextResponse.json({ ok: true });
}
