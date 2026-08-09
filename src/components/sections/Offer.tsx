"use client";

import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { headlineServices } from "@/data/services";

const ScrollFX = dynamic(() => import("@/components/motion/ScrollFX"), { ssr: false });

/**
 * Four cards, not seven. The three AI services lead; the four legacy pages
 * (web-design, seo-aeo-geo, google-presence, social-content) sit behind one
 * card pointing at /services, so they stay reachable and indexed without
 * burying the reposition on the homepage.
 */
const cards = [
  ...headlineServices.map((s) => ({
    index: s.index,
    title: s.title,
    oneLiner: s.oneLiner,
    href: `/services/${s.slug}`,
  })),
  {
    index: "04",
    title: "Web & Search Presence",
    oneLiner:
      "The site, the schema, the Google profile, and the weekly content that decide whether any of this gets found. Still here, still ours.",
    href: "/services",
  },
];

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
          ScrollFX (GSAP, dynamic) scrubs the per-card dark overlay from 0 to its
          depth value as each card scrolls through the viewport — no GSAP in the
          shared bundle.
        */}
        <ScrollFX variant="offerDepth" className="mt-16 divide-y divide-marine/30">
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.08}>
              <div
                className="relative group grid gap-6 py-10 md:grid-cols-[5rem_1fr_auto] md:items-center px-2 rounded hover:bg-marine/10 transition-colors"
                data-offer-card
              >
                <span className="font-mono text-xs tracking-widest text-shoal/50 uppercase">
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
        </ScrollFX>
      </div>
    </section>
  );
}
