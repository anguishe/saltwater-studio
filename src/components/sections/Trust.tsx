import Reveal from "@/components/ui/Reveal";

const proofs = [
  { label: "Nationwide" },
  { label: "Gulf Coast FL" },
  { label: "Est. 2025" },
  { label: "Next.js · Schema-First" },
];

export default function Trust() {
  return (
    <section
      className="bg-ink border-y border-marine/30 py-10 px-6"
      aria-label="Trust strip"
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <Reveal>
          <p className="text-center text-foam/70 md:text-left">
            Built for Google &middot; AI search &middot; and the people in between.
          </p>
        </Reveal>

        <ul className="flex flex-wrap justify-center gap-6 md:gap-10" aria-label="Studio facts">
          {proofs.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <li className="font-mono text-xs tracking-[0.2em] text-foam/40 uppercase">
                {p.label}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
