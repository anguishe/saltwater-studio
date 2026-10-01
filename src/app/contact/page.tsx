import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { buildContactPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import QuoteForm from "./QuoteForm";
import ContactLinks from "./ContactLinks";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Get a Quote",
  description:
    "Tell Saltwater Studio about the business: a website, Google Business Profile management, local search, or AI. Scoped within a day, reply in one business day.",
  path: "/contact",
});

const breadcrumbs = [
  { name: "Home", url: site.url },
  { name: "Contact", url: `${site.url}/contact` },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={buildContactPageSchema()} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
                Contact
              </p>
              <h1 className="font-display text-4xl text-foam">
                Tell us about the business.
              </h1>
              <p className="mt-4 text-foam/60">
                The more specific you are, the more useful the quote. No spam,
                no obligation — Travis reads every message.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ContactLinks />
            </Reveal>

          </div>

          <Reveal delay={0.06}>
            {/* Suspense: QuoteForm reads useSearchParams (?interest= prefill) —
                required for static rendering in Next 16 */}
            <Suspense fallback={null}>
              <QuoteForm />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </>
  );
}
