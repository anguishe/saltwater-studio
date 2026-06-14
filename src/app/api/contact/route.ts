import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  business: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
  company: z.string().max(0, "honeypot must be empty"), // honeypot
  t: z.number(),
});

const STUDIO_EMAIL = process.env.STUDIO_EMAIL ?? "hello@saltwaterstudio.xyz";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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

  // Honeypot check
  if (company && company.length > 0) {
    return NextResponse.json({ ok: true }); // silently ignore bots
  }

  // Time-trap: reject if submitted in under 3 seconds
  if (Date.now() - t < 3000) {
    return NextResponse.json({ error: "Slow down" }, { status: 400 });
  }

  try {
    const businessLine = business ? `\nBusiness: ${business}` : "";

    // Notify Travis
    await resend.emails.send({
      from: `Saltwater Studio <${STUDIO_EMAIL}>`,
      to: STUDIO_EMAIL,
      replyTo: email,
      subject: `New quote — ${name}`,
      text: `Name: ${name}\nEmail: ${email}${businessLine}\n\n${message}`,
    });

    // Autoresponder to lead
    await resend.emails.send({
      from: `Saltwater Studio <${STUDIO_EMAIL}>`,
      to: email,
      subject: "Got it — talk soon",
      text: `Hi ${name},\n\nThanks for reaching out to Saltwater Studio. Expect a reply within one business day.\n\nIn the meantime, feel free to book a strategy call at saltwaterstudio.xyz/book.\n\nTravis\nSaltwater Studio`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never lose the lead silently — log to function logs
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Something hiccuped on our end. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
