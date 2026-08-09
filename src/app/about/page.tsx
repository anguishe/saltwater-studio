import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  buildAboutPageSchema,
  buildBreadcrumbSchema,
  personFounder,
  webPage,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About Travis — AI Agency, Destin FL",
  description:
    "Saltwater Studio is a remote AI agency founded in 2025 by Travis Abadie in Destin, Florida, building AI automation and AI-search presence for local businesses nationwide.",
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
      <JsonLd schema={webPage({ path: "/about", name: `About Travis — AI Agency, Destin FL | ${site.name}`, speakableSelectors: ["h1", "#about-entity"] })} />

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
                  <p id="about-entity">{site.entitySentence}</p>
                  <p>
                    It works with local businesses across the United States, with a
                    heartland on the Gulf Coast from Gulf Shores, Alabama to Panama
                    City, Florida.
                  </p>
                  {/* First-person why — verbatim from CONTENT.md */}
                  <p>
                    I started Saltwater Studio because I kept watching good local
                    businesses buy things nobody scoped — template websites with no
                    schema, and now AI tools bolted onto a process nobody mapped. Both
                    fail the same way. Something works in the demo, nothing changes in
                    the business, and a year later it gets replaced by the next thing.
                  </p>
                  <p>
                    So I build the other kind, and I run my own businesses on the method
                    before a client ever pays for it. BashSnippets is mine — a technical
                    library structured so AI tools can quote it, not just so Google ranks
                    it. Kai&apos;s Run runs a heat-safety tool that turns live local
                    weather into a straight yes or no about walking your dog right now,
                    because the honest answer changes hour to hour and no article can
                    give it to you. Beach House Moving has a service-area page for every
                    county it actually works, written from real job knowledge instead of
                    a find-and-replace on the city name. Everything I publish moves
                    through one system I built that takes a single input and produces
                    every asset a launch needs, without a person in the middle.
                  </p>
                  <p>
                    That is the whole pitch. Map the process, build the thing that fits
                    it, document it well enough to hand over. I do it on my own work
                    first, which is why I can tell you what will not be worth automating
                    before you pay me to try.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <ButtonLink href="/work" variant="primary">
                    See the work
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="ghost">
                    Start the conversation
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
