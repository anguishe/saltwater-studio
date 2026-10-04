import type { Metadata } from "next";
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
        {/* Mobile order = DOM order: intro, form, then hours and area. Desktop
            puts hours and area under the intro, with the form spanning both rows. */}
        <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
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

          {/* Server-rendered: the form is in the static HTML, so it paints with
              the page and reserves its own height (no late layout shift). */}
          <Reveal delay={0.06} className="lg:row-span-2">
            <QuoteForm />
          </Reveal>

          <Reveal className="lg:col-start-1 lg:row-start-2">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-mono text-xs tracking-[0.2em] text-foam-subtle uppercase">
                  Hours
                </dt>
                <dd className="mt-1 text-foam/70">{site.hours.display}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-[0.2em] text-foam-subtle uppercase">
                  Service area
                </dt>
                <dd className="mt-1 text-foam/70">
                  Based in {site.baseCity}, Florida, with no storefront. In person
                  from Gulf Shores, AL to Panama City, FL; remote anywhere in the
                  United States.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </>
  );
}
