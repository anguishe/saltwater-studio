import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, article, articleId, defaultImage, webPage } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { insights, getInsightBySlug } from "@/data/insights";
import { site } from "@/config/site";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { getInsightPeers } from "@/data/related";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return buildMetadata({
    title: insight.seoTitle,
    description: insight.metaDescription,
    path: `/insights/${slug}`,
    type: "article",
  });
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default async function InsightSlugPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Insights", url: `${site.url}/insights` },
    { name: insight.headline, url: `${site.url}/insights/${slug}` },
  ];

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={article({
          slug,
          headline: insight.headline,
          description: insight.metaDescription,
          datePublished: insight.datePublished,
          dateModified: insight.dateModified,
        })}
      />
      <JsonLd
        schema={webPage({
          path: `/insights/${slug}`,
          name: `${insight.headline} | ${site.name}`,
          speakableSelectors: ["h1", "article > p"],
          mainEntity: articleId(slug),
          breadcrumb: true,
          primaryImage: defaultImage,
        })}
      />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <article className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-shoal uppercase mb-4">
              Insights &middot; {dateFormat.format(new Date(insight.datePublished))}
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              {insight.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">{insight.summary}</p>
          </Reveal>

          {insight.sections.map((section, i) => (
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

          <Reveal delay={0.2}>
            <p className="mt-12 text-foam/70">
              {insight.linksLead}{" "}
              {insight.links.map((link, i) => (
                <span key={link.href}>
                  <Link
                    href={link.href}
                    className="text-shoal underline underline-offset-4 hover:text-glow"
                  >
                    {link.label}
                  </Link>
                  {i < insight.links.length - 1
                    ? i === insight.links.length - 2
                      ? ", or "
                      : ", "
                    : "."}
                </span>
              ))}
            </p>
          </Reveal>

          <RelatedLinks id="keep-reading" title="Keep reading" groups={getInsightPeers(slug)} />

          <Reveal delay={0.24}>
            <div className="mt-16 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="primary">
                Start the conversation
              </ButtonLink>
              <ButtonLink href="/insights" variant="ghost">
                All insights
              </ButtonLink>
            </div>
          </Reveal>
        </article>
      </div>
    </>
  );
}
