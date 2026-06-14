export type Permission = "live" | "preview";

export interface Project {
  slug: string;
  title: string;
  category: string;
  result: string;
  image: string;
  permission: Permission;
  url?: string; // only populated when permission === "live"
}

export const projects: Project[] = [
  {
    slug: "beach-house-moving",
    title: "Beach House Moving",
    category: "Moving Company",
    result: "Schema-first site with GBP integration — ranked for local moving terms in 60 days.",
    image: "/images/projects/beach-house-moving.jpg",
    permission: "live",
    url: "https://beachhousemoving.com",
  },
  {
    slug: "kais-run",
    title: "Kai's Run",
    category: "Endurance Events",
    result: "Event brand site with full schema, tracking, and registration flow.",
    image: "/images/projects/kais-run.jpg",
    permission: "live",
    url: "https://kaisrun.com",
  },
  {
    slug: "bash-snippets",
    title: "BashSnippets",
    category: "Developer Tool",
    result: "Next.js SaaS with subscription billing and CLI tooling.",
    image: "/images/projects/bash-snippets.jpg",
    permission: "live",
    url: "https://bashsnippets.xyz",
  },
  {
    slug: "watervue",
    title: "WaterVue",
    category: "Property Services",
    result: "Private preview — modern service site with booking integration.",
    image: "/images/projects/watervue.jpg",
    permission: "preview",
  },
  {
    slug: "aquamarine",
    title: "Aquamarine",
    category: "Hospitality",
    result: "Private preview — immersive hospitality brand experience.",
    image: "/images/projects/aquamarine.jpg",
    permission: "preview",
  },
  {
    slug: "alexander-hines",
    title: "Alexander Hines",
    category: "Professional Services",
    result: "Private preview — attorney / professional services brand.",
    image: "/images/projects/alexander-hines.jpg",
    permission: "preview",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getLiveProjects(): Project[] {
  return projects.filter((p) => p.permission === "live");
}
