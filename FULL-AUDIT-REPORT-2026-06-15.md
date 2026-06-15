# Saltwater Studio — Pre-Indexation Audit Report
**Date:** 2026-06-15  **Auditor:** Claude Code (claude-sonnet-4-6)
**Scope:** 14 public routes, 3 live case studies, 3 preview tiles, 4 service entries,
8 data/config files, 14 component files, all 8 spec docs reviewed.
**Health Score: 71/100**

---

## Executive Summary

The codebase is structurally sound — all schema is config-driven, every route exports `buildMetadata`, the permission gate on preview projects is correctly enforced, no secrets are committed, and the entity stack (Organization, Person, Service, BreadcrumbList, FAQPage, speakable) is the real thing. What drags the score down is a single build-system defect that threatens the entire freeze, a factual inconsistency in the entity we sell as a service, and a handful of tracking and crawlability gaps that are fixable in one focused push.

**The 3 things most likely to hurt us in the 3-week freeze:**
1. The sitemap stamps every page with `new Date()` on every build — one Vercel deploy during the freeze tells Google "all 14 pages changed today," defeating a clean crawl.
2. The llms.txt references `.com` domains for Beach House Moving and Kai's Run but the actual sites are `.xyz` — an AI reading our AI-readiness file gets wrong URLs.
3. The founder's name is "Travis Abadie" in schema + llms.txt but "Travis" in CONTENT.md and the About page — a GEO entity inconsistency on the studio that sells entity consistency.

**Top 5 critical/high issues:**
1. **C1** — Sitemap churn: `const now = new Date().toISOString()` stamps all 14 pages on every build.
2. **H1** — llms.txt portfolio URLs say `.com`; projects.ts says `.xyz`.
3. **H2** — Founder name inconsistency: "Travis" vs. "Travis Abadie" across canonical files.
4. **H3** — Header + About page "Book a strategy call" → `cal.com` directly, bypassing `/book` and losing bookingSuccessful attribution.
5. **H4** — Offer section service cards (titles + one-liners) are children of `<ScrollFX ssr:false>` and are absent from server-rendered HTML.

**Top 5 quick wins (<30 min each):**
1. Fix sitemap churn: replace `const now = new Date().toISOString()` with hardcoded build-date string per-page.
2. Fix llms.txt: replace `beachhousemoving.com` → `beachhousemoving.xyz` and `kaisrun.com` → `kaisrun.xyz`.
3. Fix founder name: standardize to "Travis Abadie" in About page entity paragraph and CONTENT.md GEO sentence.
4. Add GTM `<noscript>` iframe immediately after `<body>` in layout.tsx.
5. Add `track.emailClick()` to the mailto: link in contact/page.tsx.

---

## Scoring Breakdown

| Category | Score | Weight | Weighted | Basis |
|---|---|---|---|---|
| 1. Indexation & Crawlability | 62/100 | 20% | 12.4 | code-review |
| 2. Conversion Tracking | 72/100 | 15% | 10.8 | code-review |
| 3. Technical SEO | 78/100 | 15% | 11.7 | code-review |
| 4. Schema & Entity | 75/100 | 15% | 11.25 | code-review |
| 5. Content / AEO / GEO | 73/100 | 15% | 10.95 | code-review |
| 6. Conversion / CRO | 65/100 | 10% | 6.5 | code-review |
| 7. AI Search Readiness | 68/100 | 7% | 4.76 | code-review |
| 8. Ownership / Security / Infra | 85/100 | 3% | 2.55 | code-review |
| **TOTAL** | | | **70.9 / 100** | |

> All scores are code-review based. No live Lighthouse run or GSC data was collected.
> Performance scores for the homepage are expected ~75–85 per ARCHITECTURE.md §5 (accepted 3D hero cost).

---

## 1. Indexation & Crawlability Readiness

### robots.ts
**PASS** — `src/app/robots.ts` (~line 6–22): `userAgent: "*"` allows `/`, disallows `/thanks` and `/api/`. Six AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bingbot) are explicitly allowed per SEO.md §6. Sitemap URL correctly points to `${site.url}/sitemap.xml`. No flags.

### sitemap.ts — CRITICAL CHURN
**FAIL (Critical)** — `src/app/sitemap.ts` line 6:
```ts
const now = new Date().toISOString();
```
This module-level constant is evaluated at build time and stamped as `lastModified` on every one of the 14 routes in the sitemap on every Vercel build. Any production deploy during or after the 3-week freeze — including auto-rebuilds triggered by Vercel infra, a dependency bump, or a one-line config tweak — tells Google and Bing that all 14 pages changed today. This is the single most damaging defect for a stability freeze. Google deprioritizes recrawling when it sees "everything changed" on every deploy.

**Correct pattern:** stable, per-page real ISO date strings matching when content actually last changed:
```ts
// before
const now = new Date().toISOString();
{ url: site.url, lastModified: now, ... }

// after
{ url: site.url, lastModified: "2026-06-15", changeFrequency: "weekly", priority: 1 }
{ url: `${site.url}/work`, lastModified: "2026-06-15", changeFrequency: "weekly", priority: 0.9 }
// ... each page with its own real date, updated only when that page's content changes
```

**PASS** — Only live projects are included (`getLiveProjects()`). `/thanks` explicitly excluded (comment on line 17). Service routes dynamically generated from `services.map()` matching the 4 slugs.

### Canonical correctness
**PASS** — `src/lib/seo.ts` `canonicalUrl()` (line 13–16): strips query strings and trailing slashes. `metadataBase: new URL(site.url)` set in both `layout.tsx` (line 32) and `buildMetadata` (line 40). All inner pages call `buildMetadata({ path: "..." })` producing self-referencing apex-https canonicals. Verified on: `/`, `/work`, `/about`, `/contact`, `/book`, `/services`, `/services/[slug]`, `/work/[slug]`, `/privacy`, `/thanks`.

### www→apex and http→https
**PASS (in-repo)** — `next.config.ts` (line 5–12): permanent `www.saltwaterstudio.xyz → saltwaterstudio.xyz/:path*` redirect.
**MANUAL CHECK NEEDED** — http→https enforcement is not in `next.config.ts`. This is correct — Vercel enforces HTTPS at the edge. Verify via `curl -I http://saltwaterstudio.xyz` post-deploy that it 301s to https. Document in OWNERSHIP.md post-launch checklist.

### Preview-domain duplicate content
**CONCERN** — Cannot verify in-repo. Vercel automatically sends `x-robots-tag: noindex` on preview deployment URLs for Team plans but behavior on Hobby is less documented. The in-repo canonical always points to `https://saltwaterstudio.xyz/...` (apex), not to itself, so preview URLs would canonicalize to the apex. Add manual curl check of a preview URL post-deploy: `curl -I https://saltwater-studio-*.vercel.app` — verify either `x-robots-tag: noindex` or canonical pointing to apex.

### noindex audit
**PASS** — `/thanks/layout.tsx` (line 4–10): `buildMetadata({ noIndex: true })` is set. In `seo.ts` this emits `robots: { index: false, follow: false }`. `/thanks` is also absent from `sitemap.ts`. All other 13 public routes are indexable. `robots.ts` also disallows `/thanks` from crawlers.

### JS-render extractability (AEO-critical)
**FAIL (High)** — `src/components/sections/Offer.tsx` (lines 34–70): The four service cards (title + one-liner + CTA for each of the 4 services) are passed as children to `<ScrollFX>`, which is dynamically loaded with `ssr: false` (`const ScrollFX = dynamic(..., { ssr: false })` at line 9). During server-side rendering, the `ScrollFX` component is replaced with null — its children (the `services.map()` output) are not included in the initial HTML.

This means an AI crawler reading server-rendered HTML for the homepage sees the section heading ("The layers of the deep") but not the four service names, one-liners, or `Talk it through →` links. The `/services` page renders the same data correctly (pure server component, no `ssr:false` wrapper), so service content is extractable from that URL. But the homepage offer section is blind to non-JS crawlers.

**What's in SSR HTML from the homepage:** H1, subhead, hero CTAs, Trust strip, Offer h2, Process section (all server-rendered), WhyUs claims, About summary, CtaClose.
**What's NOT in SSR HTML:** The 4 offer card titles + one-liners inside `<ScrollFX>`.

---

## 2. Conversion Tracking

### GTM installation
**PASS** — `src/app/layout.tsx` (lines 48, 81–91): GTM loaded via `next/script strategy="afterInteractive"`. Container ID read from `process.env.NEXT_PUBLIC_GTM_ID` (env var, not hardcoded). Script only fires when `GTM_ID` is truthy — safe for dev environments.

**FAIL (Medium)** — `layout.tsx` body (lines 60–93): No `<noscript>` GTM iframe. Google's required GTM snippet is a two-part install: the `<script>` (present) plus a `<noscript><iframe>` tag immediately after `<body>`. Without it, GTM tag manager doesn't fire for users with JS disabled (small population but a spec gap).

### Event wiring — per INTEGRATIONS.md taxonomy
| Event | Status | Location |
|---|---|---|
| `phone_click` | **PASS** | `Header.tsx` lines 62+99, `Footer.tsx` line 57, `StickyCTA.tsx` line 17, `thanks/page.tsx` line 27 |
| `email_click` | **FAIL (Medium)** | `Footer.tsx` line 57 ✓ — **`contact/page.tsx` line 49 `mailto:` link: no `onClick` handler** |
| `form_submit` | **PASS** | `thanks/page.tsx` `useEffect` line 13 — fires on mount, as specified by INTEGRATIONS.md |
| `booking_click` | **PASS/CONCERN** | CalEmbed `bookingSuccessful` event ✓; header/About → cal.com bypasses embed (see H3) |
| `quote_start` | **PASS** | `Hero.tsx` line 79, `QuoteForm.tsx` line 25, `CtaClose.tsx` line 79, `StickyCTA.tsx` line 28 |

### Cal.com booking split — tracking gap
**FAIL (High) / Cross-references H3** — Two separate booking paths exist:
- **Path A (Header, About page):** `href="https://cal.com/${site.calcom}"` — direct external link. Fires `booking_click` on click but not on successful booking completion.
- **Path B (Hero, CtaClose, Services, Work/[slug], Book page):** `href="/book"` — internal page with CalEmbed. Fires `booking_click` on `bookingSuccessful` event (confirmed actual booking).

The header is likely the highest-traffic CTA on the site. Routing it to cal.com directly inflates `booking_click` with intent signals rather than confirmed bookings and sends visitors off-site before any session attribution. Path B (/book) is the correct canonical booking path per ARCHITECTURE.md.

---

## 3. Technical SEO

### Per-page metadata
**PASS** — Every page calls `buildMetadata()`. Dynamic routes (`work/[slug]`, `services/[slug]`) use `generateMetadata` per ARCHITECTURE.md spec.

Title character counts (code-review, approximate):
| Route | Title | Chars |
|---|---|---|
| `/` | "Saltwater Studio \| Web Design for Service Businesses" | 53 ✓ |
| `/about` | "About Travis — Web Design, Gulf Coast \| Saltwater Studio" | 56 ✓ |
| `/work` | "Our Work — Custom Web Design Projects \| Saltwater Studio" | 56 ✓ |
| `/services` | "Services — Web Design, SEO & AI Search \| Saltwater Studio" | 58 ✓ |
| `/contact` | "Contact — Get a Web Design Quote \| Saltwater Studio" | 51 ✓ |
| `/book` | "Book a Strategy Call \| Saltwater Studio" | 39 (short but acceptable) |
| `/privacy` | "Privacy Policy \| Saltwater Studio" | 33 (low but not a revenue page) |

**NOTE** — Homepage meta description (`page.tsx` line 19–22): "A web design studio for service businesses that refuse to look like everyone else. Schema-first builds, AI search visibility, and the tracking your competitor skipped." ≈ 166 chars (6 over the 160-char soft cap). Google will likely truncate at the period after "everyone else." — still serviceable but worth trimming.

### H1 audit
**PASS** — Every page has exactly one `<h1>`. Confirmed: `/` (Hero.tsx line 56), `/about` (line 62), `/work` (line 36), `/services` (line 41), `/contact` (line 36), `/book` (line 32), `/privacy` (line 18), `work/[slug]` (line 67), `services/[slug]` (line 65).

### Heading order
**PASS** — h1 → h2 → h3 order observed on all pages reviewed. Homepage hierarchy: h1 (Hero) → h2 (Offer, Process, WhyUs, About, CtaClose) → h3 (step/claim/service items within sections).

**NOTE** — Two homepage h2 elements both read "Depth, by design." — `WhyUs.tsx` (line 36) and `CtaClose.tsx` (line 57). Not an SEO failure but duplicate h2 text is unusual.

**CONCERN (Medium)** — FAQ heading structure on /services and /services/[slug] pages: the spec (SEO.md §4) says "H2s on content pages are literal questions." In practice, FAQ questions appear at `<h3>` level under an `<h2>` "Common questions" section header. AI assistants are more likely to extract question-answer pairs from h2-level questions. This is a Medium deviation from the AEO spec.

### Internal linking — orphan check
**PASS** — Every public route is reachable from the global navigation (Header + Footer). Service detail pages linked from `/services` via "Learn more →". Case study pages linked from `/work` via "View case study →". `/privacy` linked from Footer. `/book` linked from all primary CTAs. `/contact` linked from all secondary CTAs. No orphan pages found.

### Images
**PASS** — `next/image` used throughout with `alt` and `sizes` on every `<Image>`. Hero (`Hero.tsx` line 30): `priority` set — correct for LCP. `About.tsx` left-column image: no `priority` (below fold, correct).

**IMAGE-REUSE FORENSIC** — The following portfolio tiles and their image files:
| Project | Image | Permission |
|---|---|---|
| Beach House Moving | `plate-deep-rays.webp` | live |
| Kai's Run | `plate-bokeh.webp` | live |
| BashSnippets | `plate-calm.webp` | live |
| WaterVue Events Co. | `plate-calm.webp` | preview |
| Aquamarine Pool Clean | `plate-calm.webp` | preview |
| Alexander Hines Construction | `plate-calm.webp` | preview |

`plate-calm.webp` is used on 4 of 6 portfolio cards. The comments in `projects.ts` (lines 29, 63, 98, 132, etc.) correctly document "V1: brand plate — swap to a real screenshot later (one-line edit)." As long as the swap happens before or shortly after freeze, this is acceptable. If the 3 live case studies ship with brand plates, it weakens the "we build real sites" proof. Recommend per-project real screenshots for the 3 live projects at minimum.

### OG / Twitter cards
**PASS** — `og-default.jpg` exists at `public/og-default.jpg`, confirmed JPEG 1200×630 (code-review verified via file command). `seo.ts` declares `images: [{ url: image, width: 1200, height: 630, alt: formattedTitle }]`. `layout.tsx` sets `metadataBase` so relative OG paths resolve correctly.

### Performance (code-review based — no live Lighthouse run)
**GOOD** — R3F (DeepScene) loaded via `dynamic(..., { ssr: false })` at `Hero.tsx` line 11. Canvas only mounts when `preloadComplete && inView` (lines 43–47). Canvas hidden on mobile (`hidden md:block`) and reduced-motion (`motion-reduce:hidden`). Poster image with `priority` serves as LCP.

**GOOD** — GSAP + Lenis only inside `ScrollFX.tsx` (dynamic, `ssr: false`, line 9 of Offer.tsx and line 10 of CtaClose.tsx). Never in shared bundle.

**GOOD** — Three fonts loaded via `next/font/google` in `layout.tsx` with `display: "swap"`. Self-hosted by Next.js.

**CONCERN (code-review based)** — `framer-motion` (~35kB gz) is in the shared first-load bundle because `Reveal.tsx` and `Preloader.tsx` are not dynamically imported. Per ARCHITECTURE.md §5, non-hero pages target ≤150kB gz first-load JS. Framer is a non-trivial cost on non-hero pages. Acceptable given the spec, but worth monitoring.

---

## 4. Schema & Entity

### JSON-LD completeness
All schema is built from `src/lib/schema.ts`, fed by `src/config/site.ts`. No inline literals. Required schema stack per SEO.md §3:

| Page | Required | Present? |
|---|---|---|
| Home (layout) | Organization + ProfessionalService + WebSite | PASS — `buildOrgSchema()` + `buildWebSiteSchema()` in `layout.tsx` line 65 |
| Home (page) | FAQPage + WebPage/speakable | PASS — `page.tsx` lines 30–31 |
| About | AboutPage + Person + BreadcrumbList + WebPage/speakable | PASS — `about/page.tsx` lines 31–34 |
| Services | BreadcrumbList + FAQPage + WebPage/speakable | PASS — `services/page.tsx` lines 29–31 |
| Services/[slug] | Service + BreadcrumbList + FAQPage | PASS — `services/[slug]/page.tsx` lines 49–57 |
| Work | BreadcrumbList | PASS — `work/page.tsx` line 26 |
| Work/[slug] | BreadcrumbList + CreativeWork | PASS — `work/[slug]/page.tsx` lines 51–58 |
| Contact | ContactPage + BreadcrumbList | PASS — `contact/page.tsx` lines 25–26 |
| Book | BreadcrumbList | PASS (partial — see below) |
| Privacy | (none specified) | — |

**FAIL (Medium)** — `/book` (`book/page.tsx` line 24): Only `BreadcrumbList`. No `WebPage` or `speakable` schema. Per SEO.md §4, "One speakable block per key page." The booking page is a money page.

**FAIL (Medium)** — `/work` (`work/page.tsx` line 26): Only `BreadcrumbList`. No `WebPage` schema. The portfolio index is a trust page and should have a `WebPage` node.

**FAIL (Low)** — `/privacy` (`privacy/page.tsx`): No JSON-LD at all. Low-priority page but a `WebPage` node and `isPartOf` reference costs nothing.

### sameAs integrity
**PASS** — `site.sameAs` is an empty array (line 23 `site.ts`). No aspirational, dead, or unverified profile URLs are in either the Organization or Person schemas. `personFounder()` and `studioOrg()` both derive `sameAs` from the same empty array. When real profiles go live, they should be added here.

**NOTE** — The `personFounder()` function (`schema.ts` line 65–75) uses `sameAs: site.sameAs` which is the organization-level array. In practice, Travis's personal profiles (LinkedIn, GitHub, Dribbble) are distinct from the studio's organizational profiles. When profiles are created, add a separate `ownerSameAs` array to `site.ts` for the Person node.

### aggregateRating / Review markup
**PASS** — No review or aggregateRating markup exists. Correct — no published reviews to mark up yet.

### Entity fact-set consistency sweep
**Checking across:** `site.ts`, `schema.ts`, `about/page.tsx`, `llms.txt`, `content/CONTENT.md`, `layout.tsx` metadata.

| Fact | site.ts | schema.ts | About page | llms.txt | CONTENT.md |
|---|---|---|---|---|---|
| Studio name | "Saltwater Studio" | ✓ | ✓ | ✓ | ✓ |
| Founder full name | "Travis Abadie" | **"Travis Abadie"** ✓ | **"Travis"** ✗ | **"Travis Abadie"** ✓ | **"Travis"** ✗ |
| Founded | "2025" | ✓ | ✓ | ✓ | ✓ |
| Phone (E.164) | "+18502185855" | via contactPoint ✓ | not shown | not shown | N/A |
| Email | "hello@saltwaterstudio.xyz" | via contactPoint ✓ | not shown | not shown | N/A |
| Location | "Pensacola, FL" / Gulf Coast | "Florida's Gulf Coast" ✓ | "Florida's Gulf Coast" ✓ | "Gulf Coast, FL" ✓ | "Florida's Gulf Coast" ✓ |
| Area served | "United States" | ✓ | ✓ | ✓ | ✓ |

**FAIL (High)** — Founder name is inconsistent across canonical files. `schema.ts` (`GEO_DESCRIPTION` line 8) and `llms.txt` (line 2) use "Travis Abadie". `about/page.tsx` (line 69) and `content/CONTENT.md` (line 12 GEO sentence) use "Travis" (first name only). This is the exact GEO entity confusion we sell as a service. An AI model reading the schema gets "Travis Abadie"; an AI model reading the About page gets "Travis" — creating ambiguity about the person entity. Standardize to "Travis Abadie" everywhere.

---

## 5. Content Quality / AEO / GEO

### Snippet test (H2/H3 blocks as standalone answers)
Tested per SEO.md §4 — "any H2 + first paragraph must stand alone as a complete, correct answer."

**PASS** — `/services` intro paragraph: "Saltwater Studio builds custom websites for service businesses and the search presence that makes them found — web design, SEO, answer-engine and generative-engine optimization, Google Business Profile, and social content." Standalone answer to "What does Saltwater Studio do?" Pass.

**PASS** — Home FAQ block (faqs.ts, `page: "home"`): All 6 answers are answer-first with standalone first sentence. "Saltwater Studio is a remote web-design studio that builds custom, search-optimized websites…" — complete on its own. Pass on all 6.

**PASS** — Service detail FAQ blocks: web-design, seo-aeo-geo, google-presence, social-content — all answer-first, standalone sentences.

**CONCERN (Medium)** — FAQ questions appear at `<h3>` level on `/services` and `/services/[slug]` pages. SEO.md §4 specifies "H2s on content pages are literal questions." The schema (FAQPage JSON-LD) correctly captures them as questions regardless of heading level, but the HTML heading hierarchy deviates from the AEO spec. Featured snippet extraction and voice assistants prefer h2-level question text.

### Non-generic bar
**PASS** — Copy references real-named assets (BashSnippets, Beach House Moving, Kai's Run), real tech (Next.js, schema.org, GTM, IndexNow), specific outcomes ("county by county," "Founding 20," "TechArticle and HowTo schema"). No banned words (elevate, seamless, solutions, leverage, etc.) found in any component or data file reviewed.

### Money-phrase coverage
SEO.md does not specify an explicit target-phrase list. Inferring from service pages:
- "web design for service businesses" → Homepage h1, services page h1, FAQs — COVERED
- "Next.js web design" → service card "Custom Next.js build" — COVERED
- "AEO / GEO / AI search optimization" → `/services/seo-aeo-geo` — COVERED
- "Google Business Profile" → `/services/google-presence` — COVERED
- No cannibalization detected (one page per service intent)

### Case-study integrity forensic
**PASS (live three)** — Beach House Moving, Kai's Run, BashSnippets: extensive real challenge/approach/outcome copy in `projects.ts` (lines 32–124), real external URLs (`beachhousemoving.xyz`, `kaisrun.xyz`, `bashsnippets.xyz`), real technology stacks. BashSnippets is explicitly documented as a studio-owned property. No invented metrics — all outcome language describes what shipped, not performance claims.

**CONCERN (High)** — Three preview entries (WaterVue Events Co., Aquamarine Pool Clean, Alexander Hines Construction): `projects.ts` lines 126–152. The repo contains no documentation explicitly confirming these are real signed engagements vs. concept work. PORTFOLIO.md §2 describes them in the preview section with role lines but does not state whether they are real clients, in-progress builds, or aspirational concept projects. They are displayed publicly on `/work` under "Private Preview" labels with the clients' business names visible.

For a studio whose pitch is entity truthfulness, showing real-sounding client names under "Private Preview" without explicit documentation of the engagement type is a reputational risk. If they are real clients, document it in PORTFOLIO.md. If any are concept/aspirational, rename the tile to "Concept project — [Industry]" and remove the business name.

### Blog / content engine
**NOTE** — No `/blog` or content route exists. No MDX pipeline, no article schema. This is expected per the launch scope. Post-freeze growth item; note it in the post-launch backlog.

---

## 6. Conversion / CRO

### Offer architecture
**CONCERN** — No explicit scarcity, founding-client, or risk-reversal offer framing on the hero or in the CTA close. Both CTAs are bare: "Book a strategy call" and "Get a quote." The services and About copy are strong on specificity and trust but there is no conversion trigger (time-bound rate, founding discount, guarantee, free deliverable). This is an owner decision — Travis must confirm and write any offer — but it is a measurable CRO gap compared to the conversion doctrine in INTEGRATIONS.md.

### CTA consistency — booking path split
**FAIL (High)** — Reference: H3 above. Two booking paths:
- **Header** (`Header.tsx` line 67): `href="https://cal.com/${site.calcom}"` → direct to cal.com
- **About right-column** (`about/page.tsx` line 100): same direct link
- **Hero, CtaClose, Services, Work/[slug], Book page**: `href="/book"` → internal page

`/book` is the correct canonical path: it renders the embed, fires `booking_click` on `bookingSuccessful` (a confirmed booking), and keeps the visitor on-domain for attribution. The header path loses both the confirmed-booking signal and the session data.

### Mobile sticky bar
**PASS** — `StickyCTA.tsx`: `fixed bottom-0 inset-x-0 z-40 md:hidden` — mobile only. Safe-area padded: `pb-[env(safe-area-inset-bottom)]` and height `calc(4rem + env(safe-area-inset-bottom))`. Two actions: `Call` (phone_click) and `Get a quote` (/contact). Space reserved: `layout.tsx` main element has `pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0` (line 71) — no content hidden behind the bar. PASS on all counts.

### Quote form
**PASS** — Labels above all fields (not placeholders). `inputMode` + `autocomplete` on name/email. Honeypot field `company` hidden with `aria-hidden="true"` and `tabIndex={-1}`. Time-trap: `startTimeRef.current = Date.now()` in `useEffect` plus server-side check `Date.now() - t < 3000` in `route.ts`. Friendly error fallback references phone number. `/thanks` page exists and fires `form_submit`. Button text: "Send it" (outcome-focused). Friction-reducer under button: "Prefer to talk it through? Book a strategy call."

**NOTE (Low)** — `business` field (`QuoteForm.tsx` line 118): `inputMode="url"` is incorrect for a field that accepts both business name text and an optional URL. Should be `inputMode="text"`. Not a hard failure but browsers may show URL keyboard on mobile.

### Dead-end pages
**FAIL (Medium)** — `/privacy` (`privacy/page.tsx`): No closing CTA. The page ends after the contact email paragraph with no call to action or next step. Per the CRO doctrine, every page ends in a CTA.

**FAIL (Low)** — No custom `not-found.tsx` (404 page). Next.js default 404 renders with no studio branding, no NAP, no CTA. A prospect hitting a broken link gets zero Saltwater Studio presence and no conversion path.

---

## 7. AI Search Readiness

### llms.txt
**PASS** — File present at `/public/llms.txt`, accessible at `https://saltwaterstudio.xyz/llms.txt`.

**FAIL (High)** — `public/llms.txt` lines 14–15:
```
- Beach House Moving: https://beachhousemoving.com
- Kai's Run: https://kaisrun.com
```
The actual live site URLs in `data/projects.ts` are:
```ts
url: "https://beachhousemoving.xyz"  // line 32
url: "https://kaisrun.xyz"            // line 64
```
The llms.txt references `.com` domains; the real sites are `.xyz`. An AI assistant reading llms.txt to recommend Saltwater's portfolio would direct users to incorrect URLs. This is a direct factual error on the file that most AI tools read first.

**PASS** — Entity facts in llms.txt are consistent with `site.ts` for name, founded, area served, tagline.

**CONCERN** — Founder name in llms.txt line 39: "Travis Abadie" (consistent with schema.ts but inconsistent with CONTENT.md/About page — see entity consistency finding H2).

### IndexNow
**PASS** — Key file at `public/9e61e3d376bcfcb262b4bce2bcb2ef8a.txt`, content = `9e61e3d376bcfcb262b4bce2bcb2ef8a`. Script at `scripts/ping-indexnow.js` executes as `postbuild`. Script correctly skips non-production environments (`VERCEL_ENV !== "production"`).

**FAIL (High)** — `scripts/ping-indexnow.js` line 6: `const KEY = process.env.INDEXNOW_KEY;` — the `INDEXNOW_KEY` env var is **not listed in `OWNERSHIP.md` environment variables table** (which lists only `RESEND_API_KEY`, `NEXT_PUBLIC_GTM_ID`, `STUDIO_EMAIL`). If `INDEXNOW_KEY` is not set in Vercel dashboard, every production build logs `[indexnow] INDEXNOW_KEY not set — skipping ping.` silently and the Bing/AI index never receives the signal. The ping runs as `postbuild` (non-fatal) so the build still succeeds — the failure is invisible.

Also: the IndexNow URL list in the script (lines 22–38) includes all 14 live URLs but **not** the three live case-study pages (`work/beach-house-moving`, `work/kais-run`, `work/bash-snippets` — these ARE included, confirmed line 34–36). PASS on URL coverage.

### AI crawler access
**PASS** — `robots.ts`: all six AI crawlers explicitly allowed per SEO.md §6. Permissive `userAgent: "*"` baseline plus per-crawler explicit allows. No blocking of any crawler.

---

## 8. Ownership / Security / Infra

### OWNERSHIP.md completeness
**PASS** — File filled with all accounts: Namecheap, Vercel, GA4, GSC, GTM, GBP (TODO), Resend, Cal.com, GitHub, Instagram/LinkedIn/Dribbble (all TODO — correct, not yet created).

**FAIL (Low)** — Missing `INDEXNOW_KEY` from the environment variables table. This is the env var the postbuild ping depends on.

### Public repo security
**PASS** — `.gitignore` (reviewed, lines 26–30): covers `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local`.
**PASS** — `.env.local` is present in the working tree (3 lines, untracked, correctly gitignored).
**PASS** — `RESEND_API_KEY` is never hardcoded — only read from `process.env.RESEND_API_KEY` (`api/contact/route.ts` line 54).
**PASS** — No hardcoded Resend keys, tokens, or passwords found in source scan.
**INFO** — `site.ts` line 24: GTM ID `GTM-M3RTZ7C8` in the file. GTM container IDs are public-by-design (visible in any page source), not secrets. Documentation purpose is stated in comment.
**INFO** — `site.ts` line 25: Google verification token in source. GSC verification tokens are public-by-design. `public/googleTtW9ukjyKdvs9lvvzlFkRdpTgLNoXCqrRFNmdPGUVOc.html` also present — dual verification (meta tag + HTML file). Both methods are valid and public.
**INFO** — IndexNow key `9e61e3d376bcfcb262b4bce2bcb2ef8a` in `public/` — correct by design; must be publicly accessible for IndexNow validation.

### Vercel Hobby / commercial use
**PASS** — ARCHITECTURE.md §2 explicitly documents: "Hobby is fine here; revisit if it ever hosts client work." This is the studio's own property. No compliance issue.

### Domain
**CONCERN** — `.xyz` domain. Per our own doctrine it is acceptable, and it aligns with the BashSnippets/Kai's Run/Beach House Moving consistent `.xyz` usage. Worth noting that `.com` or `.studio` would carry more trust signal for a primary sales property. Owner decision, not a defect.

### Placeholder grep
**PASS** — `grep -rn "{{" src/` returns only JSX syntax (`style={{ }}`, `animate={{ }}`, etc.) — zero unfilled `{{TOKEN}}` template placeholders. `site.ts` is fully populated: phone, email, GTM ID, calcom slug, founding year, owner, URL, geo, sameAs. CalEmbed guard check (`calcomUrl.startsWith("{{")`) confirms the calcom value is no longer a placeholder.

---

## Appendix: File Reference Map

| Issue | File | Line approx |
|---|---|---|
| Sitemap churn (C1) | `src/app/sitemap.ts` | 6 |
| llms.txt URL mismatch (H1) | `public/llms.txt` | 14–15 |
| Founder name inconsistency (H2) | `content/CONTENT.md`, `src/app/about/page.tsx` | CONTENT.md line 12; about line 69 |
| Header bypasses /book (H3) | `src/components/ui/Header.tsx`, `src/app/about/page.tsx` | Header line 67; about line 100 |
| Offer cards not SSR'd (H4) | `src/components/sections/Offer.tsx` | 9, 34–70 |
| email_click missing on contact (H5) | `src/app/contact/page.tsx` | 49 |
| GTM noscript missing (H6) | `src/app/layout.tsx` | after line 60 (body open) |
| INDEXNOW_KEY not in OWNERSHIP.md (H7) | `OWNERSHIP.md`, `scripts/ping-indexnow.js` | OWNERSHIP.md env table; script line 6 |
| Privacy page dead end (M1) | `src/app/privacy/page.tsx` | end of file |
| No custom 404 (M2) | `src/app/` | missing `not-found.tsx` |
| /work missing WebPage schema (M3) | `src/app/work/page.tsx` | 26 |
| /book missing WebPage schema (M3) | `src/app/book/page.tsx` | 24 |
| /privacy missing schema (M3) | `src/app/privacy/page.tsx` | — |
| FAQ questions at h3 not h2 (M4) | `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx` | services ~94; slug ~90 |
| business inputMode="url" (M5) | `src/app/contact/QuoteForm.tsx` | 118 |
| Preview project integrity (M6) | `content/PORTFOLIO.md`, `src/data/projects.ts` | PORTFOLIO.md §2; projects lines 126–152 |
| plate-calm.webp reuse (L1) | `src/data/projects.ts` | 98, 132, 139, 146 |
| Privacy "Last updated" date (L2) | `src/app/privacy/page.tsx` | 19 |
| Duplicate h2 "Depth, by design." (L3) | `src/components/sections/WhyUs.tsx`, `src/components/sections/CtaClose.tsx` | WhyUs 36; CtaClose 57 |
| No blog route (L4) | `src/app/` | post-freeze item |
