"use client";

import { site } from "@/config/site";
import { track } from "@/lib/events";

// Plain <a>, not next/link — the href is external Stripe checkout. Classes
// mirror Button.tsx primary so the two stay visually identical.
export default function BuyAuditButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={site.stripeAuditUrl}
      rel="noopener"
      onClick={track.bookingClick}
      className={`inline-flex items-center justify-center rounded px-6 py-3 text-sm font-body font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shoal bg-shoal text-ink hover:bg-glow ${className}`}
    >
      Get the audit — $150
    </a>
  );
}
