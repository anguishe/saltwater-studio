# Saltwater Studio — Pre-Launch SEO / AEO / GEO + Indexation Audit Report
**Date:** 2026-06-14
**Auditor:** Claude Code (claude-opus-4-8)
**Scope:** Whole site. 13 routes (`/`, `/about`, `/contact`, `/thanks`, `/privacy`, `/work`, `/work/[slug]`, `/services`, `/services/[slug]`, `/book`, `+ robots/sitemap/manifest`), 1 API route, 3 lib modules, 4 data modules, 12 components. Read-only — **no files were edited.**
**Health Score: 68/100**

> **Scope note — STOP-gate exception, then resolved.** The audit brief assumed the strategy kit lives in `docs/strategy/` and that a root `CLAUDE.md` encodes the stack. Neither is true: `docs/strategy/` contains only `.gitkeep`, and `CLAUDE.md` has never existed (no git history). The kit was **relocated** — `BRAND/DESIGN/ARCHITECTURE/SEO/INTEGRATIONS/OWNERSHIP` at repo root, `CONTENT/PORTFOLIO` in `content/`, plus `.cursorrules/cursorrules`. `ASSETS.md` is absent entirely. Per user direction, the audit proceeded judging every finding against those relocated kit files + `src/config/site.ts`. The missing `CLAUDE.md`/`ASSETS.md` are recorded as INFO in Dimension 6.

---

## Executive Summary

The **infrastructure is genuinely strong**: a single-source-of-truth `site.ts`, a centralized `buildMetadata` helper used by every route, a schema-from-config layer with stable `@id`s, a correct robots/sitemap/canonical/redirect stack, and a clean build (`next build` exit 0, lint clean). Indexation, the conversion plumbing (Resend honeypot + time-trap + zod), and the portfolio **link-permission gate** all pass. What drags the score down is **content integrity and pre-launch completeness**, not architecture: unfilled tokens still ship into the UI and schema, the dynamic `/work/[slug]` pages are thin "coming soon" stubs, the portfolio data **fabricates facts and a metric** that contradict `PORTFOLIO.md`, and several AEO/GEO surfaces (FAQ coverage, `speakable`, the services lead, entity-sentence consistency) are incomplete.

**Top 5 critical issues:**
1. **Unfilled `{{TOKEN}}`s ship live** — `phone`, `phoneDisplay`, `email`, `calcom`, `gtmId` in `site.ts` render into the header, footer, contact, thanks, sticky bar, **and the Organization schema** (`telephone`/`email`). `grep -rn "{{" src/` ≠ 0 violates the SEO.md §8 hard launch gate. Every "Book a call" CTA points at `{{CALCOM_URL}}`. (Dim 10 / 9 / 4)
2. **Portfolio data fabricates facts + an invented metric** — `projects.ts` contradicts `PORTFOLIO.md`: Beach House "ranked … in 60 days" (invented metric), Kai's Run mislabeled "Endurance Events" (it's mobile dog-conditioning), BashSnippets "SaaS with subscription billing" (it's a snippet/content site), Alexander Hines "attorney" (it's construction). Violates PORTFOLIO §0 "never invent results." (Dim 7)
3. **`/work/[slug]` is thin, near-duplicate content** — each live case study is H1 + one `result` sentence + a "Full case study — coming soon" placeholder box, and is in the sitemap. Three near-identical indexable stubs. (Dim 3)
4. **All 6 portfolio images are missing** — `projects.ts` points at `/images/projects/*.jpg`; no `public/images/projects/` directory exists. `/work` and the home portfolio render broken `<Image>`s. (Dim 7 / 2)
5. **Entity-sentence drift** — the canonical GEO sentence is correct in schema + `/about`, but `llms.txt` and the home `About.tsx` ship a divergent variant (drops "remote," "premium, search-optimized"). GEO rewards one fact set verbatim. (Dim 6)

**Top 5 quick wins (< 30 min each):**
1. Fill the 5 tokens in `site.ts` (or point them at env) → clears the §8 gate, the schema leak, and every CTA at once.
2. Create `public/images/projects/` and drop the 6 real screenshots (live) / preview plates in.
3. Add the services-overview answer-first lead + restore H1 to "What Saltwater Studio does" (CONTENT.md) — fixes the missing GEO anchor.
4. Reconcile `llms.txt` + home `About.tsx` to the canonical entity sentence verbatim.
5. Wire `speakable()` into the home + key WebPage schema (the function already exists, it's just never called).

---

## Scoring Breakdown
| Category | Score | Weight | Weighted |
|---|---|---|---|
| 1. Indexation & Crawlability | 95/100 | 12% | 11.4 |
| 2. Per-Page SEO | 70/100 | 12% | 8.4 |
| 3. Thin / Duplicate Templates | 50/100 | 10% | 5.0 |
| 4. Schema | 70/100 | 12% | 8.4 |
| 5. AEO | 65/100 | 10% | 6.5 |
| 6. Entity / GEO | 65/100 | 12% | 7.8 |
| 7. Portfolio Permission Gate | 55/100 | 12% | 6.6 |
| 8. Accessibility | 90/100 | 8% | 7.2 |
| 9. Conversion / Integrations | 75/100 | 8% | 6.0 |
| 10. Placeholder / Token Sweep | 30/100 | 4% | 1.2 |
| **TOTAL** | | | **68.5 → 68/100** |

> **Estimate-only labels.** Accessibility (Dim 8) and any performance/Lighthouse/contrast judgments are **code-review based** — no live Lighthouse, axe, or device run was performed. The token sweep, schema content, indexation, and data-integrity findings are verified by reading the code and the build output.

**Build state (verified):** `npm run build` → **exit 0**, Next.js 16.2.9 (Turbopack), 24 static pages generated; `/work/[slug]` prerendered for the 3 live projects only (preview excluded ✓), `/services/[slug]` for all 4 services. `npm run lint` → **clean, no warnings**.

---

## 1. Indexation & Crawlability
### robots.ts
**PASS** — `userAgent: "*"` allows `/`, disallows `/thanks` + `/api/`; GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bingbot each explicitly allowed. Sitemap URL emitted. File: [src/app/robots.ts](../../src/app/robots.ts) (~6–22).

### sitemap.ts
**PASS** — covers `/`, `/work`, `/services`, `/about`, `/contact`, `/book`, `/privacy`; live projects only (`filter(p => p.permission === "live")`) and all 4 services. `/thanks` correctly excluded. No noindexed or preview URL leaks in. File: [src/app/sitemap.ts](../../src/app/sitemap.ts) (~8–36).

### Canonicals & redirects
**PASS** — `canonicalUrl()` forces apex, strips trailing slashes and query strings; every page's canonical = `${site.url}${path}`. File: [src/lib/seo.ts](../../src/lib/seo.ts) (~13–16). `www → apex` is a `permanent: true` (308) host redirect. File: [next.config.ts](../../next.config.ts) (~4–13). No canonical points at a redirect target.

### /thanks noindex
**PASS** — `buildMetadata({ …, noIndex: true })` emits `robots: { index:false, follow:false }`; route excluded from sitemap. File: [src/app/thanks/layout.tsx](../../src/app/thanks/layout.tsx) (~6–10).

**INFO** — `/book` and `/privacy` are indexable and in the sitemap; appropriate. **INFO** — `manifest.ts` and Google verification (`googleSiteVerification` in `site.ts` + `public/google….html`) both present; belt-and-suspenders, fine.

---

## 2. Per-Page SEO
**PASS (system)** — every route uses `buildMetadata` (or `generateMetadata` → `buildMetadata` for dynamic routes); OG/Twitter/canonical are centralized and never hand-written. No `buildMetadata`-less page exists. Exactly one `<h1>` per page (verified across all 9 page files + Hero); home has a single H1 (Hero) with H2/H3 sections in order. All `next/image` have `alt` + `sizes` (Hero poster, About column, Work tiles, CtaClose chrome mark, Header logo).

### Title length (target 50–60)
| Route | Rendered title | Len | Verdict |
|---|---|---|---|
| `/` | Saltwater Studio \| Web Design for Service Businesses | 52 | PASS |
| `/about` | About Travis — Web Design, Gulf Coast \| Saltwater Studio | 56 | PASS |
| `/contact` | Contact — Get a Web Design Quote \| Saltwater Studio | 51 | PASS |
| `/work` | Work \| Saltwater Studio | 23 | **FAIL (Low)** |
| `/services` | Services \| Saltwater Studio | 27 | **FAIL (Low)** |
| `/book` | Book a Strategy Call \| Saltwater Studio | 39 | CONCERN |
| `/privacy` | Privacy Policy \| Saltwater Studio | 33 | INFO (low-priority page) |
| `/work/[slug]` | e.g. Kai's Run \| Saltwater Studio | 28–37 | CONCERN |
| `/services/[slug]` | e.g. SEO / AEO / GEO \| Saltwater Studio | 34–40 | CONCERN |

**FAIL (Low)** — `/work` (23) and `/services` (27) are far under the 50–60 window, losing SERP real estate. Files: [src/app/work/page.tsx](../../src/app/work/page.tsx#L12), [src/app/services/page.tsx](../../src/app/services/page.tsx#L12).

### Meta description (target 150–160, soft CTA)
**CONCERN (Low)** — `/work` desc ≈117 chars, no CTA ([work/page.tsx:13](../../src/app/work/page.tsx#L13)); `/services` ≈138, no CTA ([services/page.tsx:14](../../src/app/services/page.tsx#L14)); home ≈165 (slightly over). `/about`, `/contact`, `/book` are in-range and end in soft CTAs (PASS).

### GEO anchor in first 100 words ("Saltwater Studio" + "web design" + "service businesses")
**PASS** — Home (Hero kicker + subhead), About (entity paragraph), Work (lead paragraph). **FAIL (Medium)** — `/services` overview body never contains "Saltwater Studio" and has no lead paragraph; H1 is the secondary tagline (`site.taglineSecondary`) instead of CONTENT.md's "What Saltwater Studio does." File: [src/app/services/page.tsx:40](../../src/app/services/page.tsx#L40). **CONCERN** — `/contact` body has no GEO anchor (conversion page; lower priority).

### Internal links (≥2 out, ≥1 in)
**FAIL (Medium)** — `/work/[slug]` has **zero** in-content internal links out (only an external "Visit site" and breadcrumb schema). Reachable only via `/work` + home portfolio. File: [src/app/work/[slug]/page.tsx](../../src/app/work/[slug]/page.tsx) (~73–94). **PASS** — services pages link to `/book` + `/contact`; About links to `/work`, `/contact`, book.

---

## 3. Thin / Duplicate-Template Detection
### /work/[slug] — FAIL (High)
Each live case study renders **only**: category kicker, `project.title` (H1), one `project.result` sentence, an optional external "Visit site" button, and a literal placeholder box:
```tsx
{/* TODO: expand with full case study content */}
<p …>Full case study — coming soon</p>
```
File: [src/app/work/[slug]/page.tsx:87–94](../../src/app/work/[slug]/page.tsx#L87-L94). Three indexable, sitemap-listed pages whose unique body is ~1 sentence each. The metadata is templated: `description: \`Case study: ${project.result} — a Saltwater Studio web design project.\`` ([:27](../../src/app/work/[slug]/page.tsx#L27)). This is classic thin/near-duplicate content and an indexation liability. **Affected:** `/work/beach-house-moving`, `/work/kais-run`, `/work/bash-snippets`.

### /services/[slug] — CONCERN (Low)
Genuinely **unique** per item: each renders a distinct `included[]` list (7/7/6/5 bullets) plus the `oneLiner`. Not thin. The shared scaffold is only the templated `description` (`${oneLiner} — Saltwater Studio, web design and SEO for service businesses.`) and the CTA block. Acceptable; description could be made per-service for polish. File: [src/app/services/[slug]/page.tsx](../../src/app/services/[slug]/page.tsx).

---

## 4. Schema (SEO §3)
**PASS** — `Organization`+`ProfessionalService`+`WebSite` emitted **once site-wide** from the layout, **not** duplicated on home (home emits only `FAQPage`). The QA de-dup held. Files: [src/app/layout.tsx:65](../../src/app/layout.tsx#L65), [src/app/page.tsx:29](../../src/app/page.tsx#L29).
**PASS** — `/about`: `AboutPage` + `Person`(founder) + `BreadcrumbList` ([about/page.tsx:30–32](../../src/app/about/page.tsx#L30-L32)). `/services` + `/services/[slug]`: `Service` with `provider: { "@id": ORG_ID }` + `BreadcrumbList` (+`FAQPage` on seo-aeo-geo). `/work/[slug]`: `CreativeWork` (`creator` → ORG_ID) + `BreadcrumbList`. `/contact`: `ContactPage` + `BreadcrumbList`.
**PASS** — Org `@id` (`${site.url}/#studio`) is stable and referenced as `provider`/`creator`/`publisher`/`worksFor` across Service, CreativeWork, WebSite, Person. File: [src/lib/schema.ts](../../src/lib/schema.ts).

### Placeholder leak in Organization schema — FAIL (High)
`studioOrg().contactPoint` emits `telephone: site.phone` = `"{{STUDIO_PHONE_E164}}"` and `email: site.email` = `"{{STUDIO_EMAIL}}"` directly into JSON-LD. File: [src/lib/schema.ts:36–42](../../src/lib/schema.ts#L36-L42). A live Organization node with `{{token}}` contact fields will fail Rich Results validation and poisons the entity. Resolved automatically once Dim 10 tokens are filled — **but re-validate after filling.**

### Speakable never emitted — FAIL (Medium)
`speakable()` is defined ([schema.ts:152](../../src/lib/schema.ts#L152)) but **called by no page**. SEO §4 requires one `SpeakableSpecification` block per key page (home, about, services). Currently zero. No WebPage node wraps it.

**CONCERN** — `Person` (founder) `sameAs: site.sameAs` is `[]` (see Dim 6). Schema is valid but the founder entity has no corroborating profiles. File: [schema.ts:65–75](../../src/lib/schema.ts#L65-L75).

---

## 5. AEO (SEO §4)
**PASS** — Home FAQ answers are answer-first and pass the snippet test; "Saltwater Studio" appears naturally; FAQPage schema emitted. Files: [src/data/faqs.ts](../../src/data/faqs.ts), [page.tsx:29](../../src/app/page.tsx#L29). seo-aeo-geo service FAQs render as `<h3>` literal questions with answer-first bodies ([services/[slug]/page.tsx:86–98](../../src/app/services/[slug]/page.tsx#L86-L98)).

### FAQ coverage gaps — FAIL (Medium)
SEO §4 requires "≥1 FAQPage-schema'd FAQ block on home **+ each services page.**"
- `/services` overview: `getFaqsByPage("services")` returns `[]` — **no FAQ, no FAQPage.** No FAQ has `page: "services"` in the data. File: [src/data/faqs.ts](../../src/data/faqs.ts).
- `/services/[slug]`: FAQs are hard-wired to seo-aeo-geo only (`slug === "seo-aeo-geo" ? … : []`). `web-design`, `google-presence`, `social-content` have **no FAQ block**. File: [src/app/services/[slug]/page.tsx:45](../../src/app/services/[slug]/page.tsx#L45).

**CONCERN** — Home FAQ set diverges from the CONTENT.md "locked" FAQ list (CONTENT.md's "What does Saltwater Studio do?" / "Do you only work with Gulf Coast businesses?" are replaced with new questions). The new copy is answer-first and arguably stronger, but `.cursorrules` rule 8 says copy is verbatim from CONTENT.md — confirm the divergence is intentional. **NOTE** — `speakable` overlaps Dim 4.

---

## 6. Entity / GEO (SEO §5)
**Canonical sentence (CONTENT.md):** *"Saltwater Studio is a remote web-design studio founded in 2025 by Travis on Florida's Gulf Coast, building premium, search-optimized websites for service businesses nationwide."*

**PASS** — Schema `GEO_DESCRIPTION` reproduces it verbatim (interpolated from `site.ts`). File: [schema.ts:8](../../src/lib/schema.ts#L8). `/about` entity paragraph matches the CONTENT.md About variant verbatim. File: [about/page.tsx:66–72](../../src/app/about/page.tsx#L66-L72).

### Drift — FAIL (Medium)
Two surfaces ship a **different** variant that drops "remote," "premium, search-optimized" and rephrases the locale:
- `llms.txt`: *"…a web design studio founded in 2025 by Travis on the Gulf Coast of Florida, building websites and search presence for service businesses across the United States."* File: [public/llms.txt:3](../../public/llms.txt) (~3).
- Home `About.tsx`: *"Saltwater Studio is a web design studio founded in 2025 by Travis on the Gulf Coast of Florida. The studio builds websites and search presence…"* File: [About.tsx:34–39](../../src/components/sections/About.tsx#L34-L39).

GEO §5 requires the fact set verbatim across site + schema + llms.txt. The three live variants (canonical / About-page / llms+home) read as entity inconsistency to an LLM.

### sameAs — CONCERN
`site.sameAs = []`. Org and Person both emit empty `sameAs`. The footer correctly hides the block when empty (no broken links), and llms.txt lists no profiles. Per the brief, flag as CONCERN: the entity currently has **no third-party corroboration** — the single biggest GEO gap that the site can't fix alone (needs GBP/LinkedIn/GitHub live). File: [site.ts:23](../../src/config/site.ts#L23).

### Owner name — CONCERN
`site.owner = "Travis"` (first name only). The audit brief expects **"Travis Abadie"** ("Person(Travis Abadie)", "owner = 'Travis Abadie' everywhere"), but the entire kit (CONTENT, BRAND, ARCHITECTURE, site.ts) uses "Travis." A first-name-only `Person` node is weak for GEO disambiguation. **Decision needed:** if "Abadie" is the real surname, set `owner: "Travis Abadie"` to strengthen the Person entity and match the brief; the change propagates automatically to schema, llms, and copy. File: [site.ts:14](../../src/config/site.ts#L14).

**INFO** — `CLAUDE.md` and `ASSETS.md` (referenced by ARCHITECTURE §2 and the kit) do not exist; the stack/conventions live instead in `.cursorrules/cursorrules` + root kit files. Not an SEO defect, but the "source of truth" map in ARCHITECTURE.md is out of date (says `docs/strategy/` holds the kit; it's empty).

---

## 7. Portfolio Permission Gate (PORTFOLIO §0)
### Link-refusal gate — PASS
The components **refuse to emit a link or case-study endorsement** when `permission !== "live"`:
- Home `Portfolio.tsx`: `{project.permission === "live" && project.url && (<Link …>)}` — preview tiles get a "Private Preview" overlay, no link, no client endorsement. File: [Portfolio.tsx:50–57](../../src/components/sections/Portfolio.tsx#L50-L57).
- `/work` index: same gate ([work/page.tsx:70–77](../../src/app/work/page.tsx#L70-L77)).
- `/work/[slug]`: `generateStaticParams` + the render guard both `filter(p => p.permission === "live")` → preview slugs `notFound()` and are never built or sitemapped. File: [work/[slug]/page.tsx:15–19, 36](../../src/app/work/[slug]/page.tsx#L15-L19). **No preview leak anywhere.**

### Fabricated / contradictory portfolio data — FAIL (High)
`projects.ts` content contradicts the `PORTFOLIO.md` fact sheet and invents a metric — violating PORTFOLIO §0 ("Never invent results, metrics, or testimonials") and BRAND §5 (specificity / factual accuracy):

| Project | projects.ts says | PORTFOLIO.md fact | Issue |
|---|---|---|---|
| Beach House Moving | "ranked for local moving terms in **60 days**" | "factual, **no invented metrics**" | **Invented metric** |
| Kai's Run | category "Endurance Events"; "registration flow" | Mobile **dog-conditioning** service; booking/"Founding 20" | Wrong category/facts |
| BashSnippets | "SaaS with **subscription billing**" | Linux **snippet library + content**; affiliate/display | Fabricated model |
| WaterVue | "Property Services" | **Event-planning** rebuild (Events Co.) | Wrong vertical |
| Aquamarine | "Hospitality" | **Pool cleaning**, Fort Walton Beach | Wrong vertical |
| Alexander Hines | "**attorney** / professional services" | **Construction** services | Fabricated vertical |

These `result`/`category` strings are public on `/work` + home portfolio, and the live ones flow into the `CreativeWork` schema `description` and the `/work/[slug]` meta description — so the fabrications propagate into structured data. File: [src/data/projects.ts:13–64](../../src/data/projects.ts#L13-L64).

### Missing project imagery — FAIL (High)
All six `image` paths point at `/images/projects/*.jpg`, but **no `public/images/projects/` directory exists** (confirmed via `ls`). `/work` and the home portfolio render broken `<Image>`s; PORTFOLIO §3 mandates a real screenshot/plate, "never stock" — currently there is nothing. Files: [projects.ts](../../src/data/projects.ts) (image fields), render in [work/page.tsx:49](../../src/app/work/page.tsx#L49) + [Portfolio.tsx:29](../../src/components/sections/Portfolio.tsx#L29).

---

## 8. Accessibility (DESIGN a11y gate — code-review based)
**PASS** — Skip link in CSS + DOM (`.skip-link` → `#main`, `tabIndex={-1}`). Files: [globals.css:65–79](../../src/app/globals.css#L65-L79), [layout.tsx:61–73](../../src/app/layout.tsx#L61-L73). **PASS** — `:focus-visible { outline: 2px solid #2FC6B6 }` (shoal) globally + on buttons. **PASS** — native interactive elements only (`<button>`, `<a>`/`<Link>` via `Button.tsx`). **PASS** — honeypot is `aria-hidden="true"` + `tabIndex={-1}` + `autoComplete="off"` inside a `hidden` wrapper. File: [QuoteForm.tsx:137–147](../../src/app/contact/QuoteForm.tsx#L137-L147). **PASS** — `prefers-reduced-motion` honored on the preloader (`motion-reduce:hidden`, resolves immediately) and the hero canvas (`motion-reduce:hidden`, poster is the static reduced-motion hero with `motion-reduce:opacity-80`). Files: [Preloader.tsx:40–56, 70](../../src/components/motion/Preloader.tsx#L40-L56), [Hero.tsx:34–41](../../src/components/sections/Hero.tsx#L34-L41).

**CONCERN (Low)** — `Reveal.tsx` animates opacity/translate via framer-motion and does **not** call `useReducedMotion()`. The global CSS `@media (prefers-reduced-motion)` rule only neutralizes CSS transitions, not framer-motion's JS-driven inline animations — so reveals still play under reduced-motion, technically violating DESIGN §"motion fully disabled." Content ends visible (`once: true`), so impact is low. File: [Reveal.tsx:17–26](../../src/components/ui/Reveal.tsx#L17-L26).

**NOTE** — Contrast (foam on ink), tap-target sizes, and Lighthouse a11y ≥95 **require live testing**; this dimension is code-review only.

---

## 9. Conversion / Integrations (INTEGRATIONS)
**PASS** — `events.ts` typed `dataLayer` helpers expose exactly the taxonomy with no renames: `phone_click`, `form_submit`, `booking_click`, `email_click`, `quote_start`. File: [src/lib/events.ts](../../src/lib/events.ts). Wired correctly: phone (Header, StickyCTA, Thanks, Footer), booking (Hero, CtaClose, CalEmbed `bookingSuccessful`), email (Footer), quote_start (Hero, StickyCTA, QuoteForm focus).
**PASS** — `/thanks` fires `track.formSubmit()` on mount and is noindexed. File: [thanks/page.tsx:11–13](../../src/app/thanks/page.tsx#L11-L13).
**PASS** — `api/contact`: zod parse → honeypot (`company.length > 0` → silent `{ok:true}`) → 3s time-trap → `RESEND_API_KEY` guard (logs + 500 fallback, never silently drops) → notify + autoresponder with `replyTo` the lead. File: [api/contact/route.ts](../../src/app/api/contact/route.ts).
**PASS** — `CalEmbed` renders the real `calLink` and guards the placeholder with a visible fallback. File: [CalEmbed.tsx:22–38](../../src/app/book/CalEmbed.tsx#L22-L38).

**FAIL (Critical) — but token-driven** — Because `site.calcom` = `{{CALCOM_URL}}`, every "Book a strategy call" CTA (Header, Hero, About, services, CtaClose, QuoteForm) currently links to the literal `{{CALCOM_URL}}`, and `/book` shows the "configure CALCOM_URL" fallback instead of a calendar. Likewise `tel:`/`mailto:` resolve to `{{STUDIO_PHONE_E164}}`/`{{STUDIO_EMAIL}}`. The booking + call + email conversion paths are **non-functional until Dim 10 is resolved.** **INFO** — GTM is gated on `NEXT_PUBLIC_GTM_ID`; with the env unset it correctly renders nothing (no broken GTM tag).

---

## 10. Placeholder / Token Sweep
`grep -rn "{{" src/` → **5 real unfilled tokens**, all in `site.ts` (the rest of the grep hits are JSX `{{ }}` in Reveal/StickyCTA/Preloader/JsonLd/DeepScene and the intentional `calcomUrl.startsWith("{{")` guard in CalEmbed — not defects):

| Token | File:line | Renders into |
|---|---|---|
| `{{STUDIO_PHONE_E164}}` | [site.ts:7](../../src/config/site.ts#L7) | `tel:` (Header, StickyCTA, Footer, Contact, Thanks), Org schema `telephone` |
| `{{STUDIO_PHONE_DISPLAY}}` | [site.ts:8](../../src/config/site.ts#L8) | visible phone text everywhere above |
| `{{STUDIO_EMAIL}}` | [site.ts:9](../../src/config/site.ts#L9) | `mailto:` (Footer, Contact, Privacy), Org schema `email` |
| `{{CALCOM_URL}}` | [site.ts:22](../../src/config/site.ts#L22) | every booking CTA + `/book` embed |
| `{{GTM_ID}}` | [site.ts:24](../../src/config/site.ts#L24) | unused at runtime (GTM reads `NEXT_PUBLIC_GTM_ID` env); stale token |

**FAIL (Critical)** — SEO.md §8 makes `grep -rn "{{" src/` → 0 a hard launch gate; it currently returns 5. These are *expected* pre-launch placeholders per INTEGRATIONS §5, but they are launch-blocking and several leak into user-visible UI and schema.

**CONCERN** — `public/indexnow-placeholder.txt` is a placeholder, not the real IndexNow key file the OWNERSHIP launch checklist requires. **INFO** — `gtmId` in `site.ts` is dead (runtime uses the env var); fill or delete to keep the sweep honest.

---

## Appendix: File Reference Map
| Issue | File | Line approx |
|---|---|---|
| Unfilled tokens (×5) | `src/config/site.ts` | 7, 8, 9, 22, 24 |
| Schema contactPoint token leak | `src/lib/schema.ts` | 36–42 |
| `speakable()` defined, never emitted | `src/lib/schema.ts` | 152 |
| Entity-sentence drift (llms) | `public/llms.txt` | 3 |
| Entity-sentence drift (home About) | `src/components/sections/About.tsx` | 34–39 |
| owner first-name-only | `src/config/site.ts` | 14 |
| sameAs empty (CONCERN) | `src/config/site.ts` | 23 |
| Thin `/work/[slug]` "coming soon" | `src/app/work/[slug]/page.tsx` | 87–94 |
| `/work/[slug]` no internal links | `src/app/work/[slug]/page.tsx` | 73–94 |
| Fabricated portfolio data + metric | `src/data/projects.ts` | 13–64 |
| Missing `public/images/projects/` (×6) | `src/data/projects.ts` (images) | 19,26,33,44,52,60 |
| Services overview: no lead/GEO anchor, wrong H1 | `src/app/services/page.tsx` | 40 |
| FAQ coverage gaps (services + 3 slugs) | `src/data/faqs.ts`, `services/[slug]/page.tsx` | data; 45 |
| Short titles (`/work`, `/services`) | `work/page.tsx`, `services/page.tsx` | 12 |
| Short/CTA-less descriptions | `work/page.tsx`, `services/page.tsx` | 13, 14 |
| Reveal ignores reduced-motion (JS) | `src/components/ui/Reveal.tsx` | 17–26 |
| CtaClose / home About copy drift | `CtaClose.tsx`, `About.tsx` | 51–63; 34–39 |
| Cal/phone/email CTAs non-functional (token) | Header/Hero/Footer/Contact/Book | — |
| IndexNow key still a placeholder | `public/indexnow-placeholder.txt` | — |

— End of report. See `ACTION-PLAN.md` for the sequenced fix queue.
