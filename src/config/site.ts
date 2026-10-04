// NAP/facts exist HERE and nowhere else (GEO rule). No street address (service-area business:
// meets clients in person along the Gulf Coast, works remotely nationwide).

// $50 audit promo window: through the end of 2026-10-31, US Central (CDT).
// Evaluated once per build (see the static-render caveat on stripeAuditUrl).
const AUDIT_PROMO_ACTIVE = Date.now() < Date.parse("2026-10-31T23:59:59-05:00");

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
  // Destin city centre point (Wikidata Q2156427 P625), 5 decimals. Entity
  // anchor only: never a residence, never a storefront.
  geo: { lat: 30.39333, lng: -86.47528 },
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
    "Saltwater Studio is a web design and AI studio founded in 2025 by Travis Abadie in Destin, Florida, building websites, Google Business Profile management, and AI automation for local businesses, in person along the Gulf Coast and remotely nationwide.",
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
  // Google Business Profile. Both URLs verified 2026-10-03: each returns 200
  // after redirects and lands on CID 0x3e3ac8c26ef2edd7 (Maps kgmid
  // /g/11zy25n8jm). Schema-only: Organization.hasMap + sameAs. Kept out of
  // `sameAs` above so the footer link row does not change.
  gbp: {
    mapsUrl: "https://maps.google.com/?cid=4484117116411375063",
    shortUrl: "https://g.page/r/Cdft8m7CyDo-EBM",
  },
  // Schema-only disambiguation (several unrelated studios share the name).
  alternateName: "Saltwater Studio Destin",
  disambiguatingDescription:
    "The web design and Google Business Profile studio in Destin, Florida, founded in 2025 by Travis Abadie. Not an interior design, photography, or kitchen studio of the same name.",
  // Square brand mark for Organization.logo (public/icon-512.png, 512x512).
  logo: { path: "/icon-512.png", width: 512, height: 512 },
  // Hours match the Google Business Profile (Travis, 2026-10-03): 7 days, 8 AM-6 PM.
  hours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
    display: "7 days, 8 AM–6 PM",
  },
  // Schema areaServed: the five Florida counties (DECISIONS 2026-10-03; no
  // Alabama in schema). Wikipedia URLs and Wikidata QIDs verified 2026-10-03
  // (each returns 200 and is the county in Florida).
  serviceCounties: [
    { name: "Okaloosa County", wikipedia: "https://en.wikipedia.org/wiki/Okaloosa_County,_Florida", wikidata: "Q494476" },
    { name: "Walton County", wikipedia: "https://en.wikipedia.org/wiki/Walton_County,_Florida", wikidata: "Q503455" },
    { name: "Santa Rosa County", wikipedia: "https://en.wikipedia.org/wiki/Santa_Rosa_County,_Florida", wikidata: "Q494500" },
    { name: "Bay County", wikipedia: "https://en.wikipedia.org/wiki/Bay_County,_Florida", wikidata: "Q488865" },
    { name: "Escambia County", wikipedia: "https://en.wikipedia.org/wiki/Escambia_County,_Florida", wikidata: "Q156643" },
  ],
  serviceState: { name: "Florida", wikipedia: "https://en.wikipedia.org/wiki/Florida", wikidata: "Q812" },
  // City pages: county per Wikidata P131 and Wikipedia URL, verified 2026-10-03.
  serviceCities: {
    Destin: { county: "Okaloosa County", wikipedia: "https://en.wikipedia.org/wiki/Destin,_Florida", wikidata: "Q2156427" },
    "Fort Walton Beach": { county: "Okaloosa County", wikipedia: "https://en.wikipedia.org/wiki/Fort_Walton_Beach,_Florida", wikidata: "Q984368" },
    Niceville: { county: "Okaloosa County", wikipedia: "https://en.wikipedia.org/wiki/Niceville,_Florida", wikidata: "Q2100064" },
    Crestview: { county: "Okaloosa County", wikipedia: "https://en.wikipedia.org/wiki/Crestview,_Florida", wikidata: "Q2153124" },
    "Santa Rosa Beach": { county: "Walton County", wikipedia: "https://en.wikipedia.org/wiki/Santa_Rosa_Beach,_Florida", wikidata: "Q7419873" },
    Navarre: { county: "Santa Rosa County", wikipedia: "https://en.wikipedia.org/wiki/Navarre,_Florida", wikidata: "Q3470764" },
  } as Record<string, { county: string; wikipedia: string; wikidata: string }>,
  gtmId: "GTM-M3RTZ7C8", // documentation only; runtime reads NEXT_PUBLIC_GTM_ID env var
  // The T1 Visibility Audit is sold via a Stripe Payment Link (carve-out,
  // 2026-08-09; plan prices went public 2026-10-03 — see planPaymentUrls).
  // Limited-time $50 offer added 2026-09-24 (regular $150). The promo is
  // date-driven: price AND Stripe link flip to the regular ones when the
  // build runs after endsISO, so the pair can never disagree.
  // STATIC-RENDER CAVEAT: every page is prerendered, so the flip happens at
  // BUILD time, not in the browser — the last deploy before Nov 1 keeps
  // showing $50 until the site is redeployed on or after Nov 1.
  stripeAuditUrl: AUDIT_PROMO_ACTIVE
    ? // $50 link (price_1ULcMf…, created 2026-10-01)
      "https://buy.stripe.com/9B614m5ezghJ8Bg5c2eUU01"
    : // regular $150 link
      "https://buy.stripe.com/eVqcN49uP3uX3gW0VMeUU00",
  // Stripe payment links per published plan (prices live in src/data/tiers.ts).
  // paste Stripe payment link here when each link is created in the Stripe
  // dashboard. An empty string makes that plan's CTA fall back to the quote
  // form, preselected: /contact?plan=<slug>.
  planPaymentUrls: {
    // Stripe payment links, live 2026-10-03. Buy It charges the $497 only;
    // its $29/mo hosting & care is invoiced by hand until a product exists.
    "page-plan": "https://buy.stripe.com/7sYaEW9uP4z1g3I9sieUU02",
    "buy-it": "https://buy.stripe.com/fZu3cudL5d5x3gWfQGeUU03",
    "local-growth": "https://buy.stripe.com/eVqcN4dL51mP7xc5c2eUU04",
    "profile-fix": "https://buy.stripe.com/fZudR8bCX8Ph7xcdIyeUU05",
  },
  auditOffer: {
    price: AUDIT_PROMO_ACTIVE ? 50 : 150,
    regularPrice: 150,
    endsISO: "2026-10-31",
    endsLabel: "Oct 31",
    /** False once the build runs after the end date — promo copy keys off this. */
    promoActive: AUDIT_PROMO_ACTIVE,
  },
  googleSiteVerification: "TtW9ukjyKdvs9lvvzlFkRdpTgLNoXCqrRFNmdPGUVOc",
} as const;

export type Site = typeof site;
