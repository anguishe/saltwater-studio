import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { buildContactPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import QuoteForm from "./QuoteForm";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get a quote from Saltwater Studio — web design and SEO for service businesses. Tell us about your project and expect a reply within one business day.",
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
                Let&apos;s talk about your site.
              </h1>
              <p className="mt-4 text-foam/60">
                Fill out the form and expect a reply within one business day. Or book
                a strategy call directly.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 space-y-4">
                <a
                  href={`mailto:${site.email}`}
                  className="block text-sm text-foam/60 hover:text-shoal transition-colors"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="block text-sm text-foam/60 hover:text-shoal transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <ButtonLink href="/book" variant="ghost" className="mt-8">
                Or book a call directly →
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </>
  );
}
