import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Permissive — allow all AI crawlers per DPOS 12 / SEO.md §6
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thanks", "/api/"],
      },
      // Explicitly allow AI crawlers (some check for explicit allow)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
