import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFaqSchema, webPage } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { getFaqsByPage } from "@/data/faqs";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Services — Web Design, SEO & AI Search",
  description:
    "Saltwater Studio builds custom websites plus the SEO, AI-search, Google, and social presence that makes service businesses found. Tell us about the business.",
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
      <JsonLd schema={webPage({ path: "/services", name: `Services — Web Design, SEO & AI Search | ${site.name}`, speakableSelectors: ["h1", ".faq-answer"] })} />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              Services
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl text-foam md:text-5xl max-w-2xl">
              What Saltwater Studio does
            </h1>
            <p className="mt-4 font-display text-xl text-shoal max-w-2xl">
              {site.taglineSecondary}
            </p>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">
              Saltwater Studio builds custom websites for service businesses and the search
              presence that makes them found — web design, SEO, answer-engine and
              generative-engine optimization, Google Business Profile, and social content.
              Everything is quote-based; tell us about the business and we&apos;ll scope it
              honestly.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-0 divide-y divide-marine/30">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <div className="group grid gap-6 py-12 md:grid-cols-[5rem_1fr_auto] md:items-start hover:bg-marine/10 transition-colors px-2 rounded">
                  <span className="font-mono text-xs tracking-widest text-shoal/50 uppercase mt-1">
                    {service.index}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl text-foam group-hover:text-shoal transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-foam/60 max-w-xl">{service.oneLiner}</p>
                    <ul className="mt-4 space-y-1">
                      {service.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foam/50">
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
              <h2 className="mt-20 font-display text-2xl text-foam">Common questions</h2>
              <div className="mt-8 space-y-6 divide-y divide-marine/20">
                {serviceFaqs.map((faq) => (
                  <div key={faq.question} className="pt-6">
                    <h3 className="font-semibold text-foam">{faq.question}</h3>
                    <p className="faq-answer mt-3 text-foam/60">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <div className="mt-20 flex flex-col items-center gap-4 sm:flex-row">
              <ButtonLink href="/book" variant="primary">
                Book a strategy call
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
