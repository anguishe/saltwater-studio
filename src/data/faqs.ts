import { site } from "@/config/site";

export interface FAQ {
  question: string;
  answer: string;
  page:
    | "home"
    | "services"
    | "ai-strategy"
    | "ai-automation"
    | "ai-agents"
    | "web-design"
    | "seo-aeo-geo"
    | "google-presence"
    | "ai-receptionist"
    | "social-content";
}

export const faqs: FAQ[] = [
  {
    question: "What does Saltwater Studio do?",
    answer:
      "Saltwater Studio is a remote AI agency founded in 2025 by Travis Abadie in Destin, Florida, building AI automation and AI-search presence for local businesses nationwide. That covers AI strategy, automation of the repetitive parts of a business, AI agents that answer calls and messages, and the web and search presence that makes a business findable.",
    page: "home",
  },
  {
    question: "What does an AI agency actually do for a local business?",
    answer:
      "It finds the work a business repeats every day — intake, follow-up, quoting, scheduling, reporting — and builds systems that handle it. For most local businesses the first win is the phone: a missed call answered by text in seconds instead of lost to whoever picks up next. The second is anything typed twice.",
    page: "home",
  },
  {
    question: "How much does this cost?",
    answer:
      `The AI Visibility Audit is $${site.auditOffer.price} flat through ${site.auditOffer.endsLabel} (regularly $${site.auditOffer.regularPrice}), delivered within 72 hours. Everything else is quote-based, because automating one process and rebuilding how a business runs are not the same job. Tell us what the day actually looks like on the quote form, and most projects are scoped within a day.`,
    page: "home",
  },
  {
    question: "Do you only work with Gulf Coast businesses?",
    answer:
      "No. Saltwater Studio works with local businesses across the United States; the Gulf Coast, from Gulf Shores, Alabama to Panama City, Florida, is home base and not a limit. The work is remote by design.",
    page: "home",
  },
  {
    question: "Do I own the systems you build?",
    answer:
      "Yes — completely. The accounts, the code, the automations, and the domain are in your name, with documentation for what each thing does and how to turn it off. Saltwater Studio works as your manager, never your landlord.",
    page: "home",
  },
  {
    question: "What is AEO and GEO, and why should I care?",
    answer:
      "AEO (answer-engine optimization) and GEO (generative-engine optimization) are how a business gets quoted by AI tools like ChatGPT, Google AI Overviews, and Perplexity when someone asks for a recommendation. Both reward consistent facts and clear, answer-first pages — which most template sites do not have.",
    page: "home",
  },
  // services overview
  {
    question: "What services does Saltwater Studio offer?",
    answer:
      `Four engagements: an AI Visibility Audit ($${site.auditOffer.price} through ${site.auditOffer.endsLabel}), the optimization sprint that implements it, ongoing AI-managed presence, and custom AI systems — automation, agents, and integrations. The audit has a flat price; everything else is quoted to the business.`,
    page: "services",
  },
  {
    question: "What does the AI Visibility Audit include?",
    answer:
      "Five checks: how your business shows up in ChatGPT, Claude, Perplexity, and Google's AI results; whether your key pages are structured answer-first; schema and entity consistency; your Google Business Profile; and a technical SEO baseline. It arrives as a written report — scored by category, issues ranked by impact, fixes in order — within 72 hours.",
    page: "services",
  },
  {
    question: "How fast is the audit delivered?",
    answer:
      "Within 72 hours of purchase, fully async — buy it, and the report arrives by email. No call, no meeting; if something needs clarifying, we ask by email.",
    page: "services",
  },
  {
    question: "Do I need to get on a call?",
    answer:
      "No. Every engagement can run entirely over email. The intake form asks how you would rather be reached — a call is available, never required.",
    page: "services",
  },
  {
    question: "What happens after the audit?",
    answer:
      "The report stands alone. Fix the items yourself, hand the report to your developer, or have Saltwater Studio implement it as a scoped sprint — your call, no obligation either way.",
    page: "services",
  },
  {
    question: "What does the AI-Managed Presence retainer cover?",
    answer:
      "The monthly work that keeps rankings, profiles, and AI answers current after the fixes land: Google Business Profile management, schema and content-signal upkeep, monitoring what AI assistants say about the business, and a written monthly report of what moved. Quote-based, scoped to the business.",
    page: "services",
  },
  {
    question: "Where should a business start?",
    answer:
      "With whichever repetitive task costs the most hours, or with the phone. Strategy is the right first step when nobody has mapped how work moves through the business yet; automation or an agent is the right first step when the bottleneck is already obvious.",
    page: "services",
  },
  {
    question: "Do you work with businesses outside the Gulf Coast?",
    answer:
      "Yes. Saltwater Studio works with local businesses across the United States; the Gulf Coast, from Gulf Shores, Alabama to Panama City, Florida, is home base, not a limit.",
    page: "services",
  },
  // ai-strategy slug
  {
    question: "What is an AI strategy for a small business?",
    answer:
      "A map of how work actually moves through the business, an inventory of every repetitive task ranked by the hours it costs, and a call on each one: build it, buy it, or leave it alone. It ends in a sequenced roadmap, cheapest reversible wins first.",
    page: "ai-strategy",
  },
  {
    question: "How do I know which tasks are worth automating?",
    answer:
      "Rank by frequency times time. A ten-minute task done twenty times a week costs more than a two-hour task done monthly. Then subtract anything where the real problem is a bad form, a missing handoff, or a report nobody reads — those get fixed, not automated.",
    page: "ai-strategy",
  },
  {
    question: "What do I get at the end?",
    answer:
      "A document, not a subscription. It names the processes, what each costs in hours, what a fix looks like, and what order to do them in. If you hand it to a different builder it still works — that is the test it has to pass.",
    page: "ai-strategy",
  },
  {
    question: "Do I have to buy the build too?",
    answer:
      "No. Strategy stands on its own and is written so someone else can execute it. Plenty of businesses take the roadmap and do the first phase in-house.",
    page: "ai-strategy",
  },
  // ai-automation slug
  {
    question: "What is AI automation?",
    answer:
      "Software that carries a repetitive business process from start to finish on its own — reading an inquiry, pulling what it needs from your records, drafting the reply, scheduling the follow-up, filing the result — and escalating to a person when something falls outside what it should decide.",
    page: "ai-automation",
  },
  {
    question: "What is the difference between an AI automation and an AI workflow?",
    answer:
      "An automation fires on a trigger and does one job. A workflow carries a whole path from first touch to finished outcome, with the judgment calls handled along the way and exceptions escalated. In practice a business wants the workflow — one notification instead of six tasks.",
    page: "ai-automation",
  },
  {
    question: "What can actually be automated in a local business?",
    answer:
      "New inquiry to booked job without retyping anything. Quote request to sent estimate, priced from your own numbers. Completed job to invoice, review request, and follow-up. Inbox and voicemail sorted by what needs you today. Weekly numbers assembled and sent without anyone building a report.",
    page: "ai-automation",
  },
  {
    question: "What happens when an automation breaks?",
    answer:
      "It says so. Every build includes failure handling that notifies a person rather than failing silently, because a quiet automation that stopped working three weeks ago is worse than never having built it.",
    page: "ai-automation",
  },
  {
    question: "Will I be locked into you afterward?",
    answer:
      "No. Every build ships with documentation of what it does, where it runs, what it costs to run, and how to turn it off — all in accounts you own. Ongoing maintenance is a separate conversation and always your call.",
    page: "ai-automation",
  },
  // ai-agents slug
  {
    question: "What is an AI agent for a business?",
    answer:
      "A front end that talks to customers — by text, chat, or voice — using your real pricing, policies, and calendar. It answers the routine questions, books what it can, and hands off to a person the moment something needs judgment.",
    page: "ai-agents",
  },
  {
    question: "What is missed-call text-back?",
    answer:
      "When a call goes unanswered, the caller gets a text within seconds with a real answer and a way to book, instead of a voicemail nobody checks. A local business that misses a call usually loses that customer to whoever picks up next, so this is often the first thing worth building.",
    page: "ai-agents",
  },
  {
    question: "Will it sound like a robot to my customers?",
    answer:
      "It gets tuned to how you already talk to customers, and it is scoped to say \"let me get Travis on this\" rather than guess. An agent that confidently invents an answer costs more than the missed call did, so the boundaries are most of the work.",
    page: "ai-agents",
  },
  {
    question: "Can it book appointments on my calendar?",
    answer:
      "Yes — into the calendar you already use, with the rules you already follow about lead time, service area, and what needs a person to confirm first.",
    page: "ai-agents",
  },
  // web-design slug
  {
    question: "What do you build websites with?",
    answer:
      "Custom Next.js with built-in schema, fast loading, and clean code you own — not a page-builder or a template. That is what makes a site you do not have to rebuild in two years, and what lets automation get added later without starting over.",
    page: "web-design",
  },
  {
    question: "Will my site be fast?",
    answer:
      "Yes — speed is built in, not added later. Static-first rendering, optimized images, and a tight script budget keep load times low, which is what both Google ranking and conversion depend on.",
    page: "web-design",
  },
  {
    question: "Do I own the site and the code?",
    answer:
      "Completely. The domain, the code, and the accounts are in your name. Saltwater Studio works as your manager, never your landlord.",
    page: "web-design",
  },
  // seo-aeo-geo slug
  {
    question: "What is SEO and why does it matter for my business?",
    answer:
      "SEO (search engine optimization) is the practice of making your website findable when potential customers search for what you offer. For a local business, ranking on Google can be the difference between a full calendar and an empty one. Saltwater Studio builds SEO into every site from day one — not as an add-on.",
    page: "seo-aeo-geo",
  },
  {
    question: "What is AEO and how is it different from SEO?",
    answer:
      "AEO (answer engine optimization) targets featured snippets, People Also Ask boxes, and voice results — the places where Google and AI search quote a direct answer rather than list a link. Saltwater Studio writes every service page and FAQ answer-first so they can be cited directly.",
    page: "seo-aeo-geo",
  },
  {
    question: "Will my website appear in AI search results like ChatGPT or Perplexity?",
    answer:
      "AI search tools like ChatGPT, Perplexity, and Google AI Overviews pull from indexed web pages and entity signals. Saltwater Studio configures llms.txt, allows all AI crawlers, and builds the entity consistency (name, location, services, schema) that AI models need to cite your business accurately.",
    page: "seo-aeo-geo",
  },
  // google-presence slug
  {
    question: "What is Google Business Profile management?",
    answer:
      "Someone runs your Google listing for you every month: posting updates with your own job photos, answering every review, keeping hours and services correct, and reporting the calls and clicks the profile brought in. Google Care is Saltwater Studio's version of that service, and it is quoted per business.",
    page: "google-presence",
  },
  {
    question: "Will this help me show up in 'near me' searches?",
    answer:
      "That is the goal. A complete Business Profile with facts that match across the web is what Google and AI assistants reward when someone asks for a nearby recommendation.",
    page: "google-presence",
  },
  {
    question: "Do I have to give up control of my Google profile?",
    answer:
      "No. You add Saltwater Studio as a Manager, and you stay the owner. You can see everything we post and remove our access at any time without changing the listing.",
    page: "google-presence",
  },
  {
    question: "Do I need a storefront for a Business Profile?",
    answer:
      "No. Service-area businesses can run a Business Profile with the address hidden and the areas you serve listed, as long as you meet customers in person somewhere you operate.",
    page: "google-presence",
  },
  // social-content slug
  {
    question: "What does the social and content work cover?",
    answer:
      "The weekly engine — posts, profile activity, and the content that keeps your business visible everywhere a customer checks you out before they call.",
    page: "social-content",
  },
  {
    question: "Do I have to post it myself?",
    answer:
      "No — that is the point of the managed engine. Saltwater Studio runs the weekly cadence, or hands you a clean system to run yourself if you would rather.",
    page: "social-content",
  },
  {
    question: "How does content actually help me get found?",
    answer:
      "Consistent, specific content is what search engines and AI tools read to understand who you are. Stale or generic profiles are nearly invisible to a model; real, specific activity is what gets you named in a recommendation.",
    page: "social-content",
  },
  // ai-receptionist slug
  {
    question: "What is an AI receptionist?",
    answer:
      "A system that picks up where your phone leaves off. When you miss a call, it texts the caller back within seconds, asks what they need, and sends you the details. After hours it can answer the call itself. It works from your real hours, service area, and policies, and hands off to you when a caller needs a person.",
    page: "ai-receptionist",
  },
  {
    question: "Do I have to change my phone number?",
    answer:
      "No. Your customers keep calling the number they already have. The receptionist only steps in when a call goes unanswered or comes in after hours.",
    page: "ai-receptionist",
  },
  {
    question: "Is an AI receptionist cheaper than an answering service?",
    answer:
      "For most small businesses, yes, because it only works the calls you miss and it never puts a caller on hold. It is quoted per business based on call volume and whether you want after-hours voice answering or text-back only.",
    page: "ai-receptionist",
  },
  {
    question: "What happens if a caller asks something it can't answer?",
    answer:
      "It says so, tells the caller a person will follow up, and sends you the conversation. It never quotes a price or promises a time it has not been given.",
    page: "ai-receptionist",
  },
];

export function getFaqsByPage(page: FAQ["page"]): FAQ[] {
  return faqs.filter((f) => f.page === page);
}
