import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { RelatedGroup } from "@/data/related";

/**
 * Contextual internal links (SW-062): related services, insights, city pages and
 * plans. Data lives in src/data/related.ts; this only renders it. Server-rendered,
 * so every link is in the HTML crawlers read. AA tokens only (CLAUDE.md table).
 */
export default function RelatedLinks({
  id,
  title,
  groups,
}: {
  /** Unique per page; ties the section to its heading. */
  id: string;
  title: string;
  groups: RelatedGroup[];
}) {
  const filled = groups.filter((g) => g.links.length > 0);
  if (filled.length === 0) return null;

  return (
    <Reveal>
      <section aria-labelledby={id} className="mt-16 border-t border-marine/20 pt-10">
        <h2
          id={id}
          className="font-mono text-xs tracking-[0.2em] text-shoal uppercase"
        >
          {title}
        </h2>
        <div
          className={`mt-6 grid gap-8 ${filled.length > 1 ? "sm:grid-cols-2" : ""}`}
        >
          {filled.map((group, gi) => (
            <div key={group.heading ?? gi}>
              {group.heading && (
                <h3 className="text-sm font-semibold text-foam">{group.heading}</h3>
              )}
              <ul className={`${group.heading ? "mt-3 " : ""}space-y-2`}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-foam/70 underline decoration-marine underline-offset-4 transition-colors hover:text-shoal hover:decoration-shoal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
