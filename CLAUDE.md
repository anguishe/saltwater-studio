# CLAUDE.md — Saltwater Studio (saltwaterstudio.xyz)
Flagship site for Saltwater Studio — a remote web design and AI studio (founder Travis
Abadie, est. 2025, Destin, Florida, serving the US nationwide).
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
ourselves", AI-powered, agentic (outside technical context), revolutionize,
"transform your business", 10x, cutting-edge, harness, supercharge,
future-proof, AI-first. No emoji in copy.
## Hard rules
- Positioning mix (Travis, 2026-09-30): ~65% websites + Google Business Profile
  management (Google Care) + local search, ~35% AI (receptionist, automation,
  agents, strategy). Web/GBP leads the hero, titles, entity sentence, offer
  cards, and catalog order; AI is the add-on. Don't let AI copy retake the lead.
- Quote-only pricing with ONE carve-out (recorded 2026-08-09): the T1 AI
  Visibility Audit is flat-priced via a Stripe Payment Link (site.stripeAuditUrl);
  price lives in site.auditOffer ($50 limited-time through 2026-10-31, regular $150).
  No other price appears anywhere on the site. CTAs route to the quote form at
  /contact (Resend); Cal.com is retired — /book redirects to /contact.
- Portfolio permission gate (PORTFOLIO §0): LIVE = Beach House Moving, Kai's Run,
  BashSnippets, WaterVue Event Rentals (may link). PREVIEW = Aquamarine, Alexander Hines (NO
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

## Change control and quality gate (Travis, 2026-10-02 — applies to every session, local or cloud)

- **Cloud, scheduled, or autonomous sessions:** open a PR and stop. Never push or merge to `main`, never rebase/close PRs, and never create routines or reminders that "act on" anything. Follow-up routines must be report-only. Travis approves every merge, usually by reviewing the PR with his local Claude session.
- **Interactive sessions:** push to `main` only when Travis asks in that session.
- **Pre-merge gate (local):** `node ~/Projects/docs/tools/site-gate/site-gate.mjs https://<vercel-preview-or-live-url>`. It must add **no new errors** vs the baseline `~/Projects/docs/tools/site-gate/baseline-2026-10-02/saltwaterstudio.xyz.txt` (if no baseline exists yet, the run becomes the baseline). Cloud sessions can't run it: write "site-gate not run" in the PR body.
- **The limits it enforces** (these are what audits kept finding on every site):
  - `<title>` ≤ 65 chars *including* the "| Brand" suffix (aim ≤ 60).
  - Meta description ≤ 160.
  - Titles unique.
  - Sitemap URLs return 200 (no redirects) and are self-canonical.
  - JSON-LD parses, and its `@id` references resolve.
  - Text contrast ≥ 4.5:1 (3:1 only for ≥ 24px or bold ≥ 18.66px). Check every new color/opacity pairing, especially muted grays and brand accents on dark or brand backgrounds.
- **Business-state changes** (parked/reopened, prices, phone, address, photo permissions): update schema, default metadata/OG copy, and this file in the same change.
- **AA-safe text tokens (2026-10-02).** Text sits on four dark surfaces: abyss `#02090C`, ink `#05161B`, `bg-marine/10` over ink (`#061A1F`), `bg-marine/20` over ink (`#061D23`, the lightest). Use these and nothing dimmer for readable text:

  | Text class | Hex | Lowest ratio (marine/20 over ink) | abyss |
  |---|---|---|---|
  | `text-foam` | `#F4F1EA` | 15.4 | 17.8 |
  | `text-foam/70` | alpha | 8.0 | 8.7 |
  | `text-foam/60` | alpha | 6.2 | 6.6 |
  | `text-foam-muted` (secondary copy) | `#909593` | 5.72 | 6.60 |
  | `text-foam-subtle` (labels, meta, legal, placeholders) | `#7F8685` | 4.68 | 5.40 |
  | `text-shoal` | `#2FC6B6` | 8.18 | 9.43 |
  | `text-shoal-muted` (teal eyebrows) | `#239389` | 4.64 | 5.35 |

  Banned for text: `text-foam/20`–`/50` (1.7–4.8:1) and `text-shoal/50`–`/70` (2.6–4.97:1); they're what the 2026-10-02 gate flagged. Muted tokens are solid hexes in `src/app/globals.css` `@theme`, not opacity modifiers. Never put them on `bg-marine` solid or lighter. A purely decorative word (ghost/outline text) may go dimmer only with `aria-hidden="true"` and no information in it.
- **Build-time meta check.** `npm run build` runs `scripts/check-meta.mjs` as `postbuild`. It fails the build on a missing title or description, title > 65, description > 160, or a duplicate title across indexable pages. Titles are generated as `<body> | Saltwater Studio` (19-char suffix), so keep the body ≤ 41 chars (≤ 46 hard max). Home is `Saltwater Studio | <body>`. Service titles live in `src/data/services.ts` `seoTitle`, case-study titles in `src/data/projects.ts` `seoTitle`. /preview/* is static in `public/` and not scanned; it has its own landing-page-audit gate.
