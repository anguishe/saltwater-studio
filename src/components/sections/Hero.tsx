import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";

const DeepScene = dynamic(() => import("@/components/three/DeepScene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      className="relative min-h-svh flex items-center justify-center overflow-hidden bg-abyss"
      aria-label="Hero"
    >
      {/* Static poster / LCP — also serves as mobile + reduced-motion hero */}
      <Image
        src="/images/hero-poster.jpg"
        alt="Saltwater Studio — bioluminescent deep ocean with a molten-chrome studio mark"
        fill
        priority
        className="object-cover opacity-60 motion-reduce:opacity-80"
        sizes="100vw"
      />

      {/* R3F canvas — desktop only, lazy, ssr:false */}
      <div className="absolute inset-0 hidden md:block motion-reduce:hidden">
        <Suspense fallback={null}>
          <DeepScene />
        </Suspense>
      </div>

      {/* Foreground text — DOM, not in canvas */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="font-mono text-xs tracking-[0.25em] text-shoal uppercase mb-6">
          Saltwater Studio &mdash; Est. 2025 · Gulf Coast → Nationwide
        </p>

        <h1 className="font-display text-4xl leading-tight font-semibold text-foam md:text-6xl lg:text-7xl">
          A web design studio for service businesses that refuse to look like
          everyone&nbsp;else.
        </h1>

        <p className="mt-6 text-lg text-foam/70 max-w-2xl mx-auto">
          {site.taglineSecondary}
        </p>

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
      </div>

      {/* Gradient fade to page background */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
