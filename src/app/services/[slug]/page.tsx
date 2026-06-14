import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildServiceSchema, buildFaqSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services, getServiceBySlug } from "@/data/services";
import { getFaqsByPage, type FAQ } from "@/data/faqs";
import { site } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: `${service.oneLiner} — Saltwater Studio, web design and SEO for service businesses.`,
    path: `/services/${slug}`,
  });
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${slug}` },
  ];

  const pageFaqs = getFaqsByPage(slug as FAQ["page"]);

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildServiceSchema({
          name: service.title,
          description: service.oneLiner,
          url: `${site.url}/services/${slug}`,
        })}
      />
      {pageFaqs.length > 0 && <JsonLd schema={buildFaqSchema(pageFaqs)} />}

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-shoal uppercase mb-4">
              {service.index} / {service.title}
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              {service.title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">{service.oneLiner}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="mt-16 font-display text-2xl text-foam">What&apos;s included</h2>
            <ul className="mt-6 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foam/70">
                  <span className="text-shoal font-mono mt-0.5" aria-hidden="true">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {pageFaqs.length > 0 && (
            <Reveal delay={0.16}>
              <h2 className="mt-20 font-display text-2xl text-foam">Common questions</h2>
              <div className="mt-8 space-y-6 divide-y divide-marine/20">
                {pageFaqs.map((faq) => (
                  <div key={faq.question} className="pt-6">
                    <h3 className="font-semibold text-foam">{faq.question}</h3>
                    <p className="mt-3 text-foam/60">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-col gap-4 sm:flex-row">
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
