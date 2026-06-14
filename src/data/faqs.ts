export interface FAQ {
  question: string;
  answer: string;
  page: "home" | "services" | "web-design" | "seo-aeo-geo";
}

export const faqs: FAQ[] = [
  {
    question: "How much does a website cost?",
    answer:
      "Saltwater Studio prices websites by scope, not by template tier. Every project is quoted after a strategy call so we understand what you actually need — tracking, schema, booking flow, and all. Request a quote to start that conversation.",
    page: "home",
  },
  {
    question: "How long does a website build take?",
    answer:
      "A typical Saltwater Studio site takes 4–6 weeks from signed agreement to live URL. The first week is intake and strategy; the build runs 3–4 weeks; the last week is QA, SEO validation, and launch. Complex projects (more pages, custom integrations) run longer.",
    page: "home",
  },
  {
    question: "Do you work with businesses outside the Gulf Coast?",
    answer:
      "Yes. Saltwater Studio serves service businesses across the United States. The studio is based on the Gulf Coast and maintains a local heartland (Gulf Shores, AL to Miami, FL), but every engagement is fully remote.",
    page: "home",
  },
  {
    question: "What makes Saltwater Studio different from other web designers?",
    answer:
      "Most small-business sites are rebuilt every two years because the first one had no schema, no tracking setup, and no entity strategy. Saltwater Studio ships the version you don't have to redo — schema-first, tracking live before launch, one canonical fact set that Google and AI search can quote.",
    page: "home",
  },
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
];

export function getFaqsByPage(page: FAQ["page"]): FAQ[] {
  return faqs.filter((f) => f.page === page);
}
