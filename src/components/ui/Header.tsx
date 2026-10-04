"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "./Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";

const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur-sm border-b border-marine/50" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* -my/py: a 44px tap target without changing the 64px header height.
            The header always sits on a dark surface (hero, bg-ink), so it takes
            the foam wordmark; "-light" is the dark-ink version for light grounds. */}
        <Link href="/" aria-label="Saltwater Studio — home" className="-my-1.5 block py-1.5">
          <Image
            src="/saltwater-studio-logo.svg"
            alt="Saltwater Studio"
            width={250}
            height={32}
            priority
            className="h-8 w-[250px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foam/70 transition-colors hover:text-shoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${site.phone}`}
            className="text-sm text-foam/70 hover:text-shoal transition-colors"
            onClick={track.phoneClick}
          >
            {site.phoneDisplay}
          </a>
          <ButtonLink href="/contact" onClick={track.quoteStart}>
            Start the conversation
          </ButtonLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="-m-[11px] p-[11px] md:hidden text-foam"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-ink border-t border-marine/50 px-6 py-6 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2.5 text-foam/80 hover:text-shoal transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone}`}
            className="py-2.5 text-foam/80 hover:text-shoal transition-colors"
            onClick={() => { track.phoneClick(); setOpen(false); }}
          >
            {site.phoneDisplay}
          </a>
          <ButtonLink href="/contact" onClick={() => { track.quoteStart(); setOpen(false); }} className="mt-3 w-full justify-center">
            Start the conversation
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
