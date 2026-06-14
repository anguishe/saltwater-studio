import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-ink" aria-labelledby="process-heading">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            04 / The Method
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="process-heading"
            className="font-display text-3xl text-foam md:text-4xl"
          >
            Right the first time.
          </h2>
          <p className="mt-4 text-foam/60 max-w-xl">
            Competitors skip steps 2 and 4. That&apos;s why their clients rebuild in two years.
          </p>
        </Reveal>

        <ol className="mt-16 space-y-0 divide-y divide-marine/20" aria-label="Our process">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.07}>
              <li className="grid grid-cols-[3rem_1fr] gap-6 py-8">
                <span
                  className="font-mono text-xs tracking-widest text-shoal uppercase mt-1"
                  aria-hidden="true"
                >
                  {step.index}
                </span>
                <div>
                  <h3 className="font-display text-lg text-foam">{step.title}</h3>
                  <p className="mt-2 text-foam/60">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
