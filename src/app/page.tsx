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
  title: "AI Agency for Local Business",
  description:
    "AI systems for local business — built, not bolted on. Saltwater Studio builds AI strategy, automation, and agents for local businesses nationwide, plus the search presence that gets them found.",
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
