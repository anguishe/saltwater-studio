import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import BuyAuditButton from "@/components/ui/BuyAuditButton";
import { tiers } from "@/data/tiers";

/**
 * The four-tier engagement ladder. T1 is the only tier that shows a price
 * (pricing carve-out, 2026-08-09) — everything else routes to the quote form.
 */
export default function OfferLadder() {
  return (
    <section aria-labelledby="ladder-heading" className="mt-20">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
          Engagements
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          id="ladder-heading"
          className="font-display text-3xl text-foam md:text-4xl"
        >
          Start with the audit. Scale when it earns it.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6">
        {tiers.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.07}>
            <article
              id={tier.id}
              className={`scroll-mt-32 rounded border p-8 ${
                tier.price
                  ? "border-shoal/40 bg-marine/20"
                  : "border-marine/40 bg-marine/10"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-mono text-xs tracking-widest text-shoal-muted uppercase">
                  {tier.index}
                </span>
                <h3 className="font-display text-2xl text-foam">{tier.name}</h3>
                {tier.price ? (
                  <span className="font-mono text-sm text-sun">
                    {tier.price.display} {tier.price.note}
                  </span>
                ) : (
                  <span className="font-mono text-xs text-foam-subtle uppercase tracking-widest">
                    Quote-based
                  </span>
                )}
              </div>

              {tier.turnaround && (
                <p className="mt-2 font-mono text-xs tracking-widest text-shoal uppercase">
                  {tier.turnaround}
                </p>
              )}

              <p
                className={`mt-4 text-foam/70 max-w-2xl${
                  tier.id === "audit" ? " tier-answer" : ""
                }`}
              >
                {tier.oneLiner}
              </p>

              <ul className="mt-5 space-y-1">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foam-muted"
                  >
                    <span className="text-shoal mt-0.5" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {tier.deliverable && (
                <p className="mt-5 text-sm text-foam/60 max-w-2xl">
                  {tier.deliverable}
                </p>
              )}
              {tier.followUp && (
                <p className="mt-3 text-sm text-foam-subtle max-w-2xl">
                  {tier.followUp}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {tier.id === "audit" ? (
                  <BuyAuditButton />
                ) : (
                  <ButtonLink href={tier.cta.href} variant="ghost">
                    {tier.cta.label}
                  </ButtonLink>
                )}
                {tier.links?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-shoal hover:text-glow transition-colors"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
