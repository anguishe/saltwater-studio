import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { buildFaqSchema, webPage } from "@/lib/schema";
import { site } from "@/config/site";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Offer from "@/components/sections/Offer";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import About from "@/components/sections/About";
import CtaClose from "@/components/sections/CtaClose";
import { getFaqsByPage } from "@/data/faqs";

// Home: brand-first title (Saltwater Studio | …) — formatTitle inverts for path "/"
export const metadata: Metadata = buildMetadata({
  title: "Web Design for Service Businesses",
  description:
    "A web design studio for service businesses that refuse to look like everyone else. Schema-first builds, AI search visibility, and the tracking your competitor skipped.",
  path: "/",
});

export default function HomePage() {
  const homeFaqs = getFaqsByPage("home");

  return (
    <>
      {/* FAQ AEO — org+website schema emitted globally from layout.tsx */}
      <JsonLd schema={buildFaqSchema(homeFaqs)} />
      <JsonLd schema={webPage({ path: "/", name: `${site.name} | Web Design for Service Businesses`, speakableSelectors: ["h1", "#about"] })} />

      <Hero />
      <Trust />
      <Offer />
      <Portfolio />
      <Process />
      <WhyUs />
      <About />
      <CtaClose />
    </>
  );
}
