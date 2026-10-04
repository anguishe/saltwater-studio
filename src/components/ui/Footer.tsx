"use client";

import Link from "next/link";
import { site } from "@/config/site";
import { track } from "@/lib/events";

const footerNav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Websites & pricing", href: "/websites" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

// Service/area links come in as props from the server layout so the page copy stays out of the client bundle.
export default function Footer({
  serviceLinks,
  areaLinks,
}: {
  serviceLinks: { slug: string; title: string }[];
  areaLinks: { slug: string; city: string }[];
}) {
  return (
    <footer className="bg-abyss border-t border-marine/30 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          {/* NAP — no street address (service-area business) */}
          <div>
            <p className="font-display text-lg text-foam font-semibold">
              Saltwater Studio
            </p>
            <p className="mt-1 text-sm text-foam-muted">
              Destin, FL &middot; in person on the Gulf Coast, remote nationwide
            </p>
            <p className="mt-4 font-mono text-xs text-foam-subtle tracking-widest uppercase">
              {site.mnemonic}
            </p>
            <p className="mt-2 font-mono text-xs text-foam-subtle">
              Est.&nbsp;{site.founded}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            <p className="font-mono text-xs text-foam-subtle tracking-widest uppercase mb-2">
              Navigate
            </p>
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foam/60 hover:text-shoal transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Sitewide links to every service page — the only internal links most of them get outside /services. */}
          <nav aria-label="Services" className="flex flex-col gap-2">
            <p className="font-mono text-xs text-foam-subtle tracking-widest uppercase mb-2">
              Services
            </p>
            {serviceLinks.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="text-sm text-foam/60 hover:text-shoal transition-colors"
              >
                {s.title}
              </Link>
            ))}
          </nav>

          {/* Sitewide links to the city pages — same crawl-mesh logic as the services column. */}
          <nav aria-label="Areas served" className="flex flex-col gap-2">
            <p className="font-mono text-xs text-foam-subtle tracking-widest uppercase mb-2">
              Areas
            </p>
            {areaLinks.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="text-sm text-foam/60 hover:text-shoal transition-colors"
              >
                {a.city}
              </Link>
            ))}
          </nav>

          <div>
            <p className="font-mono text-xs text-foam-subtle tracking-widest uppercase mb-2">
              Contact
            </p>
            <a
              href={`mailto:${site.email}`}
              onClick={track.emailClick}
              className="text-sm text-foam/60 hover:text-shoal transition-colors block"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone}`}
              onClick={track.phoneClick}
              className="text-sm text-foam/60 hover:text-shoal transition-colors block mt-1"
            >
              {site.phoneDisplay}
            </a>

            <div className="mt-4 flex flex-wrap gap-3">
              {[site.gbp.mapsUrl, ...site.sameAs].map((url) => {
                const label = sameAsLabel(url);
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-foam-subtle hover:text-shoal transition-colors"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-marine/30 pt-6 flex flex-col gap-2 md:flex-row md:justify-between">
          <p className="text-xs text-foam-subtle">
            &copy; {new Date().getFullYear()} Saltwater Studio &middot;
            Est.&nbsp;{site.founded}
          </p>
          <p className="text-xs text-foam-subtle">
            In person &mdash; {site.heartland}
          </p>
        </div>
      </div>
    </footer>
  );
}

function sameAsLabel(url: string): string {
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("dribbble.com")) return "Dribbble";
  if (url.includes("google.com/maps") || url.includes("maps.google.com") || url.includes("g.page")) return "Find us on Google";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
