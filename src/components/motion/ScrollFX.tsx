"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./useLenis";

gsap.registerPlugin(ScrollTrigger);

type Variant = "offerDepth" | "ctaEcho";

interface ScrollFXProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Omit to mount as an empty marker that animates its PARENT. Use that when the
   * content must be in the server HTML: this component loads ssr:false, so any
   * children passed in only appear after hydration (invisible to crawlers).
   */
  children?: ReactNode;
  variant: Variant;
}

/**
 * GSAP scroll-driven effects — dynamically imported so GSAP + Lenis stay out
 * of the shared first-load bundle.
 *
 * offerDepth: scrubs per-card dark overlays [data-offer-overlay] as each card
 *             scrolls through, deepening the visual depth metaphor.
 * ctaEcho:    fades + scales the chrome-mark echo wrapper as CtaClose enters view.
 *
 * useLenis is called here (ref-counted singleton) so the Lenis ↔ ScrollTrigger
 * bridge is active for the lifetime of any mounted ScrollFX on the page.
 */
export default function ScrollFX({ children, variant, className, ...props }: ScrollFXProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasChildren = Boolean(children);

  useLenis(); // ref-counted — safe to call from multiple instances

  useEffect(() => {
    const marker = ref.current;
    const el = hasChildren ? marker : marker?.parentElement;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (variant === "offerDepth") {
        const overlays = gsap.utils.toArray<HTMLElement>("[data-offer-overlay]", el);
        overlays.forEach((overlay, i) => {
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            {
              opacity: 0.04 + i * 0.04, // 0.04 → 0.08 → 0.12 → 0.16
              ease: "none",
              scrollTrigger: {
                trigger: overlay.parentElement,
                start: "top 80%",
                end: "bottom 25%",
                scrub: 1.5,
              },
            }
          );
        });
      }

      if (variant === "ctaEcho") {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.94, y: 20 },
          {
            opacity: 0.12,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "center 40%",
              scrub: 2,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [variant, hasChildren]);

  if (!hasChildren) return <div ref={ref} hidden />;
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
