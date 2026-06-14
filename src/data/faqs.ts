export interface FAQ {
  question: string;
  answer: string;
  page: "home" | "services" | "web-design" | "seo-aeo-geo" | "google-presence" | "social-content";
}

export const faqs: FAQ[] = [
  {
    question: "What does Saltwater Studio do?",
    answer:
      "Saltwater Studio is a remote web-design studio that builds custom, search-optimized websites for service businesses nationwide, plus the SEO, AI-search, Google Business Profile, and social work that makes them found. Founded in 2025 on Florida's Gulf Coast.",
    page: "home",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Pricing is quote-based, because a five-page local site and a full presence program aren't the same job. The fastest way to a real number is a short strategy call or the quote form — most projects are scoped within a day.",
    page: "home",
  },
  {
    question: "Do you only work with Gulf Coast businesses?",
    answer:
      "No. Saltwater Studio works with service businesses across the United States; the Gulf Coast (Gulf Shores, AL to Miami, FL) is simply home base.",
    page: "home",
  },
  {
    question: "What's \"AEO\" and \"GEO,\" and why should I care?",
    answer:
      "AEO (answer-engine optimization) and GEO (generative-engine optimization) are how your business gets quoted by AI tools like ChatGPT, Google's AI answers, and Perplexity when someone asks for a recommendation. They reward consistent facts and clear, answer-first pages — which most template sites don't have.",
    page: "home",
  },
  {
    question: "Do I own my website and accounts?",
    answer:
      "Yes — completely. The domain, the code, the Google and analytics accounts are all in your name. Saltwater Studio works as your manager, never your landlord.",
    page: "home",
  },
  {
    question: "What do you build sites with?",
    answer:
      "Custom Next.js with built-in schema, fast loading, and clean code — not a page-builder or a template. That's what makes a site you don't have to rebuild in two years.",
    page: "home",
  },
  // services overview
  {
    question: "What does Saltwater Studio build?",
    answer:
      "Saltwater Studio builds custom websites for service businesses plus the search presence that makes them found — web design, SEO, AI search (AEO/GEO), Google Business Profile, and social content. Every site is custom Next.js, not a template, and pricing is quote-based.",
    page: "services",
  },
  {
    question: "How do I get a price?",
    answer:
      "Pricing is quote-based because a five-page local site and a full presence program aren't the same job. Tell us about the business on a short strategy call or the quote form, and most projects are scoped within a day.",
    page: "services",
  },
  {
    question: "Do you work with businesses outside the Gulf Coast?",
    answer:
      "Yes. Saltwater Studio works with service businesses across the United States; the Gulf Coast from Gulf Shores, Alabama to Miami, Florida is home base, not a limit.",
    page: "services",
  },
  // web-design slug
  {
    question: "What do you build websites with?",
    answer:
      "Custom Next.js with built-in schema, fast loading, and clean code you own — not a page-builder or a template. That's what makes a site you don't have to rebuild in two years.",
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
      "SEO (search engine optimization) is the practice of making your website findable when potential customers search for what you offer. For service businesses, ranking on Google can be the difference between a full calendar and an empty one. Saltwater Studio builds SEO into every site from day one — not as an add-on.",
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
    question: "What does Google presence include?",
    answer:
      "Google Business Profile setup and optimization, a review system that works, and the local-pack signals that decide whether you show up when someone searches nearby. It's the part of local search most template sites skip.",
    page: "google-presence",
  },
  {
    question: "Will this help me show up in 'near me' searches?",
    answer:
      "That's the goal. A complete Business Profile with facts that match across the web is what Google and AI assistants reward when someone asks for a nearby recommendation.",
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
      "No — that's the point of the managed engine. Saltwater Studio runs the weekly cadence, or hands you a clean system to run yourself if you'd rather.",
    page: "social-content",
  },
  {
    question: "How does content actually help me get found?",
    answer:
      "Consistent, specific content is what search engines and AI tools read to understand who you are. Stale or generic profiles are nearly invisible to a model; real, specific activity is what gets you named in a recommendation.",
    page: "social-content",
  },
];

export function getFaqsByPage(page: FAQ["page"]): FAQ[] {
  return faqs.filter((f) => f.page === page);
}
