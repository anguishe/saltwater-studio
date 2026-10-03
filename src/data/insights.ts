// Insights — articles written from real Saltwater Studio work. Every claim here
// traces to a real build, a real index report, or a real audit pattern. Nothing
// is invented, and no client metric appears without being already public on the
// portfolio page for that client (PORTFOLIO §0).

export interface InsightSection {
  /** Rendered as an H2. Literal questions where natural (SEO.md §4). */
  heading: string;
  /** One or more paragraphs. Answer-first — the first sentences fully answer the heading. */
  body: string[];
  /** Optional bullet list under the paragraphs. */
  points?: string[];
}

export interface Insight {
  slug: string;
  /** H1 — can run longer than the <title>. */
  headline: string;
  /** <title> body; ≤ 41 chars (check-meta.mjs adds the 19-char brand suffix). */
  seoTitle: string;
  /** 150–160 chars. */
  metaDescription: string;
  /** ISO date — real publish date, drives sitemap lastModified and Article schema. */
  datePublished: string;
  dateModified?: string;
  /** Answer-first standfirst under the H1. Also the list-page summary. */
  summary: string;
  sections: InsightSection[];
  /** Prose lead-in for the closing internal links. */
  linksLead: string;
  links: { href: string; label: string }[];
}

export const insights: Insight[] = [
  {
    slug: "why-your-business-doesnt-show-up-in-chatgpt",
    headline: "Why your business doesn't show up in ChatGPT",
    seoTitle: "Why You Don't Show Up in ChatGPT",
    metaDescription:
      "AI assistants recommend businesses they can read and verify: a Bing-indexed site, real schema, a managed Google profile. How they choose, and how to get picked.",
    datePublished: "2026-10-02",
    summary:
      "ChatGPT, Copilot, and the other assistants recommend businesses they can read and verify. If your site isn't indexed where they look, has no structured data, and your Google Business Profile is thin, you don't exist to them — no matter how good the work is.",
    sections: [
      {
        heading: "How does ChatGPT decide which businesses to recommend?",
        body: [
          "When someone asks an AI assistant for \"a plumber near Destin\" or \"who builds websites for small businesses,\" the assistant doesn't search its memory of the whole internet. It pulls from a live search index — ChatGPT and Copilot lean heavily on Bing's — then reads the pages it finds and picks the ones it can quote with confidence.",
          "That means three filters run before your business can be the answer: the index has to contain your site, the page has to say plainly what you do and where, and other sources — your Google Business Profile, directories, reviews — have to agree with it. Fail any one filter and the assistant moves on to a competitor who passes all three.",
        ],
      },
      {
        heading: "Why isn't my website in the index AI assistants use?",
        body: [
          "Usually because nobody ever told Bing it exists. Most small-business sites get submitted to Google Search Console — maybe — and stop there. Bing Webmaster Tools is skipped so often that we treat it as the first thing to check in an audit, and it's the index half of AI search runs on.",
          "We watched this play out on our own project. BashSnippets, a command-line reference site we run, spent months with Google barely touching it. Bing indexed it, and Microsoft Copilot went on to cite its pages more than a hundred times. Same site, same content — the difference was which index could see it. If we had treated Google as the only search engine that matters, that site would be invisible in AI search today.",
        ],
      },
      {
        heading: "What does an AI assistant need to read on the page?",
        body: [
          "Plain answers in the visible text, and structured data underneath it. An assistant quoting a business wants a sentence it can lift: who you are, what you do, where you do it. If your homepage opens with a slogan and a stock photo, there is nothing to lift.",
          "Underneath the copy, schema markup — LocalBusiness, Service, FAQ — tells the machine the same facts in a format it doesn't have to guess at. Every site we build ships with it from the first commit, because retrofitting it later is the most common line item in our audits.",
        ],
        points: [
          "One sentence near the top that states the business, the service, and the area — written to be quoted",
          "Schema.org markup that matches the visible text exactly",
          "A page per service, so \"who does X\" has a page about X to land on",
          "Consistent name, phone, and area across the site, Google profile, and directories",
        ],
      },
      {
        heading: "Does my Google Business Profile affect AI answers?",
        body: [
          "Yes, heavily. Assistants cross-check what your site claims against public sources, and the Google Business Profile is the loudest one. A profile with current hours, real photos, answered reviews, and the right categories corroborates your site. An unclaimed or abandoned profile contradicts it — and in local queries, the profile often is the answer: AI tools summarize map results directly.",
          "This is why our monthly Google Care work exists. The profile isn't a set-and-forget listing; it's the second half of how machines decide you're real.",
        ],
      },
      {
        heading: "What should I do first?",
        body: [
          "Find out what the machines currently believe about your business. Ask ChatGPT and Copilot what your company does, search your business name in Google and Bing, and look at your profile the way a stranger would. The gaps you find are the to-do list, in priority order: get indexed in both engines, make the site answer plainly, fix the profile, then keep all three telling the same story.",
        ],
      },
    ],
    linksLead: "This is exactly the gap our audit measures — see",
    links: [
      { href: "/services#audit", label: "the Google & AI Visibility Audit" },
      { href: "/services/seo-aeo-geo", label: "the SEO, AEO & GEO service" },
      { href: "/work/bash-snippets", label: "the BashSnippets case study" },
    ],
  },
  {
    slug: "what-earned-100-copilot-citations",
    headline: "What earned a small content site 100+ Copilot citations",
    seoTitle: "100+ Copilot Citations: What Worked",
    metaDescription:
      "Microsoft Copilot has cited our BashSnippets pages more than 100 times. What earned it: one answer per page, answer-first writing, schema, and Bing.",
    datePublished: "2026-10-02",
    summary:
      "Microsoft Copilot has cited pages from BashSnippets, our command-line reference site, more than a hundred times. Nothing about the site is clever — the citations come from structure: one complete answer per page, the answer stated first, schema under every article, and being indexed where Copilot actually looks.",
    sections: [
      {
        heading: "What is BashSnippets and why does it matter here?",
        body: [
          "BashSnippets is a site we run that documents shell commands — each page covers one task, shows the command, and explains what it does. It's our own project, which makes it our most honest lab: every experiment, every mistake, and every index report is ours to publish. When we tell a client what makes content quotable to an AI assistant, this site is where we learned it.",
        ],
      },
      {
        heading: "Why does Copilot cite some pages and ignore others?",
        body: [
          "Copilot cites pages it can quote safely: a page whose title promises one specific answer and whose first lines deliver it. Our pages that get cited share a shape — the task in the title, the command immediately, the explanation after. A reader in a hurry and a language model assembling an answer want the same thing: the answer first.",
          "Pages that bury the answer under an introduction, or cover five loosely related things at once, give an assistant nothing safe to lift. It can't tell which paragraph is the answer, so it quotes a page that makes the answer obvious instead.",
        ],
        points: [
          "One page, one question, one complete answer",
          "The answer in the first lines — elaboration after, never before",
          "A title that states the task in the words someone would ask it",
          "Schema on every page, so the machine knows what kind of content it's reading",
        ],
      },
      {
        heading: "How much did Bing matter?",
        body: [
          "It was the whole ballgame. Google took months to warm up to the site while Bing indexed it early — and Copilot runs on Bing's index. More than a hundred citations accumulated from an index most site owners never submit to. If we had measured success only in Google rankings, we would have called the site a failure during the exact period an AI assistant was quoting it daily.",
          "The lesson transfers directly to local businesses: the person asking Copilot or ChatGPT to recommend a company near them is served from the same kind of index. Being absent from Bing means being absent from those answers.",
        ],
      },
      {
        heading: "What does this mean for a local business website?",
        body: [
          "The same structure that earns a technical site citations earns a service business recommendations. A page per service, opening with a plain statement of what you do and where. Questions your customers actually ask, answered fully in the first paragraph. Schema that repeats the facts in machine-readable form. Indexed in Google and Bing both.",
          "None of it is exotic. It's carpentry — done once, correctly, in the structure of the site. That's why we build it in from the first commit instead of selling it as a bolt-on later.",
        ],
      },
    ],
    linksLead: "The full story is on the portfolio — see",
    links: [
      { href: "/work/bash-snippets", label: "the BashSnippets case study" },
      { href: "/services/seo-aeo-geo", label: "the SEO, AEO & GEO service" },
      { href: "/insights/why-your-business-doesnt-show-up-in-chatgpt", label: "why businesses miss from ChatGPT answers" },
    ],
  },
  {
    slug: "what-the-google-ai-visibility-audit-covers",
    headline: "What the Google & AI Visibility Audit actually covers",
    seoTitle: "What the $50 Visibility Audit Covers",
    metaDescription:
      "The $50 Google & AI Visibility Audit, explained: what we check across your Google profile, website, schema, and AI-assistant presence — and what you get back.",
    datePublished: "2026-10-02",
    summary:
      "The audit is a written report on how your business looks to Google, Bing, and the AI assistants — your Google Business Profile, your website's technical health, its structured data, and whether ChatGPT and Copilot can find you at all. Delivered within 72 hours, fully async, $50 through October 31 (regularly $150).",
    sections: [
      {
        heading: "What do you check in the audit?",
        body: [
          "Five layers, in the order a customer's search actually hits them. Your Google Business Profile: categories, hours, photos, reviews, and whether the profile matches your website. Your website itself: speed, mobile rendering, titles, and whether each service you sell has a page that can rank for it. The technical layer: indexing status in Google and Bing, sitemap health, and crawl errors. Structured data: whether schema exists, whether it's valid, and whether it matches the visible page. And the AI layer: what ChatGPT and Copilot currently say when asked about your business and your category in your area.",
        ],
        points: [
          "Google Business Profile — completeness, categories, photos, review signals",
          "Website — speed, mobile, titles, service-page coverage",
          "Technical SEO — Google and Bing indexing, sitemap, crawl health",
          "Schema — present, valid, consistent with the page",
          "AI presence — what the assistants answer today, and why",
        ],
      },
      {
        heading: "What do I get back?",
        body: [
          "A written report you can act on with or without us: what's broken, what it costs you, and the fix list in priority order. The findings are specific — the actual missing categories, the actual pages that aren't indexed, the actual schema errors — not a score out of 100 with a sales pitch under it.",
          "It runs fully async. No call required, nothing to install, nothing to grant access to. You send your business name and website; the report comes back within 72 hours.",
        ],
      },
      {
        heading: "Why is it $50?",
        body: [
          "It's $50 through October 31, 2026 — the regular price is $150. The audit is the first rung of how we work: most owners don't need a sales conversation, they need to see exactly what a machine sees when it evaluates their business. Some fix the list themselves. Some hand it back to us to implement. Both outcomes are fine, which is why the report is written to stand on its own.",
        ],
      },
      {
        heading: "Who is it for?",
        body: [
          "A local business that gets found by word of mouth but not by search. An owner who suspects the website isn't pulling its weight but can't point to why. Anyone who has asked ChatGPT about their own business and didn't like the answer — or got none. If you already rank first for everything you care about in Google, Bing, and the assistants, you don't need it.",
        ],
      },
    ],
    linksLead: "Ready when you are — see",
    links: [
      { href: "/services#audit", label: "the audit offer" },
      { href: "/contact", label: "the quote form for everything else" },
    ],
  },
  {
    slug: "local-seo-lessons-from-a-moving-company",
    headline: "Local SEO lessons from a four-person moving company",
    seoTitle: "Local SEO Lessons From a Moving Company",
    metaDescription:
      "What Beach House Moving's build taught us about local SEO: own the geography page by page, schema from day one, and treat the Google profile as half the job.",
    datePublished: "2026-10-02",
    summary:
      "Beach House Moving is a four-person, owner-operated mover on the Emerald Coast. Building and running its search presence taught us more about local SEO than any case study we'd read — because every lesson had a phone number attached to it. The homepage climbed onto page one in its home market, and the lessons below are why.",
    sections: [
      {
        heading: "Why does one page per area beat one page listing every area?",
        body: [
          "Because the search happens in a specific place. The person moving out of a beach town searches their town's name, and a page that genuinely covers that place — the access quirks, the gated communities, the buildings a box truck can't reach — beats a homepage that lists twenty towns in a comma-separated sentence.",
          "The key word is genuinely. Beach House's service-area pages are written from the crew's real job knowledge, not a find-and-replace on the city name. Google has seen a million doorway pages; what it rewards is the page that reads like it was written by someone who has actually worked there. That's also precisely what an AI assistant can quote.",
        ],
      },
      {
        heading: "What did schema actually do for a moving company?",
        body: [
          "It removed the guesswork. LocalBusiness and service-area markup tell Google and the AI assistants exactly what the company does, where it operates, and how to reach it — in a format that can't be misread. The visible pages persuade people; the schema confirms the same facts to machines. Rankings in the home market followed the combination, not either half alone.",
        ],
      },
      {
        heading: "Is the Google Business Profile really half the job?",
        body: [
          "For a local service business, yes. The profile is what shows in the map results, where a large share of \"mover near me\" searches end. Beach House's profile gets monthly care: posts built from the crew's own job photos, every review answered, hours and services kept current. Calls from the profile climbed alongside the site's rankings — and the two reinforce each other, because a consistent site and profile corroborate each other to every machine that checks.",
          "The part most owners miss: this is recurring work, not setup. A profile that went quiet eight months ago tells Google the business might have, too.",
        ],
      },
      {
        heading: "What transfers to other local businesses?",
        body: [
          "Almost all of it. The specifics were moving-company specifics, but the structure is universal.",
        ],
        points: [
          "A real page for every area you want to win, written from job knowledge",
          "Schema from the first commit — LocalBusiness, Service, and the service-area map",
          "A Google profile treated as a monthly operation, not a listing",
          "Call and quote paths one tap away on every page, because ranking without converting is decoration",
        ],
      },
    ],
    linksLead: "The build itself is on the portfolio — see",
    links: [
      { href: "/work/beach-house-moving", label: "the Beach House Moving case study" },
      { href: "/services/google-presence", label: "monthly Google profile care" },
      { href: "/services/web-design", label: "the website build" },
    ],
  },
  {
    slug: "llms-txt-and-schema-in-plain-english",
    headline: "llms.txt and schema, explained in plain English",
    seoTitle: "llms.txt and Schema, in Plain English",
    metaDescription:
      "Two files most business sites are missing: schema that tells machines what you do, and llms.txt that briefs AI assistants directly. Explained in plain terms.",
    datePublished: "2026-10-02",
    summary:
      "Schema is a block of structured facts hidden in your pages that tells Google and AI assistants what your business is, in a format they can't misread. llms.txt is a plain-text briefing file for AI crawlers at yoursite.com/llms.txt. Neither is visible to your customers; both decide how machines describe you.",
    sections: [
      {
        heading: "What is schema markup?",
        body: [
          "Schema is a standardized list of facts embedded in a page's code: this is a business, here is its name, phone, and city, these are its services, these are its FAQ answers. Search engines and AI assistants read it directly instead of inferring those facts from your paragraphs — and inference is where machines get things wrong.",
          "When a result shows review stars, FAQ dropdowns, or a complete business card in the sidebar, schema put it there. When an AI assistant states your hours or services correctly, schema is usually why. It has one hard rule: it must match the visible page. Schema that claims what the page doesn't show gets ignored at best.",
        ],
      },
      {
        heading: "What is llms.txt?",
        body: [
          "A plain-text file at yoursite.com/llms.txt that briefs AI systems on your site: who you are, what you offer, which pages matter, how to reach you. Where schema annotates each page, llms.txt summarizes the whole site in one place an AI crawler checks first.",
          "It's a young convention — not every AI system reads it yet. But it costs one text file, the systems that do read it get your story straight from you, and ours is live at saltwaterstudio.xyz/llms.txt if you want to see the format: the same entity sentence we use everywhere, every service with its URL, the portfolio, the contact paths.",
        ],
      },
      {
        heading: "Why does consistency matter more than either file?",
        body: [
          "Machines decide what's true by cross-checking. Your site, your schema, your llms.txt, your Google Business Profile, and the directories all describe your business — and when the descriptions disagree, the machine's confidence drops and it hedges or picks a competitor it's surer about.",
          "This is why we keep one canonical set of facts and repeat it verbatim everywhere: same name, same phone, same city, same sentence describing what the business does. Boring by design. Confidence is built out of repetition without contradiction.",
        ],
      },
      {
        heading: "Do I need to do this myself?",
        body: [
          "No — but someone does, and it should be whoever builds or maintains your site. If you're having a site built, ask the builder two questions: \"what schema ships with it?\" and \"will it be submitted to Google and Bing both?\" The answers tell you quickly whether machines were part of the plan or an afterthought. On our builds the answer is in the included list, in writing.",
        ],
      },
    ],
    linksLead: "Related reading and the services that implement all of this — see",
    links: [
      { href: "/insights/why-your-business-doesnt-show-up-in-chatgpt", label: "why businesses miss from ChatGPT answers" },
      { href: "/services/seo-aeo-geo", label: "the SEO, AEO & GEO service" },
      { href: "/services/web-design", label: "the website build" },
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
