import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies and portfolio from Saltwater Studio — web design and SEO for service businesses across the United States.",
  path: "/work",
});

const breadcrumbs = [
  { name: "Home", url: site.url },
  { name: "Work", url: `${site.url}/work` },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              Selected work
            </h1>
            <p className="mt-4 text-foam/60 max-w-xl">
              Saltwater Studio builds websites for service businesses — schema-first, tracking-configured, built to rank.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <article className="group relative overflow-hidden rounded-lg bg-marine/20 border border-marine/30 hover:border-shoal/50 transition-colors">
                  <div className="relative aspect-[16/10] overflow-hidden bg-abyss">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.result}`}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    {project.permission === "preview" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-abyss/60">
                        <span className="font-mono text-xs tracking-widest text-foam/50 uppercase">
                          Private Preview
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs tracking-widest text-shoal/60 uppercase">
                      {project.category}
                    </p>
                    <h2 className="mt-1 font-display text-lg text-foam">{project.title}</h2>
                    <p className="mt-2 text-sm text-foam/50">{project.result}</p>
                    {project.permission === "live" && (
                      <Link
                        href={`/work/${project.slug}`}
                        className="mt-4 inline-block text-sm text-shoal hover:text-glow transition-colors"
                      >
                        View case study →
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
