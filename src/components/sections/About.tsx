import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-ink" aria-labelledby="about-heading">
      <div className="mx-auto max-w-4xl grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
        <Reveal>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
              06 / The Studio
            </p>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/images/saltwater-studio-about-column.webp"
                alt="The ocean's full water column from sunlit coastal surface to the deep — Saltwater Studio brand motif"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            id="about-heading"
            className="font-display text-3xl text-foam md:text-4xl"
          >
            Travis, founder.
          </h2>
          <div className="mt-6 space-y-4 text-foam/70">
            {/* Canonical entity sentence — single-sourced from site.ts so it can't drift */}
            <p>{site.entitySentence}</p>
            <p>
              The method is the same one I use on my own businesses: get the website and the
              Google profile right first, because that&apos;s where customers find you. Then
              automate the parts of the day that eat your time — mapped first, built to fit,
              documented well enough to hand over.
            </p>
            <p>
              In person along the Gulf Coast, remote nationwide, out of Destin. Every engagement is personal — no account
              managers, no handoffs.
            </p>
          </div>
          <ButtonLink href="/about" variant="ghost" className="mt-8">
            Full story
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
