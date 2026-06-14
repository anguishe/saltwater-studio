import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

const now = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/book`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    // /thanks is noIndex — excluded from sitemap
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.permission === "live")
    .map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
