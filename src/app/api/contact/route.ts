import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  business: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
  // Honeypot — must be absent or empty; optional so missing key doesn't hard-fail
  company: z.string().optional().default(""),
  t: z.number(),
});

/*
 * Required Vercel env vars for this route:
 * RESEND_API_KEY      — Resend API key (re_...)
 * RESEND_FROM_EMAIL   — Verified sender: hello@saltwaterstudio.xyz
 * RESEND_TO_EMAIL     — Notification recipient: anguisheh1@gmail.com
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

  const { name, email, business, message, company, t } = parsed.data;

  // Honeypot — return ok silently so bots don't learn they were caught
  if (company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Time-trap: reject if submitted in under 3 seconds
  if (Date.now() - t < 3000) {
    return NextResponse.json({ error: "Slow down" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not set — add it to Vercel env vars");
    return NextResponse.json(
      { error: `Something hiccuped on our end — call us directly.` },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const businessLine = business ? `\nBusiness: ${business}` : "";

    // Notify Travis
    await resend.emails.send({
      from: `Saltwater Studio <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New quote — ${name}`,
      text: `Name: ${name}\nEmail: ${email}${businessLine}\n\n${message}`,
    });

    // Autoresponder to lead (CONTENT.md thanks copy)
    await resend.emails.send({
      from: `Saltwater Studio <${FROM_EMAIL}>`,
      to: email,
      subject: "Got it — talk soon",
      text: `Hi ${name},\n\nGot it. Expect a reply within one business day.\n\nIn the meantime, you can book a strategy call at saltwaterstudio.xyz/book.\n\nTravis\nSaltwater Studio`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never lose the lead silently — log to function logs
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Something hiccuped on our end — please try again or call us directly." },
      { status: 500 }
    );
  }
}
