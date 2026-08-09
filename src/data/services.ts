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
  index: string;
  title: string;
  oneLiner: string;
  included: string[];
  /**
   * Optional H2 blocks below "What's included". Used where one page has to carry a
   * second keyword cluster — /services/ai-automation covers "AI workflows" here
   * rather than on its own route, because both phrases resolve to the same intent
   * and the same buyer. Two pages would split their own signal.
   */
  sections?: ServiceSection[];
}

export const services: Service[] = [
  {
    slug: "ai-strategy",
    index: "01",
    title: "AI Strategy & Logistics",
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
  {
    slug: "ai-automation",
    index: "02",
    title: "AI Automation",
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
    slug: "ai-agents",
    index: "03",
    title: "AI Agents",
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
    slug: "web-design",
    index: "04",
    title: "Websites, Built Right",
    oneLiner:
      "Next.js performance, immersive where it earns its keep, fast where it counts. The version you don't rebuild in two years.",
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
  },
  {
    slug: "seo-aeo-geo",
    index: "05",
    title: "SEO / AEO / GEO",
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
    slug: "google-presence",
    index: "06",
    title: "Google Presence",
    oneLiner:
      "Google Business Profile setup, optimization, and the local pack — the most underused free channel a local business has.",
    included: [
      "GBP creation or full audit + remediation",
      "NAP consistency across all directories",
      "Category selection and service area configuration",
      "Photo strategy and first-post content",
      "Review response framework",
      "Local pack ranking baseline and monitoring",
    ],
  },
  {
    slug: "social-content",
    index: "07",
    title: "Social & Content",
    oneLiner:
      "The weekly engine that keeps the profile alive — content that builds the entity, not just fills the feed.",
    included: [
      "Content calendar aligned to service pages and keywords",
      "Platform-native posts (GBP, Instagram, Facebook, LinkedIn)",
      "Answer-first copy — every post a potential AI citation",
      "Brand voice consistency with BRAND.md standards",
      "Monthly content performance review",
    ],
  },
];

/** The three cards the homepage leads with. The rest live on /services. */
export const headlineServices = services.filter((s) => s.index <= "03");

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
