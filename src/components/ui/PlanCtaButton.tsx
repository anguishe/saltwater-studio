"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/events";

// Classes mirror Button.tsx primary so every plan CTA stays visually identical.
const buttonClass =
  "inline-flex items-center justify-center rounded px-6 py-3 text-sm font-body font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shoal bg-shoal text-ink hover:bg-glow";

/**
 * CTA for a published plan (see planCta in src/data/tiers.ts): an external
 * Stripe payment link when one is configured (tracked as booking_click, the
 * fixed taxonomy's checkout event), otherwise the quote form preselected via
 * /contact?plan=<slug> (tracked as quote_start).
 */
export default function PlanCtaButton({
  href,
  external = false,
  className = "",
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        rel="noopener"
        onClick={track.bookingClick}
        className={`${buttonClass} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      onClick={track.quoteStart}
      className={`${buttonClass} ${className}`}
    >
      {children}
    </Link>
  );
}
