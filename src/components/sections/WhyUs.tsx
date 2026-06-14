import Reveal from "@/components/ui/Reveal";

const claims = [
  {
    title: "Schema & entity built in",
    body: "Not added at the end. Every page ships with structured data validated on Rich Results Test. Your site tells Google exactly what you do, for whom, and where.",
  },
  {
    title: "You own everything",
    body: "Domain, hosting, analytics, every account — in your name, under your email, with your billing. Saltwater does the work; you hold the keys.",
  },
  {
    title: "One canonical fact set",
    body: "Your name, location, services, and entity facts are the same on the site, in schema, in llms.txt, and on every profile. No contradictions for Google to ignore.",
  },
  {
    title: "No template you’ll outgrow",
    body: "Custom Next.js. Not Wix, not Squarespace, not a WordPress theme with a dozen plugins. Built for performance, built to last, built to rank.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-24 px-6 bg-marine/10" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            05 / Why Saltwater
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="why-heading"
            className="font-display text-3xl text-foam md:text-4xl max-w-2xl"
          >
            Depth, by design.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {claims.map((claim, i) => (
            <Reveal key={claim.title} delay={i * 0.07}>
              <div className="rounded-lg border border-marine/40 p-6 hover:border-shoal/40 transition-colors">
                <h3 className="font-display text-lg text-foam">{claim.title}</h3>
                <p className="mt-3 text-foam/60">{claim.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
