---
name: new-component
description: Scaffold a new Saltwater Studio component with correct conventions — type, location, brand tokens, motion rules.
disable-model-invocation: false
---

# New Component — Saltwater Studio

Scaffold a component that matches the project's existing conventions exactly.
The user will pass a name and optionally a type: `/new-component HeroStats section`

## Component Types

| Type | Directory | `"use client"` | Export |
|------|-----------|----------------|--------|
| `ui` | `src/components/ui/` | Only if interactive | Named (primitives) or default |
| `section` | `src/components/sections/` | No (Server Component by default) | Default |
| `motion` | `src/components/motion/` | Always | Default |
| `three` | `src/components/three/` | Always | Default |

If no type is given, infer from the name or ask.

---

## Brand Tokens (Tailwind classes)

**Backgrounds:** `bg-ink` · `bg-abyss` · `bg-marine/10` · `bg-marine/20`
**Text:** `text-foam` · `text-foam/60` · `text-foam/40` · `text-foam/20` · `text-shoal` · `text-sun`
**Borders:** `border-marine/40` · `border-shoal/40` · `border-marine/30`
**Accent fill:** `bg-shoal` · `bg-glow`

**Fonts:**
- `font-display` — Fraunces, headings
- `font-body` — Hanken Grotesk, body (default, rarely needed explicitly)
- `font-mono` — Martian Mono, kickers/labels

---

## Patterns by Type

### `section`

```tsx
import Reveal from "@/components/ui/Reveal";

export default function ComponentName() {
  return (
    <section
      id="slug"
      className="py-24 px-6 bg-ink"
      aria-labelledby="slug-heading"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-shoal uppercase mb-4">
            ## / Section Label
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="slug-heading"
            className="font-display text-3xl text-foam md:text-4xl"
          >
            Heading here.
          </h2>
        </Reveal>

        {/* content */}
      </div>
    </section>
  );
}
```

- `max-w-7xl` for grid/card layouts; `max-w-4xl` for text-heavy sections
- Wrap each animated element in `<Reveal delay={i * 0.07}>` for stagger
- Import list data from `@/data/` not inline when it's more than ~3 items
- No `"use client"` unless the section needs hooks or event handlers

### `ui`

```tsx
"use client"; // only if interactive

import { type ComponentPropsWithoutRef } from "react";

interface ComponentNameProps extends ComponentPropsWithoutRef<"div"> {
  // props
}

export default function ComponentName({ className = "", ...props }: ComponentNameProps) {
  return (
    <div className={`... ${className}`} {...props} />
  );
}
```

- Use `ComponentPropsWithoutRef<"element">` when extending an HTML element
- Spread `...props` and forward `className` for composability
- Named exports for shared primitives (like `Button`/`ButtonLink`), default for single-purpose

### `motion`

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ComponentNameProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ComponentName({ children, delay = 0, className }: ComponentNameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

GSAP variant (for scroll-triggered effects):
```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ComponentName({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
```

Motion rules:
- Easing: `[0.16, 1, 0.3, 1]` (expo-out), duration 0.6–1.2s
- Animate `transform`/`opacity` only — never `width`, `height`, `color`
- Add `motion-reduce:hidden` on the animated wrapper when a static fallback exists

### `three`

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function ComponentName() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas dpr={[1, 2]} frameloop={inView ? "always" : "never"}>
        {/* scene */}
      </Canvas>
    </div>
  );
}
```

Consumed from a parent section via:
```tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ComponentName = dynamic(() => import("@/components/three/ComponentName"), { ssr: false });

// Inside section:
<div className="absolute inset-0 hidden md:block motion-reduce:hidden">
  <Suspense fallback={null}>
    <ComponentName />
  </Suspense>
</div>
```

Three.js rules:
- Single `useFrame` loop — never nest multiple loops
- Pause when off-screen via `frameloop={inView ? "always" : "never"}`
- `dpr={[1, 2]}` always
- Cleanup refs/geometries/materials on unmount
- Never interpolate window dimensions into shader strings — pass as uniforms

---

## Checklist Before Writing

1. Confirm component type and destination directory
2. Check if a similar component already exists in that directory
3. Apply correct `"use client"` rule for the type
4. Use brand tokens — no hardcoded hex values
5. For sections: include `Reveal` wrappers and `aria-labelledby`
6. For three: confirm parent will use `dynamic(..., { ssr: false })` + `Suspense`
