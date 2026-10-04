import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Permissive: allow all AI crawlers per DPOS 12 / SEO.md §6 (SW-031).
// A crawler that matches a named group ignores the `*` group, so every group repeats
// the /api/ disallow. /thanks is NOT disallowed: it carries noindex, and a robots-blocked
// URL can't have its noindex read.
const AI_AND_SEARCH_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_AND_SEARCH_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
