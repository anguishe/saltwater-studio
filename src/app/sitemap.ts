import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { getLiveProjects } from "@/data/projects";
import { insights } from "@/data/insights";
import { locations } from "@/data/locations";

// One date for the evergreen routes; bump it when content ships.
// Insights carry their own real dates (the site grew a blog — the upgrade the old note promised).
const LAST_UPDATED = "2026-10-02";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/insights`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/services`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/websites`, lastModified: "2026-10-03", changeFrequency: "monthly", priority: 0.9 },
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

  const insightRoutes: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${site.url}/insights/${i.slug}`,
    lastModified: i.dateModified ?? i.datePublished,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${site.url}/${l.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes, ...locationRoutes];
}
