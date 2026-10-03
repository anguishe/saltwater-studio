import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, webPage } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { insights } from "@/data/insights";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: "Insights — Local Search & AI Visibility",
  description:
    "Articles from real Saltwater Studio work: how local businesses get found in Google, Bing, and AI assistants like ChatGPT and Copilot. No theory — build notes.",
  path: "/insights",
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function InsightsPage() {
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Insights", url: `${site.url}/insights` },
  ];

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={webPage({
          path: "/insights",
          name: `Insights | ${site.name}`,
          type: "CollectionPage",
          speakableSelectors: ["h1"],
        })}
      />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-shoal uppercase mb-4">
              Insights
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              Notes from the work
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-lg text-foam/70 max-w-2xl">
              What we learn building and running search presence for real local
              businesses — written up plainly. Every article traces back to a
              real project on the portfolio.
            </p>
          </Reveal>

          <div className="mt-16 space-y-10">
            {insights.map((insight, i) => (
              <Reveal key={insight.slug} delay={0.1 + i * 0.03}>
                <article className="border-t border-marine/20 pt-8">
                  <p className="font-mono text-xs text-foam-subtle">
                    {dateFormat.format(new Date(insight.datePublished))}
                  </p>
                  <h2 className="mt-3 font-display text-2xl text-foam">
                    <Link
                      href={`/insights/${insight.slug}`}
                      className="hover:text-shoal transition-colors"
                    >
                      {insight.headline}
                    </Link>
                  </h2>
                  <p className="mt-3 text-foam/70 max-w-2xl">{insight.summary}</p>
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="mt-4 inline-block text-sm text-shoal underline underline-offset-4 hover:text-glow"
                  >
                    Read the article
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
