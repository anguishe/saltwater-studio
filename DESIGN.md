# DESIGN.md — Saltwater Studio (visual + motion spec)

## 0. The performance trade — bounded, not abandoned

This is the one property that may spend budget on an immersive 3D hero. The trade
is explicit and limited:

- **Allowed to cost points:** the preloader + hero R3F descent. Target mobile
  Lighthouse Performance **~75–85** (not a hard 90). This is the accepted cost of
  the spectacle.
- **Still non-negotiable everywhere:** SEO 100 · Accessibility ≥95 · Best
  Practices 100 · CLS < 0.05 · `prefers-reduced-motion` honored · poster fallback
  that is the LCP · single `requestAnimationFrame`/`useFrame` loop per page · 3D
  lazy + `ssr:false` + paused off-screen · everything below the hero on the
  standard DPOS budget.
- **The hard gate (DPOS 11):** if the 3D scene costs **>8 Lighthouse points after
  lazy-loading**, it ships as a static poster + an "Enter the deep" interactive
  toggle. Spectacle never blocks the phone call / the booking.

Motion language (all sections): slow, weighted, expo-out
`cubic-bezier(0.16, 1, 0.3, 1)`, 0.6–1.2s. Animate `transform`/`opacity` only.
60fps or cut it. Nothing animates over the sticky CTA. Hero resolves ≤1.2s so the
offer is readable fast.

---

## 1. Preloader — "the dive in"

Brief (≤1.2s, skippable, runs once per session): foam-white field at the coastal
surface → a thin horizon line → the camera/gradient sinks; light cools from sun
to shoal to deep as the molten-chrome mark coalesces. Resolves on **"Depth, by
design."** then lifts into the hero. Reduced-motion: static deep frame with the
mark already formed, no animation. Never blocks interaction beyond 1.2s.

## 2. Hero — the descent (R3F, Tier 3)

The signature moment. A surreal vertical descent from the sunlit shallows into the
bioluminescent deep, the **molten-chrome studio mark** suspended and slowly
rotating in the dark, caustic light raking across it, a sparse field of drifting
bioluminescent particles (instanced points, ≤3k).

- **Scene:** one R3F scene max. Floating chrome object via `drei <Float>`;
  caustic/volumetric light faked with a gradient-lit environment (keep any
  `Environment` HDR tiny) + a refractive/metallic material. Particle field is a
  single instanced points mesh, rotation/drift in the one `useFrame`. Cap
  `dpr={[1, 2]}`. Pause when hero is off-screen (`useInView`).
- **Foreground (DOM, not in canvas — keeps text crisp & indexable):**
  - H1 (display): the brand promise (see CONTENT.md).
  - Subhead: the primary tagline.
  - Primary CTA: **Book a strategy call** (`--shoal` fill) → Cal.com.
  - Secondary CTA: **Get a quote** (ghost) → /contact.
  - Mono kicker above H1: `SALTWATER STUDIO — EST. 2025 · GULF COAST → NATIONWIDE`.
- **Poster fallback = the LCP:** a static render of the deep + chrome mark
  (`next/image`, `priority`). This is ALSO the mobile and reduced-motion hero.
  Mobile gets the poster + DOM text, never the live canvas.
- **Shaders:** never interpolate window dimensions into shader strings; pass as
  uniforms updated on resize (DPOS 11 defect-fix). Clean up on unmount.

## 3. Trust strip

A quiet band under the hero: `Built for Google · AI search · and the people in
between.` + four small entity proofs in mono (e.g., `NATIONWIDE`,
`GULF COAST FL`, `EST. 2025`, `NEXT.JS · SCHEMA-FIRST`). No logos we can't show
(permission gate). Subtle `<Reveal>` stagger.

## 4. Offer — "the layers of the deep" (what we do)

Services presented as descending depth layers — each scrolls into view a little
deeper/darker, reinforcing the column metaphor. Quote-only; each card CTA →
strategy call or quote.

1. **Websites, built right** — Next.js, immersive where it earns its keep, fast
   where it counts.
2. **SEO / AEO / GEO** — ranked in Google, quoted by AI search, named as the
   entity. (Secondary tagline lives here as the section header.)
3. **Google presence** — Business Profile setup, optimization, the local pack.
4. **Social & content** — the weekly engine that keeps the profile alive.

Each card: mono index (`01`–`04`), Fraunces title, one specific sentence (no
generic benefit-speak), `--shoal` hover edge. GSAP scrub parallax optional (Tier 2).

## 5. Portfolio — pinned horizontal scroll (GSAP, Tier 2)

The proof. Horizontal pinned scroll through case studies; each panel = full-bleed
project visual + name + the one specific result/role line + (live ones) a visit
link. **Permission gate enforced** (PORTFOLIO.md): live = Beach House Moving,
Kai's Run, BashSnippets. Preview-only (no link, labeled "private preview") =
WaterVue, Aquamarine, Alexander Hines. Lenis on desktop ≥1024px only, wired to
`ScrollTrigger.update` (single ticker), destroyed on unmount. Mobile: vertical
stacked cards, no pin.

## 6. Process — "right the first time"

The differentiator section. A short vertical timeline (4–5 steps) showing the
method as a selling point — intake/strategy → schema + tracking from day one →
the build → launch + indexing → grow — without exposing internal jargon. The
copy point: competitors skip steps 2 and 4, which is why their sites get rebuilt.
Mono step indices; `<Reveal>` per step; no heavy motion (this section is about
trust, keep it calm).

## 7. Why us / Differentiator

Three to four specific claims, each falsifiable: schema & entity built in, you own
everything (domain/analytics/accounts), one canonical fact set everywhere, no
template you'll outgrow. Specificity per BRAND §5.

## 8. About (Travis)

Short, first-person-adjacent, third-person entity sentence included for GEO (see
CONTENT/SEO). Gulf Coast, est. 2025, the why. One real photo when available;
until then, an abstract coastal-deep plate (ASSETS), never stock.

## 9. CTA close

Full-bleed deep panel, chrome mark echo, the mnemonic **"Depth, by design."**, and
the dual CTA repeated (book primary / quote secondary).

## 10. Header & footer

- **Header:** transparent over hero → `--ink` on scroll. Wordmark left; nav
  (Work · Services · Process · About) center/right; **Book a call** button
  (`--shoal`) right. Mobile: phone tel: link + menu.
- **Sticky mobile bar (conversion):** `Call` + `Get a quote`, thumb-reachable,
  safe-area padded, reserves its own space (no CLS). Fires `phone_click` /
  routes to quote.
- **Footer:** NAP-light — **no street address** (remote studio): `Saltwater
  Studio · Gulf Coast, FL · serving nationwide`, `{{STUDIO_PHONE}}`,
  `{{STUDIO_EMAIL}}`, sameAs links, mnemonic, est. 2025. Full NAP consistency per
  SEO.md.

## Accessibility (gate, not afterthought)

Skip-link; visible focus rings in `--shoal`; all interactive elements keyboard-
reachable; the 3D hero has a non-canvas text path that is the real content; color
contrast ≥4.5:1 for body (foam on ink passes); motion fully disabled under
`prefers-reduced-motion` with everything still legible and navigable.
