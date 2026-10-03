import { site } from "@/config/site";

/** Plans with a Stripe payment-link slot in site.planPaymentUrls. */
export type PlanSlug = "page-plan" | "buy-it" | "local-growth" | "profile-fix";

export interface Tier {
  /** Doubles as the /services#<id> anchor and the /contact?plan=<id> prefill key. */
  id: "audit" | PlanSlug | "custom";
  index: string;
  name: string;
  /** Published price. Prices went public 2026-10-03 (revenue audit); the T1 audit carve-out dates to 2026-08-09. Custom AI stays quote-based. */
  price?: { amount: number; currency: "USD"; display: string; note: string };
  /** Feeds Offer.priceValidUntil in the Service schema — audit promo only. */
  priceValidUntil?: string;
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

/**
 * CTA target for a published plan: the Stripe payment link when Travis has
 * pasted one into site.planPaymentUrls, otherwise the quote form preselected.
 */
export function planCta(slug: PlanSlug): { href: string; external: boolean } {
  const url = site.planPaymentUrls[slug];
  return url
    ? { href: url, external: true }
    : { href: `/contact?plan=${slug}`, external: false };
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
      note: site.auditOffer.promoActive
        ? `flat, one-time — limited-time rate through ${site.auditOffer.endsLabel} (regularly $${site.auditOffer.regularPrice})`
        : "flat, one-time",
    },
    ...(site.auditOffer.promoActive
      ? { priceValidUntil: site.auditOffer.endsISO }
      : {}),
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
      "You get a written report: specific findings — the actual missing categories, the actual pages that aren't indexed, the actual schema errors — ranked by impact, with the fix list in priority order. Not a score out of 100 with a sales pitch under it.",
    followUp: `The report stands alone. Fix it yourself, hand it to your developer, or put the $${site.auditOffer.price} toward the Google Profile Fix — it's credited in full.`,
    cta: {
      label: `Get the audit — $${site.auditOffer.price}`,
      href: site.stripeAuditUrl,
      external: true,
    },
    links: [
      {
        href: "/insights/sample-visibility-audit-report",
        label: "See a sample report",
      },
    ],
  },
  {
    id: "page-plan",
    index: "T2",
    name: "Page Plan",
    price: {
      amount: 149,
      currency: "USD",
      display: "$149/mo",
      note: "no setup fee — 3-month minimum, then month to month",
    },
    turnaround: "Live on your own domain within 3 business days of first payment",
    oneLiner:
      "A finished custom page on your own domain, with your phone, hours, reviews link, and photos — hosting, SSL, uptime, and unlimited small changes handled for one monthly price.",
    includes: [
      "Your page on your own domain — your phone, hours, reviews link, and photos",
      "Hosting, SSL certificate, and uptime included",
      "Small changes unlimited — wording, photos, hours, prices — done within 2 business days",
      "Cancel any time after month 3, by text or email",
    ],
    followUp:
      "Your domain, your photos, and your words are yours at all times. The page files become yours after 12 paid months, or any time by paying the Buy It difference.",
    cta: { label: "Start the Page Plan — $149/mo", ...planCta("page-plan") },
    links: [{ href: "/websites", label: "The plans, in plain language" }],
  },
  {
    id: "buy-it",
    index: "T3",
    name: "Buy It",
    price: {
      amount: 497,
      currency: "USD",
      display: "$497",
      note: "once, plus $29/mo hosting & care — no setup fee, no minimum",
    },
    turnaround: "Live on your own domain within 3 business days of payment",
    oneLiner:
      "The same page — and you own the files from day one. Hosting, SSL, and the same small-change care run $29 a month, cancelled any time with the files handed over.",
    includes: [
      "You own the page files from day one",
      "Hosting, SSL, and uptime on the $29/mo hosting & care plan",
      "Small changes unlimited while hosted — done within 2 business days",
      "Cancel hosting any time — the files are handed over",
    ],
    cta: { label: "Buy it outright — $497", ...planCta("buy-it") },
    links: [{ href: "/websites", label: "The plans, in plain language" }],
  },
  {
    id: "local-growth",
    index: "T4",
    name: "Local Growth",
    price: {
      amount: 297,
      currency: "USD",
      display: "$297/mo",
      note: "no setup fee — 3-month minimum, then month to month",
    },
    oneLiner:
      "The Page Plan plus the Google work: your Google Business Profile run every month, up to four service or area pages, and a plain-English monthly report of what moved and why.",
    includes: [
      "Everything in the Page Plan — site, hosting, unlimited small changes",
      "Google Business Profile upkeep — posts, photos, every review answered, hours and services kept current",
      "Up to 4 service or area pages",
      "A plain-English monthly report",
    ],
    cta: { label: "Start Local Growth — $297/mo", ...planCta("local-growth") },
    links: [{ href: "/services/google-presence", label: "Google Care" }],
  },
  {
    id: "profile-fix",
    index: "T5",
    name: "Google Profile Fix",
    price: {
      amount: 199,
      currency: "USD",
      display: "$199",
      note: "flat, one-time — done in 5 business days, no call",
    },
    turnaround: "Done in 5 business days, fully async — no call",
    oneLiner:
      "Your Google Business Profile corrected and working: categories, services, hours, description, and service area fixed, your photos uploaded, and your first month of posts scheduled.",
    includes: [
      "You add the studio as a manager on your profile — you stay the owner",
      "Categories, services, hours, description, and service area corrected",
      "Your photos uploaded",
      "Review-reply templates written in your voice",
      "First four posts scheduled",
      "A one-page before/after of what changed",
    ],
    followUp: `Bought the audit? The $${site.auditOffer.price} is credited against the fix in full.`,
    cta: { label: "Fix my profile — $199", ...planCta("profile-fix") },
    links: [{ href: "/services/google-presence", label: "Google Care" }],
  },
  {
    id: "custom",
    index: "T6",
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
