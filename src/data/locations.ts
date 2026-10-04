// City pages — the Emerald Coast towns we serve in person. Six real pages,
// each written specifically for its town; no find-and-replace doorway copy
// (we tell clients not to do that, so these pages are held to the same bar).
// Client references follow the PORTFOLIO §0 permission gate: a client is named
// on a city page only if they are LIVE on the portfolio and actually based there
// (Kai's Run — Destin · WaterVue Event Rentals — Fort Walton Beach ·
// Beach House Moving — Santa Rosa Beach).

import { tierPrice } from "@/data/tiers";

export interface LocationSection {
  heading: string;
  body: string[];
  points?: string[];
}

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface Location {
  /** URL slug at the site root, keyword-first. */
  slug: string;
  city: string;
  region: "FL";
  /** <title> body; ≤ 41 chars (19-char brand suffix added by buildMetadata). */
  seoTitle: string;
  /** 150–160 chars, unique per city. */
  metaDescription: string;
  h1: string;
  /** Answer-first standfirst. */
  intro: string;
  sections: LocationSection[];
  /** Portfolio tie-ins — only live clients genuinely based in or near the city. */
  proofLead?: string;
  proofLinks?: { href: string; label: string }[];
  faqs: LocationFaq[];
}

export const locations: Location[] = [
  {
    slug: "web-design-destin-fl",
    city: "Destin",
    region: "FL",
    seoTitle: "Web Design in Destin, FL",
    metaDescription:
      "Saltwater Studio is based in Destin, FL — custom websites, Google Business Profile care, and local SEO for Destin businesses, built by a studio that lives here.",
    h1: "Web design in Destin, Florida",
    intro:
      "Saltwater Studio is based in Destin. Not \"serving Destin\" from three states away — the studio is here, which means the person building your site has stood in the summer traffic on 98, knows the difference between the harbor and the beach-road crowds, and can meet you in person before writing a line of code.",
    sections: [
      {
        heading: "What does a Destin business need from its website?",
        body: [
          "A site that wins the searches tourists and locals actually make. Destin's market is split in two: visitors planning from out of state months ahead, and locals who need you this week. The visitor finds you through Google and, increasingly, through AI assistants summarizing \"best X in Destin\" — which means your site needs the structure those machines read: a page per service, plain answers, schema underneath. The local finds you through the map results, which means your Google Business Profile needs to be as maintained as your storefront.",
          "Seasonality is the other Destin fact. From spring break through the Fishing Rodeo in October, the town the charter fleet made famous runs at a different speed — and a site that converts has to work hardest in exactly those months, on a phone, over beach-grade signal, often from a parking lot between the harbor and a dinner reservation. We build for that: fast pages, click-to-call everywhere, and quote forms short enough to finish before the light changes on 98.",
        ],
      },
      {
        heading: "Local work, built from here",
        body: [
          "Kai's Run — our own Destin venture, built and run by the studio — is on the portfolio: an entity-building job for a brand-new service category, with four free dog-owner tools that earn the site links and AI citations. The same approach scales to any Destin business that needs machines to understand what it does.",
        ],
      },
    ],
    proofLead: "See the Destin work and what goes into every build —",
    proofLinks: [
      { href: "/work/kais-run", label: "the Kai's Run case study" },
      { href: "/services/web-design", label: "the website build" },
      { href: "/services/google-presence", label: "monthly Google profile care" },
    ],
    faqs: [
      {
        question: "Do you meet Destin clients in person?",
        answer:
          "Yes. Saltwater Studio is based in Destin, so an in-person walkthrough anywhere in town is easy to set up. Everything can also run over email if you prefer — plenty of our work ships without a single call.",
      },
      {
        question: "How long does a Destin business website take to build?",
        answer:
          "On the Page Plan or Buy It, the site is live on your own domain within 3 business days of payment. Larger custom builds get a real timeline in the quote. Either way the site launches with schema, analytics, and Google and Bing submission already done — launch day is when search engines start learning about you, so none of that waits until after.",
      },
    ],
  },
  {
    slug: "web-design-fort-walton-beach",
    city: "Fort Walton Beach",
    region: "FL",
    seoTitle: "Web Design in Fort Walton Beach, FL",
    metaDescription:
      "Custom websites and Google Business Profile care for Fort Walton Beach businesses — built by Saltwater Studio, the Destin studio behind WaterVue Event Rentals.",
    h1: "Web design in Fort Walton Beach, Florida",
    intro:
      "Fort Walton Beach runs on year-round local business, not just the summer wave — and its websites should be built that way. Saltwater Studio builds custom sites and runs Google Business Profiles for FWB businesses from just up the road in Destin.",
    sections: [
      {
        heading: "What's different about ranking in Fort Walton Beach?",
        body: [
          "FWB is a locals' market with a tourist season on top. Eglin and Hurlburt bring people in on orders all year, and they need movers, cleaners, mechanics, dentists, and gyms, picked from Google's map results and AI answers because they don't know anyone here yet. Add the split geography — downtown and the mainland neighborhoods on one side, Okaloosa Island's beach strip on the other — and the businesses that win are the ones whose pages say plainly which side of the bridge they serve. It takes a real page for each service, a Google Business Profile that's visibly alive, and structured data that lets the machines state your facts with confidence.",
          "The businesses that win FWB search aren't the biggest — they're the ones whose site and profile agree with each other and answer plainly. That's structural work, and it's exactly what we build in from the first commit.",
        ],
      },
      {
        heading: "Local work, built from here",
        body: [
          "WaterVue Event Rentals, a Fort Walton Beach company, is on our portfolio: a 51-item wedding and event rental catalog with answer-first planning guides, built to rank for the searches couples actually make when planning an Emerald Coast event.",
        ],
      },
    ],
    proofLead: "See the Fort Walton Beach work and the services behind it —",
    proofLinks: [
      { href: "/work/watervue-event-rentals", label: "the WaterVue Event Rentals case study" },
      { href: "/services/web-design", label: "the website build" },
      { href: "/services/seo-aeo-geo", label: "the SEO, AEO & GEO service" },
    ],
    faqs: [
      {
        question: "Do you work with Fort Walton Beach businesses in person?",
        answer:
          "Yes — we're based in Destin and work along the whole Okaloosa coast, so meeting in Fort Walton Beach is a short drive, not a video call across time zones. Prefer async? Everything can run over email too.",
      },
      {
        question: "Can you fix an existing Fort Walton Beach website instead of rebuilding it?",
        answer:
          "Often, yes. The Google & AI Visibility Audit looks at what you have first — indexing, schema, page structure, and your Google Business Profile — and comes back with a prioritized fix list. If the bones are good, we fix; if the site is working against you, the report says that plainly and you decide.",
      },
    ],
  },
  {
    slug: "web-design-santa-rosa-beach",
    city: "Santa Rosa Beach",
    region: "FL",
    seoTitle: "Web Design in Santa Rosa Beach, FL",
    metaDescription:
      "Websites and local SEO for Santa Rosa Beach and 30A businesses — by the studio behind Beach House Moving's page-one climb in its Walton County home market.",
    h1: "Web design in Santa Rosa Beach and 30A, Florida",
    intro:
      "Santa Rosa Beach is where our most complete local-SEO build lives: Beach House Moving, a four-person moving company based here, whose site we built county by county and whose Google Business Profile we run every month. The homepage climbed onto page one in its home market. We'd like to do the same for more Walton County businesses.",
    sections: [
      {
        heading: "Why does 30A search behave differently?",
        body: [
          "Because the money searches come from two directions at once: homeowners and property managers here year-round, and out-of-state owners and visitors planning remotely. Both groups lean hard on Google and AI assistants — the remote ones especially, because they can't drive past your shop. A Santa Rosa Beach business that owns its search presence gets both streams; one that relies on a Facebook page gets neither.",
          "The geography matters too. WaterColor, Seaside, Grayton, Blue Mountain, Dune Allen — these read as distinct places to the people searching them, and to the machines answering. Pages that genuinely know the area beat a single page that lists it.",
        ],
      },
      {
        heading: "The proof is a local company",
        body: [
          "Beach House Moving is based in Santa Rosa Beach, and its build is our reference for what local search work looks like when it's done completely: a real page for every area the crew works, LocalBusiness and service-area schema from the first commit, and monthly Google profile care — posts from real job photos, every review answered. Rankings and profile calls climbed together.",
        ],
      },
    ],
    proofLead: "Read the full build on the portfolio —",
    proofLinks: [
      { href: "/work/beach-house-moving", label: "the Beach House Moving case study" },
      { href: "/insights/local-seo-lessons-from-a-moving-company", label: "the lessons we took from it" },
      { href: "/services/google-presence", label: "monthly Google profile care" },
    ],
    faqs: [
      {
        question: "Do you serve all of 30A and Walton County?",
        answer:
          "Yes. We're based in Destin, a short drive west of Santa Rosa Beach, and already run a monthly Google Business Profile for a company based here. In-person meetings anywhere along 30A are easy to arrange.",
      },
      {
        question: "What results has Saltwater Studio gotten for a Santa Rosa Beach business?",
        answer:
          "Beach House Moving's homepage climbed from deep in the results onto page one for the moving searches in its home market, and calls from its Google profile climbed with it. The full story — what was built and why — is on the case study page.",
      },
    ],
  },
  {
    slug: "web-design-navarre-fl",
    city: "Navarre",
    region: "FL",
    seoTitle: "Web Design in Navarre, FL",
    metaDescription:
      "Custom websites and Google Business Profile care for Navarre, FL businesses — local search done right for the beach town between Gulf Breeze and Hurlburt Field.",
    h1: "Web design in Navarre, Florida",
    intro:
      "Navarre's search results haven't caught up with the town — which is an opening. Newcomers, military families on orders among them, arrive knowing nobody, and they pick their contractor, cleaner, groomer, and dentist from Google's map results and AI answers. Saltwater Studio builds the sites and runs the Google profiles that win those picks, from just down the coast in Destin.",
    sections: [
      {
        heading: "Why is Navarre a local-search opportunity right now?",
        body: [
          "Because new arrivals search before they ask anyone. Navarre runs the stretch of US-98 between Gulf Breeze and Hurlburt Field — Holley by the bay, the neighborhoods stacked north of 98, and Navarre Beach across the sound with the Navarre Beach Fishing Pier at the end of it. Every household that moves in picks its contractor, groomer, dentist, and lawn service from Google's map results and, increasingly, from AI-assistant answers.",
          "Meanwhile, many established Navarre businesses still run on a Facebook page or a template site that names the town once and stops. The searches those new residents make — and the ones Hurlburt and Whiting families make when orders drop — mostly go unanswered by anyone local with a real site. The first business in a category to put up real structure tends to take the position and hold it.",
        ],
      },
      {
        heading: "Do you actually work out here?",
        body: [
          "Yes — this corridor is already in our day-to-day. Kai's Run, our own Destin mobile dog gym, carries Navarre in its service area, and we drive 98 west past the Navarre bridge regularly enough to know the summer backup at the beach light. Navarre is a straight run west on 98 from our base in Destin; close enough to meet at a job site, not just on a screen.",
          "Most Navarre owners start with the audit — a written report on how your business currently looks to Google, Bing, and the AI assistants — then decide whether to run the fix list themselves or hand it back to us.",
        ],
      },
    ],
    proofLead: "See what the full build looks like for coastal service businesses —",
    proofLinks: [
      { href: "/work/beach-house-moving", label: "the Beach House Moving case study" },
      { href: "/services/web-design", label: "the website build" },
      { href: "/services#audit", label: "the Google & AI Visibility Audit" },
    ],
    faqs: [
      {
        question: "Do you come out to Navarre?",
        answer:
          "Yes — Navarre is inside our regular radius. We're based in Destin and meet owners in person anywhere along the coast from Gulf Shores to Panama City; everything can also run over email end to end.",
      },
      {
        question: "My Navarre business runs on a Facebook page. Is a website worth it?",
        answer:
          "If you want to be found by people who don't already know you, yes. Facebook reaches your followers; Google, Bing, and AI assistants reach everyone else — and they can't recommend a business whose only presence is inside a social platform they can barely read. A small, fast site with the right structure fixes that permanently.",
      },
    ],
  },
  {
    slug: "web-design-niceville-fl",
    city: "Niceville",
    region: "FL",
    seoTitle: "Web Design in Niceville, FL",
    metaDescription:
      "Websites, local SEO, and Google Business Profile care for Niceville, Valparaiso, and Bluewater Bay businesses — from Saltwater Studio, based in nearby Destin.",
    h1: "Web design in Niceville, Florida",
    intro:
      "Niceville is a bayside town with a year-round economy — Eglin families, Bluewater Bay, Valparaiso, and a local business scene that mostly runs on reputation. Reputation deserves a search presence that matches it: when someone new to town looks for what you do, your name should come up before the chains and the directories.",
    sections: [
      {
        heading: "What should a Niceville business expect from local search?",
        body: [
          "Steadier demand than the beach towns, from a more local crowd. Niceville sits on Boggy Bayou off Choctawhatchee Bay — the Twin Cities with Valparaiso, Eglin's main gate down the road, Northwest Florida State College on the hill, and Bluewater Bay's marina and golf neighborhoods east on 20. Its searches skew residential: home services, health, auto, food, kids' activities. They're decided in the Google map results and, increasingly, in AI-assistant answers, and both are won the same way — a complete, active Google Business Profile, a site with a page for each service, and structured data underneath so the machines can repeat your facts confidently.",
          "The bar in Niceville is winnable. A business that does all three properly stands apart from competitors running on reputation alone — and the first one in its category to do it tends to get recommended by default.",
        ],
      },
      {
        heading: "Do you know this side of the bay?",
        body: [
          "We work it already. Beach House Moving — the moving company whose site and Google profile we run — covers Okaloosa County with a dedicated Bluewater Bay service-area page we wrote, and Kai's Run, our own Destin mobile dog gym, carries Niceville in its service area. Destin to Niceville is a short hop over the Mid-Bay Bridge; in-person meetings anywhere from Valparaiso to Bluewater Bay are routine.",
          "Bluewater Bay and Valparaiso also count on their own: people there search their own place names, and machines treat them as distinct localities. We build pages for the places you actually serve, written from what you know about working there — because that's what ranks, and that's what an AI assistant can quote.",
        ],
      },
    ],
    proofLead: "See how we build this for coastal businesses —",
    proofLinks: [
      { href: "/services/web-design", label: "the website build" },
      { href: "/services/google-presence", label: "monthly Google profile care" },
      { href: "/work", label: "the portfolio" },
    ],
    faqs: [
      {
        question: "Do you work with businesses in Niceville directly?",
        answer:
          "Yes. We're based in Destin, across the bay — close enough to meet in person anywhere in Niceville, Valparaiso, or Bluewater Bay. If you'd rather keep it async, the whole project runs fine over email.",
      },
      {
        question: "What does it cost to get started?",
        answer:
          `The prices are published. A website is ${tierPrice("page-plan").display} on the Page Plan or ${tierPrice("buy-it").display} to buy it outright (plus hosting & care), and Local Growth adds monthly Google Business Profile care for ${tierPrice("local-growth").display}. The cheapest start is the ${tierPrice("audit").display} Google & AI Visibility Audit, a written report on how your business currently looks to Google, Bing, and the AI assistants. Larger custom builds get a quote within one business day.`,
      },
    ],
  },
  {
    slug: "web-design-crestview-fl",
    city: "Crestview",
    region: "FL",
    seoTitle: "Web Design in Crestview, FL",
    metaDescription:
      "Custom websites and Google Business Profile management for Crestview, FL — the Okaloosa County seat deserves better than template sites. Built in Destin.",
    h1: "Web design in Crestview, Florida",
    intro:
      "Crestview is the Okaloosa County seat and a trades-and-services town — HVAC, auto, fencing, lawn care, childcare, churches — where plenty of businesses run on word of mouth and a Facebook page. The ones that add a real search presence stand out, because a referral alone doesn't show up in a search.",
    sections: [
      {
        heading: "Why does local search matter in a word-of-mouth town?",
        body: [
          "Because word of mouth moved. Crestview is the Hub City — the county seat, sitting on the I-10 and SR-85 crossroads, home to families who commute down 85 to Eglin, Duke Field, and Hurlburt and do their buying back home. The recommendation that used to happen over a fence now happens in a Google search, a maps result, or a question typed into ChatGPT — especially for military families relocating here on orders who have no fence neighbors to ask yet. When they search a service and your competitor has a real site and an active Google profile and you don't, the referral goes to them before you knew it existed.",
          "The fix is structural, not promotional: a fast site with a page per service, a Google Business Profile treated as a monthly operation, schema the machines can read, and indexing in both Google and Bing. No ad spend required — this is the part of search you own. We already write for this market: Beach House Moving, the moving company whose site and Google profile we run, covers Okaloosa County with a Crestview service-area page we built, and its month-to-month search reporting is how we know what north-county customers actually type.",
        ],
      },
      {
        heading: "What does a Crestview build include?",
        body: [
          "The same stack every Saltwater site gets — nothing stripped down for a smaller market.",
        ],
        points: [
          "Custom build — no templates, no page builders to outgrow",
          "A page for each service you want to be found for",
          "Schema.org structured data from day one",
          "Google and Bing submission on launch day",
          "Click-to-call and a short quote form on every page",
          "Optional monthly Google Business Profile care after launch",
        ],
      },
    ],
    proofLead: "See what the finished work looks like —",
    proofLinks: [
      { href: "/work", label: "the portfolio" },
      { href: "/services/web-design", label: "the website build" },
      { href: "/services#audit", label: "the Google & AI Visibility Audit" },
    ],
    faqs: [
      {
        question: "Do you drive up to Crestview?",
        answer:
          "Yes — Crestview is a straight shot up 85 from our base in Destin, and we meet owners there in person. Everything can also run over email if that's easier around your schedule.",
      },
      {
        question: "My Crestview business gets all its work from referrals. What would a website add?",
        answer:
          "The referrals you never hear about. New residents, people whose usual company is booked out, and anyone comparing two names they were given — they all check Google before calling, and many now ask AI assistants instead. A site with the right structure turns those invisible comparisons into calls; without one, they default to whoever shows up.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
