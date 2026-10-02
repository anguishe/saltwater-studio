export type Permission = "live" | "preview";

export interface Project {
  slug: string;
  title: string;
  /** Search-facing <title> body for live case studies (the " | Saltwater Studio" suffix is added). Falls back to "<title> Case Study — <category>". Keep the full title ≤ 60 chars; scripts/check-meta.mjs fails the build over 65. */
  seoTitle?: string;
  category: string;
  result: string;
  image: string;
  alt?: string; // descriptive tile alt; templates fall back to `${title} — ${result}`
  permission: Permission;
  url?: string; // live: client site; preview: demo URL for "Visit the concept" link
  gallery?: { src: string; alt: string }[]; // hero renders separately; used on live case studies and concept detail pages
  // Case-study fields — LIVE projects only (PORTFOLIO §1). Never populated on
  // preview tiles, which stay label-only with no link or endorsement.
  challenge?: string;
  approach?: string;
  outcome?: string; // what SHIPPED — never an invented metric
  stack?: string[];
  metaDescription?: string; // per-project, 150–160 chars, indexable case study
  linksLead?: string; // prose lead-in for the in-content internal links
  links?: { href: string; label: string }[]; // specific-anchor internal links
}

export const projects: Project[] = [
  {
    slug: "beach-house-moving",
    title: "Beach House Moving",
    seoTitle: "Beach House Moving: Local SEO Case Study",
    category: "Web Design · Local SEO · Google Care",
    result:
      "A county-level site plus monthly Google profile care — the homepage climbed onto page one in its home market, and calls from Google climbed with it.",
    image: "/images/portfolio/portfolio-bhm-hero.webp",
    alt: "Beach House Moving — homepage",
    permission: "live",
    url: "https://beachhousemoving.xyz",
    gallery: [
      {
        src: "/images/portfolio/portfolio-bhm-service-areas.webp",
        alt: "Beach House Moving county-level service-area pages",
      },
      {
        src: "/images/portfolio/portfolio-bhm-reviews.webp",
        alt: "Beach House Moving 'Trusted by Families' reviews section",
      },
      {
        src: "/images/portfolio/portfolio-bhm-footer.webp",
        alt: "Beach House Moving Google-review call-to-action and footer",
      },
    ],
    challenge:
      "Movers don't get found by being good. They get found by owning the geography — the exact town and county someone searches the night before a move. A single-page template that names one city and stops there can't do that. The searches that matter are happening in a dozen places it never mentions, and the visibility a local company should own goes to the aggregator directories instead.",
    approach:
      "Saltwater built the site county by county. Every place Beach House actually works got its own service-area page, written from real job knowledge instead of a find-and-replace on the city name. Schema went in from the first commit — LocalBusiness and service-area markup that tells Google and AI assistants exactly where the company operates and what it does. Each page is built to convert the visit it earns, with a call and a quote request never more than a tap away.",
    outcome:
      "A custom Next.js site with a service-area page for every county Beach House covers — each one schema-first and written to rank for the local term, not a generic “moving services” keyword. Then the work kept going. Saltwater runs the company's Google Business Profile every month: posts built from the crew's own job photos, every review answered, services and hours kept current, and a report back to the owners on calls, clicks, and rankings. The homepage climbed from deep in the results onto page one for the moving searches in its home market, and calls from the Google profile have climbed with it. Every photo on the site and the profile comes from a real job — customers notice, and they say so.",
    stack: [
      "Next.js · TypeScript",
      "Tailwind CSS",
      "LocalBusiness + service-area schema (JSON-LD)",
      "County-level service-area pages",
      "Call + quote conversion paths",
      "Monthly Google Business Profile management",
      "Monthly calls, clicks, and rankings report",
      "Vercel",
    ],
    metaDescription:
      "How Saltwater Studio took Beach House Moving onto page one in its home market: county-level pages, schema, and monthly Google Business Profile management.",
    linksLead:
      "Running a local service business? The same county-level build applies — see",
    links: [
      { href: "/services/seo-aeo-geo", label: "the SEO, AEO & GEO work" },
      { href: "/services/google-presence", label: "Google Business Profile management" },
      { href: "/services/web-design", label: "the website build" },
      { href: "/contact", label: "a quote on your service area" },
    ],
  },
  {
    slug: "kais-run",
    title: "Kai's Run",
    seoTitle: "Kai's Run Case Study — Dog Conditioning",
    category: "Mobile Dog Conditioning",
    result:
      "A new mobile service with no direct competitor in AI search — entity-first, with four free tools building the audience before opening day.",
    image: "/images/portfolio/portfolio-kaisrun-hero.webp",
    alt: "Kai's Run — homepage",
    permission: "live",
    url: "https://kaisrun.xyz",
    gallery: [
      {
        src: "/images/portfolio/portfolio-kaisrun-about.webp",
        alt: "Kai's Run 'Meet Kai' about page",
      },
      {
        src: "/images/portfolio/portfolio-kaisrun-blog.webp",
        alt: "Kai's Run 'Field Notes' blog with the founding-member offer",
      },
    ],
    challenge:
      "You can't rank for a search nobody makes yet. Kai's Run is mobile dog conditioning — a trainer who comes to you and actually works the dog — in Destin and across Okaloosa County. The problem isn't beating a competitor for the keyword; there's no competitor and barely a keyword. When a category is new, search engines and AI assistants have no entity to attach the business to, so a real service stays invisible until something teaches the machines what it is and who provides it.",
    approach:
      "Saltwater built the entity from zero. The site defines the category in plain language — what mobile dog conditioning is, who it's for, where it runs — in answer-first copy structured so an AI assistant can quote it when someone asks whether anyone will come train their dog near Destin. Entity and AEO work tie the business to the service and the place. Ahead of opening, the site earns its audience with free tools instead of an offer nobody can use yet — each one answers a question local dog owners already search, and each one is a reason for a vet, groomer, or rescue to link to the site.",
    outcome:
      "A live site that names, explains, and claims a service category that didn't exist in search before it shipped — entity-first, answer-first, and built to be the answer when the question finally gets asked. Four free tools run on it: a pavement-heat checker, a dog exercise calculator, a body-condition score, and a puppy exercise planner, plus a field-notes blog on a steady publishing schedule. I took this one because it's the cleanest test of the method: no keyword to copy and no competitor to study, just structure doing the ranking work.",
    stack: [
      "Next.js · TypeScript",
      "Tailwind CSS",
      "Entity + AEO markup (JSON-LD)",
      "Four free owner tools (heat, exercise, body condition, puppy)",
      "Field-notes blog on a publishing schedule",
      "Vercel",
    ],
    metaDescription:
      "How Saltwater Studio launched Kai's Run — entity and AEO work plus four free owner tools for a dog-conditioning category search had never seen. See how.",
    linksLead:
      "Launching something search has never seen? Entity and AEO work is what makes it findable — see",
    links: [
      { href: "/services/seo-aeo-geo", label: "SEO, AEO & GEO" },
      { href: "/services/google-presence", label: "Google presence" },
      { href: "/contact", label: "a quote on your launch" },
    ],
  },
  {
    slug: "heat-safety-tool",
    title: "The Heat-Safety Tool",
    seoTitle: "Heat-Safety Tool Case Study — Live Data",
    category: "Live Data · Decision Tool",
    result:
      "A question people ask every afternoon in July, answered in under a second from live local weather.",
    image: "/images/portfolio/portfolio-kaisrun-heat-tool.webp",
    alt: "Too Hot To Walk Your Dog — pavement temperature checker",
    permission: "live",
    url: "https://kaisrun.xyz/tools/too-hot-to-walk",
    challenge:
      "“Is it too hot to walk my dog right now?” is one of the most-asked questions of a Gulf Coast summer, and every article answering it gives the same useless response: it depends. It does depend — on the hour, the cloud cover, the surface, and the city you're standing in. An article can't know any of that. The person asking is standing at the door with a leash in their hand, and what they need is a yes or a no.",
    approach:
      "Rather than write another article, we built the answer. The tool takes a city or ZIP, pulls live conditions for that exact location, runs the published heat-index calculation, and estimates what the pavement is actually doing under sun or shade right now. It returns a plain verdict — walk, wait, or don't — with the number behind it, so the answer is checkable rather than a vibe. Eleven local cities are one tap away because those are the ones people actually search from.",
    outcome:
      "A live tool that turns a genuinely uncertain question into an immediate, specific, defensible answer — and does it in the moment the decision gets made. It runs unattended, costs nothing to operate, and answers a question the rest of the category responds to with a paragraph of hedging. This is the shape of most of the AI work: find the question a business answers by hand fifty times a summer, and build the thing that answers it once, correctly, forever.",
    stack: [
      "Live weather data by city and ZIP",
      "Published heat-index and pavement-temperature models",
      "Sun and shade surface modes",
      "Answer-first verdict with the number behind it",
      "Zero-maintenance, unattended operation",
    ],
    metaDescription:
      "How Saltwater Studio replaced an article with an answer: a live pavement-temperature tool that tells dog owners to walk, wait, or stay in. See the build.",
    linksLead:
      "Answering the same question by hand over and over? That's the first thing worth building — see",
    links: [
      { href: "/services/ai-automation", label: "AI automation" },
      { href: "/services/ai-strategy", label: "AI strategy & logistics" },
      { href: "/contact", label: "a quote on your version of it" },
    ],
  },
  {
    slug: "bash-snippets",
    title: "BashSnippets",
    category: "Content Site",
    result:
      "A content site Microsoft Copilot cites — more than 100 AI-answer citations, built on structured snippets, schema, and llms.txt.",
    image: "/images/portfolio/portfolio-bashsnippets-hero.webp",
    alt: "BashSnippets — homepage",
    permission: "live",
    url: "https://bashsnippets.xyz",
    gallery: [
      {
        src: "/images/portfolio/portfolio-bashsnippets-snippets.webp",
        alt: "BashSnippets snippet library",
      },
      {
        src: "/images/portfolio/portfolio-bashsnippets-about.webp",
        alt: "BashSnippets about page",
      },
    ],
    challenge:
      "Most content sites are written for readers, then hope search shows up. BashSnippets was built the other way around. It's a library of Linux commands and snippets — the kind of answer someone wants handed to them, not buried under a long preamble. The bar isn't a page-one ranking anymore; it's being the source an AI assistant quotes when someone asks how to do the thing. That only happens if the content is structured to be lifted.",
    approach:
      "Every snippet is engineered for extraction. JSON-LD TechArticle and HowTo schema wrap each page so a machine reads the steps as steps, and the copy itself is answer-first — the command up top, the explanation under it. A paid toolkit sits underneath, and every article is cross-posted to developer communities with a canonical link back, so the library earns attention beyond Google alone. BashSnippets is a Saltwater-owned property, which is the whole point: the schema-first, AEO-first method gets proven on the studio's own site before a client pays for it.",
    outcome:
      "An owned content property where the structure is the product — and the AI assistants noticed. As of September 2026, Bing has more than fifty of its pages indexed, it ranks them in the top six on long, conversational questions (the way people actually ask an assistant), and Microsoft Copilot has cited the library in its answers more than a hundred times. It's the live proof behind the pitch: the same method running on a client's service-area pages is running here, on a site the studio owns and operates itself. I build my own properties so the method has somewhere to prove itself before anyone pays for it.",
    stack: [
      "Next.js · TypeScript",
      "MDX content",
      "TechArticle + HowTo schema (JSON-LD)",
      "llms.txt + AI-crawler access",
      "Paid toolkit (product-first monetization)",
      "Canonical cross-posting to developer communities",
    ],
    metaDescription:
      "How Saltwater Studio built BashSnippets into a site Microsoft Copilot cites 100+ times: TechArticle/HowTo schema, answer-first snippets, and llms.txt.",
    linksLead:
      "Want content AI search actually cites? That's the build — see",
    links: [
      { href: "/services/seo-aeo-geo", label: "SEO, AEO & GEO" },
      { href: "/services/social-content", label: "social & content" },
      { href: "/contact", label: "a quote on your content" },
    ],
  },
  {
    slug: "watervue-event-rentals",
    title: "WaterVue Event Rentals",
    seoTitle: "WaterVue Event Rentals Case Study",
    category: "Rental Catalog · Local SEO",
    result:
      "A 51-item event-rental catalog for the Emerald Coast with every piece listed — built to answer renters' questions before the directories do.",
    image: "/images/portfolio/portfolio-wvrentals-hero.webp",
    alt: "WaterVue Event Rentals — homepage",
    permission: "live",
    url: "https://watervueeventrentals.com",
    gallery: [
      {
        src: "/images/portfolio/portfolio-wvrentals-weddings.webp",
        alt: "WaterVue Event Rentals wedding rentals hub",
      },
      {
        src: "/images/portfolio/portfolio-wvrentals-guides.webp",
        alt: "WaterVue Event Rentals answer-first planning guides",
      },
    ],
    challenge:
      "Event rental on the Emerald Coast runs on phone calls and PDFs. Most rental companies don't list what they carry, what it measures, or how it holds up on sand, so the wedding marketplaces and directories answer the planner's questions instead of the people who own the chairs. WaterVue Events already had a planning business with a strong Google reputation. The rental side needed a storefront that could win searches on its own.",
    approach:
      "Saltwater built one deep site instead of a spread of thin ones. Every item has its own page with real sizes and options. Hubs for weddings, corporate events, parties, and holiday parties group the catalog the way people actually plan, and a build-to-your-budget page handles the buyer who starts with a number instead of a list. Twelve answer-first planning guides take the questions that come before a rental — how many tables for 100 guests, how many people fit at a 60-inch round, what the local beach rules allow — with every permit rule checked against the official source. A quote cart lets a planner build the whole order and send it in one request.",
    outcome:
      "A live catalog on its own domain: 51 items, four event-type hubs, a budget planner, twelve planning guides, and a multi-item quote cart that keeps a copy of every lead even if an email fails to send. Search Console and the sitemap went in on launch day. WaterVue is a business Travis is a partner in, so it's another property where the method runs on our own money before it runs on a client's.",
    stack: [
      "Next.js · TypeScript",
      "Tailwind CSS",
      "Item pages with real sizes and options",
      "Twelve answer-first planning guides",
      "Multi-item quote cart with lead backup",
      "Search Console + sitemap at launch",
      "Vercel",
    ],
    metaDescription:
      "How Saltwater Studio built WaterVue Event Rentals: a 51-item Emerald Coast rental catalog with answer-first planning guides and a multi-item quote cart.",
    linksLead:
      "Selling from a catalog nobody can see online? The same build applies — see",
    links: [
      { href: "/services/web-design", label: "the website build" },
      { href: "/services/seo-aeo-geo", label: "SEO, AEO & GEO" },
      { href: "/contact", label: "a quote on your catalog" },
    ],
  },
  {
    slug: "aquamarine",
    title: "Concept — Pool Service",
    category: "Pool Cleaning",
    result:
      "A local pool-service concept — the local-service playbook applied end to end.",
    image: "/images/portfolio/portfolio-aquamarine-hero.webp",
    alt: "Aquamarine Pool Clean — concept site (sample)",
    permission: "preview",
    url: "https://aquamarine-pool-clean.vercel.app",
    gallery: [
      { src: "/images/portfolio/portfolio-aquamarine-services.webp", alt: "Aquamarine Pool Clean — services" },
      { src: "/images/portfolio/portfolio-aquamarine-service-area.webp", alt: "Aquamarine Pool Clean — service-area map" },
    ],
  },
  {
    slug: "alexander-hines",
    title: "Concept — Construction",
    category: "Construction",
    result:
      "A construction-services concept — schema-first and structured for local search.",
    image: "/images/portfolio/portfolio-alexander-hines-hero.webp",
    alt: "Alexander Hines Construction — concept site (sample)",
    permission: "preview",
    url: "https://hines-construction.vercel.app",
    gallery: [
      { src: "/images/portfolio/portfolio-alexander-hines-services.webp", alt: "Alexander Hines Construction — services" },
      { src: "/images/portfolio/portfolio-alexander-hines-gallery.webp", alt: "Alexander Hines Construction — project gallery" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getLiveProjects(): Project[] {
  return projects.filter((p) => p.permission === "live");
}

export function getAllProjects(): Project[] {
  return projects;
}
