# Saltwater Studio — Pre-Launch SEO/AEO/GEO Action Plan
**Generated:** 2026-06-14 | **Full report:** [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md) | **Health: 68/100**

Fix queue sorted by severity. Every item is a minimum-surgical change. IDs are stable references. Re-run `npm run build` after each group and re-validate schema after C1.

---

## CRITICAL — Fix Immediately (launch blockers)

### C1 · Fill the 5 `{{TOKEN}}`s in `site.ts`
**File:** `src/config/site.ts` (~7, 8, 9, 22, 24)
**Impact:** Clears the SEO.md §8 hard gate (`grep -rn "{{" src/` → 0), repairs every booking/call/email CTA, and removes the `{{token}}` leak from the Organization schema `telephone`/`email` in one move. Without it, booking + phone + email conversion is dead and the entity node fails Rich Results.
**Fix:** Replace placeholders with the real values (phone in E.164 + display, the `hello@` inbox, the Cal.com link). `gtmId` is read from `NEXT_PUBLIC_GTM_ID` at runtime — either set it to the real `GTM-XXXX` for documentation or delete the dead field so the sweep stays at 0.
```ts
// before
phone: "{{STUDIO_PHONE_E164}}",
phoneDisplay: "{{STUDIO_PHONE_DISPLAY}}",
email: "{{STUDIO_EMAIL}}",
calcom: "{{CALCOM_URL}}",
gtmId: "{{GTM_ID}}",
// after (example shape — use real values)
phone: "+18505550100",
phoneDisplay: "(850) 555-0100",
email: "hello@saltwaterstudio.xyz",
calcom: "saltwater/strategy-call",
gtmId: "GTM-XXXXXXX", // or delete; runtime uses NEXT_PUBLIC_GTM_ID
```
**Verify:** `grep -rn "{{" src/` returns only JSX/guard hits (Reveal, StickyCTA, Preloader, JsonLd, DeepScene, CalEmbed guard) — zero real tokens. Then re-run the Rich Results Test on the home Organization node.

---

## HIGH — Fix This Week

### H1 · De-fabricate the portfolio data
**File:** `src/data/projects.ts` (~13–64)
**Impact:** Removes an invented performance metric and four factual contradictions of `PORTFOLIO.md` that currently propagate into public copy **and** CreativeWork schema — a brand-integrity and entity-trust failure (PORTFOLIO §0, BRAND §5).
**Fix:** Rewrite each `category`/`result` from the PORTFOLIO.md fact sheet; describe what was *built*, never an unverifiable metric.
```ts
// before — Beach House (invented metric)
result: "Schema-first site with GBP integration — ranked for local moving terms in 60 days.",
// after
result: "Custom Next.js site with county-level service-area pages, schema-first and built to rank.",

// before — Kai's Run (wrong category + facts)
category: "Endurance Events",
result: "Event brand site with full schema, tracking, and registration flow.",
// after
category: "Mobile Dog Conditioning",
result: "A new mobile service with no AI-search competitor — booking flow + founding-member offer.",

// before — BashSnippets (fabricated model)
category: "Developer Tool",
result: "Next.js SaaS with subscription billing and CLI tooling.",
// after
category: "Content Site",
result: "A Linux snippet library engineered for search and AI citation — schema, llms.txt, monetization.",
```
Also correct the three preview entries to their real verticals (WaterVue → event planning; Aquamarine → pool cleaning, Fort Walton Beach; Alexander Hines → construction). Keep `result` as a label-only sentence for preview items.

### H2 · Add the 6 portfolio images
**File:** `public/images/projects/` (create) + `src/data/projects.ts` image paths
**Impact:** `/work` and the home portfolio currently render broken `<Image>`s. PORTFOLIO §3 requires a real screenshot/plate, never stock.
**Fix:** Create `public/images/projects/` and add real screenshots for the 3 live sites and brand-consistent plates for the 3 preview tiles, matching the existing filenames (`beach-house-moving.jpg`, `kais-run.jpg`, `bash-snippets.jpg`, `watervue.jpg`, `aquamarine.jpg`, `alexander-hines.jpg`). Pre-shrink ≤2000px, export WebP/AVIF to match the rest of `public/images/`.
**Verify:** load `/work` locally — six tiles, no broken images, preview overlay intact.

### H3 · Make `/work/[slug]` real content (kill the "coming soon" stubs)
**File:** `src/app/work/[slug]/page.tsx` (~87–94) + `src/data/projects.ts` (add fields)
**Impact:** Three thin, near-duplicate, indexed pages are an indexation liability (Dim 3). Either flesh them out or stop indexing them.
**Fix (preferred):** add real case-study fields to each live project (`challenge`, `approach`, `outcome`, `stack[]`) and render them, plus **≥2 in-content internal links** (e.g. to `/services/web-design` and `/contact`). Replace the placeholder box:
```tsx
// before
{/* TODO: expand with full case study content */}
<div …><p …>Full case study — coming soon</p></div>
// after — render project.challenge / approach / outcome as H2 sections,
// then: <Link href="/services/web-design">…</Link> and <Link href="/contact">Start a project →</Link>
```
**Fix (fast interim):** if real case studies aren't ready for launch, set the live projects to link out only and drop `/work/[slug]` from `generateStaticParams` + sitemap so no thin page is indexed (the home/`/work` tiles still show, "Visit site" still links). Choose one — do not ship the "coming soon" box.

---

## MEDIUM — Fix Within a Month

### M1 · Restore the services-overview lead + H1 + GEO anchor
**File:** `src/app/services/page.tsx` (~40)
**Impact:** `/services` has no "Saltwater Studio" in the body, no answer-first lead, and uses the tagline as H1 instead of CONTENT.md's heading — failing the GEO anchor and the AEO lead test.
**Fix:** Set H1 to **"What Saltwater Studio does"** and add the CONTENT.md answer-first lead above the service list:
```tsx
<h1 …>What Saltwater Studio does</h1>
<p className="mt-4 …">Saltwater Studio builds custom websites for service businesses and the
search presence that makes them found — web design, SEO, answer-engine and generative-engine
optimization, Google Business Profile, and social content. Everything is quote-based; tell us
about the business and we'll scope it honestly.</p>
```
(Move the secondary tagline to a kicker/subhead if you want to keep it.)

### M2 · Close the FAQ coverage gaps
**File:** `src/data/faqs.ts` + `src/app/services/[slug]/page.tsx` (~45)
**Impact:** SEO §4 requires a FAQPage block on the services overview and each service page; currently only home + seo-aeo-geo have one.
**Fix:** Add `page: "services"` FAQs (3–4, answer-first) and FAQs for `web-design`, `google-presence`, `social-content`. Replace the hard-coded slug check with a generic lookup so any service's FAQs render:
```ts
// before
const pageFaqs = slug === "seo-aeo-geo" ? getFaqsByPage("seo-aeo-geo") : [];
// after
const pageFaqs = getFaqsByPage(slug as FAQ["page"]);
```
(Widen the `FAQ["page"]` union to include all four service slugs.) Then `/services` should render `getFaqsByPage("services")` (already wired — it just needs data).

### M3 · Emit `speakable` on key pages
**File:** `src/lib/schema.ts` (~152) + home/about/services pages
**Impact:** SEO §4 requires one `SpeakableSpecification` per key page; the helper exists but is never called.
**Fix:** Wrap a `WebPage` node carrying `speakable([ "h1", "#about-entity", ".faq-answer" ])` (or the relevant selectors) and emit it via `<JsonLd>` on home, `/about`, and `/services`. Reuse the existing `#about-entity` id already on the About page.

### M4 · Reconcile the entity sentence to one canonical string
**Files:** `public/llms.txt` (~3), `src/components/sections/About.tsx` (~34–39)
**Impact:** Removes entity drift; GEO §5 wants the fact set verbatim across site + schema + llms.txt.
**Fix:** Replace both variants with the canonical sentence (or its CONTENT.md About variant) verbatim — keep "remote," "premium, search-optimized," "web-design studio," "Florida's Gulf Coast." Source it from the same string the schema uses to prevent future drift.

### M5 · Decide the founder name
**File:** `src/config/site.ts` (~14)
**Impact:** A first-name-only `Person` node is weak for GEO disambiguation; the brief expects "Travis Abadie."
**Fix:** If "Abadie" is correct, set `owner: "Travis Abadie"` — it propagates to schema (`Person.name`, `founder`), llms.txt facts, and copy automatically. If the studio intentionally uses first name only, record that decision so the brief mismatch is closed.

---

## LOW — Backlog

### L1 · Lengthen short titles
**Files:** `src/app/work/page.tsx` (~12), `src/app/services/page.tsx` (~12)
**Fix:** e.g. `"Our Work — Web Design Case Studies"` (→ "… | Saltwater Studio" ≈ 53), `"Services — Web Design, SEO & AI Search"` (≈ 58). Consider richer titles for the dynamic slugs too.

### L2 · Tighten meta descriptions to 150–160 + soft CTA
**Files:** `src/app/work/page.tsx` (~13), `src/app/services/page.tsx` (~14)
**Fix:** extend to the 150–160 window and end each in a soft CTA ("See the work." / "Get a quote.").

### L3 · Honor reduced-motion in `Reveal`
**File:** `src/components/ui/Reveal.tsx` (~12–26)
**Fix:** call `useReducedMotion()`; when true, render children with no initial offset/animation (framer-motion ignores the global CSS reduced-motion rule).

### L4 · Reconcile CtaClose / home About copy to CONTENT.md
**Files:** `src/components/sections/CtaClose.tsx` (~51–63), `src/components/sections/About.tsx`
**Fix:** confirm whether the CONTENT.md "locked" CTA close ("Depth, by design." headline + "Let's build the site you stop apologizing for.") should replace the current "Ready to build something that lasts?" — align or record the intentional deviation.

### L5 · Ship the real IndexNow key file
**File:** `public/indexnow-placeholder.txt`
**Fix:** replace with the real `[key].txt` and reference it in the deploy ping (INTEGRATIONS §4 / OWNERSHIP checklist).

### L6 · Confirm home FAQ divergence from CONTENT.md
**File:** `src/data/faqs.ts`
**Fix:** the home FAQ set replaced two CONTENT.md questions; the new copy is strong but `.cursorrules` rule 8 says verbatim. Confirm intentional or restore the CONTENT.md set.

---

## Estimated Impact by Priority
| Group | Effort | Impact |
|---|---|---|
| C1 | ~10 min | Unblocks launch (clears §8 gate), restores booking/call/email conversion, fixes Org schema |
| H1–H3 | ~3–5 hrs (+ asset/copy time) | Removes brand-integrity failure + broken imagery + thin-content indexation liability |
| M1–M5 | ~3–4 hrs | Restores GEO anchor on /services, full FAQ/speakable AEO coverage, single entity fact set, stronger founder entity |
| L1–L6 | ~2 hrs | SERP polish, reduced-motion compliance, copy fidelity, IndexNow |

---

## Post-Fix Checklist
1. `grep -rn "{{" src/` → **0 real tokens** (only JSX/guard hits remain).
2. `npm run build` → **exit 0**; `npm run lint` → **clean**.
3. Load `/work`, `/work/[slug]`, `/services`, `/services/[slug]`, `/book` locally — no broken images, no "coming soon" stub, booking embed renders, no `{{…}}` visible.
4. Rich Results Test + validator.schema.org on **home (Org+WebSite), /about (AboutPage+Person), a service page (Service+FAQPage), a work page (CreativeWork)** — zero `{{token}}`, zero required-field warnings.
5. Real form submit end-to-end (Travis receives notify + lead receives autoresponder).
6. Confirm `site.sameAs` (org + Person) — add live profiles as they go live (the entity's biggest GEO gap).
7. Deploy to Vercel preview → spot-check view-source metadata on 3 pages → IndexNow ping → submit `sitemap.xml` in GSC + import to Bing → PageSpeed on changed pages (non-hero ≥90, home ≥75, SEO 100 / A11y ≥95 / BP 100).
