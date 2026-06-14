"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * "The dive in" (DESIGN §1). A ≤1.2s, skippable, once-per-session preloader:
 * foam surface → horizon line → cooling descent as the molten-chrome 'S'
 * coalesces → resolves on "Depth, by design." → lifts into the hero.
 *
 * - Transient framer-motion (the sanctioned UI/micro layer) — unmounts after the
 *   lift, so the page keeps its single persistent loop (the R3F useFrame).
 * - `prefers-reduced-motion`: hidden outright via `motion-reduce:hidden` (no
 *   first-paint flash, no animation) and resolved immediately — the hero poster is
 *   the static deep frame with the mark already formed.
 * - Never blocks interaction past 1.2s: the lift sets `pointer-events:none` and the
 *   overlay unmounts on completion.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [lifting, setLifting] = useState(false);
  const doneRef = useRef(false);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      window.sessionStorage.setItem("sw_preloaded", "1");
    } catch {
      /* private mode — fall through */
    }
    setShow(false);
    onComplete();
  }

  // Decide once, on the client: reduced-motion or already-seen → skip straight to
  // the hero; otherwise schedule the lift so the whole sequence stays ≤1.2s.
  useEffect(() => {
    let reduce = false;
    let seen = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      seen = window.sessionStorage.getItem("sw_preloaded") === "1";
    } catch {
      /* ignore */
    }
    if (reduce || seen) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setLifting(true), 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skippable: any key lifts immediately.
  useEffect(() => {
    if (!show) return;
    const onKey = () => setLifting(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-abyss motion-reduce:hidden"
      initial={false}
      animate={{ y: lifting ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: EXPO }}
      style={{ pointerEvents: lifting ? "none" : "auto" }}
      onAnimationComplete={() => {
        if (lifting) finish();
      }}
      onClick={() => setLifting(true)}
    >
      {/* foam surface giving way */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-foam"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: EXPO, delay: 0.15 }}
      />

      {/* the cooling water column descending past us */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #F4F1EA 0%, #2FC6B6 28%, #0C3B45 55%, #05161B 78%, #02090C 100%)",
        }}
        initial={{ opacity: 0, y: "-18%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 0.9, ease: EXPO, delay: 0.2 }}
      />

      {/* the deep settling in as we pass the shallows */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-abyss"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EXPO, delay: 0.7 }}
      />

      {/* the surface horizon line, sinking out of frame */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-foam/70"
        initial={{ scaleX: 0, opacity: 0, y: "0%" }}
        animate={{ scaleX: 1, opacity: [0, 1, 1, 0], y: ["0%", "0%", "-40%", "-130%"] }}
        transition={{ duration: 1.0, ease: EXPO, delay: 0.15, times: [0, 0.25, 0.6, 1] }}
      />

      {/* the mark coalescing + the resolve */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 120"
          className="h-20 w-auto md:h-24"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.5 }}
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
        </motion.svg>

        <motion.p
          aria-hidden="true"
          className="font-display text-xl text-foam md:text-2xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EXPO, delay: 1.0 }}
        >
          Depth, by design.
        </motion.p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLifting(true);
        }}
        className="absolute bottom-6 right-6 z-20 font-mono text-[10px] uppercase tracking-[0.25em] text-foam/50 transition-colors hover:text-shoal focus-visible:text-shoal"
      >
        Skip
      </button>
    </motion.div>
  );
}
