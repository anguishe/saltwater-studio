"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getServiceBySlug } from "@/data/services";

const ScrollFX = dynamic(() => import("@/components/motion/ScrollFX"), { ssr: false });

/**
 * Five service cards, web + Google first, AI second — the ~65/35 positioning
 * mix (2026-09-30). The tier ladder lives on /services.
 */
const cards = [
  "web-design",
  "google-presence",
  "seo-aeo-geo",
  "ai-receptionist",
  "ai-automation",
].map((slug, i) => {
  const s = getServiceBySlug(slug)!;
  return {
    index: String(i + 1).padStart(2, "0"),
    title: s.title,
    oneLiner: s.oneLiner,
    href: `/services/${s.slug}`,
  };
});

export default function Offer() {
  return (
    <section id="services" className="py-24 px-6 bg-ink" aria-labelledby="offer-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            02 / What We Do
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="offer-heading"
            className="font-display text-3xl text-foam md:text-4xl max-w-2xl"
          >
            The layers of the deep
          </h2>
        </Reveal>

        {/*
          Cards render server-side (crawlable). ScrollFX (GSAP, dynamic, ssr:false)
          mounts as an empty first-child marker and scrubs each card's dark overlay
          as it scrolls through — no GSAP in the shared bundle.
        */}
        <div className="mt-16 divide-y divide-marine/30">
          <ScrollFX variant="offerDepth" />
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.08}>
              <div
                className="relative group grid gap-6 py-10 md:grid-cols-[5rem_1fr_auto] md:items-center px-2 rounded hover:bg-marine/10 transition-colors"
                data-offer-card
              >
                <span className="font-mono text-xs tracking-widest text-shoal-muted uppercase">
                  {card.index}
                </span>

                <div>
                  <h3 className="font-display text-xl text-foam group-hover:text-shoal transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-foam/60 max-w-xl">{card.oneLiner}</p>
                </div>

                <ButtonLink
                  href={card.href}
                  variant="ghost"
                  className="self-start md:self-center whitespace-nowrap"
                >
                  What this looks like &rarr;
                </ButtonLink>

                {/* Depth overlay — GSAP scrub target; pointer-events-none so clicks pass through */}
                <div
                  data-offer-overlay
                  className="absolute inset-0 pointer-events-none rounded bg-abyss"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* /websites carries the published plans; link it from the offer (SW-062). */}
        <Reveal>
          <p className="mt-10 text-foam/70">
            Want the numbers first?{" "}
            <Link
              href="/websites"
              className="text-shoal underline underline-offset-4 hover:text-glow"
            >
              See the website plans and what each one costs
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
