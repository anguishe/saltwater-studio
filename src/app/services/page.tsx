import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  webPage,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import OfferLadder from "@/components/sections/OfferLadder";
import { services } from "@/data/services";
import { tiers, engagementProof } from "@/data/tiers";
import { getFaqsByPage } from "@/data/faqs";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Websites, Google Care & AI — $${site.auditOffer.price} Audit`,
  description:
    `Custom websites, Google Business Profile management, local and AI search, and AI receptionists. Start with the $${site.auditOffer.price} audit, delivered in 72 hours.`,
  path: "/services",
});

const breadcrumbs = [
  { name: "Home", url: site.url },
  { name: "Services", url: `${site.url}/services` },
];

export default function ServicesPage() {
  const serviceFaqs = getFaqsByPage("services");

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      {serviceFaqs.length > 0 && <JsonLd schema={buildFaqSchema(serviceFaqs)} />}
      <JsonLd schema={webPage({ path: "/services", name: `Services | ${site.name}`, speakableSelectors: ["h1", ".tier-answer", ".faq-answer"] })} />
      {tiers.map((tier) => (
        <JsonLd
          key={tier.id}
          schema={buildServiceSchema({
            name: tier.name,
            description: tier.oneLiner,
            url: `${site.url}/services#${tier.id}`,
            ...(tier.price
              ? {
                  offers: {
                    price: tier.price.amount,
                    priceCurrency: tier.price.currency,
                    // Promo end date applies to the audit only.
                    ...(tier.priceValidUntil
                      ? { priceValidUntil: tier.priceValidUntil }
                      : {}),
                  },
                }
              : {}),
          })}
        />
      ))}

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              Services
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl text-foam md:text-5xl max-w-2xl">
              Get found. Get the call.
            </h1>
            <p className="mt-4 font-display text-xl text-shoal max-w-2xl">
              {site.taglineSecondary}
            </p>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">
              Saltwater Studio builds the websites and runs the Google profiles local
              customers find you through, then adds AI where it saves you hours. The
              prices are below — a ${site.auditOffer.price} audit, website plans from
              $149 a month, and a $199 Google Profile Fix. Custom AI work is scoped
              to your business and quoted within a day.
            </p>
          </Reveal>

          <OfferLadder />

          <Reveal delay={0.1}>
            <section aria-labelledby="proof-heading" className="mt-20">
              <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
                Proof of work
              </p>
              <h2 id="proof-heading" className="sr-only">
                Engagements delivered
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {engagementProof.map((item) => (
                  <div key={item.label} className="rounded border border-marine/30 p-5">
                    <p className="font-semibold text-foam">{item.label}</p>
                    <p className="mt-2 text-sm text-foam-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-24 font-mono text-xs tracking-[0.2em] text-shoal uppercase">
              The full service catalog
            </p>
            <p className="mt-4 text-foam/60 max-w-2xl">
              Every engagement above is assembled from these.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-0 divide-y divide-marine/30">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <div className="group grid gap-6 py-12 md:grid-cols-[5rem_1fr_auto] md:items-start hover:bg-marine/10 transition-colors px-2 rounded">
                  <span className="font-mono text-xs tracking-widest text-shoal-muted uppercase mt-1">
                    {service.index}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl text-foam group-hover:text-shoal transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-foam/60 max-w-xl">{service.oneLiner}</p>
                    <ul className="mt-4 space-y-1">
                      {service.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foam-muted">
                          <span className="text-shoal mt-0.5" aria-hidden="true">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="self-start text-sm text-shoal hover:text-glow transition-colors whitespace-nowrap mt-1"
                  >
                    Learn more →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {serviceFaqs.length > 0 && (
            <Reveal delay={0.2}>
              <p className="mt-20 font-mono text-xs tracking-[0.2em] text-shoal uppercase">Common questions</p>
              <div className="mt-8 space-y-6 divide-y divide-marine/20">
                {serviceFaqs.map((faq) => (
                  <div key={faq.question} className="pt-6">
                    <h2 className="text-lg font-semibold text-foam">{faq.question}</h2>
                    <p className="faq-answer mt-3 text-foam/60">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <div className="mt-20 flex flex-col items-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="primary">
                Start the conversation
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Get a quote
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
