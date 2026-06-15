import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema, buildCreativeWorkSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { site } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  if (project.permission === "preview") {
    return buildMetadata({
      title: project.title,
      description: `${project.result} — a Saltwater Studio concept.`,
      path: `/work/${slug}`,
      noIndex: true,
    });
  }
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

  if (!project) {
    notFound();
  }

  const isLive = project.permission === "live";

  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Work", url: `${site.url}/work` },
    { name: project.title, url: `${site.url}/work/${slug}` },
  ];

  return (
    <>
      {isLive && (
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
        </>
      )}

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

          {!isLive && (
            <Reveal delay={0.1}>
              <p className="mt-4 font-mono text-xs text-shoal/60">
                Concept project — a sample site built by Saltwater Studio to demonstrate this kind of business. Not a real company or client.
              </p>
            </Reveal>
          )}

          {project.url && (
            <Reveal delay={0.12}>
              <ButtonLink
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="mt-8"
              >
                {isLive ? "Visit site →" : "Visit the concept →"}
              </ButtonLink>
            </Reveal>
          )}

          {project.image && (
            <Reveal delay={0.15}>
              <div className="mt-12 relative aspect-video overflow-hidden rounded-lg border border-marine/30">
                <Image
                  src={project.image}
                  alt={project.alt ?? project.title}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 768px, 100vw"
                />
              </div>
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

          {project.gallery && project.gallery.length > 0 && (
            <Reveal delay={0.23}>
              <h2 className="mt-16 font-display text-2xl text-foam">A closer look</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-16/10 overflow-hidden rounded-lg border border-marine/30"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      loading="lazy"
                      className="object-cover object-top"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                ))}
              </div>
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
