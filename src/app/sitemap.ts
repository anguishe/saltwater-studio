import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { getLiveProjects } from "@/data/projects";

const SITE_LAUNCH_DATE = "2026-06-15";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: SITE_LAUNCH_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/book`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly", priority: 0.2 },
    // /thanks is noIndex — excluded from sitemap
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Live case studies only — the permission gate keeps preview projects out.
  const workRoutes: MetadataRoute.Sitemap = getLiveProjects().map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes];
}
