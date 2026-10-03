// City pages — the Emerald Coast towns we serve in person. Six real pages,
// each written specifically for its town; no find-and-replace doorway copy
// (we tell clients not to do that, so these pages are held to the same bar).
// Client references follow the PORTFOLIO §0 permission gate: a client is named
// on a city page only if they are LIVE on the portfolio and actually based there
// (Kai's Run — Destin · WaterVue Event Rentals — Fort Walton Beach ·
// Beach House Moving — Santa Rosa Beach).

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
          "Seasonality is the other Destin fact. A site that converts has to work hardest from March to September, on a phone, over beach-grade signal. We build for that: fast pages, click-to-call everywhere, and quote forms short enough to finish in a parking lot.",
        ],
      },
      {
        heading: "Local work, built from here",
        body: [
          "Kai's Run — a Destin business — is on our portfolio: an entity-building job for a brand-new service category, with four free dog-owner tools that earn the site links and AI citations. The same approach scales to any Destin business that needs machines to understand what it does.",
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
          "Most builds ship in two to four weeks depending on scope. The quote comes with a real timeline up front, and the site launches with schema, analytics, and Google and Bing submission already done — launch day is when search engines start learning about you, so none of that waits until after.",
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
      "Fort Walton Beach runs on year-round local business, not just the summer wave — and its websites should be built that way. Saltwater Studio builds custom sites and runs Google Business Profiles for FWB businesses from fifteen minutes up the road in Destin.",
    sections: [
      {
        heading: "What's different about ranking in Fort Walton Beach?",
        body: [
          "FWB is a locals' market with a tourist season on top. Eglin and Hurlburt bring steady relocation searches all year — people arriving who need movers, cleaners, mechanics, dentists, and gyms, and who pick from Google's map results and AI answers because they don't know anyone here yet. Winning those searches takes a real page for each service, a Google Business Profile that's visibly alive, and structured data that lets the machines state your facts with confidence.",
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
          "Yes. We're based in Destin, twenty minutes from Santa Rosa Beach, and already run a monthly Google Business Profile for a company based here. In-person meetings anywhere along 30A are easy to arrange.",
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
      "Custom websites and Google Business Profile care for Navarre, FL businesses — local search done right for one of Florida's fastest-growing beach communities.",
    h1: "Web design in Navarre, Florida",
    intro:
      "Navarre is growing faster than its search results have caught up — which is an opening. Thousands of new households a year arrive knowing nobody, and they pick their contractor, cleaner, groomer, and dentist from Google's map results and AI answers. Saltwater Studio builds the sites and runs the Google profiles that win those picks, from just down the coast in Destin.",
    sections: [
      {
        heading: "Why is Navarre a local-search opportunity right now?",
        body: [
          "Because the competition is thin. Many established Navarre businesses still run on a Facebook page or a template site that names the town once and stops. Meanwhile the searches keep multiplying — new residents, military families relocating to the area, and visitors discovering Navarre Beach. The first business in a category to put up a real site with real structure tends to take the position and hold it.",
          "Taking that position means the full checklist: a page per service written for Navarre specifically, a Google Business Profile that's current and active, schema that lets Google and the AI assistants state your facts without guessing, and indexing in both Google and Bing — the second one being what ChatGPT and Copilot answers run on.",
        ],
      },
      {
        heading: "What does working with us look like from Navarre?",
        body: [
          "The same as working with us from anywhere on the Emerald Coast: we meet in person if you want, or run the whole project over email if you'd rather. Most owners start with the audit — a written report on how your business currently looks to Google, Bing, and the AI assistants — and decide what to do with the fix list from there.",
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
          "Yes — Navarre is inside our regular radius. We're based in Destin and meet owners along the coast from Navarre to 30A in person; everything can also run over email end to end.",
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
          "Steadier demand than the beach towns, from a more local crowd. Niceville searches skew residential — home services, health, auto, food, kids' activities — and they're decided in the Google map results and, increasingly, in AI-assistant answers. Both are won the same way: a Google Business Profile that's complete and active, a site with a page for each service, and structured data underneath so the machines can repeat your facts confidently.",
          "The bar in Niceville is winnable. Most local categories here have no business doing all three of those things — which means the first one to do them properly gets recommended by default.",
        ],
      },
      {
        heading: "Bluewater Bay and Valparaiso count too",
        body: [
          "People in Bluewater Bay and Valparaiso search their own place names, and machines treat those as distinct localities. We build pages that cover the places you actually serve — written from what you know about working there, because that's what ranks and that's what an AI assistant can quote.",
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
          "Builds and monthly care are quoted per project — the quote form takes two minutes and the reply comes within one business day. The one flat-priced item is the Google & AI Visibility Audit, a written report on how your business currently looks to Google, Bing, and the AI assistants.",
      },
    ],
  },
  {
    slug: "web-design-crestview-fl",
    city: "Crestview",
    region: "FL",
    seoTitle: "Web Design in Crestview, FL",
    metaDescription:
      "Custom websites and Google Business Profile management for Crestview, FL — the county's biggest city deserves better than template sites. Built in Destin.",
    h1: "Web design in Crestview, Florida",
    intro:
      "Crestview is the biggest city in Okaloosa County and the least served by good web work. It's a trades-and-services town — HVAC, auto, fencing, lawn care, childcare, churches — where most businesses run on word of mouth and a Facebook page. The ones that add a real search presence stand out immediately, because so few have.",
    sections: [
      {
        heading: "Why does local search matter in a word-of-mouth town?",
        body: [
          "Because word of mouth moved. The recommendation that used to happen over a fence now happens in a Google search, a maps result, or a question typed into ChatGPT — especially for the steady stream of people relocating to Crestview for Eglin and Duke Field who have no fence neighbors to ask yet. When they search a service and your competitor has a real site and an active Google profile and you don't, the referral goes to them before you knew it existed.",
          "The fix is structural, not promotional: a fast site with a page per service, a Google Business Profile treated as a monthly operation, schema the machines can read, and indexing in both Google and Bing. No ad spend required — this is the part of search you own.",
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
