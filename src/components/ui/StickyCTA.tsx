"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config/site";
import { track } from "@/lib/events";

export default function StickyCTA() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-ink/95 backdrop-blur-sm border-t border-marine/50 pb-[env(safe-area-inset-bottom)]"
      style={{ height: "calc(4rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex h-16 items-center gap-3 px-4">
        <a
          href={`tel:${site.phone}`}
          onClick={track.phoneClick}
          className="flex flex-1 items-center justify-center gap-2 rounded border border-foam/30 py-2 text-sm font-semibold text-foam hover:border-shoal hover:text-shoal transition-colors"
          aria-label={`Call ${site.phoneDisplay}`}
        >
          <Phone size={16} />
          Call
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded bg-shoal py-2 text-sm font-semibold text-ink hover:bg-glow transition-colors"
          onClick={track.quoteStart}
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
