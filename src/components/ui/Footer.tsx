import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-abyss border-t border-marine/30 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-foam font-semibold">Saltwater Studio</p>
            <p className="mt-1 text-sm text-foam/50">Gulf Coast, FL &mdash; serving nationwide</p>
            <p className="mt-4 font-mono text-xs text-foam/30 tracking-widest uppercase">
              {site.mnemonic}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            <p className="font-mono text-xs text-foam/30 tracking-widest uppercase mb-2">Navigate</p>
            {[
              { label: "Work", href: "/work" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foam/60 hover:text-shoal transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="font-mono text-xs text-foam/30 tracking-widest uppercase mb-2">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-foam/60 hover:text-shoal transition-colors block"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone}`}
              className="text-sm text-foam/60 hover:text-shoal transition-colors block mt-1"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-marine/30 pt-6 flex flex-col gap-2 md:flex-row md:justify-between">
          <p className="text-xs text-foam/30">
            &copy; {new Date().getFullYear()} Saltwater Studio &middot; Est.&nbsp;{site.founded}
          </p>
          <p className="text-xs text-foam/30">
            Remote studio &mdash; {site.heartland}
          </p>
        </div>
      </div>
    </footer>
  );
}
