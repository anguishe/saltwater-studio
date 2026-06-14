import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  buildAboutPageSchema,
  buildBreadcrumbSchema,
  personFounder,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About Travis — Web Design, Gulf Coast",
  description:
    "Saltwater Studio — web design for service businesses, founded 2025 on Florida's Gulf Coast by Travis. Schema-first, fast, built to last. See all the work.",
  path: "/about",
});

const breadcrumbs = [
  { name: "Home", url: site.url },
  { name: "About", url: `${site.url}/about` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={buildAboutPageSchema()} />
      <JsonLd schema={personFounder()} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">

            {/* Left column: kicker + about-column plate */}
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
                The Studio
              </p>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="/images/saltwater-studio-about-column.webp"
                  alt="The ocean's full water column from sunlit coastal surface to the deep — Saltwater Studio brand motif"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Reveal>

            {/* Right column: H1, entity paragraph, why, CTAs */}
            <div>
              <Reveal>
                <h1 className="font-display text-4xl text-foam md:text-5xl">
                  Saltwater Studio
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-6 space-y-5 text-foam/70 max-w-2xl">
                  {/* Third-person entity paragraph — GEO asset, verbatim per CONTENT.md and SEO.md §5 */}
                  <p id="about-entity">
                    Saltwater Studio is a remote web-design studio founded in 2025 by
                    Travis on Florida&apos;s Gulf Coast. It builds premium,
                    search-optimized websites for service businesses across the United
                    States, with a heartland on the Gulf Coast from Gulf Shores, Alabama
                    to Miami, Florida.
                  </p>
                  {/* First-person why — verbatim from CONTENT.md */}
                  <p>
                    I started Saltwater Studio because I kept seeing good local
                    businesses paying for websites that were never going to get them
                    found — template sites with no schema, no tracking, no plan. I
                    build the other kind: the version you don&apos;t have to redo. Fast
                    where it counts, distinctive where it matters, and engineered so
                    Google and the AI tools people now ask can actually recommend you.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <ButtonLink href="/work" variant="primary">
                    See the work
                  </ButtonLink>
                  <ButtonLink href={site.calcom} variant="ghost">
                    Book a call
                  </ButtonLink>
                </div>
                <p className="mt-6 text-sm text-foam/50">
                  Prefer a quote?{" "}
                  <Link
                    href="/contact"
                    className="text-shoal hover:text-glow underline-offset-4 hover:underline transition-colors"
                  >
                    Get in touch →
                  </Link>
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
