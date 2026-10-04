import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /**
   * Kept so existing call sites compile. Unused: the reveal is tied to scroll
   * position now, not to a timer, so there is nothing to delay.
   */
  delay?: number;
  className?: string;
  /** Render as an `li` when the reveal sits directly inside a `ul`/`ol`. */
  as?: "div" | "li";
}

/**
 * Scroll reveal with no JavaScript (styles: `.reveal` in globals.css).
 *
 * The old version was a framer-motion wrapper that server-rendered every block
 * with inline `opacity:0`, so nothing painted until the bundle hydrated — the
 * H1 on inner pages included (mobile LCP 6.4 s, 2026-10 audit). This one is a
 * plain <div>: the HTML is visible as soon as it arrives, with or without JS.
 * Browsers that support scroll-driven animations fade blocks in as they enter
 * the viewport; anything already on screen at load is at full opacity on the
 * first frame. Everything else (and prefers-reduced-motion) gets static content.
 */
export default function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag className={className ? `reveal ${className}` : "reveal"}>{children}</Tag>
  );
}
