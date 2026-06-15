import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

export default function Portfolio() {
  return (
    <section id="work" className="py-24 px-6 bg-marine/10" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            03 / The Proof
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="portfolio-heading"
            className="font-display text-3xl text-foam md:text-4xl"
          >
            Selected work
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <article className="group relative overflow-hidden rounded-lg bg-marine/20 border border-marine/30 hover:border-shoal/50 transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden bg-abyss">
                  <Image
                    src={project.image}
                    alt={project.alt ?? `${project.title} — ${project.result}`}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {project.permission === "preview" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-abyss/60">
                      <span className="font-mono text-xs tracking-widest text-foam/50 uppercase">
                        Concept
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-mono text-xs tracking-widest text-shoal/60 uppercase">
                    {project.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-foam">{project.title}</h3>
                  <p className="mt-2 text-sm text-foam/50">{project.result}</p>
                  {project.permission === "live" && project.url && (
                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-4 inline-block text-sm text-shoal hover:text-glow transition-colors"
                    >
                      View case study →
                    </Link>
                  )}
                  {project.permission === "preview" && (
                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-4 inline-block text-sm text-shoal/60 hover:text-shoal transition-colors"
                    >
                      View concept →
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
