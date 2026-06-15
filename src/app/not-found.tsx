import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you're looking for doesn't exist. Find your way back to Saltwater Studio.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6 bg-ink text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-shoal uppercase mb-6">
        404
      </p>
      <h1 className="font-display text-4xl text-foam md:text-5xl max-w-lg">
        This page sank.
      </h1>
      <p className="mt-4 text-foam/60 max-w-sm">
        The link you followed doesn&apos;t lead anywhere — or it never surfaced.
        Here&apos;s the way back.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <ButtonLink href="/" variant="primary" className="text-base px-8 py-4">
          Back to the surface
        </ButtonLink>
        <ButtonLink href="/book" variant="ghost" className="text-base px-8 py-4">
          Book a strategy call
        </ButtonLink>
      </div>
      <Link
        href="/work"
        className="mt-6 text-sm text-foam/40 hover:text-shoal transition-colors"
      >
        Or see the work →
      </Link>
    </div>
  );
}
