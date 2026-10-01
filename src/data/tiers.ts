import { site } from "@/config/site";

export interface Tier {
  /** Doubles as the /services#<id> anchor and the ?interest= prefill key. */
  id: "audit" | "sprint" | "retainer" | "custom";
  index: string;
  name: string;
  /** T1 only — the single published price on the site (carve-out, 2026-08-09). */
  price?: { amount: number; currency: "USD"; display: string; note: string };
  turnaround?: string;
  /** Answer-first, ≤40 words. Feeds the Service schema description. */
  oneLiner: string;
  includes: string[];
  /** T1: describes the written report a buyer receives. */
  deliverable?: string;
  followUp?: string;
  cta: { label: string; href: string; external?: boolean };
  /** Service pages linked under the tier. */
  links?: { href: string; label: string }[];
}

export const tiers: Tier[] = [
  {
    id: "audit",
    index: "T1",
    name: "Google & AI Visibility Audit",
    price: {
      amount: site.auditOffer.price,
      currency: "USD",
      display: `$${site.auditOffer.price}`,
      note: `flat, one-time — limited-time rate through ${site.auditOffer.endsLabel} (regularly $${site.auditOffer.regularPrice})`,
    },
    turnaround: "Delivered within 72 hours, fully async",
    oneLiner:
      "A written audit of how your business shows up when local customers search — your Google Business Profile, your website, your local rankings, and the AI answers that now sit on top of all three.",
    includes: [
      "Google Business Profile review — categories, services, photos, reviews, hours",
      "Website review — speed, mobile, and the pages that win or lose you customers",
      "Technical SEO baseline",
      "Schema and entity-consistency check — is every source telling the same story",
      "AI-assistant check across ChatGPT, Claude, Perplexity, and Google's AI results",
    ],
    deliverable:
      "You get a written report: a scored breakdown by category, the issues ranked by impact, and a sequenced fix list — the same format we run on client engagements.",
    followUp:
      "The report stands alone. Fix it yourself, hand it to your developer, or have us run the Sprint.",
    cta: {
      label: `Get the audit — $${site.auditOffer.price}`,
      href: site.stripeAuditUrl,
      external: true,
    },
  },
  {
    id: "sprint",
    index: "T2",
    name: "Website & Search Sprint",
    oneLiner:
      "The audit, implemented. Website fixes, Google Business Profile cleanup, schema, and answer-first pages done in one scoped sprint — or a new custom site when the old one isn't worth fixing.",
    includes: [
      "Google Business Profile brought current and configured",
      "Website fixes — speed, mobile, service pages, click-to-call",
      "A custom website build when a rebuild beats a repair",
      "Schema.org structured data written and deployed",
      "Entity fixes — one canonical fact set, everywhere",
    ],
    followUp:
      "Scoped from your audit report and quoted within a day. Yours or ours — an existing audit works.",
    cta: { label: "Get a sprint quote", href: "/contact?interest=sprint" },
    links: [
      { href: "/services/web-design", label: "Websites" },
      { href: "/services/seo-aeo-geo", label: "SEO / AEO / GEO" },
    ],
  },
  {
    id: "retainer",
    index: "T3",
    name: "Google Care & Monthly Management",
    oneLiner:
      "Your Google Business Profile run every month, plus the upkeep that keeps your website and rankings current after the fixes land. Currently running for an active monthly client.",
    includes: [
      "Google Business Profile management (Google Care) — posts, photos, every review answered",
      "Monthly upkeep of the website, rankings, schema, and content signals",
      "AI-answer monitoring — what assistants say about you, checked and corrected",
      "A monthly written report of what moved and why",
    ],
    cta: { label: "Ask about monthly management", href: "/contact?interest=retainer" },
    links: [{ href: "/services/google-presence", label: "Google Care" }],
  },
  {
    id: "custom",
    index: "T4",
    name: "Custom AI Systems",
    oneLiner:
      "When the site and profile are bringing in the calls: an AI receptionist that texts back every missed one, plus automations and agents for the repetitive parts of the day.",
    includes: [
      "AI receptionist — missed-call text-back and after-hours answering",
      "Automation of scoped processes, end to end",
      "Agents for chat, inbox, and booking",
      "AI strategy and process mapping",
    ],
    cta: { label: "Start the conversation", href: "/contact?interest=custom" },
    links: [
      { href: "/services/ai-receptionist", label: "AI Receptionist" },
      { href: "/services/ai-automation", label: "AI Automation" },
      { href: "/services/ai-agents", label: "AI Agents" },
      { href: "/services/ai-strategy", label: "AI Strategy & Logistics" },
    ],
  },
];

/** Engagement types actually delivered — generic-client framing, zero names, zero metrics. */
export const engagementProof: { label: string; detail: string }[] = [
  {
    label: "Site builds",
    detail: "Custom Next.js builds for local service businesses",
  },
  {
    label: "SEO / AEO / GEO audits",
    detail: "The same report format the audit ships in",
  },
  {
    label: "Google Business Profile",
    detail: "Setup, remediation, and ongoing management",
  },
  {
    label: "Monthly management",
    detail: "An ongoing management retainer, currently active",
  },
];

export function getTierById(id: Tier["id"]): Tier | undefined {
  return tiers.find((t) => t.id === id);
}
