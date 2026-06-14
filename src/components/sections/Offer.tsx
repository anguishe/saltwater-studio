import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";

export default function Offer() {
  return (
    <section id="services" className="py-24 px-6 bg-ink" aria-labelledby="offer-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            02 / What We Do
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="offer-heading"
            className="font-display text-3xl text-foam md:text-4xl max-w-2xl"
          >
            The layers of the deep
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-0 divide-y divide-marine/30">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <div
                className="group grid gap-6 py-10 md:grid-cols-[5rem_1fr_auto] md:items-center hover:bg-marine/10 transition-colors px-2 rounded"
                style={{ "--depth": `${i * 4}%` } as React.CSSProperties}
              >
                <span className="font-mono text-xs tracking-widest text-shoal/50 uppercase">
                  {service.index}
                </span>
                <div>
                  <h3 className="font-display text-xl text-foam group-hover:text-shoal transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-foam/60 max-w-xl">{service.oneLiner}</p>
                </div>
                <ButtonLink
                  href={`/services/${service.slug}`}
                  variant="ghost"
                  className="self-start md:self-center whitespace-nowrap"
                >
                  Learn more
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
