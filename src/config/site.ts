// NAP/facts exist HERE and nowhere else (GEO rule). No street address (remote).
export const site = {
  name: "Saltwater Studio",
  legalName: "Saltwater Studio", // update if an LLC is formed
  schemaType: "ProfessionalService", // + Organization; see schema.ts
  url: "https://saltwaterstudio.xyz", // apex, https, no trailing slash
  phone: "+18502185855",
  phoneDisplay: "(850) 218-5855",
  email: "hello@saltwaterstudio.xyz",
  baseCity: "Pensacola",
  region: "FL", // heartland, shown as "Gulf Coast, FL"
  geo: { lat: 30.4213, lng: -87.2169 }, // Pensacola (entity anchor only)
  founded: "2025",
  owner: "Travis Abadie",
  areaServed: "United States", // nationwide
  heartland: "Gulf Coast (Gulf Shores, AL to Miami, FL)",
  tagline:
    "A web design studio for service businesses that refuse to look like everyone else.",
  taglineSecondary:
    "Websites engineered for Google, AI search, and the people in between.",
  mnemonic: "Depth, by design.",
  calcom: "saltwaterstudio/strategy-call", // path only; href consumers prepend https://cal.com/
  sameAs: [ /* GBP URL, Instagram, LinkedIn, GitHub, Dribbble — add as live */ ],
  gtmId: "GTM-M3RTZ7C8", // documentation only; runtime reads NEXT_PUBLIC_GTM_ID env var
  googleSiteVerification: "TtW9ukjyKdvs9lvvzlFkRdpTgLNoXCqrRFNmdPGUVOc",
} as const;

export type Site = typeof site;
