import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { insights } from "@/data/insights";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

// The three newest articles by publish date (stable for ties: data-file order).
const latest = [...insights]
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
  .slice(0, 3);

// Cards show the answer-first opening sentence only; the full standfirst is on the article.
const firstSentence = (text: string) => text.split(/(?<=[.!?])\s+/)[0];

/** Home insights row (SW-062): the latest 3 from src/data/insights.ts. Server-rendered. */
export default function LatestInsights() {
  return (
    <section id="insights" className="py-24 px-6 bg-marine/10" aria-labelledby="insights-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            07 / Insights
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="insights-heading"
            className="font-display text-3xl text-foam md:text-4xl max-w-2xl"
          >
            Notes from the work
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {latest.map((insight, i) => (
            <Reveal key={insight.slug} delay={i * 0.07}>
              <article className="h-full rounded-lg border border-marine/40 p-6 hover:border-shoal/40 transition-colors">
                <p className="font-mono text-xs text-foam-subtle">
                  {dateFormat.format(new Date(insight.datePublished))}
                </p>
                <h3 className="mt-3 font-display text-lg text-foam">
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="hover:text-shoal transition-colors"
                  >
                    {insight.headline}
                  </Link>
                </h3>
                <p className="mt-3 text-foam/60">{firstSentence(insight.summary)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10">
            <Link
              href="/insights"
              className="text-shoal underline underline-offset-4 hover:text-glow"
            >
              All insights
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
