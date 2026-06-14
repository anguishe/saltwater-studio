# ARCHITECTURE.md — Saltwater Studio

Adapts the DPOS 11 canonical Next.js spec for a **remote services studio** (not a
local SAB): no service-area city pages, no street address, areaServed = United
States. Everything else — `site.ts` single source, schema-from-config, Resend
forms, static-first rendering, the animation tiers — holds.

## 1. Stack (pinned)

Next.js 14+ App Router · TypeScript (strict) · Tailwind · `framer-motion`
(UI/micro) · `gsap` + ScrollTrigger (scroll choreography) · `@react-three/fiber`
+ `drei` (hero only, lazy) · `lenis` (desktop ≥1024 only) · `resend` + `zod`
(forms) · `lucide-react` · `@calcom/embed-react`. Remotion lives in a **separate
repo** if/when we make video — never in this bundle.

**Hosting:** deploy target is **Vercel** (Travis's own property — the DPOS Hobby
commercial-use concern applies to *client* sites, not this one, so Hobby is fine
here; revisit if it ever hosts client work). Apex canonical, `www → apex` 308.

## 2. Folder structure (Claude Code builds this fresh)

```
src/
  app/
    layout.tsx              ← fonts (next/font), GTM, JsonLd(org+website), header/footer, skip-link
    page.tsx                ← homepage, composed from sections/
    work/page.tsx           ← portfolio index
    work/[slug]/page.tsx    ← case study (generateStaticParams from data/projects.ts)
    services/page.tsx       ← services overview
    services/[slug]/page.tsx ← (phase 2) per-service detail from data/services.ts
    about/page.tsx
    contact/page.tsx        ← quote form + Cal.com link
    book/page.tsx           ← Cal.com embed
    thanks/page.tsx         ← noIndex; fires form_submit dataLayer push
    privacy/page.tsx
    api/contact/route.ts    ← Resend handler (INTEGRATIONS §1)
    sitemap.ts  robots.ts  opengraph-image.tsx (or static og-default)
  components/
    JsonLd.tsx
    sections/   Hero.tsx Trust.tsx Offer.tsx Portfolio.tsx Process.tsx WhyUs.tsx About.tsx CtaClose.tsx
    ui/         Button.tsx Reveal.tsx Header.tsx Footer.tsx StickyCTA.tsx
    three/      DeepScene.tsx (R3F, dynamic ssr:false) ChromeMark.tsx Particles.tsx
    motion/     ScrollFX.tsx (gsap, dynamic) useLenis.ts
  config/site.ts            ← THE single source of truth (§3)
  data/   projects.ts · services.ts · faqs.ts · process.ts
  lib/    seo.ts (SEO §2) · schema.ts (SEO §3) · events.ts (dataLayer helpers)
docs/strategy/   (kit files live here for tool context)   OWNERSHIP.md
public/  images/  fonts/  og-default.jpg  favicon set  [indexnow-key].txt
```

**Rendering rules:** static-first — every page SSG; `generateStaticParams` for
`work/[slug]` and `services/[slug]`. No `"use client"` above section level.
Client components only for: the form, accordions, motion wrappers, the 3D scene.
GTM via `next/script` `afterInteractive` in layout. `www→apex` + any legacy paths
in `next.config.js`.

## 3. `src/config/site.ts` — single source of truth

```ts
// NAP/facts exist HERE and nowhere else (GEO rule). No street address (remote).
export const site = {
  name: "Saltwater Studio",
  legalName: "Saltwater Studio",            // update if an LLC is formed
  schemaType: "ProfessionalService",        // + Organization; see schema.ts
  url: "https://saltwaterstudio.xyz",       // apex, https, no trailing slash
  phone: "{{STUDIO_PHONE_E164}}",           // e.g. +18505550100
  phoneDisplay: "{{STUDIO_PHONE_DISPLAY}}", // e.g. (850) 555-0100
  email: "{{STUDIO_EMAIL}}",
  baseCity: "Pensacola", region: "FL",      // heartland, shown as "Gulf Coast, FL"
  geo: { lat: 30.4213, lng: -87.2169 },     // Pensacola (entity anchor only)
  founded: "2025",
  owner: "Travis",
  areaServed: "United States",              // nationwide
  heartland: "Gulf Coast (Gulf Shores, AL to Miami, FL)",
  tagline: "A web design studio for service businesses that refuse to look like everyone else.",
  taglineSecondary: "Websites engineered for Google, AI search, and the people in between.",
  mnemonic: "Depth, by design.",
  calcom: "{{CALCOM_URL}}",
  sameAs: [ /* GBP_URL?, Instagram, LinkedIn, GitHub, Dribbble — fill as live */ ],
  gtmId: "{{GTM_ID}}",
} as const;
```

## 4. R3F / animation strategy (Tier 3, hero only)

- `components/three/DeepScene.tsx` imported via `next/dynamic` `ssr:false`, mounted
  only when the hero container `useInView` is true; `<Suspense fallback>` = the
  static hero poster (which is also mobile + reduced-motion).
- One scene, one `useFrame` loop. Instanced particle points ≤3k. `dpr={[1,2]}`.
  Dispose on unmount (R3F handles). No second RAF anywhere on the page.
- GSAP/Lenis loaded only inside `motion/ScrollFX.tsx` (dynamic) — never in the
  shared bundle. `gsap.context()` + revert on cleanup.
- Mobile = Tier-1 behavior regardless (poster hero, Framer reveals only).

## 5. Performance posture

| Surface | Target | Notes |
|---|---|---|
| Homepage (with hero) | Perf ~75–85 mobile | bounded exception (DESIGN §0); SEO 100 / A11y ≥95 / BP 100 still required |
| All other pages | Perf ≥90 mobile | full DPOS budget |
| First-load JS (non-hero pages) | ≤ ~150kB gz | GSAP/R3F never in shared bundle — dynamic only |
| LCP | hero poster (`priority`) | the static deep render is the LCP, not the canvas |
| CLS | < 0.05 all pages | explicit media dimensions; sticky CTA reserves space |

`next/image` everywhere (`alt` + `sizes`; source images pre-shrunk ≤2000px,
WebP/AVIF). `next/font` self-host. Zero third-party scripts except GTM. Check
`next build` output each performance pass; if the hero scene exceeds the 8-point
gate after lazy-load, switch to poster + interactive toggle.

## 6. Data layer

- `data/projects.ts` — array per PORTFOLIO.md, each with `permission: "live" |
  "preview"`; live ones get a `url`, preview ones render label-only (the
  component must refuse to emit a link when `permission !== "live"`).
- `data/services.ts` — the four offers (title, one-line, slug, what's-included
  bullets) — quote-only, no `price` field rendered.
- `data/faqs.ts` — homepage + service FAQs, AEO answer-first (CONTENT §FAQ),
  FAQPage-schema'd.
- `data/process.ts` — the "right the first time" steps for DESIGN §6.

## 7. Ownership

`OWNERSHIP.md` lists every account (domain registrar, Vercel, GA4/GSC/GTM, Resend,
Cal.com, social) under Travis's own accounts. This is the studio's own property so
ownership is simple — but keep the file as the recovery-email + access record, and
as the template you hand clients.
