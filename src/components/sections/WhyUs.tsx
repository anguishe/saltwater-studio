import Reveal from "@/components/ui/Reveal";

const claims = [
  {
    title: "Schema & entity, from the first commit",
    body: "Structured data goes in on day one and is validated before launch — never bolted on after. It’s the same build behind BashSnippets, a property the studio owns and runs, engineered so AI tools can quote it instead of skipping it. Your site tells Google and the assistants exactly what you do, for whom, and where.",
  },
  {
    title: "You own everything",
    body: "Domain, hosting, analytics, every account — in your name, under your email, with your billing. The studio does the work and hands you the keys: no agency login, no hostage situation.",
  },
  {
    title: "One canonical fact set",
    body: "Your name, location, services, and entity facts read the same on the site, in schema, in llms.txt, and on every profile — the consistency AI search rewards. It’s the entity work that let Kai’s Run claim a service category that didn’t exist in search yet.",
  },
  {
    title: "No template you’ll outgrow",
    body: "Custom Next.js, not a page-builder you’ll fight in eighteen months. It’s how Beach House Moving got a service-area page for every county it works — depth a template can’t fake, because the template never adds the schema or the local pages in the first place.",
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
            What a template can&apos;t fake.
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
