"use client";

import { useEffect, useState } from "react";

const FIRST_INPUT = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

/**
 * True after the visitor's first input (pointer, key, wheel, touch or scroll).
 * Heavy, purely decorative code (R3F hero, GSAP scroll effects) waits on this so
 * it never competes with the first paint or the main thread during load.
 * With `media`, it stays false forever unless that media query matches at mount,
 * so the gated chunk is never even fetched (e.g. phones, reduced motion).
 */
export function useFirstInput(media?: string) {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (media && !window.matchMedia(media).matches) return;
    const stop = () =>
      FIRST_INPUT.forEach((e) => window.removeEventListener(e, start));
    function start() {
      stop();
      setFired(true);
    }
    FIRST_INPUT.forEach((e) => window.addEventListener(e, start, { passive: true }));
    return stop;
  }, [media]);

  return fired;
}
