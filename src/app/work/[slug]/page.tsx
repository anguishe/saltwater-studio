import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildCreativeWorkSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { projects, getProjectBySlug } from "@/data/projects";
import { site } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.permission === "live")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.permission !== "live") return {};
  return buildMetadata({
    title: project.title,
    description: `Case study: ${project.result} — a Saltwater Studio web design project.`,
    path: `/work/${slug}`,
  });
}

export default async function WorkSlugPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.permission !== "live") {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Work", url: `${site.url}/work` },
    { name: project.title, url: `${site.url}/work/${slug}` },
  ];

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildCreativeWorkSchema({
          name: project.title,
          url: project.url ?? `${site.url}/work/${slug}`,
          description: project.result,
          slug,
        })}
      />

      <div className="pt-32 pb-24 px-6 bg-ink">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-2">
              {project.category}
            </p>
            <h1 className="font-display text-4xl text-foam md:text-5xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-lg text-foam/70">{project.result}</p>
          </Reveal>

          {project.url && (
            <Reveal delay={0.12}>
              <ButtonLink
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="mt-8"
              >
                Visit site →
              </ButtonLink>
            </Reveal>
          )}

          {/* TODO: expand with full case study content */}
          <Reveal delay={0.16}>
            <div className="mt-16 rounded-lg border border-marine/30 p-8 bg-marine/10">
              <p className="font-mono text-xs tracking-widest text-foam/30 uppercase">
                Full case study — coming soon
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
