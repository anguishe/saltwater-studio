import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { buildAboutPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Saltwater Studio is a web design studio founded in 2025 by Travis on the Gulf Coast of Florida, building websites and search presence for service businesses across the United States.",
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
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              About
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              Travis, founder of Saltwater Studio.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 space-y-5 text-foam/70 max-w-2xl">
              {/* Third-person entity paragraph — GEO asset per SEO.md §5 */}
              <p>
                Saltwater Studio is a web design studio founded in 2025 by Travis on the Gulf
                Coast of Florida. The studio builds websites and search presence for service
                businesses across the United States — the kind of foundation that doesn&apos;t
                need to be rebuilt in two years.
              </p>
              <p>
                The work is schema-first, tracking-first, and specific. Structured data is
                validated before launch. Analytics are live from day one. One canonical fact
                set — name, location, services — is consistent across the site, in schema,
                in llms.txt, and on every directory. Most competitors skip those steps.
                Saltwater doesn&apos;t.
              </p>
              <p>
                Remote, nationwide, out of the Florida Panhandle — Gulf Shores, AL to Miami,
                FL is the heartland, but every engagement is fully remote. No account managers,
                no handoffs. Travis handles every project from strategy call to post-launch
                indexing.
              </p>
              <p>
                The studio name comes from the water column — a metaphor for building deeper
                than the surface. Everyone else stops at the template. Saltwater builds the
                version you can actually be found on.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-14 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/book" variant="primary">
                Book a strategy call
              </ButtonLink>
              <ButtonLink href="/work" variant="ghost">
                See the work
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
