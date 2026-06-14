import { site } from "@/config/site";

const ORG_ID = `${site.url}/#studio`;
const FOUNDER_ID = `${site.url}/#founder`;

export function buildOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    foundingDate: site.founded,
    founder: {
      "@type": "Person",
      name: site.owner,
      "@id": FOUNDER_ID,
    },
    slogan: site.mnemonic,
    description:
      "Saltwater Studio is a web design studio serving service businesses nationwide from the Gulf Coast, building websites engineered for Google, AI search, and real customers.",
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Web design",
      "SEO",
      "Answer engine optimization",
      "Generative engine optimization",
      "Google Business Profile",
      "Next.js",
    ],
    sameAs: site.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "sales",
      email: site.email,
      areaServed: "US",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}/about#page`,
    url: `${site.url}/about`,
    name: `About | ${site.name}`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: site.owner,
      jobTitle: "Founder",
      worksFor: { "@id": ORG_ID },
    },
  };
}

export function buildContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#page`,
    url: `${site.url}/contact`,
    name: `Contact | ${site.name}`,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": ORG_ID },
  };
}

export function buildCreativeWorkSchema(opts: {
  name: string;
  url: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${opts.slug}#project`,
    name: opts.name,
    url: opts.url,
    description: opts.description,
    creator: { "@id": ORG_ID },
  };
}
