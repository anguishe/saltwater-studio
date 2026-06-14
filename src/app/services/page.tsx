import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { getFaqsByPage } from "@/data/faqs";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Web design, SEO, AEO, GEO, Google Business Profile, and social content for service businesses. Saltwater Studio builds what ranks and lasts.",
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

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              Services
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl text-foam md:text-5xl max-w-2xl">
              {site.taglineSecondary}
            </h1>
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

          <Reveal delay={0.2}>
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
