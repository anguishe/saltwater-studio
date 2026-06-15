import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { buildContactPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import QuoteForm from "./QuoteForm";
import ContactLinks from "./ContactLinks";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Get a Web Design Quote",
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
