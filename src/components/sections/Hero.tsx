"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import Preloader from "@/components/motion/Preloader";
import { track } from "@/lib/events";
import { site } from "@/config/site";

const DeepScene = dynamic(() => import("@/components/three/DeepScene"), {
  ssr: false,
});

export default function Hero() {
  // The canvas mounts only once the hero is in view AND the preloader has lifted,
  // so the R3F loop never spins under the preloader. `inView` then drives the
  // frameloop so it pauses when the hero scrolls off-screen.
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasRef, { margin: "-10%" });
  const [preloadComplete, setPreloadComplete] = useState(false);

  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-abyss"
      aria-label="Hero"
    >
      {/* Static poster / LCP — also serves as the mobile + reduced-motion hero */}
      <Image
        src="/images/saltwater-studio-hero-deep-poster.webp"
        alt="Saltwater Studio — a molten-chrome studio mark suspended in deep water, the studio's &quot;Depth, by design&quot; signature"
        fill
        priority
        className="object-cover opacity-60 motion-reduce:opacity-80"
        sizes="100vw"
      />

      {/* R3F canvas — desktop + motion-allowed only, lazy, ssr:false */}
      <div
        ref={canvasRef}
        className="absolute inset-0 hidden md:block motion-reduce:hidden"
      >
        {preloadComplete && (
          <Suspense fallback={null}>
            <DeepScene active={inView} />
          </Suspense>
        )}
      </div>

      {/* Foreground text — DOM, not in canvas (crisp + indexable) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-shoal">
          Saltwater Studio — Est. 2025 · Destin, FL → Nationwide
        </p>

        <h1 className="font-display text-4xl font-semibold leading-tight text-foam md:text-6xl lg:text-7xl">
          Websites and Google profiles that make the phone ring.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-foam/70">
          Saltwater Studio builds fast, custom websites and runs your Google
          Business Profile every month, so local customers find you first. Then
          we add AI where it saves you time, like a receptionist that texts back
          every missed call. The visibility audit, ${site.auditOffer.price} through{" "}
          {site.auditOffer.endsLabel}, shows exactly where you stand today.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ButtonLink
            href="/services#audit"
            variant="primary"
            className="px-8 py-4 text-base"
          >
            See the audit — ${site.auditOffer.price}
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="ghost"
            className="px-8 py-4 text-base"
            onClick={track.quoteStart}
          >
            Start the conversation
          </ButtonLink>
        </div>
      </div>

      {/* Gradient fade to page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />

      {/* "The dive in" — overlays everything on first visit, lifts ≤1.2s */}
      <Preloader onComplete={() => setPreloadComplete(true)} />
    </section>
  );
}
