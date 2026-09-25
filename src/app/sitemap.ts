import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { getLiveProjects } from "@/data/projects";

// ponytail: one date for every URL; bump it when content ships. Per-page dates if the site grows a blog.
const LAST_UPDATED = "2026-09-25";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    // /thanks is noIndex — excluded from sitemap
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Live case studies only — the permission gate keeps preview projects out.
  const workRoutes: MetadataRoute.Sitemap = getLiveProjects().map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes];
}
