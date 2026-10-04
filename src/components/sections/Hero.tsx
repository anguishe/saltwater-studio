"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import Preloader from "@/components/motion/Preloader";
import { track } from "@/lib/events";
import { site } from "@/config/site";

const DeepScene = dynamic(() => import("@/components/three/DeepScene"), {
  ssr: false,
});

// Same gate as the wrapper's `hidden md:block motion-reduce:hidden`, checked in JS
// BEFORE the import so phones and reduced-motion visitors never fetch the 3D chunk.
const SCENE_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const FIRST_INPUT = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

export default function Hero() {
  // The poster is the LCP and the whole first paint. The R3F scene is fetched and
  // mounted only on a desktop-width, motion-allowed screen, and only after the
  // visitor's first input, so it never competes with load. `inView` then drives
  // the frameloop so it pauses when the hero scrolls off-screen.
  const canvasRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [load3D, setLoad3D] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(SCENE_QUERY).matches) return;
    const start = () => {
      stop();
      setLoad3D(true);
    };
    const stop = () =>
      FIRST_INPUT.forEach((e) => window.removeEventListener(e, start));
    FIRST_INPUT.forEach((e) =>
      window.addEventListener(e, start, { passive: true })
    );
    return stop;
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!load3D || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load3D]);

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
        className={`absolute inset-0 hidden transition-opacity duration-1000 md:block motion-reduce:hidden ${
          sceneReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {load3D && (
          <Suspense fallback={null}>
            <DeepScene active={inView} onReady={() => setSceneReady(true)} />
          </Suspense>
        )}
      </div>

      {/* Foreground text — DOM, not in canvas (crisp + indexable) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Brand eyebrow from sm up; on phones the readable place line below
            does the job and keeps both CTAs in the first screen. */}
        <p className="mb-6 hidden font-mono text-xs uppercase tracking-[0.25em] text-shoal sm:block">
          Saltwater Studio — Est. 2025
        </p>

        <h1 className="font-display text-4xl font-semibold leading-tight text-foam md:text-6xl lg:text-7xl">
          Websites and Google profiles that make the phone ring.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold text-foam md:text-xl">
          Web design and Google Business Profile management in Destin, FL. In
          person from Gulf Shores to Panama City, remote everywhere else.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-base text-foam/70 md:mt-6 md:text-lg">
          Saltwater Studio builds fast, custom websites and runs your Google
          Business Profile every month, so local customers find you first. Then
          we add AI where it saves you time, like a receptionist that texts back
          every missed call. The visibility audit, ${site.auditOffer.price}
          {site.auditOffer.promoActive
            ? ` through ${site.auditOffer.endsLabel}`
            : ""}
          , shows exactly where you stand today.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10">
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
      <Preloader />
    </section>
  );
}
