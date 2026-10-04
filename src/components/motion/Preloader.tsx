"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./Preloader.module.css";

// useLayoutEffect warns during SSR; this runs it on the client only.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * "The dive in" (DESIGN §1). A ≤1.2s, skippable, once-per-session preloader:
 * foam surface → horizon line → cooling descent as the molten-chrome 'S'
 * coalesces → resolves on "Depth, by design." → lifts into the hero.
 *
 * - CSS keyframes only (Preloader.module.css). The 2026-10 perf PR removed
 *   framer-motion so it stays out of the home bundle; the timeline plays from the
 *   first paint and lifts itself even if JS never runs.
 * - `prefers-reduced-motion`: hidden outright (`motion-reduce:hidden` + the CSS
 *   module's media query), no first-paint flash, no animation.
 * - Never blocks interaction past 1.2s: the lift ends with `visibility:hidden` and
 *   the overlay unmounts when it finishes. Already seen this session → unmounts
 *   before paint on client renders.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [lifting, setLifting] = useState(false);
  const liftStarted = useRef(false);
  const skip = () => {
    if (!liftStarted.current) setLifting(true);
  };

  // Decide once, on the client: reduced-motion or already seen → drop the overlay.
  useIsoLayoutEffect(() => {
    let reduce = false;
    let seen = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      seen = window.sessionStorage.getItem("sw_preloaded") === "1";
    } catch {
      /* private mode: fall through */
    }
    if (reduce || seen) {
      setShow(false);
      return;
    }
    // Deferred so a dev StrictMode re-mount doesn't read its own write.
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("sw_preloaded", "1");
      } catch {
        /* ignore */
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // Skippable: any key lifts immediately.
  useEffect(() => {
    if (!show) return;
    const onKey = () => {
      if (!liftStarted.current) setLifting(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-abyss motion-reduce:hidden ${s.overlay} ${lifting ? s.lifting : ""}`}
      onAnimationStart={(e) => {
        if (e.target === e.currentTarget) liftStarted.current = true;
      }}
      onAnimationEnd={(e) => {
        // Only the overlay's own lift ends the sequence (child animations bubble).
        if (e.target === e.currentTarget) setShow(false);
      }}
      onClick={skip}
    >
      {/* foam surface giving way */}
      <div aria-hidden="true" className={`absolute inset-0 bg-foam ${s.foam}`} />

      {/* the cooling water column descending past us */}
      <div aria-hidden="true" className={`absolute inset-0 ${s.column}`} />

      {/* the deep settling in as we pass the shallows */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-abyss ${s.deep}`}
      />

      {/* the surface horizon line, sinking out of frame */}
      <div aria-hidden="true" className={`absolute inset-x-0 top-1/2 h-px ${s.horizon}`}>
        <div className={`h-px bg-foam/70 ${s.horizonLine}`} />
      </div>

      {/* the mark coalescing + the resolve */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 120"
          className={`h-20 w-auto md:h-24 ${s.mark}`}
        >
          <defs>
            <linearGradient id="sw-preload-chrome" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor="#DCE3E8" />
              <stop offset="45%" stopColor="#8A949B" />
              <stop offset="78%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#05161B" />
            </linearGradient>
          </defs>
          <path
            d="M70 18 C 30 18 28 50 50 60 C 72 70 70 104 30 104"
            fill="none"
            stroke="url(#sw-preload-chrome)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p aria-hidden="true" className={`font-display text-xl text-foam md:text-2xl ${s.resolve}`}>
          Depth, by design.
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
        className="absolute bottom-6 right-6 z-20 font-mono text-[10px] uppercase tracking-[0.25em] text-foam-muted transition-colors hover:text-shoal focus-visible:text-shoal"
      >
        Skip
      </button>
    </div>
  );
}
