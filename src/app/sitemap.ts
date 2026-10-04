import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { getLiveProjects } from "@/data/projects";
import { insights } from "@/data/insights";
import { locations } from "@/data/locations";

// lastmod is per page and honest (SW-060): each record carries its own `dateModified`
// (initial values = the git last-commit date of that record). Standalone pages carry the
// git last-commit date of their page file; bump the date here when that page's copy
// changes. Hubs take the newest of their own date and their children's.
// priority/changefreq are left out: Google ignores both.
const PAGE_DATES = {
  home: "2026-10-03",
  work: "2026-10-03",
  insights: "2026-10-02",
  services: "2026-10-03",
  websites: "2026-10-03",
  about: "2026-10-02",
  contact: "2026-10-01",
  privacy: "2026-10-02",
};

const newest = (...dates: string[]) => dates.reduce((a, b) => (b > a ? b : a));

export default function sitemap(): MetadataRoute.Sitemap {
  const liveProjects = getLiveProjects();
  const insightDate = (i: (typeof insights)[number]) => i.dateModified ?? i.datePublished;

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: s.dateModified,
  }));

  // Live case studies only: the permission gate keeps preview projects out.
  const workRoutes: MetadataRoute.Sitemap = liveProjects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: p.dateModified,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${site.url}/insights/${i.slug}`,
    lastModified: insightDate(i),
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${site.url}/${l.slug}`,
    lastModified: l.dateModified,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: PAGE_DATES.home },
    { url: `${site.url}/work`, lastModified: newest(PAGE_DATES.work, ...liveProjects.map((p) => p.dateModified)) },
    { url: `${site.url}/insights`, lastModified: newest(PAGE_DATES.insights, ...insights.map(insightDate)) },
    { url: `${site.url}/services`, lastModified: newest(PAGE_DATES.services, ...services.map((s) => s.dateModified)) },
    { url: `${site.url}/websites`, lastModified: PAGE_DATES.websites },
    { url: `${site.url}/about`, lastModified: PAGE_DATES.about },
    { url: `${site.url}/contact`, lastModified: PAGE_DATES.contact },
    { url: `${site.url}/privacy`, lastModified: PAGE_DATES.privacy },
    // /thanks is noIndex: excluded from sitemap
  ];

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes, ...locationRoutes];
}
