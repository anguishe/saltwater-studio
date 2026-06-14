export type Permission = "live" | "preview";

export interface Project {
  slug: string;
  title: string;
  category: string;
  result: string;
  image: string;
  permission: Permission;
  url?: string; // only populated when permission === "live"
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
    category: "Web Design · Local SEO",
    result:
      "Custom Next.js site with county-level service-area pages built to rank — the local SEO moat done right.",
    // V1: brand plate — swap to a real screenshot later (one-line edit)
    image: "/images/saltwater-studio-plate-deep-rays.webp",
    permission: "live",
    url: "https://beachhousemoving.xyz",
    challenge:
      "Movers don't get found by being good. They get found by owning the geography — the exact town and county someone searches the night before a move. A single-page template that names one city and stops there can't do that. The searches that matter are happening in a dozen places it never mentions, and the visibility a local company should own goes to the aggregator directories instead.",
    approach:
      "Saltwater built the site county by county. Every place Beach House actually works got its own service-area page, written from real job knowledge instead of a find-and-replace on the city name. Schema went in from the first commit — LocalBusiness and service-area markup that tells Google and AI assistants exactly where the company operates and what it does. Each page is built to convert the visit it earns, with a call and a quote request never more than a tap away.",
    outcome:
      "A custom Next.js site with a service-area page for every county Beach House covers — each one schema-first and written to rank for the local term, not a generic “moving services” keyword. The call and quote paths are wired through every page. It's the local SEO moat done right: depth a template can't copy, because the template never added the schema or the county-level pages in the first place.",
    stack: [
      "Next.js · TypeScript",
      "Tailwind CSS",
      "LocalBusiness + service-area schema (JSON-LD)",
      "County-level service-area pages",
      "Call + quote conversion paths",
      "Vercel",
    ],
    metaDescription:
      "How Saltwater Studio built Beach House Moving a county-level, schema-first Next.js site to win hyper-local moving searches across the Gulf Coast. See the build.",
    linksLead:
      "Running a local service business? The same county-level build applies — see",
    links: [
      { href: "/services/seo-aeo-geo", label: "the SEO, AEO & GEO work" },
      { href: "/services/web-design", label: "the website build" },
      { href: "/contact", label: "a quote on your service area" },
    ],
  },
  {
    slug: "kais-run",
    title: "Kai's Run",
    category: "Mobile Dog Conditioning",
    result:
      "A novel mobile service with no direct competitor in AI search — built around a founding-member offer and a booking flow.",
    // V1: brand plate — swap to a real screenshot later (one-line edit)
    image: "/images/saltwater-studio-plate-bokeh.webp",
    permission: "live",
    url: "https://kaisrun.xyz",
    challenge:
      "You can't rank for a search nobody makes yet. Kai's Run is mobile dog conditioning — a trainer who comes to you and actually works the dog — in Destin and across Okaloosa County. The problem isn't beating a competitor for the keyword; there's no competitor and barely a keyword. When a category is new, search engines and AI assistants have no entity to attach the business to, so a real service stays invisible until something teaches the machines what it is and who provides it.",
    approach:
      "Saltwater built the entity from zero. The site defines the category in plain language — what mobile dog conditioning is, who it's for, where it runs — in answer-first copy structured so an AI assistant can quote it when someone asks whether anyone will come train their dog near Destin. Entity and AEO work tie the business to the service and the place. The launch ran on a “Founding 20” offer — a finite founding-member count that gives early customers a reason to book now — wired straight into a Square booking flow so interest becomes an appointment without a round of phone tag.",
    outcome:
      "A live site that names, explains, and claims a service category that didn't exist in search before it shipped — entity-first, answer-first, and built to be the answer when the question finally gets asked. The “Founding 20” offer and the Square booking flow are live and ready for the first appointments. I took this one because it's the cleanest test of the method: no keyword to copy and no competitor to study, just structure doing the ranking work.",
    stack: [
      "Next.js · TypeScript",
      "Tailwind CSS",
      "Entity + AEO markup (JSON-LD)",
      "Square booking integration",
      "“Founding 20” launch-offer flow",
      "Vercel",
    ],
    metaDescription:
      "How Saltwater Studio launched Kai's Run — entity and AEO work built for a mobile dog-conditioning category that didn't exist in search yet. Read the case study.",
    linksLead:
      "Launching something search has never seen? Entity and AEO work is what makes it findable — see",
    links: [
      { href: "/services/seo-aeo-geo", label: "SEO, AEO & GEO" },
      { href: "/services/google-presence", label: "Google presence" },
      { href: "/contact", label: "a quote on your launch" },
    ],
  },
  {
    slug: "bash-snippets",
    title: "BashSnippets",
    category: "Content Site",
    result:
      "A content site engineered for both search and AI citation — structured snippets, schema, llms.txt, and a real monetization stack.",
    // V1: brand plate — swap to a real screenshot later (one-line edit)
    image: "/images/saltwater-studio-plate-calm.webp",
    permission: "live",
    url: "https://bashsnippets.xyz",
    challenge:
      "Most content sites are written for readers, then hope search shows up. BashSnippets was built the other way around. It's a library of Linux commands and snippets — the kind of answer someone wants handed to them, not buried under a long preamble. The bar isn't a page-one ranking anymore; it's being the source an AI assistant quotes when someone asks how to do the thing. That only happens if the content is structured to be lifted.",
    approach:
      "Every snippet is engineered for extraction. JSON-LD TechArticle and HowTo schema wrap each page so a machine reads the steps as steps, and the copy itself is answer-first — the command up top, the explanation under it. A real monetization stack of affiliate and display runs underneath, and the library is distributed across channels instead of waiting on Google alone. BashSnippets is a Saltwater-owned property, which is the whole point: the schema-first, AEO-first method gets proven on the studio's own site before a client pays for it.",
    outcome:
      "An owned content property where the structure is the product — TechArticle and HowTo schema, answer-first snippets, an llms.txt that tells AI crawlers what's there, and an affiliate-plus-display model built to scale with the library. It's the live proof behind the pitch: the same method running on a client's service-area pages is running here, on a site the studio owns and operates itself. I build my own properties so the method has somewhere to prove itself before anyone pays for it.",
    stack: [
      "Next.js · TypeScript",
      "MDX content",
      "TechArticle + HowTo schema (JSON-LD)",
      "llms.txt + AI-crawler access",
      "Affiliate + display monetization",
      "Multi-channel distribution",
    ],
    metaDescription:
      "How Saltwater Studio engineered BashSnippets to be cited by AI search: TechArticle/HowTo schema, answer-first snippets, a real monetization stack. See how.",
    linksLead:
      "Want content AI search actually cites? That's the build — see",
    links: [
      { href: "/services/seo-aeo-geo", label: "SEO, AEO & GEO" },
      { href: "/services/social-content", label: "social & content" },
      { href: "/contact", label: "a quote on your content" },
    ],
  },
  {
    slug: "watervue",
    title: "WaterVue Events Co.",
    category: "Event Planning",
    result:
      "Cinematic event-planning rebuild — full Next.js + R3F scroll experience.",
    // V1: brand plate — swap to a real screenshot later (one-line edit)
    image: "/images/saltwater-studio-plate-calm.webp",
    permission: "preview",
  },
  {
    slug: "aquamarine",
    title: "Aquamarine Pool Clean",
    category: "Pool Cleaning",
    result: "Local service build, Fort Walton Beach.",
    // V1: brand plate — swap to a real screenshot later (one-line edit)
    image: "/images/saltwater-studio-plate-calm.webp",
    permission: "preview",
  },
  {
    slug: "alexander-hines",
    title: "Alexander Hines Construction",
    category: "Construction",
    result: "Construction services site.",
    // V1: brand plate — swap to a real screenshot later (one-line edit)
    image: "/images/saltwater-studio-plate-calm.webp",
    permission: "preview",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getLiveProjects(): Project[] {
  return projects.filter((p) => p.permission === "live");
}
