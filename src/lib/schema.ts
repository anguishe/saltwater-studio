import { site } from "@/config/site";

const ORG_ID = `${site.url}/#studio`;
const FOUNDER_ID = `${site.url}/#founder`;
const WEBSITE_ID = `${site.url}/#website`;

// The canonical entity sentence, byte-identical to About, llms.txt, and every bio.
// Single-sourced from site.ts so it cannot drift here.
const GEO_DESCRIPTION = site.entitySentence;

export function studioOrg() {
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
      "@id": FOUNDER_ID,
      name: site.owner,
    },
    slogan: site.tagline,
    description: GEO_DESCRIPTION,
    areaServed: { "@type": "Country", name: "United States" },
    // Disambiguation anchor. Several unrelated studios share the name, so the
    // Destin coordinates plus the founder Person node are what separate this
    // entity from them. Not a storefront claim — the business is remote.
    location: {
      "@type": "Place",
      name: `${site.baseCity}, ${site.region}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.baseCity,
        addressRegion: site.region,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
    },
    knowsAbout: site.knowsAbout,
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

export function webSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    // No SearchAction: the site has no search. Declaring one is a schema lie
    // (2026-10 audit) — reinstate only if a working /?q= search ships.
  };
}

export function personFounder() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: site.owner,
    jobTitle: "Founder",
    worksFor: { "@id": ORG_ID },
    sameAs: site.sameAs,
  };
}

export function service(opts: {
  name: string;
  description: string;
  url: string;
  /** Only the T1 audit carries a published price (carve-out, 2026-08-09). */
  offers?: { price: number; priceCurrency: "USD"; priceValidUntil?: string };
  /** City-scoped pages override the nationwide default (e.g. /web-design-destin-fl). */
  areaServed?: { city: string; region: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    areaServed: opts.areaServed
      ? {
          "@type": "City",
          name: opts.areaServed.city,
          containedInPlace: {
            "@type": "State",
            name: opts.areaServed.region,
          },
        }
      : { "@type": "Country", name: "United States" },
    ...(opts.offers
      ? {
          offers: {
            "@type": "Offer",
            price: opts.offers.price,
            priceCurrency: opts.offers.priceCurrency,
            ...(opts.offers.priceValidUntil
              ? { priceValidUntil: opts.offers.priceValidUntil }
              : {}),
            url: opts.url,
          },
        }
      : {}),
  };
}

export function breadcrumb(items: Array<{ name: string; url: string }>) {
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

export function faqPage(faqs: Array<{ question: string; answer: string }>) {
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

export function contactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#page`,
    url: `${site.url}/contact`,
    name: `Contact | ${site.name}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": ORG_ID },
  };
}

export function aboutPage() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}/about#page`,
    url: `${site.url}/about`,
    name: `About | ${site.name}`,
    isPartOf: { "@id": WEBSITE_ID },
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

export function speakable(cssSelectors: string[]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

export function webPage(opts: {
  path: string;
  name: string;
  type?: string;
  speakableSelectors: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${site.url}${opts.path}#webpage`,
    url: `${site.url}${opts.path}`,
    name: opts.name,
    isPartOf: { "@id": WEBSITE_ID },
    speakable: speakable(opts.speakableSelectors),
  };
}

export function article(opts: {
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}) {
  const url = `${site.url}/insights/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
  };
}

export function creativeWork(opts: {
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

// Aliases for pages scaffolded before the rename — do not remove
export const buildOrgSchema = studioOrg;
export const buildWebSiteSchema = webSite;
export const buildBreadcrumbSchema = breadcrumb;
export const buildFaqSchema = faqPage;
export const buildContactPageSchema = contactPage;
export const buildAboutPageSchema = aboutPage;
export const buildServiceSchema = service;
export const buildCreativeWorkSchema = creativeWork;
