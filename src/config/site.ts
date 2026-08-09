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
  tagline: "AI systems for local business — built, not bolted on.",
  taglineSecondary:
    "Systems engineered for Google, AI search, and the people in between.",
  mnemonic: "Depth, by design.",
  // Canonical entity sentence. Byte-identical here, in About, Organization schema,
  // llms.txt, and every social bio. Never write "all businesses" — vague entity
  // classes are harder for answer engines to match than concrete ones.
  entitySentence:
    "Saltwater Studio is a remote AI agency founded in 2025 by Travis Abadie in Destin, Florida, building AI automation and AI-search presence for local businesses nationwide.",
  // Topics the entity claims. Feeds Organization.knowsAbout — a disambiguation
  // lever against the unrelated "Saltwater" studios that share the name.
  knowsAbout: [
    "AI automation",
    "AI workflow automation",
    "AI agents",
    "AI strategy",
    "business process automation",
    "answer engine optimization",
    "generative engine optimization",
    "local SEO",
    "web development",
  ],
  // Cal.com booking is OFF. The qualifying form at /contact replaced it 2026-08-09
  // so leads arrive scoped instead of as a raw calendar slot. /book redirects to
  // /contact and src/app/book/CalEmbed.tsx is left in place, unreferenced, for the
  // day this comes back.
  // calcom: "saltwaterstudio/strategy-call",
  // A URL enters this array only after it returns 200. No speculative entries —
  // one dead node weakens the whole sameAs cluster.
  sameAs: [] as string[],
  gtmId: "GTM-M3RTZ7C8", // documentation only; runtime reads NEXT_PUBLIC_GTM_ID env var
  // The ONE price on the site (pricing carve-out, 2026-08-09): the T1 AI
  // Visibility Audit sells at $150 flat via this live Stripe Payment Link.
  // Everything else stays quote-only.
  stripeAuditUrl: "https://buy.stripe.com/eVqcN49uP3uX3gW0VMeUU00",
  googleSiteVerification: "TtW9ukjyKdvs9lvvzlFkRdpTgLNoXCqrRFNmdPGUVOc",
} as const;

export type Site = typeof site;
