// NAP/facts exist HERE and nowhere else (GEO rule). No street address (remote).
export const site = {
  name: "Saltwater Studio",
  legalName: "Saltwater Studio", // update if an LLC is formed
  schemaType: "ProfessionalService", // + Organization; see schema.ts
  url: "https://saltwaterstudio.xyz", // apex, https, no trailing slash
  phone: "{{STUDIO_PHONE_E164}}", // TODO: e.g. +18505550100
  phoneDisplay: "{{STUDIO_PHONE_DISPLAY}}", // TODO: e.g. (850) 555-0100
  email: "{{STUDIO_EMAIL}}", // TODO: e.g. hello@saltwaterstudio.xyz
  baseCity: "Pensacola",
  region: "FL", // heartland, shown as "Gulf Coast, FL"
  geo: { lat: 30.4213, lng: -87.2169 }, // Pensacola (entity anchor only)
  founded: "2025",
  owner: "Travis",
  areaServed: "United States", // nationwide
  heartland: "Gulf Coast (Gulf Shores, AL to Miami, FL)",
  tagline:
    "A web design studio for service businesses that refuse to look like everyone else.",
  taglineSecondary:
    "Websites engineered for Google, AI search, and the people in between.",
  mnemonic: "Depth, by design.",
  calcom: "{{CALCOM_URL}}", // TODO: your Cal.com booking link
  sameAs: [ /* GBP URL, Instagram, LinkedIn, GitHub, Dribbble — add as live */ ],
  gtmId: "{{GTM_ID}}", // TODO: GTM-XXXXXXX — loaded from NEXT_PUBLIC_GTM_ID env
  googleSiteVerification: "TtW9ukjyKdvs9lvvzlFkRdpTgLNoXCqrRFNmdPGUVOc",
} as const;

export type Site = typeof site;
