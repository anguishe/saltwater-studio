"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "ghost";

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

const base =
  "inline-flex items-center justify-center rounded px-6 py-3 text-sm font-body font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shoal";

const variants: Record<Variant, string> = {
  primary: "bg-shoal text-ink hover:bg-glow",
  ghost: "border border-foam/40 text-foam hover:border-shoal hover:text-shoal",
};

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
