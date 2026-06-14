export interface Service {
  slug: string;
  index: string;
  title: string;
  oneLiner: string;
  included: string[];
}

export const services: Service[] = [
  {
    slug: "web-design",
    index: "01",
    title: "Websites, Built Right",
    oneLiner:
      "Next.js performance, immersive where it earns its keep, fast where it counts. The version you don't rebuild in two years.",
    included: [
      "Custom Next.js build — no templates",
      "Schema.org structured data from day one",
      "GA4 + GTM tracking configured before launch",
      "Core Web Vitals optimized (LCP, CLS, INP)",
      "Mobile-first, accessible, WCAG-compliant",
      "Vercel deploy with www → apex redirect",
      "GSC + Bing Webmaster submission on launch",
    ],
  },
  {
    slug: "seo-aeo-geo",
    index: "02",
    title: "SEO / AEO / GEO",
    oneLiner:
      "Ranked in Google, quoted by AI search, named as the entity. The search presence your competitor skipped.",
    included: [
      "Technical SEO audit and remediation",
      "Entity strategy — one canonical fact set everywhere",
      "Answer-engine optimization (featured snippets, PAA)",
      "Generative-engine optimization (AI Overviews, Perplexity, ChatGPT)",
      "llms.txt and AI crawler access configured",
      "IndexNow integration for instant Bing/AI indexing",
      "Monthly rank and visibility reporting",
    ],
  },
  {
    slug: "google-presence",
    index: "03",
    title: "Google Presence",
    oneLiner:
      "Google Business Profile setup, optimization, and the local pack — the most underused free channel in service businesses.",
    included: [
      "GBP creation or full audit + remediation",
      "NAP consistency across all directories",
      "Category selection and service area configuration",
      "Photo strategy and first-post content",
      "Review response framework",
      "Local pack ranking baseline and monitoring",
    ],
  },
  {
    slug: "social-content",
    index: "04",
    title: "Social & Content",
    oneLiner:
      "The weekly engine that keeps the profile alive — content that builds the entity, not just fills the feed.",
    included: [
      "Content calendar aligned to service pages and keywords",
      "Platform-native posts (GBP, Instagram, LinkedIn)",
      "Answer-first copy — every post a potential AI citation",
      "Brand voice consistency with BRAND.md standards",
      "Monthly content performance review",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
