import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  cityService,
  cityServiceId,
  webPage,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { locations, getLocationBySlug } from "@/data/locations";
import { site } from "@/config/site";

interface Props {
  params: Promise<{ location: string }>;
}

// Root-level dynamic segment: only the six city slugs render; everything else 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocationBySlug(location);
  if (!loc) return {};
  return buildMetadata({
    title: loc.seoTitle,
    description: loc.metaDescription,
    path: `/${loc.slug}`,
  });
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;
  const loc = getLocationBySlug(location);

  if (!loc) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: `Web Design in ${loc.city}, FL`, url: `${site.url}/${loc.slug}` },
  ];

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={cityService({
          slug: loc.slug,
          city: loc.city,
          description: loc.metaDescription,
        })}
      />
      <JsonLd schema={buildFaqSchema(loc.faqs)} />
      <JsonLd
        schema={webPage({
          path: `/${loc.slug}`,
          name: `${loc.seoTitle} | ${site.name}`,
          speakableSelectors: ["h1"],
          about: cityServiceId(loc.slug),
          breadcrumb: true,
        })}
      />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-shoal uppercase mb-4">
              {loc.city}, Florida
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">{loc.h1}</h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">{loc.intro}</p>
          </Reveal>

          {loc.sections.map((section, i) => (
            <Reveal key={section.heading} delay={0.12 + i * 0.02}>
              <h2 className="mt-16 font-display text-2xl text-foam">
                {section.heading}
              </h2>
              {section.body.map((para) => (
                <p key={para} className="mt-5 text-foam/70 max-w-2xl">
                  {para}
                </p>
              ))}
              {section.points && (
                <ul className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-foam/70">
                      <span className="text-shoal font-mono mt-0.5" aria-hidden="true">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          {loc.proofLead && loc.proofLinks && (
            <Reveal delay={0.16}>
              <p className="mt-12 text-foam/70">
                {loc.proofLead}{" "}
                {loc.proofLinks.map((link, i) => (
                  <span key={link.href}>
                    <Link
                      href={link.href}
                      className="text-shoal underline underline-offset-4 hover:text-glow"
                    >
                      {link.label}
                    </Link>
                    {i < loc.proofLinks!.length - 1
                      ? i === loc.proofLinks!.length - 2
                        ? ", or "
                        : ", "
                      : "."}
                  </span>
                ))}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.18}>
            <p className="mt-20 font-mono text-xs tracking-[0.2em] text-shoal uppercase">
              Common questions
            </p>
            <div className="mt-8 space-y-6 divide-y divide-marine/20">
              {loc.faqs.map((faq) => (
                <div key={faq.question} className="pt-6">
                  <h2 className="text-lg font-semibold text-foam">{faq.question}</h2>
                  <p className="mt-3 text-foam/60">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Every city page links its siblings — the mesh is what keeps these pages crawled. */}
          <Reveal delay={0.2}>
            <p className="mt-16 font-mono text-xs tracking-[0.2em] text-shoal uppercase">
              Also serving
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {locations
                .filter((l) => l.slug !== loc.slug)
                .map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/${l.slug}`}
                      className="text-sm text-foam/60 hover:text-shoal transition-colors"
                    >
                      {l.city}
                    </Link>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-16 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="primary">
                Start the conversation
              </ButtonLink>
              <ButtonLink href="/work" variant="ghost">
                See the work
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
