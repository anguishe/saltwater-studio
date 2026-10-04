import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  tierIdsForPage,
  tierService,
  tierServiceId,
  webPage,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import PlanCtaButton from "@/components/ui/PlanCtaButton";
import { planCta } from "@/data/tiers";
import { site } from "@/config/site";

/**
 * Plain-language plans page for a local owner who got Travis's text or email.
 * Prices, terms, ownership and refund come from the published offer
 * (src/data/tiers.ts / OFFER.md) — nothing here is quoted, everything is the
 * number the outreach says. Deliberately no AI wording on this page.
 */

export const metadata: Metadata = buildMetadata({
  title: "Websites for Local Business — $149/mo",
  description:
    "A finished website on your own domain for $149 a month: no setup fee, live in 3 business days, unlimited small changes, 14-day refund, cancel after month 3.",
  path: "/websites",
});

const breadcrumbs = [
  { name: "Home", url: site.url },
  { name: "Websites", url: `${site.url}/websites` },
];

// The three website plans, in the plain language of the one-page agreement.
const plans = [
  {
    slug: "page-plan" as const,
    name: "Page Plan",
    price: "$149/mo",
    note: "No setup fee. 3-month minimum, then month to month.",
    points: [
      "Your page, on your own domain — your phone, hours, reviews link, and photos",
      "Hosting, security certificate, and uptime handled",
      "Unlimited small changes, done within 2 business days",
      "Live within 3 business days of first payment",
      "Cancel any time after month 3, by text or email",
    ],
    ownership:
      "Your domain, photos, and words are always yours. The page files become yours after 12 paid months, or any time by paying the difference up to $497.",
    ctaLabel: "Start the Page Plan",
    featured: true,
  },
  {
    slug: "buy-it" as const,
    name: "Buy It",
    price: "$497",
    note: "Once, plus $29/mo hosting & care. No minimum.",
    points: [
      "The same page — you own the files from day one",
      "Hosting, security certificate, and uptime on the $29/mo plan",
      "Unlimited small changes while hosted, done within 2 business days",
      "Live within 3 business days of payment",
      "Cancel hosting any time — the files are handed over",
    ],
    ownership: "Everything is yours from the day you pay.",
    ctaLabel: "Buy it outright",
    featured: false,
  },
  {
    slug: "local-growth" as const,
    name: "Local Growth",
    price: "$297/mo",
    note: "No setup fee. 3-month minimum, then month to month.",
    points: [
      "Everything in the Page Plan",
      "Your Google Business Profile run every month — posts, photos, every review answered",
      "Up to 4 service or area pages",
      "A plain-English monthly report of what moved",
    ],
    ownership: "Same ownership terms as the Page Plan.",
    ctaLabel: "Start Local Growth",
    featured: false,
  },
];

const websiteFaqs = [
  {
    question: "Who am I actually dealing with?",
    answer: `Travis Abadie — a real person in Destin, Florida, not a reseller or a call center. You get my number, ${site.phoneDisplay}. Text or call it and I answer.`,
  },
  {
    question: "Is the domain mine?",
    answer:
      "Yes. The site goes on your own domain, registered in your name — and your domain, your photos, and your words stay yours no matter what happens between us. If you don't have a domain yet, I set one up in your name, not mine.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Any time after month 3, by text or email — the page comes down at the end of the paid month. Buy It has no minimum: cancel hosting whenever you like and I hand over the files. And in the first 14 days after go-live, ask and I refund your first payment and take the site down.",
  },
  {
    question: "Where do the photos come from?",
    answer:
      "From your public Google listing — the photos you and your customers already posted. Tell me which to remove and they're removed the same day. Have better ones? Text them over and they go up within 2 business days.",
  },
];

const steps = [
  {
    label: "Reply",
    detail:
      "Text, call, or use the form — tell me it's a go and which plan you want.",
  },
  {
    label: "Pay the first month",
    detail:
      "You get a payment link by text or email. No setup fee, no paperwork beyond a one-page agreement.",
  },
  {
    label: "Live in 3 business days",
    detail:
      "Your site goes up on your own domain, with your phone, hours, reviews link, and photos.",
  },
];

export default function WebsitesPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      {/* Page Plan and Buy It are canonical here, built from tiers.ts. */}
      {tierIdsForPage("/websites").map((id) => (
        <JsonLd key={id} schema={tierService(id)} />
      ))}
      <JsonLd schema={buildFaqSchema(websiteFaqs)} />
      <JsonLd
        schema={webPage({
          path: "/websites",
          name: `Websites for Local Business — $149/mo | ${site.name}`,
          speakableSelectors: ["h1"],
          mainEntity: tierServiceId("page-plan"),
          breadcrumb: true,
        })}
      />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              Websites
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              A website for your business. $149 a month, no setup fee.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">
              If I texted or emailed you, this is the whole deal in one place. I
              build your site, put it on your own domain, host it, and keep it
              current — for one monthly price, with no setup fee. It goes live
              within 3 business days of your first payment, and if you&apos;re
              unhappy in the first 14 days, I refund that payment and take the
              site down. No argument.
            </p>
          </Reveal>

          {/* What you get */}
          <Reveal delay={0.1}>
            <h2 className="mt-16 font-display text-2xl text-foam">
              What you get
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "A finished, custom-built page — not a template — with your phone number, hours, reviews link, and photos",
                "Your own domain, with hosting, the security certificate, and uptime handled",
                "Built to be found: a fast page, structured so Google can read exactly what you do and where",
                "Click-to-call and a short quote form, so a visit becomes a phone call",
                "Me, on the other end of a text, making your changes within 2 business days",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foam/70">
                  <span className="text-shoal font-mono mt-0.5" aria-hidden="true">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* The three plans */}
          <Reveal delay={0.12}>
            <h2 className="mt-20 font-display text-2xl text-foam">
              The three plans
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => {
                const cta = planCta(plan.slug);
                return (
                  <article
                    key={plan.slug}
                    className={`flex flex-col rounded border p-6 ${
                      plan.featured
                        ? "border-shoal/40 bg-marine/20"
                        : "border-marine/40 bg-marine/10"
                    }`}
                  >
                    <h3 className="font-display text-xl text-foam">
                      {plan.name}
                    </h3>
                    <p className="mt-2 font-mono text-2xl text-sun">
                      {plan.price}
                    </p>
                    <p className="mt-1 text-sm text-foam-muted">{plan.note}</p>
                    <ul className="mt-5 space-y-2 flex-1">
                      {plan.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-foam-muted"
                        >
                          <span className="text-shoal mt-0.5" aria-hidden="true">
                            —
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-xs text-foam-subtle">
                      {plan.ownership}
                    </p>
                    <div className="mt-6">
                      <PlanCtaButton
                        href={cta.href}
                        external={cta.external}
                        className="w-full"
                      >
                        {plan.ctaLabel}
                      </PlanCtaButton>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>

          {/* Changes */}
          <Reveal delay={0.14}>
            <h2 className="mt-20 font-display text-2xl text-foam">
              What counts as a change?
            </h2>
            <p className="mt-5 text-foam/70 max-w-2xl">
              Small changes are unlimited: wording, photos, hours, prices, a new
              review. Text or email me and it is done within 2 business days.
              Bigger things (new pages, booking, a store) I quote first and you
              decide.
            </p>
          </Reveal>

          {/* Ownership */}
          <Reveal delay={0.15}>
            <h2 className="mt-16 font-display text-2xl text-foam">
              Who owns what
            </h2>
            <p className="mt-5 text-foam/70 max-w-2xl">
              Your domain, your photos, your logo, and your words are yours at
              all times — on every plan, from day one. On the Page Plan and
              Local Growth, the page files become yours after 12 paid months, or
              any time earlier by paying the difference up to $497. On Buy It,
              the files are yours from the day you pay. I work as your site&apos;s
              manager, never your landlord.
            </p>
          </Reveal>

          {/* Refund */}
          <Reveal delay={0.16}>
            <h2 className="mt-16 font-display text-2xl text-foam">
              The 14-day out
            </h2>
            <p className="mt-5 text-foam/70 max-w-2xl">
              In the first 14 days after go-live, ask and I refund your first
              payment and take the site down. No argument, no form to fill out.
              After that, the regular cancel terms apply: any time after month 3,
              by text or email.
            </p>
          </Reveal>

          {/* How it works */}
          <Reveal delay={0.18}>
            <h2 className="mt-20 font-display text-2xl text-foam">
              How it works
            </h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.label}
                  className="rounded border border-marine/30 p-5"
                >
                  <span className="font-mono text-xs tracking-widest text-shoal-muted uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-semibold text-foam">{step.label}</p>
                  <p className="mt-2 text-sm text-foam-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Proof */}
          <Reveal delay={0.2}>
            <p className="mt-16 text-foam/70 max-w-2xl">
              The proof I point to: I run the website and Google profile for
              Beach House Moving in Santa Rosa Beach — its homepage climbed onto
              page one for the moving searches in its home market.{" "}
              <Link
                href="/work/beach-house-moving"
                className="text-shoal underline underline-offset-4 hover:text-glow"
              >
                Read the case study
              </Link>
              .
            </p>
          </Reveal>

          {/* FAQ */}
          <Reveal delay={0.22}>
            <p className="mt-20 font-mono text-xs tracking-[0.2em] text-shoal uppercase">
              Straight answers
            </p>
            <div className="mt-8 space-y-6 divide-y divide-marine/20">
              {websiteFaqs.map((faq) => (
                <div key={faq.question} className="pt-6">
                  <h2 className="text-lg font-semibold text-foam">
                    {faq.question}
                  </h2>
                  <p className="mt-3 text-foam/60">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.24}>
            <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PlanCtaButton
                href={planCta("page-plan").href}
                external={planCta("page-plan").external}
              >
                Start the Page Plan — $149/mo
              </PlanCtaButton>
              <a
                href={`tel:${site.phone}`}
                className="text-foam/70 hover:text-shoal transition-colors text-sm"
              >
                Or call or text Travis: {site.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
