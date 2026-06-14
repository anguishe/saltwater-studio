import type { Metadata } from "next";
import Link from "next/link";
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
    description:
      project.metaDescription ??
      `Case study: ${project.result} — a Saltwater Studio web design project.`,
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

          {project.challenge && (
            <Reveal delay={0.16}>
              <h2 className="mt-16 font-display text-2xl text-foam">The challenge</h2>
              <p className="mt-4 text-foam/70">{project.challenge}</p>
            </Reveal>
          )}

          {project.approach && (
            <Reveal delay={0.18}>
              <h2 className="mt-12 font-display text-2xl text-foam">The approach</h2>
              <p className="mt-4 text-foam/70">{project.approach}</p>
            </Reveal>
          )}

          {project.outcome && (
            <Reveal delay={0.2}>
              <h2 className="mt-12 font-display text-2xl text-foam">What shipped</h2>
              <p className="mt-4 text-foam/70">{project.outcome}</p>
            </Reveal>
          )}

          {project.stack && project.stack.length > 0 && (
            <Reveal delay={0.22}>
              <h2 className="mt-12 font-display text-2xl text-foam">Stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-marine/40 px-3 py-1 font-mono text-xs text-foam/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {project.links && project.links.length > 0 && (
            <Reveal delay={0.24}>
              <p className="mt-12 text-foam/70">
                {project.linksLead}{" "}
                {project.links.map((link, i) => (
                  <span key={link.href}>
                    <Link
                      href={link.href}
                      className="text-shoal underline underline-offset-4 hover:text-glow"
                    >
                      {link.label}
                    </Link>
                    {i < project.links!.length - 1
                      ? i === project.links!.length - 2
                        ? ", or "
                        : ", "
                      : "."}
                  </span>
                ))}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.28}>
            <div className="mt-16 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/book" variant="primary">
                Book a strategy call
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Get a quote
              </ButtonLink>
            </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}
