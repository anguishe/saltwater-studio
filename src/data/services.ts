import { getTierById, tierPrice } from "@/data/tiers";

export interface ServiceSection {
  /** Rendered as an H2. Doubles as the page's secondary keyword cluster. */
  heading: string;
  /** One or more paragraphs. Answer-first — lead with the answer, then the texture. */
  body: string[];
  /** Optional bullet list under the paragraphs. */
  points?: string[];
}

export interface Service {
  slug: string;
  /** ISO date the page content last changed. Drives sitemap lastmod and the visible "Updated" line; bump it with every content edit. */
  dateModified: string;
  index: string;
  /** Brand label ("Google Care"). Rendered as the eyebrow, not the H1. */
  title: string;
  /** Keyword H1 carrying the search phrase. Falls back to `title`. */
  h1?: string;
  /** Search-facing <title>, keyword-first. Falls back to `title`. */
  seoTitle?: string;
  /** 150–160 chars. Falls back to the oneLiner + agency suffix. */
  metaDescription?: string;
  oneLiner: string;
  included: string[];
  /**
   * Optional H2 blocks below "What's included". Used where one page has to carry a
   * second keyword cluster — /services/ai-automation covers "AI workflows" here
   * rather than on its own route, because both phrases resolve to the same intent
   * and the same buyer. Two pages would split their own signal.
   */
  sections?: ServiceSection[];
  /**
   * Answer-first "what does it cost?" block, rendered right under the standfirst.
   * Prices come from tiers.ts (never typed), so a price change can't go stale here.
   */
  cost?: ServiceSection;
}

const pagePlan = tierPrice("page-plan");
const buyIt = tierPrice("buy-it");
const localGrowth = tierPrice("local-growth");
const profileFix = tierPrice("profile-fix");
const audit = tierPrice("audit");

export const services: Service[] = [
  {
    dateModified: "2026-10-02",
    slug: "web-design",
    seoTitle: "Custom Web Design for Local Business",
    metaDescription:
      "Custom web design for local businesses: fast Next.js sites with schema, tracking, and Search Console set up before launch. Published plans, no setup fee.",
    index: "01",
    title: "Websites, Built Right",
    h1: "Custom web design for local businesses",
    cost: {
      heading: "How much does a website cost?",
      body: [
        `A finished custom website is ${pagePlan.display} on the Page Plan (${pagePlan.note}), or ${buyIt.display} with Buy It (${buyIt.note}). ${getTierById("page-plan")?.turnaround}. Local Growth adds monthly Google Business Profile care and up to 4 service or area pages for ${localGrowth.display}. Larger custom builds and redesigns get a quote with a timeline.`,
      ],
    },
    oneLiner:
      "A custom website that loads fast, shows up in local search, and turns a visitor into a phone call. Built once, built right — the version you don't rebuild in two years.",
    included: [
      "Custom Next.js build — no templates",
      "Schema.org structured data from day one",
      "GA4 + GTM tracking configured before launch",
      "Core Web Vitals optimized (LCP, CLS, INP)",
      "Mobile-first, accessible, WCAG-compliant",
      "Vercel deploy with www → apex redirect",
      "GSC + Bing Webmaster submission on launch",
      "Built to accept automation later without a rebuild",
    ],
    sections: [
      {
        heading: "What a local business website has to do",
        body: [
          "Answer three questions before the visitor scrolls: what you do, where you do it, and how to reach you. Everything else on the page is there to back those up — real job photos, the services you actually offer, the towns you actually serve.",
          "The same page also has to make sense to the machines reading it. Google, Bing, and the AI assistants decide what your business does from the site's structure and schema, not from how it looks. A template rarely gets that part right, which is why so many good-looking sites never rank.",
        ],
        points: [
          "A page for each service you want to be found for",
          "Service-area pages written from real job knowledge, not a find-and-replace on the city name",
          "Click-to-call and a short quote form on every page",
          "Fast on a phone over a weak signal — where most local searches happen",
        ],
      },
      {
        heading: "Website and Google profile, working together",
        body: [
          "The site and your Google Business Profile tell the same story: same name, same phone, same services, same service area. When they match, Google trusts both more. Most builds can be paired with Google Care so the profile stays as current as the site.",
        ],
      },
      {
        heading: "You own all of it",
        body: [
          "The domain, the hosting, the analytics, and the code are in your name, under your email. If you ever move on, you take everything with you. Nothing is held hostage behind an agency login.",
        ],
      },
    ],
  },
  {
    dateModified: "2026-10-02",
    slug: "google-presence",
    seoTitle: "Google Business Profile Management",
    metaDescription:
      "Google Business Profile management for local businesses: weekly posts from your own photos, every review answered, and a monthly report on calls.",
    index: "02",
    title: "Google Care",
    h1: "Google Business Profile management",
    cost: {
      heading: "What does Google Business Profile management cost?",
      body: [
        `Monthly Google Business Profile management comes in Local Growth at ${localGrowth.display} (${localGrowth.note}), with the Page Plan website and a plain-English monthly report included. A profile that only needs fixing once gets the Google Profile Fix: ${profileFix.display}, ${profileFix.note}. Not sure which? The Google & AI Visibility Audit is ${audit.display}, credited in full against the fix.`,
      ],
    },
    oneLiner:
      "We run your Google Business Profile every month — posts from your own job photos, every review answered, hours and services kept right, and a report that shows the calls it brought in.",
    included: [
      "Weekly posts built from your own real job photos, never stock",
      "Every review answered within two business days",
      "Hours, holiday hours, services, and service area kept current",
      "New photos added every month, each one checked for addresses and plates before it posts",
      "Category and service-area setup, or a full audit and cleanup of an existing profile",
      "Name, address, and phone matched across the directories that feed Google",
      "A one-page monthly report: calls, website clicks, direction requests, and the searches that found you",
      "Setup of a brand-new profile, including verification, if you don't have one yet",
    ],
    sections: [
      {
        heading: "Why the profile, not just the website",
        body: [
          "For most local businesses, the phone call starts on Google, not on the website. Someone searches \"movers near me\" or \"plumber Destin,\" sees three businesses in the map results, and taps Call. That call never touches your site. The profile is the storefront.",
          "Most owners set the profile up once and never touch it again. Google notices. A profile with fresh posts, recent photos, answered reviews, and correct hours looks open for business, and it shows up more often.",
        ],
      },
      {
        heading: "It's already running for a client",
        body: [
          "This is the monthly routine we run for Beach House Moving. Posts come from the crew's own job photos, every review gets a real reply, and the owners get a report each month. In September, calls from their Google profile jumped, right alongside their homepage moving onto page one in their home market.",
        ],
      },
      {
        heading: "What you do and what we do",
        body: [
          "You add us as a Manager on the profile and text or email photos from jobs when you have them. We do everything else. You keep ownership of the profile the whole time. If you ever stop, you remove us and nothing about the listing changes.",
        ],
      },
    ],
  },
  {
    dateModified: "2026-10-02",
    slug: "seo-aeo-geo",
    seoTitle: "Local SEO & AI Search Optimization",
    metaDescription:
      "Local SEO plus AI search optimization: rank in Google, get quoted by ChatGPT, Perplexity, and Copilot, and keep one consistent fact set everywhere.",
    index: "03",
    title: "SEO / AEO / GEO",
    h1: "Local SEO and AI search optimization",
    oneLiner:
      "Ranked in Google, quoted by AI search, named as the entity. The search presence your competitor skipped.",
    included: [
      "Technical SEO audit and remediation",
      "Entity strategy — one canonical fact set everywhere",
      "Answer-engine optimization (featured snippets, PAA)",
      "Generative-engine optimization (AI Overviews, Perplexity, ChatGPT)",
      "llms.txt and AI crawler access configured",
      "IndexNow integration for instant Bing/AI indexing",
      "Monthly rank and visibility reporting",
    ],
  },
  {
    dateModified: "2026-10-02",
    slug: "social-content",
    index: "04",
    title: "Social & Content",
    metaDescription:
      "Social and content from Saltwater Studio: the weekly engine that keeps your Google profile alive, with answer-first posts that build the entity.",
    oneLiner:
      "The weekly engine that keeps the profile alive — content that builds the entity, not just fills the feed.",
    included: [
      "Content calendar aligned to service pages and keywords",
      "Platform-native posts (GBP, Instagram, Facebook, LinkedIn)",
      "Answer-first copy — every post a potential AI citation",
      "A brand voice guide agreed with you before the first post",
      "Monthly content performance review",
    ],
  },
  {
    dateModified: "2026-10-02",
    slug: "ai-receptionist",
    seoTitle: "AI Receptionist & Missed-Call Text-Back",
    metaDescription:
      "An AI receptionist for trades and local businesses: every missed call gets a text back in seconds, after-hours calls answered, job details sent to you.",
    index: "05",
    title: "AI Receptionist",
    h1: "AI receptionist and missed-call text-back",
    oneLiner:
      "For the owner who's on a roof, under a sink, or driving between jobs when the phone rings. Every missed call gets a text back in seconds, after-hours calls get answered, and you get the job details, not a voicemail.",
    included: [
      "Missed-call text-back — a real reply within seconds, in your words",
      "After-hours and overflow call answering",
      "Collects what you'd ask: name, address, what's wrong, how urgent",
      "Sends you a clean summary by text or email, ready to call back",
      "Books straight into the calendar you already use, if you want it to",
      "Answers from your real hours, service area, and policies only",
      "Hands off to you the moment a caller needs a person",
      "Every conversation logged where you can read it",
    ],
    sections: [
      {
        heading: "Who this is for",
        body: [
          "Plumbers, HVAC techs, roofers, movers, cleaners, landscapers — anyone whose hands are busy when the phone rings. If you've ever listened to a voicemail at 7pm from someone who already hired whoever picked up, this is for you.",
        ],
        points: [
          "You miss calls during the workday because you're on a job",
          "Calls after hours go to voicemail and don't call back",
          "You don't have the volume, or the budget, for a full-time receptionist",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Your number stays your number. When a call goes unanswered, the caller gets a text within seconds that sounds like your business, not a robot. It asks what they need, where they are, and how soon. You get one message with everything in it, and you call back a customer who's already waiting for you instead of one who's moved on.",
          "After hours, it can answer the call itself, take the details the same way, and tell the caller exactly when you'll be in touch.",
        ],
      },
      {
        heading: "What it will not do",
        body: [
          "It won't quote a price it doesn't have, promise a time slot it can't see, or make up a policy. When a caller asks for something outside what it knows, it says a person will follow up and passes the conversation to you. Scoping those edges is most of the setup work, and it's why we build it for your business rather than hand you a generic bot.",
        ],
      },
    ],
  },
  {
    dateModified: "2026-10-02",
    slug: "ai-automation",
    seoTitle: "AI Workflow Automation for Small Business",
    metaDescription:
      "AI automation for small businesses: intake, follow-up, quoting, scheduling, and reporting handled end to end, with a person in the loop where it matters.",
    index: "06",
    title: "AI Automation",
    h1: "AI workflow automation for small business",
    oneLiner:
      "The repetitive parts of the day, handled without you. Intake, follow-up, quoting, scheduling, reporting — running on their own and telling you when something needs a human.",
    included: [
      "Automation of a scoped process, end to end — not a demo",
      "Intake and lead routing that reaches the right person immediately",
      "Follow-up sequences that stop the moment someone replies",
      "Quote and estimate prep assembled from what you already collect",
      "Records kept in sync so nothing gets typed twice",
      "Reporting that arrives on a schedule instead of on request",
      "Failure handling — every automation says so when it breaks",
      "Handover documentation and a walkthrough for whoever runs it next",
    ],
    sections: [
      {
        heading: "AI workflows: the whole path, not one step",
        body: [
          "An automation fires on a trigger. A workflow carries a job from the first touch to the finished outcome, with the judgment calls handled along the way and the exceptions escalated to a person.",
          "A new inquiry is the clearest example. The workflow reads it, pulls what it needs from your records, drafts the reply in your language, schedules the follow-up, and files the whole thread where it belongs. You see one notification instead of six tasks. When something falls outside what it should decide on its own, it stops and asks.",
          "That last part is the difference between a workflow you keep and one you turn off. Anything touching money, a commitment, or a customer's expectations gets a human in the loop by design.",
        ],
        points: [
          "New inquiry to booked job, without retyping anything",
          "Quote request to sent estimate, priced from your own numbers",
          "Completed job to invoice, review request, and follow-up",
          "Inbox and voicemail sorted by what actually needs you today",
          "Weekly numbers assembled and sent without anyone building a report",
        ],
      },
      {
        heading: "Built to be handed over",
        body: [
          "Every build ships with documentation of what it does, where it runs, what it costs to run, and how to turn it off. Nothing depends on us staying in the account. If you want the work maintained, that is a separate conversation and always your call — never a dependency we engineered in.",
        ],
      },
    ],
  },
  {
    dateModified: "2026-10-02",
    slug: "ai-agents",
    seoTitle: "AI Chat & Voice Agents for Local Business",
    metaDescription:
      "AI agents for local businesses: chat that answers with your real policies, inbox triage, and booking into your calendar, scoped to hand off, not guess.",
    index: "07",
    title: "AI Agents",
    h1: "AI chat and voice agents for local business",
    oneLiner:
      "The front desk that never closes. Missed calls answered by text in seconds, questions handled at midnight, bookings taken while you're on a job.",
    included: [
      "Missed-call text-back — every unanswered call gets a reply in seconds",
      "Chat that answers real questions using your actual pricing and policies",
      "Voice answering for after-hours and overflow, with clean handoff",
      "Booking taken straight into the calendar you already use",
      "Inbox triage — urgent surfaced, routine handled, noise filed",
      "Scoped so it says \"let me get Travis\" instead of guessing",
      "Every conversation logged where you can read it",
      "Tone tuned to how you actually talk to customers",
    ],
    sections: [
      {
        heading: "The missed call is the whole argument",
        body: [
          "A local business that misses a call at 2pm on a Tuesday usually loses that customer to whoever picks up next. The caller is not waiting for a callback. They are dialing the second result.",
          "An agent that texts back inside thirty seconds — with a real answer, not an autoresponder — turns the miss into a conversation. That is the smallest useful thing in this category and usually the first one worth building.",
        ],
      },
      {
        heading: "What it will not do",
        body: [
          "It will not quote a job it does not have numbers for, promise a schedule it cannot see, or improvise a policy. Every agent gets built with an explicit edge: past that line, it hands off to a person and says so plainly.",
          "An agent that confidently invents an answer costs more than the missed call did. The scoping is most of the work.",
        ],
      },
    ],
  },
  {
    dateModified: "2026-10-01",
    slug: "ai-strategy",
    seoTitle: "AI Strategy Consulting for Small Business",
    metaDescription:
      "AI strategy for small and local businesses: a process map, a build-or-buy call on every task, and a 90-day roadmap you can hand to anyone to follow.",
    index: "08",
    title: "AI Strategy & Logistics",
    h1: "AI strategy consulting for small business",
    oneLiner:
      "Before anything gets built: which work is worth automating, which isn't, and what order to do it in. The plan you can hand to someone else and have them follow.",
    included: [
      "Process map of how work actually moves through the business today",
      "Every repetitive task inventoried and ranked by hours it costs you",
      "Build, buy, or leave alone — a call on each one, with the reasoning",
      "Sequenced 90-day roadmap, cheapest reversible wins first",
      "Written SOPs for the processes worth keeping as-is",
      "Staff walkthrough — what changes, what doesn't, who owns what",
      "A short list of what to measure so you know if it worked",
    ],
    sections: [
      {
        heading: "Why the strategy comes before the build",
        body: [
          "Most AI that lands in a small business gets bolted onto a process nobody mapped, doing a job nobody scoped. It works in the demo and quietly rots in month three, because the process it was attached to was never the bottleneck.",
          "The map comes first. Half of what turns up in one is not an automation problem at all — it is a form with too many fields, a handoff between two people who never talk, or a report nobody reads. Those get fixed for free, and the things that genuinely deserve a system get built once.",
        ],
      },
      {
        heading: "What you walk away with",
        body: [
          "A document, not a subscription. It names the processes, what each one costs you in hours, what a fix looks like, and what order to do them in. If you take it to someone else to build, it still works. That is the test.",
        ],
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
