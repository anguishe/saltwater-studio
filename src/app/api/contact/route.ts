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

// NOTE: Until saltwaterstudio.xyz is verified in Resend (SPF + DKIM DNS records),
// change FROM_EMAIL to Resend's onboarding domain (e.g. "onboarding@resend.dev")
// as a stopgap. Once DNS TXT/DKIM records propagate, switch back to studio email.
const STUDIO_EMAIL = process.env.STUDIO_EMAIL ?? "hello@saltwaterstudio.xyz";
const FROM_EMAIL = STUDIO_EMAIL;

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
      to: STUDIO_EMAIL,
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
