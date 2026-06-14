"use client";

import { useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/events";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function ThanksPage() {
  useEffect(() => {
    track.formSubmit();
  }, []);

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6 bg-ink text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-shoal uppercase mb-6">
        Message received
      </p>
      <h1 className="font-display text-4xl text-foam md:text-5xl max-w-lg">
        Got it.
      </h1>
      <p className="mt-4 text-foam/60 max-w-sm">
        Expect a reply within one business day. Need it sooner?{" "}
        <a
          href={`tel:${site.phone}`}
          className="text-shoal hover:text-glow transition-colors"
          onClick={() => track.phoneClick()}
        >
          Call {site.phoneDisplay}
        </a>
        .
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/book"
          className="inline-flex items-center justify-center rounded bg-shoal px-8 py-3 text-sm font-semibold text-ink hover:bg-glow transition-colors"
          onClick={() => track.bookingClick()}
        >
          Book a call
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded border border-foam/30 px-8 py-3 text-sm font-semibold text-foam hover:border-shoal hover:text-shoal transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
