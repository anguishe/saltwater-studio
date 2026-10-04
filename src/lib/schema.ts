import { site } from "@/config/site";
import { tiers, getTierById, type Tier } from "@/data/tiers";

const ORG_ID = `${site.url}/#studio`;
const FOUNDER_ID = `${site.url}/#founder`;
const WEBSITE_ID = `${site.url}/#website`;
const LOGO_ID = `${site.url}/#logo`;
const CATALOG_ID = `${site.url}/services#catalog`;
const STATE_ID = `${site.url}/#area-florida`;
const DEFAULT_IMAGE = `${site.url}/og-default.jpg`;

// The canonical entity sentence, byte-identical to About, llms.txt, and every bio.
// Single-sourced from site.ts so it cannot drift here.
const GEO_DESCRIPTION = site.entitySentence;

const ref = (id: string) => ({ "@id": id });

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const wikiSameAs = (place: { wikipedia: string; wikidata: string }) => [
  place.wikipedia,
  `https://www.wikidata.org/wiki/${place.wikidata}`,
];

/** Stable @id for a service-area county, e.g. https://saltwaterstudio.xyz/#area-okaloosa-county */
export const countyId = (name: string) => `${site.url}/#area-${slugify(name)}`;

/**
 * The five Florida counties as AdministrativeArea nodes. Defined in full on the
 * Organization (every page, via the layout); everything else refers by @id.
 * Florida is defined once, inside the first county.
 */
function serviceCounties() {
  return site.serviceCounties.map((county, i) => ({
    "@type": "AdministrativeArea",
    "@id": countyId(county.name),
    name: county.name,
    sameAs: wikiSameAs(county),
    containedInPlace:
      i === 0
        ? {
            "@type": "State",
            "@id": STATE_ID,
            name: site.serviceState.name,
            sameAs: wikiSameAs(site.serviceState),
          }
        : ref(STATE_ID),
  }));
}

/** areaServed for remote-capable services: in person in the counties, remote nationwide. */
function remoteCapableAreaServed() {
  return [
    ...site.serviceCounties.map((county) => ref(countyId(county.name))),
    { "@type": "Country", name: "United States" },
  ];
}

// ---------------------------------------------------------------------------
// Plans (src/data/tiers.ts): one Service + one Offer per tier, each with a
// stable @id. The Offers live in the OfferCatalog on the Organization, so every
// page carries the prices; each plan's Service node is emitted once, on its
// canonical page, and points at its Offer by @id.
// ---------------------------------------------------------------------------

const TIER_PAGE: Record<Tier["id"], string> = {
  audit: "/services",
  "page-plan": "/websites",
  "buy-it": "/websites",
  "local-growth": "/services",
  "profile-fix": "/services",
  custom: "/services",
};

const TIER_SERVICE_TYPE: Record<Tier["id"], string> = {
  audit: "Local SEO audit",
  "page-plan": "Web design",
  "buy-it": "Web design",
  "local-growth": "Google Business Profile management",
  "profile-fix": "Google Business Profile optimization",
  custom: "AI automation",
};

/** Plans whose canonical Service node is emitted on the given page path. */
export const tierIdsForPage = (path: string) =>
  tiers.filter((t) => TIER_PAGE[t.id] === path).map((t) => t.id);

export const tierServiceId = (id: Tier["id"]) => `${site.url}${TIER_PAGE[id]}#${id}`;
export const tierOfferId = (id: Tier["id"]) => `${tierServiceId(id)}-offer`;

/** /services carries an anchor per plan; /websites does not. */
const tierUrl = (id: Tier["id"]) =>
  TIER_PAGE[id] === "/services" ? tierServiceId(id) : `${site.url}${TIER_PAGE[id]}`;

function monthlyPrice(amount: number, currency: string, name?: string) {
  return {
    "@type": "UnitPriceSpecification",
    ...(name ? { name } : {}),
    price: amount,
    priceCurrency: currency,
    billingDuration: "P1M",
    unitCode: "MON",
    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
  };
}

function priceFields(tier: Tier) {
  const p = tier.price;
  if (!p) return {}; // quote-based (Custom AI Systems): no price
  const validUntil = tier.priceValidUntil ? { priceValidUntil: tier.priceValidUntil } : {};
  if (p.billing === "monthly") {
    return { priceCurrency: p.currency, priceSpecification: monthlyPrice(p.amount, p.currency), ...validUntil };
  }
  if (p.addOn) {
    // One-time price plus a recurring charge (Buy It: $497 once + $29/mo).
    return {
      priceCurrency: p.currency,
      priceSpecification: [
        { "@type": "UnitPriceSpecification", price: p.amount, priceCurrency: p.currency },
        monthlyPrice(p.addOn.amount, p.currency, p.addOn.name),
      ],
      ...validUntil,
    };
  }
  return { price: p.amount, priceCurrency: p.currency, ...validUntil };
}

function tierOffer(tier: Tier) {
  return {
    "@type": "Offer",
    "@id": tierOfferId(tier.id),
    name: tier.name,
    url: tierUrl(tier.id),
    ...priceFields(tier),
    seller: ref(ORG_ID),
    itemOffered: { "@type": "Service", "@id": tierServiceId(tier.id), name: tier.name },
  };
}

function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    "@id": CATALOG_ID,
    name: `${site.name} plans`,
    url: `${site.url}/services`,
    itemListElement: tiers.map(tierOffer),
  };
}

function priceRange() {
  const amounts = tiers.flatMap((t) => (t.price ? [t.price.amount] : []));
  return `$${Math.min(...amounts)}-$${Math.max(...amounts)}`;
}

export function studioOrg() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.alternateName,
    legalName: site.legalName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${site.url}${site.logo.path}`,
      width: site.logo.width,
      height: site.logo.height,
    },
    image: DEFAULT_IMAGE,
    foundingDate: site.founded,
    founder: ref(FOUNDER_ID),
    slogan: site.tagline,
    description: GEO_DESCRIPTION,
    disambiguatingDescription: site.disambiguatingDescription,
    telephone: site.phone,
    email: site.email,
    // Service-area business: locality only, never a street address.
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
    hasMap: site.gbp.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    priceRange: priceRange(),
    areaServed: serviceCounties(),
    knowsAbout: site.knowsAbout,
    hasOfferCatalog: offerCatalog(),
    sameAs: [...site.sameAs, site.gbp.mapsUrl, site.gbp.shortUrl],
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
    publisher: ref(ORG_ID),
    // No SearchAction: the site has no search. Declaring one is a schema lie
    // (2026-10 audit) — reinstate only if a working /?q= search ships.
  };
}

/**
 * The one full Person node, emitted sitewide from the layout; every other node
 * (Organization.founder, Article.author, AboutPage.mainEntity) refers by @id.
 * No sameAs until a real personal profile exists: the Facebook page belongs to
 * the business, not the person. Image waits for the approved headshot.
 */
export function personFounder() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: site.owner,
    jobTitle: "Founder",
    url: `${site.url}/about`,
    worksFor: ref(ORG_ID),
    knowsAbout: site.knowsAbout,
  };
}

function serviceNode(opts: {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  url: string;
  areaServed: unknown;
  offerIds: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": opts.id,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: ref(ORG_ID),
    areaServed: opts.areaServed,
    ...(opts.offerIds.length === 1
      ? { offers: ref(opts.offerIds[0]) }
      : opts.offerIds.length > 1
        ? { offers: opts.offerIds.map(ref) }
        : {}),
  };
}

/** A plan's Service node, built from tiers.ts. Emit it on its canonical page only (see tierIdsForPage). */
export function tierService(id: Tier["id"]) {
  const tier = getTierById(id);
  if (!tier) throw new Error(`Unknown tier: ${id}`);
  return serviceNode({
    id: tierServiceId(id),
    name: tier.name,
    serviceType: TIER_SERVICE_TYPE[id],
    description: tier.oneLiner,
    url: tierUrl(id),
    areaServed: remoteCapableAreaServed(),
    offerIds: [tierOfferId(id)],
  });
}

// /services/<slug> pages: serviceType and the plans that sell each service.
// Social & content has no plan of its own (folded into Google Care, not sold
// standalone), so it carries no offers.
const PAGE_SERVICES: Record<string, { serviceType: string; tiers: Tier["id"][] }> = {
  "web-design": { serviceType: "Web design", tiers: ["page-plan", "buy-it"] },
  "google-presence": { serviceType: "Google Business Profile management", tiers: ["profile-fix", "local-growth"] },
  "seo-aeo-geo": { serviceType: "Search engine optimization", tiers: ["audit"] },
  "social-content": { serviceType: "Social media marketing", tiers: [] },
  "ai-receptionist": { serviceType: "AI receptionist", tiers: ["custom"] },
  "ai-automation": { serviceType: "Business process automation", tiers: ["custom"] },
  "ai-agents": { serviceType: "AI agents", tiers: ["custom"] },
  "ai-strategy": { serviceType: "AI consulting", tiers: ["custom"] },
};

export const pageServiceId = (slug: string) => `${site.url}/services/${slug}#service`;

export function pageService(opts: { slug: string; name: string; description: string }) {
  const cfg = PAGE_SERVICES[opts.slug] ?? { serviceType: opts.name, tiers: [] };
  return serviceNode({
    id: pageServiceId(opts.slug),
    name: opts.name,
    serviceType: cfg.serviceType,
    description: opts.description,
    url: `${site.url}/services/${opts.slug}`,
    areaServed: remoteCapableAreaServed(),
    offerIds: cfg.tiers.map(tierOfferId),
  });
}

export const cityServiceId = (slug: string) => `${site.url}/${slug}#service`;

/** City page Service: in-person web design in one city, sold through the website plans. */
export function cityService(opts: { slug: string; city: string; description: string }) {
  const place = site.serviceCities[opts.city];
  return serviceNode({
    id: cityServiceId(opts.slug),
    name: `Web Design in ${opts.city}, FL`,
    serviceType: "Web design",
    description: opts.description,
    url: `${site.url}/${opts.slug}`,
    areaServed: {
      "@type": "City",
      "@id": `${site.url}/${opts.slug}#place`,
      name: opts.city,
      ...(place
        ? { sameAs: wikiSameAs(place), containedInPlace: ref(countyId(place.county)) }
        : { containedInPlace: ref(STATE_ID) }),
    },
    offerIds: [tierOfferId("page-plan"), tierOfferId("buy-it")],
  });
}

/** Legacy generic Service builder (no plan offers). Prefer tierService / pageService / cityService. */
export function service(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return serviceNode({
    id: `${opts.url}#service`,
    ...opts,
    areaServed: remoteCapableAreaServed(),
    offerIds: [],
  });
}

export function breadcrumb(items: Array<{ name: string; url: string }>) {
  const last = items[items.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(last ? { "@id": `${last.url}#breadcrumb` } : {}),
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
    isPartOf: ref(WEBSITE_ID),
    mainEntity: ref(ORG_ID),
  };
}

export function aboutPage() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}/about#page`,
    url: `${site.url}/about`,
    name: `About | ${site.name}`,
    isPartOf: ref(WEBSITE_ID),
    about: ref(ORG_ID),
    mainEntity: ref(FOUNDER_ID),
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
  /** @id of the page's main entity (an Article, Service, or OfferCatalog). */
  mainEntity?: string;
  /** @id of what the page is about, when it is not the main entity. */
  about?: string;
  /** True when the page emits breadcrumb() for this path. */
  breadcrumb?: boolean;
  primaryImage?: string;
}) {
  const url = `${site.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    isPartOf: ref(WEBSITE_ID),
    ...(opts.mainEntity ? { mainEntity: ref(opts.mainEntity) } : {}),
    ...(opts.about ? { about: ref(opts.about) } : {}),
    ...(opts.breadcrumb ? { breadcrumb: ref(`${url}#breadcrumb`) } : {}),
    ...(opts.primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: opts.primaryImage } }
      : {}),
    speakable: speakable(opts.speakableSelectors),
  };
}

export const articleId = (slug: string) => `${site.url}/insights/${slug}#article`;
export const catalogId = CATALOG_ID;
export const defaultImage = DEFAULT_IMAGE;

export function article(opts: {
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  const url = `${site.url}/insights/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": articleId(opts.slug),
    headline: opts.headline,
    description: opts.description,
    url,
    image: opts.image ?? DEFAULT_IMAGE,
    inLanguage: "en-US",
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: ref(FOUNDER_ID),
    publisher: ref(ORG_ID),
    isPartOf: ref(WEBSITE_ID),
    mainEntityOfPage: ref(`${url}#webpage`),
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
    creator: ref(ORG_ID),
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
