"use client";

import { site } from "@/config/site";
import { track } from "@/lib/events";

export default function ContactLinks() {
  return (
    <div className="mt-8">
      <a
        href={`mailto:${site.email}`}
        className="block py-3 text-sm text-foam/60 hover:text-shoal transition-colors"
        onClick={track.emailClick}
      >
        {site.email}
      </a>
      <a
        href={`tel:${site.phone}`}
        className="block py-3 text-sm text-foam/60 hover:text-shoal transition-colors"
        onClick={track.phoneClick}
      >
        {site.phoneDisplay}
      </a>
    </div>
  );
}
