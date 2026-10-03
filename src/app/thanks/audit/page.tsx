import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import IntakeForm from "./IntakeForm";

/*
 * Post-payment confirmation + intake. Every Stripe Payment Link's
 * after-payment redirect should point here (Stripe dashboard → each payment
 * link → After payment → redirect to https://saltwaterstudio.xyz/thanks/audit).
 * Stripe checkout collects an email only, so this page collects the one thing
 * fulfillment actually needs: which business the purchase is for. Submissions
 * go through /api/contact marked post-payment.
 */
export const metadata = buildMetadata({
  title: "Payment received",
  description:
    "Your payment went through. Tell us which business it's for — business name and website or Google profile link — and fulfillment starts immediately.",
  path: "/thanks/audit",
  noIndex: true,
});

export const dynamic = "force-static";

export default function PostPaymentPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-ink">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs tracking-[0.3em] text-shoal uppercase mb-6">
          Payment received
        </p>
        <h1 className="font-display text-4xl text-foam md:text-5xl">
          Paid. Here&apos;s what happens next.
        </h1>
        <p className="mt-6 text-lg text-foam/70">
          Your payment went through — Stripe emails the receipt. One thing left:
          tell us which business this is for, below. Work starts the moment we
          have it.
        </p>

        <ul className="mt-8 space-y-4">
          <li className="flex items-start gap-3 text-foam/70">
            <span className="text-shoal font-mono mt-0.5" aria-hidden="true">
              1
            </span>
            Send the form below — business name, plus your website or Google
            Business Profile link if you have one.
          </li>
          <li className="flex items-start gap-3 text-foam/70">
            <span className="text-shoal font-mono mt-0.5" aria-hidden="true">
              2
            </span>
            Bought the audit? The 72-hour clock starts when the form arrives,
            and the written report comes back to your email.
          </li>
          <li className="flex items-start gap-3 text-foam/70">
            <span className="text-shoal font-mono mt-0.5" aria-hidden="true">
              3
            </span>
            Started a website plan or the Google Profile Fix? We reply within
            one business day with the short list of what we need from you —
            photos, hours, access — and the published turnaround starts from
            there.
          </li>
        </ul>

        <h2 className="mt-14 font-display text-2xl text-foam">
          Which business is this for?
        </h2>
        <div className="mt-6">
          <IntakeForm />
        </div>

        <p className="mt-10 text-sm text-foam-subtle">
          Form not cooperating? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-shoal hover:text-glow transition-colors"
          >
            {site.email}
          </a>{" "}
          with your business name and link — that counts the same. Or call{" "}
          <a
            href={`tel:${site.phone}`}
            className="text-shoal hover:text-glow transition-colors"
          >
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
