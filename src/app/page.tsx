import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { webPage } from "@/lib/schema";
import { site } from "@/config/site";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Offer from "@/components/sections/Offer";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import LatestInsights from "@/components/sections/LatestInsights";
import CtaClose from "@/components/sections/CtaClose";

// Home: brand-first title (Saltwater Studio | …) — formatTitle inverts for path "/"
export const metadata: Metadata = buildMetadata({
  title: "Web Design & Google Profiles — Destin, FL",
  description:
    `Custom websites, Google Business Profile management, and AI that answers missed calls for local businesses. Start with a $${site.auditOffer.price} visibility audit.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* org+website schema emitted globally from layout.tsx. No FAQPage node
          here: the home page renders no FAQ section, and schema must match the
          visible page (2026-10 audit). The home FAQs render where they exist. */}
      <JsonLd schema={webPage({ path: "/", name: `${site.name} | Web Design & Google Business Profiles`, speakableSelectors: ["h1", "#about"] })} />

      <Hero />
      <Trust />
      <Offer />
      <Portfolio />
      <Testimonials />
      <Process />
      <WhyUs />
      <About />
      <LatestInsights />
      <CtaClose />
    </>
  );
}
