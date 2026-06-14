"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

// Module-level ref-count so multiple ScrollFX instances share one Lenis instance.
// First mount creates it; last unmount destroys it.
let _refCount = 0;
let _cleanup: (() => void) | null = null;

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    _refCount++;

    if (_refCount === 1) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      _cleanup = () => {
        lenis.destroy();
        gsap.ticker.remove(ticker);
        _cleanup = null;
      };
    }

    return () => {
      _refCount--;
      if (_refCount === 0) _cleanup?.();
    };
  }, []);
}
