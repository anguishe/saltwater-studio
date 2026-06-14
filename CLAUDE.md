# CLAUDE.md — Saltwater Studio (saltwaterstudio.xyz)
Flagship site for Saltwater Studio — a remote web-design studio (founder Travis
Abadie, est. 2025, Florida Gulf Coast, serving the US nationwide).
## Stack
Next.js 16 App Router · TypeScript strict · Tailwind · framer-motion · gsap +
ScrollTrigger · @react-three/fiber + drei (hero only, lazy, ssr:false) · lenis
(desktop >=1024) · resend + zod (forms) · @calcom/embed-react · lucide-react.
Host: Vercel. Apex canonical; www -> apex 308.
## Source of truth
- src/config/site.ts — all NAP/facts; schema + metadata are GENERATED from it,
  never hand-written per page.
- Kit (overrides assumptions): BRAND.md, DESIGN.md, ARCHITECTURE.md, SEO.md,
  INTEGRATIONS.md, OWNERSHIP.md (root); CONTENT.md, PORTFOLIO.md (content/);
  conventions in .cursorrules/cursorrules.
## Build / verify
`npm run build` exit 0 · `npm run lint` clean · `grep -rn "{{" src/` -> 0 real
tokens (SEO.md §8 launch gate).
## Voice (BRAND §5)
Confident, plainspoken, specific. Answer-first. Banned words: elevate, seamless,
solutions, leverage, unlock, empower, synergy, "passionate about", "in today's
digital landscape", "game-changer", "take it to the next level", "we pride
ourselves". No emoji in copy.
## Hard rules
- Quote-only pricing; never a price on the site. CTAs route to Cal.com (book) or
  the quote form (Resend).
- Portfolio permission gate (PORTFOLIO §0): LIVE = Beach House Moving, Kai's Run,
  BashSnippets (may link). PREVIEW = WaterVue, Aquamarine, Alexander Hines (NO
  link, NO client endorsement, "Private preview" label). The component must refuse
  to emit a link when permission !== "live".
- Never invent metrics, results, or testimonials. No placeholder data ships.
- ONE canonical entity fact set verbatim everywhere (site, schema, llms.txt, bios).
- Schema comes from src/lib/schema.ts (built from site.ts); never inline a node.
- Static-first; GSAP/R3F dynamic only, never in the shared bundle.
  prefers-reduced-motion fully honored; the static poster is the LCP.
- Analytics live in GTM only (NEXT_PUBLIC_GTM_ID); the GA4 ID lives in the GTM
  container, never in code. Event taxonomy is fixed and never renamed:
  phone_click, form_submit, booking_click, email_click, quote_start.
