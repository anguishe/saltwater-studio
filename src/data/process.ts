export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Intake & Strategy",
    body: "A 45-minute call to understand your business, your customers, and what winning looks like. We leave with a defined scope, target phrases, and the entity facts that will anchor every page.",
  },
  {
    index: "02",
    title: "Schema & Tracking — First",
    body: "Before a line of visible code is written, we configure GA4, GTM, and the schema stack. Competitors skip this step. We don't — which is why you're not rebuilding in two years.",
  },
  {
    index: "03",
    title: "Design & Build",
    body: "Custom Next.js build, mobile-first, accessibility built in. Every section is a component; every component is a performance decision. No templates, no theme-shop shortcuts.",
  },
  {
    index: "04",
    title: "Launch & Index",
    body: "Pre-launch SEO audit, GSC and Bing Webmaster submission, IndexNow ping on deploy. We don't call it done until the search engines know it's live.",
  },
  {
    index: "05",
    title: "Grow",
    body: "Monthly reporting, content that feeds the entity, and the data to know what's working. The site is an asset — we treat it like one.",
  },
];
