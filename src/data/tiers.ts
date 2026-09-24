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
  /** T4 → the three AI service pages that live under the catch-all. */
  links?: { href: string; label: string }[];
}

export const tiers: Tier[] = [
  {
    id: "audit",
    index: "T1",
    name: "AI Visibility Audit",
    price: {
      amount: site.auditOffer.price,
      currency: "USD",
      display: `$${site.auditOffer.price}`,
      note: `flat, one-time — limited-time rate through ${site.auditOffer.endsLabel} (regularly $${site.auditOffer.regularPrice})`,
    },
    turnaround: "Delivered within 72 hours, fully async",
    oneLiner:
      "A written audit of how your business shows up when AI assistants and Google's AI results answer for your market — brand presence, answer-first structure, schema and entity consistency, Google Business Profile, and technical SEO.",
    includes: [
      "AI-assistant brand-presence check across ChatGPT, Claude, Perplexity, and Google's AI results",
      "Answer-first structure review of the pages that win or lose you customers",
      "Schema and entity-consistency check — is every source telling the same story",
      "Google Business Profile review",
      "Technical SEO baseline",
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
    name: "AI Search Optimization Sprint",
    oneLiner:
      "The audit, implemented. Schema, answer-first restructuring, entity fixes, and Google Business Profile — the items in your report, done in one scoped sprint.",
    includes: [
      "Schema.org structured data written and deployed",
      "Answer-first restructuring of your money pages",
      "Entity fixes — one canonical fact set, everywhere",
      "Google Business Profile brought current and configured",
    ],
    followUp:
      "Scoped from your audit report and quoted within a day. Yours or ours — an existing audit works.",
    cta: { label: "Get a sprint quote", href: "/contact?interest=sprint" },
  },
  {
    id: "retainer",
    index: "T3",
    name: "AI-Managed Presence",
    oneLiner:
      "Ongoing management of your search and AI presence — the monthly work that keeps rankings, profiles, and AI answers current after the fixes land. Currently running for an active monthly client.",
    includes: [
      "Monthly upkeep of rankings, schema, and content signals",
      "Google Business Profile management",
      "AI-answer monitoring — what assistants say about you, checked and corrected",
      "A monthly written report of what moved and why",
    ],
    cta: { label: "Ask about the retainer", href: "/contact?interest=retainer" },
  },
  {
    id: "custom",
    index: "T4",
    name: "Custom AI Systems",
    oneLiner:
      "Automations, agents, and integrations, scoped to the business — tell us what you need.",
    includes: [
      "AI strategy and process mapping",
      "Automation of scoped processes, end to end",
      "Agents for calls, chat, and after-hours coverage",
      "Integrations with the tools you already run",
    ],
    cta: { label: "Start the conversation", href: "/contact?interest=custom" },
    links: [
      { href: "/services/ai-strategy", label: "AI Strategy & Logistics" },
      { href: "/services/ai-automation", label: "AI Automation" },
      { href: "/services/ai-agents", label: "AI Agents" },
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
