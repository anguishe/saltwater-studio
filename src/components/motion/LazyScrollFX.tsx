"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { useFirstInput } from "./useFirstInput";

const ScrollFX = dynamic(() => import("./ScrollFX"), { ssr: false });

/**
 * ScrollFX (GSAP + ScrollTrigger + Lenis) fetched on the first input instead of
 * at hydration. Both effects are scroll-scrubbed and sit below the fold, so they
 * look the same; the ~50KB chunk just stays off the load path (perf PR 1.3).
 */
export default function LazyScrollFX(props: ComponentProps<typeof ScrollFX>) {
  const ready = useFirstInput();
  return ready ? <ScrollFX {...props} /> : null;
}
