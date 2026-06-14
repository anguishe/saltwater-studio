import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import CalEmbed from "./CalEmbed";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Book a Strategy Call",
  description:
    "Book a free 45-minute strategy call with Saltwater Studio. We'll cover your site, your goals, and what it takes to rank. No pressure.",
  path: "/book",
});

const breadcrumbs = [
  { name: "Home", url: site.url },
  { name: "Book a Call", url: `${site.url}/book` },
];

export default function BookPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              Strategy Call
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              Book a call.
            </h1>
            <p className="mt-4 text-foam/60 max-w-xl">
              45 minutes. You leave with a clear picture of what your site needs —
              and what it&apos;ll take to rank. No pitch, no pressure.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <CalEmbed calcomUrl={site.calcom} />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
