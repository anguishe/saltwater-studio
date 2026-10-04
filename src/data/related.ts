// Contextual internal links (SW-062, Wave 1 PR 1.6): the "Related" block on
// service pages, the peer links at the end of each insight, and the plans and
// services strip on city pages. Blueprint: the internal link matrix in the
// 2026-10 cluster audit (spoke <-> pillar both ways, peer spokes, cities ->
// /websites).
//
// Kept here, not in services.ts / insights.ts / locations.ts, so the copy in
// those files can change without touching link data. Every slug is checked at
// module load: a typo, a removed page, or a case study that isn't live fails
// the build instead of shipping a broken or gated link (PORTFOLIO §0).
//
// Anchors are descriptive and vary from page to page. No prices in anchor text;
// /websites renders them from tiers.ts.

import { getServiceBySlug } from "@/data/services";
import { getInsightBySlug } from "@/data/insights";
import { locations, getLocationBySlug } from "@/data/locations";
import { getProjectBySlug } from "@/data/projects";

export interface RelatedLink {
  href: string;
  label: string;
}

export interface RelatedGroup {
  heading?: string;
  links: RelatedLink[];
}

function fail(kind: string, slug: string): never {
  throw new Error(`[related] unknown ${kind} slug "${slug}"`);
}

const plans = (label: string): RelatedLink => ({ href: "/websites", label });
const about = (label: string): RelatedLink => ({ href: "/about", label });

function service(slug: string, label: string): RelatedLink {
  if (!getServiceBySlug(slug)) fail("service", slug);
  return { href: `/services/${slug}`, label };
}

function insight(slug: string, label: string): RelatedLink {
  if (!getInsightBySlug(slug)) fail("insight", slug);
  return { href: `/insights/${slug}`, label };
}

function city(slug: string): RelatedLink {
  const loc = getLocationBySlug(slug) ?? fail("location", slug);
  return { href: `/${loc.slug}`, label: loc.city };
}

// Case studies: live projects only. A preview project never gets a link.
function caseStudy(slug: string, label: string): RelatedLink {
  const p = getProjectBySlug(slug) ?? fail("project", slug);
  if (p.permission !== "live") throw new Error(`[related] project "${slug}" is not live`);
  return { href: `/work/${slug}`, label };
}

const allCities = () => locations.map((l) => city(l.slug));

/* ------------------------------------------------------------------ */
/* Service pages: 2-4 services (plus /websites where it fits),         */
/* 1-3 insights, the relevant city pages, and a live build if one fits */
/* ------------------------------------------------------------------ */

interface ServiceRelated {
  services: RelatedLink[];
  insights: RelatedLink[];
  cities: RelatedLink[];
  work?: RelatedLink[];
}

const serviceRelated: Record<string, ServiceRelated> = {
  "web-design": {
    services: [
      plans("Website plans and published prices"),
      service("google-presence", "Google Business Profile care"),
      service("seo-aeo-geo", "Local SEO and AI search visibility"),
    ],
    insights: [
      insight("llms-txt-and-schema-in-plain-english", "Schema and llms.txt, in plain English"),
      insight("local-seo-lessons-from-a-moving-company", "Local SEO lessons from a moving company"),
    ],
    cities: allCities(),
    work: [
      caseStudy("beach-house-moving", "The Beach House Moving build"),
      caseStudy("kais-run", "The Kai's Run build"),
    ],
  },
  "google-presence": {
    services: [
      service("web-design", "A website that matches your profile"),
      service("seo-aeo-geo", "Ranking in Google and AI answers"),
      plans("Plans that bundle the site and the profile"),
      service("social-content", "Social posting and content"),
    ],
    insights: [
      insight("local-seo-lessons-from-a-moving-company", "What running a mover's Google profile taught us"),
      insight("why-your-business-doesnt-show-up-in-chatgpt", "How the profile shapes AI answers"),
    ],
    cities: allCities(),
  },
  "seo-aeo-geo": {
    services: [
      service("google-presence", "Monthly Google profile management"),
      service("web-design", "Sites built with schema from the first commit"),
      plans("Website plans and prices"),
    ],
    insights: [
      insight("why-your-business-doesnt-show-up-in-chatgpt", "Why your business doesn't show up in ChatGPT"),
      insight("what-earned-100-copilot-citations", "Why Bing indexing mattered for Copilot citations"),
      insight("llms-txt-and-schema-in-plain-english", "What schema and llms.txt tell machines"),
    ],
    cities: allCities(),
  },
  "social-content": {
    services: [
      service("google-presence", "Keeping your Google profile current"),
      service("seo-aeo-geo", "Local SEO and AI search"),
    ],
    insights: [
      insight("what-earned-100-copilot-citations", "Why answer-first pages get quoted"),
    ],
    cities: [city("web-design-destin-fl"), city("web-design-santa-rosa-beach")],
  },
  "ai-receptionist": {
    services: [
      service("ai-automation", "Automating intake, follow-up and quoting"),
      service("ai-agents", "Chat and voice agents"),
      service("ai-strategy", "An AI roadmap before anything gets built"),
      service("google-presence", "The Google profile, where most calls start"),
    ],
    insights: [
      insight("local-seo-lessons-from-a-moving-company", "Why the profile drives the phone calls"),
    ],
    cities: [
      city("web-design-crestview-fl"),
      city("web-design-navarre-fl"),
      city("web-design-destin-fl"),
    ],
  },
  "ai-automation": {
    services: [
      service("ai-receptionist", "Missed-call text-back"),
      service("ai-agents", "AI agents for the front desk"),
      service("ai-strategy", "Process mapping and an AI roadmap"),
    ],
    insights: [
      insight("why-your-business-doesnt-show-up-in-chatgpt", "How AI assistants pick a business to recommend"),
    ],
    cities: [city("web-design-destin-fl"), city("web-design-fort-walton-beach")],
    work: [caseStudy("heat-safety-tool", "The heat-safety tool, built on Kai's Run")],
  },
  "ai-agents": {
    services: [
      service("ai-receptionist", "AI receptionist and missed-call text-back"),
      service("ai-automation", "AI workflow automation"),
      service("ai-strategy", "AI strategy and process mapping"),
    ],
    insights: [
      insight("llms-txt-and-schema-in-plain-english", "How AI systems read a business's facts"),
    ],
    cities: [city("web-design-destin-fl"), city("web-design-niceville-fl")],
  },
  "ai-strategy": {
    services: [
      service("ai-receptionist", "Answering missed calls automatically"),
      service("ai-automation", "Automating the work the roadmap flags"),
      service("ai-agents", "Chat and voice agents"),
    ],
    insights: [
      insight("why-your-business-doesnt-show-up-in-chatgpt", "What AI assistants check before naming a business"),
      insight("what-the-google-ai-visibility-audit-covers", "Inside the Google & AI Visibility Audit"),
    ],
    cities: [city("web-design-destin-fl"), city("web-design-niceville-fl")],
    work: [caseStudy("heat-safety-tool", "A live tool that answers one question well")],
  },
};

export function getServiceRelated(slug: string): RelatedGroup[] {
  const r = serviceRelated[slug];
  if (!r) return [];
  const hasPlans = r.services.some((l) => l.href === "/websites");
  const groups: RelatedGroup[] = [
    { heading: hasPlans ? "Plans and related services" : "Related services", links: r.services },
    { heading: "Read next", links: r.insights },
    { heading: "In person along the coast", links: r.cities },
  ];
  if (r.work?.length) groups.push({ heading: "See it built", links: r.work });
  return groups;
}

/* ------------------------------------------------------------------ */
/* Insights: 2-3 peer articles not already linked in the closing line  */
/* ------------------------------------------------------------------ */

const insightPeers: Record<string, RelatedLink[]> = {
  "why-your-business-doesnt-show-up-in-chatgpt": [
    insight("what-earned-100-copilot-citations", "What earned a small content site its Copilot citations"),
    insight("llms-txt-and-schema-in-plain-english", "llms.txt and schema, explained plainly"),
    insight("what-the-google-ai-visibility-audit-covers", "What the visibility audit checks"),
  ],
  "what-earned-100-copilot-citations": [
    insight("llms-txt-and-schema-in-plain-english", "The schema and llms.txt behind quotable pages"),
    insight("local-seo-lessons-from-a-moving-company", "The same structure, applied to a local mover"),
  ],
  "what-the-google-ai-visibility-audit-covers": [
    insight("why-your-business-doesnt-show-up-in-chatgpt", "Why a business goes missing from ChatGPT"),
    insight("local-seo-lessons-from-a-moving-company", "Local SEO lessons from a moving company"),
    insight("llms-txt-and-schema-in-plain-english", "Schema and llms.txt, in plain English"),
  ],
  "local-seo-lessons-from-a-moving-company": [
    insight("why-your-business-doesnt-show-up-in-chatgpt", "How AI assistants decide who to recommend"),
    insight("what-the-google-ai-visibility-audit-covers", "What we check on a Google profile in the audit"),
    insight("llms-txt-and-schema-in-plain-english", "What schema does, explained without jargon"),
  ],
  "llms-txt-and-schema-in-plain-english": [
    insight("what-earned-100-copilot-citations", "How answer-first pages earned Copilot citations"),
    insight("what-the-google-ai-visibility-audit-covers", "Where the audit checks your schema"),
    insight("local-seo-lessons-from-a-moving-company", "Schema at work for a moving company"),
  ],
};

export function getInsightPeers(slug: string): RelatedGroup[] {
  const links = insightPeers[slug];
  return links?.length ? [{ links }] : [];
}

/* ------------------------------------------------------------------ */
/* City pages: /websites plus services and reading the page doesn't    */
/* already link in its proof line                                      */
/* ------------------------------------------------------------------ */

const locationRelated: Record<string, RelatedLink[]> = {
  "web-design-destin-fl": [
    plans("Website plans and prices"),
    service("seo-aeo-geo", "Local search and AI answers"),
    insight("why-your-business-doesnt-show-up-in-chatgpt", "Why some businesses never show up in ChatGPT"),
    about("About the studio"),
  ],
  "web-design-fort-walton-beach": [
    plans("Monthly and one-time website plans"),
    service("google-presence", "Google Business Profile care"),
    insight("what-the-google-ai-visibility-audit-covers", "What the visibility audit looks at"),
    about("Who you'd be working with"),
  ],
  "web-design-santa-rosa-beach": [
    plans("Published website plans"),
    service("web-design", "How a custom site gets built"),
    service("seo-aeo-geo", "Local SEO and AI search"),
    about("About Saltwater Studio"),
  ],
  "web-design-navarre-fl": [
    plans("See the website plans and what they cost"),
    service("google-presence", "Monthly Google profile care"),
    insight("what-the-google-ai-visibility-audit-covers", "What the audit covers"),
    about("Meet the studio"),
  ],
  "web-design-niceville-fl": [
    plans("Plans and pricing for a new site"),
    service("seo-aeo-geo", "Ranking in Google and AI answers"),
    insight("local-seo-lessons-from-a-moving-company", "Local SEO lessons from a moving company"),
    about("The studio behind the work"),
  ],
  "web-design-crestview-fl": [
    plans("Website plans, priced up front"),
    service("google-presence", "Keeping your Google profile current"),
    service("ai-receptionist", "Text-back for missed calls"),
    about("Who builds your site"),
  ],
};

export function getLocationRelated(slug: string): RelatedGroup[] {
  const links = locationRelated[slug];
  return links?.length ? [{ links }] : [];
}
