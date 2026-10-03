import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

// Verbatim client recommendations (src/data/testimonials.ts — provenance there).
// Renders nothing if the list is ever empty: no quotes, no section.
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-ink py-24 px-6" aria-label="Client recommendations">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-shoal uppercase mb-4">
            In their words
          </p>
          <h2 className="font-display text-3xl text-foam md:text-4xl">
            What clients say
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.08 + i * 0.05}>
              <figure className="h-full rounded-lg border border-marine/30 bg-marine/10 p-8">
                <blockquote className="text-foam/70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-foam font-semibold">{t.name}</p>
                  <p className="mt-1 font-mono text-xs text-foam-subtle">
                    {t.source}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
