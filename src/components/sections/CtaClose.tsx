"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";

const ScrollFX = dynamic(() => import("@/components/motion/ScrollFX"), { ssr: false });

export default function CtaClose() {
  return (
    <section
      className="relative py-32 px-6 bg-abyss text-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Subtle deep glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[400px] w-[400px] rounded-full bg-shoal/5 blur-[120px]" />
      </div>

      {/* Chrome-mark echo — GSAP scrub fades + scales it in as section enters view */}
      <ScrollFX
        variant="ctaEcho"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96 select-none">
          <Image
            src="/images/saltwater-studio-chrome-mark.webp"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 768px) 288px, 384px"
          />
        </div>
      </ScrollFX>

      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-chrome-mid uppercase mb-6">
            {site.mnemonic}
          </p>
        </Reveal>

        <Reveal delay={0.07}>
          <h2
            id="cta-heading"
            className="font-display text-4xl text-foam md:text-5xl lg:text-6xl"
          >
            Ready to build something that lasts?
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 text-lg text-foam/60">
            One strategy call. No pressure. You leave with a clear picture of what the
            site needs — and what it&apos;ll take to rank.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href="/book"
              variant="primary"
              className="text-base px-8 py-4"
              onClick={track.bookingClick}
            >
              Book a strategy call
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="ghost"
              className="text-base px-8 py-4"
              onClick={track.quoteStart}
            >
              Get a quote
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
