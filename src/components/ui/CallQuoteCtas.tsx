"use client";

import { Phone } from "lucide-react";
import { ButtonLink } from "./Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";

/**
 * Inline call + quote pair for server-rendered pages (city pages) that need a
 * first-screen CTA without the sticky bar. Client only for the tracked clicks.
 */
export default function CallQuoteCtas({
  quoteHref = "/contact",
  className = "",
}: {
  quoteHref?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <ButtonLink href={quoteHref} variant="primary" onClick={track.quoteStart}>
        Get a quote
      </ButtonLink>
      <a
        href={`tel:${site.phone}`}
        onClick={track.phoneClick}
        className="inline-flex items-center justify-center gap-2 rounded border border-foam/40 px-6 py-3 text-sm font-semibold text-foam transition-colors duration-200 hover:border-shoal hover:text-shoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shoal"
      >
        <Phone size={16} aria-hidden="true" />
        Call {site.phoneDisplay}
      </a>
    </div>
  );
}
