// NAP/facts exist HERE and nowhere else (GEO rule). No street address (remote).
export const site = {
  name: "Saltwater Studio",
  legalName: "Saltwater Studio", // update if an LLC is formed
  schemaType: "ProfessionalService", // + Organization; see schema.ts
  url: "https://saltwaterstudio.xyz", // apex, https, no trailing slash
  phone: "+18502185855",
  phoneDisplay: "(850) 218-5855",
  email: "hello@saltwaterstudio.xyz",
  baseCity: "Destin",
  region: "FL", // heartland, shown as "Gulf Coast, FL"
  geo: { lat: 30.3935, lng: -86.4958 }, // Destin (entity anchor only)
  founded: "2025",
  owner: "Travis Abadie",
  areaServed: "United States", // nationwide
  heartland: "Gulf Coast (Gulf Shores, AL to Panama City, FL)",
  tagline: "Websites and Google profiles for local business — built, not bolted on.",
  taglineSecondary:
    "Systems engineered for Google, AI search, and the people in between.",
  mnemonic: "Depth, by design.",
  // Canonical entity sentence. Byte-identical here, in About, Organization schema,
  // llms.txt, and every social bio. Never write "all businesses" — vague entity
  // classes are harder for answer engines to match than concrete ones.
  entitySentence:
    "Saltwater Studio is a remote web design and AI studio founded in 2025 by Travis Abadie in Destin, Florida, building websites, Google Business Profile management, and AI automation for local businesses nationwide.",
  // Topics the entity claims. Feeds Organization.knowsAbout — a disambiguation
  // lever against the unrelated "Saltwater" studios that share the name.
  knowsAbout: [
    "web design",
    "web development",
    "Google Business Profile management",
    "local SEO",
    "answer engine optimization",
    "generative engine optimization",
    "AI receptionist",
    "AI automation",
    "AI agents",
  ],
  // Cal.com booking is OFF. The qualifying form at /contact replaced it 2026-08-09
  // so leads arrive scoped instead of as a raw calendar slot. /book redirects to
  // /contact and src/app/book/CalEmbed.tsx is left in place, unreferenced, for the
  // day this comes back.
  // calcom: "saltwaterstudio/strategy-call",
  // A URL enters this array only after it returns 200. No speculative entries —
  // one dead node weakens the whole sameAs cluster.
  // Facebook page verified live 2026-10-02 (2 client recommendations on it).
  sameAs: [
    "https://www.facebook.com/profile.php?id=61590875267901",
  ] as string[],
  gtmId: "GTM-M3RTZ7C8", // documentation only; runtime reads NEXT_PUBLIC_GTM_ID env var
  // The ONE price on the site (pricing carve-out, 2026-08-09): the T1 AI
  // Visibility Audit, sold via a Stripe Payment Link. Everything else stays
  // quote-only. Limited-time $50 offer added 2026-09-24 (regular $150).
  // stripeAuditUrl MUST charge auditOffer.price — swap both together.
  // ponytail: promo end is a static string; after it passes, set price back to
  // regularPrice, restore the $150 link, and redeploy (static build won't flip itself).
  // $50 link (price_1ULcMf…, created 2026-10-01). Regular $150 link, to restore
  // after the promo: https://buy.stripe.com/eVqcN49uP3uX3gW0VMeUU00
  stripeAuditUrl: "https://buy.stripe.com/9B614m5ezghJ8Bg5c2eUU01",
  // Stripe payment links per published plan (prices live in src/data/tiers.ts).
  // paste Stripe payment link here when each link is created in the Stripe
  // dashboard. An empty string makes that plan's CTA fall back to the quote
  // form, preselected: /contact?plan=<slug>.
  planPaymentUrls: {
    "page-plan": "",
    "buy-it": "",
    "local-growth": "",
    "profile-fix": "",
  },
  auditOffer: {
    price: 50,
    regularPrice: 150,
    endsISO: "2026-10-31",
    endsLabel: "Oct 31",
  },
  googleSiteVerification: "TtW9ukjyKdvs9lvvzlFkRdpTgLNoXCqrRFNmdPGUVOc",
} as const;

export type Site = typeof site;
