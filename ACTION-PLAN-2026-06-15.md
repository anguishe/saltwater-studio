# Saltwater Studio — Pre-Indexation Action Plan
**Generated:** 2026-06-15 | **Full report:** FULL-AUDIT-REPORT-2026-06-15.md

Lane labels:
- **[REPO]** — fixable in the pre-freeze Claude Code push (code/content/config)
- **[MANUAL]** — off-repo human task (Vercel dashboard, GSC, GTM, DNS, Cal.com)

---

## CRITICAL — before any indexing

### C1 · Fix sitemap lastModified churn
**[REPO]** `src/app/sitemap.ts` line 6
**Impact:** Every Vercel production deploy stamps all 14 sitemap URLs with the current timestamp, signaling Google/Bing to recrawl the entire site. During a 3-week freeze with zero content changes, this erodes crawl budget, delays rank stabilization, and could trigger re-evaluation penalties. One accidental deploy ruins the freeze.
**Fix:** Remove `const now = new Date().toISOString()` and replace with static per-page ISO date strings representing when each page's content actually last changed. Update individual pages' `lastModified` only when that page's content changes.

```ts
// BEFORE (sitemap.ts lines 6–35)
const now = new Date().toISOString();

const staticRoutes: MetadataRoute.Sitemap = [
  { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
  { url: `${site.url}/work`, lastModified: now, ... },
  // ... all using now
];
const serviceRoutes = services.map((s) => ({
  url: `${site.url}/services/${s.slug}`,
  lastModified: now, ...
}));
const workRoutes = getLiveProjects().map((p) => ({
  url: `${site.url}/work/${p.slug}`,
  lastModified: now, ...
}));

// AFTER — stable dates per page; update only when content changes
const SITE_LAUNCH_DATE = "2026-06-15";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: site.url,                    lastModified: SITE_LAUNCH_DATE, changeFrequency: "weekly",  priority: 1   },
  { url: `${site.url}/work`,          lastModified: SITE_LAUNCH_DATE, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${site.url}/services`,      lastModified: SITE_LAUNCH_DATE, changeFrequency: "monthly", priority: 0.9 },
  { url: `${site.url}/about`,         lastModified: SITE_LAUNCH_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${site.url}/contact`,       lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly",  priority: 0.8 },
  { url: `${site.url}/book`,          lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly",  priority: 0.8 },
  { url: `${site.url}/privacy`,       lastModified: SITE_LAUNCH_DATE, changeFrequency: "yearly",  priority: 0.2 },
];

const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
  url: `${site.url}/services/${s.slug}`,
  lastModified: SITE_LAUNCH_DATE,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}));

const workRoutes: MetadataRoute.Sitemap = getLiveProjects().map((p) => ({
  url: `${site.url}/work/${p.slug}`,
  lastModified: SITE_LAUNCH_DATE,
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));
```
**Effort:** S (15 min)

---

## HIGH — before the freeze

### H1 · Fix llms.txt portfolio URLs (.com → .xyz)
**[REPO]** `public/llms.txt` lines 14–15
**Impact:** AI tools (ChatGPT, Perplexity) that read llms.txt and recommend portfolio work would send users to non-existent `.com` URLs. For a studio that sells AI-search accuracy, having a wrong URL in its own llms.txt is a trust-killing inconsistency and a live demo of the exact failure we warn clients about.

```
# BEFORE (lines 13–16)
## Portfolio
- Beach House Moving: https://beachhousemoving.com
- Kai's Run: https://kaisrun.com
- BashSnippets: https://bashsnippets.xyz

# AFTER
## Portfolio
- Beach House Moving: https://beachhousemoving.xyz
- Kai's Run: https://kaisrun.xyz
- BashSnippets: https://bashsnippets.xyz
```
**Effort:** S (5 min)

---

### H2 · Standardize founder name to "Travis Abadie" everywhere
**[REPO]** `content/CONTENT.md` line 12; `src/app/about/page.tsx` line 69
**Impact:** schema.ts and llms.txt use "Travis Abadie"; CONTENT.md and About page use "Travis." An LLM extracting the entity from schema gets a different name than one extracting from the About page. Entity inconsistency is the primary GEO failure mode — and this is our own site.

**Fix 1 — CONTENT.md:** Update the GEO entity sentence:
```markdown
# BEFORE
> Saltwater Studio is a remote web-design studio founded in 2025 by Travis on
> Florida's Gulf Coast, building premium, search-optimized websites for service
> businesses nationwide.

# AFTER
> Saltwater Studio is a remote web-design studio founded in 2025 by Travis Abadie on
> Florida's Gulf Coast, building premium, search-optimized websites for service
> businesses nationwide.
```

**Fix 2 — about/page.tsx:** Update the entity paragraph (line 69):
```tsx
// BEFORE
Saltwater Studio is a remote web-design studio founded in 2025 by
Travis on Florida&apos;s Gulf Coast.

// AFTER
Saltwater Studio is a remote web-design studio founded in 2025 by
Travis Abadie on Florida&apos;s Gulf Coast.
```
**Effort:** S (10 min)

---

### H3 · Standardize all "Book a strategy call" CTAs to /book
**[REPO]** `src/components/ui/Header.tsx` line 67; `src/app/about/page.tsx` line 100
**Impact:** Header and About page CTAs go to `cal.com` directly, bypassing the `/book` embed page. The `/book` page fires `booking_click` on `bookingSuccessful` (a confirmed booking event). Direct cal.com links fire `booking_click` on click only — inflating the Key Event count with intent, not conversions. The header is the highest-traffic CTA on the site; routing it correctly matters for GA4 reporting.

**Fix — Header.tsx line 67:**
```tsx
// BEFORE
<ButtonLink href={`https://cal.com/${site.calcom}`} onClick={track.bookingClick}>
  Book a strategy call
</ButtonLink>

// AFTER
<ButtonLink href="/book" onClick={track.bookingClick}>
  Book a strategy call
</ButtonLink>
```

**Fix — about/page.tsx line 100:**
```tsx
// BEFORE
<ButtonLink href={`https://cal.com/${site.calcom}`} variant="ghost">
  Book a call
</ButtonLink>

// AFTER
<ButtonLink href="/book" variant="ghost">
  Book a call
</ButtonLink>
```

Also fix the mobile header drawer button (`Header.tsx` line 102) which also links directly:
```tsx
// BEFORE
<ButtonLink href={`https://cal.com/${site.calcom}`} onClick={() => { track.bookingClick(); setOpen(false); }} ...>

// AFTER
<ButtonLink href="/book" onClick={() => { track.bookingClick(); setOpen(false); }} ...>
```
**Effort:** S (10 min)

---

### H4 · Make Offer section service content server-renderable
**[REPO]** `src/components/sections/Offer.tsx` lines 34–70
**Impact:** Service names and one-liners (the core "what we do" content) are children of `<ScrollFX ssr:false>` and are absent from server-rendered HTML. AI crawlers without JS execution cannot read them. The homepage is the entry point for most AI citation — if the services aren't extractable there, the LLM relies only on /services page (which is correctly SSR'd).

**Fix:** Render service content outside the ScrollFX boundary in standard HTML, then use ScrollFX only for the visual scroll effect layer. One approach: move the service mapping outside ScrollFX and use ScrollFX only for the depth overlay targets:

```tsx
// BEFORE — services.map() is inside ScrollFX (not SSR'd)
<ScrollFX variant="offerDepth" className="mt-16 divide-y divide-marine/30">
  {services.map((service, i) => (
    <Reveal key={service.slug} delay={i * 0.08}>
      <div className="relative group grid..." data-offer-card>
        ...service content...
        <div data-offer-overlay ... />
      </div>
    </Reveal>
  ))}
</ScrollFX>

// AFTER — services.map() renders in SSR; ScrollFX wraps only the overlay targets
<div className="mt-16 divide-y divide-marine/30">
  {services.map((service, i) => (
    <Reveal key={service.slug} delay={i * 0.08}>
      <div className="relative group grid..." data-offer-card>
        ...service content...  {/* Now in SSR HTML */}
        <ScrollFX
          variant="offerDepth"
          className="absolute inset-0 pointer-events-none rounded bg-abyss"
          aria-hidden="true"
        />
      </div>
    </Reveal>
  ))}
</div>
```

> Note: this requires a small ScrollFX variant refactor since `offerDepth` currently targets `[data-offer-overlay]` inside the ScrollFX container. Alternatively, render service content before the ScrollFX and keep the overlay as a separate element. The key constraint: service titles + one-liners must appear in the DOM before any `ssr:false` boundary.
**Effort:** M (45 min)

---

### H5 · Add email_click tracking to contact page mailto: link
**[REPO]** `src/app/contact/page.tsx` line 49
**Impact:** Every email click from the /contact page goes unmeasured. The contact page is a money page. This is the only `email_click` gap (footer correctly tracks it).

```tsx
// BEFORE (contact/page.tsx ~line 49)
<a
  href={`mailto:${site.email}`}
  className="block text-sm text-foam/60 hover:text-shoal transition-colors"
>
  {site.email}
</a>

// AFTER — requires "use client" directive on the file or extracting to a child component
// Simplest: extract the contact links into a tiny client component, or add "use client"
// to contact/page.tsx (it currently has no client directive — adding one is acceptable
// since the page already imports QuoteForm which is "use client")
<a
  href={`mailto:${site.email}`}
  onClick={track.emailClick}
  className="block text-sm text-foam/60 hover:text-shoal transition-colors"
>
  {site.email}
</a>
```
> Add `"use client"` directive at top of contact/page.tsx, or extract the NAP block into a `ContactLinks.tsx` client component and import it. Either works.
**Effort:** S (15 min)

---

### H6 · Add GTM noscript iframe to layout.tsx
**[REPO]** `src/app/layout.tsx` — after `<body>` opening (line 60)
**Impact:** GTM's standard two-part install requires a `<noscript>` iframe immediately after `<body>`. Without it, GTM does not fire for non-JS users, and the installation is technically incomplete per Google's own spec. Additionally, some tag audit tools flag missing noscript as a misconfiguration.

```tsx
// BEFORE — layout.tsx body tag area
<body>
  <a href="#main" className="skip-link">Skip to main content</a>
  ...

// AFTER — noscript immediately after <body>, before skip-link
<body>
  {GTM_ID && (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )}
  <a href="#main" className="skip-link">Skip to main content</a>
  ...
```
> `GTM_ID` is already declared at line 48. The noscript should use the same variable.
**Effort:** S (10 min)

---

### H7 · Add INDEXNOW_KEY to Vercel env vars and OWNERSHIP.md
**[MANUAL]** Vercel dashboard → Project → Settings → Environment Variables
**[REPO]** `OWNERSHIP.md` environment variables table
**Impact:** Without `INDEXNOW_KEY` set in Vercel, every production build silently skips the IndexNow ping. Bing (and by extension, ChatGPT/Copilot which index from Bing) never receives the instant-indexing signal we built into the postbuild hook.

**Fix [MANUAL]:** In Vercel dashboard, add:
- Variable: `INDEXNOW_KEY`
- Value: `9e61e3d376bcfcb262b4bce2bcb2ef8a` (the key file content in `public/`)
- Environment: Production only

**Fix [REPO] — OWNERSHIP.md:** Add row to env vars table:
```markdown
| `INDEXNOW_KEY` | IndexNow ping on production deploy (postbuild) |
```
**Effort:** S (5 min)

---

## MEDIUM — safe to do in the same push

### M1 · Add closing CTA to /privacy page
**[REPO]** `src/app/privacy/page.tsx` — end of content div
**Impact:** The privacy page is a dead end. Anyone reaching it (via footer link or direct search) sees no next step. Low-traffic but a CRO standard violation.

```tsx
// Add after the contact email paragraph, before closing </div>
<div className="mt-12 pt-8 border-t border-marine/20 flex flex-col gap-3 sm:flex-row">
  <ButtonLink href="/book" variant="primary">
    Book a strategy call
  </ButtonLink>
  <ButtonLink href="/contact" variant="ghost">
    Get a quote
  </ButtonLink>
</div>
```
**Effort:** S (15 min)

---

### M2 · Add custom 404 page with branding and CTA
**[REPO]** `src/app/not-found.tsx` — create new file
**Impact:** A custom 404 is the last chance to recover a lost visitor. The Next.js default 404 has no Saltwater Studio branding, no phone, no CTA. Since the studio sells conversion-first builds, shipping without a custom 404 is a self-own.

Create `src/app/not-found.tsx` following the pattern of `thanks/page.tsx` — same `min-h-svh flex flex-col` centered layout, h1 "Nothing here." or similar, a brief line, and the dual CTA (Book a call / Back to home). Include `buildMetadata({ title: "Page not found", ..., noIndex: true })` via a `metadata` export, or use `export const metadata` directly.
**Effort:** S (20 min)

---

### M3 · Add WebPage schema to /work, /book, and /privacy
**[REPO]** `src/app/work/page.tsx`, `src/app/book/page.tsx`, `src/app/privacy/page.tsx`
**Impact:** Three public pages are missing WebPage nodes. /work and /book are money-adjacent pages. SEO.md §3 specifies WebPage for all pages. The webPage helper in schema.ts already exists and handles speakable selectors.

**Fix — work/page.tsx:** Add after existing `<JsonLd>`:
```tsx
import { buildBreadcrumbSchema, webPage } from "@/lib/schema";
// ...
<JsonLd schema={webPage({ path: "/work", name: `Our Work — Custom Web Design Projects | ${site.name}`, speakableSelectors: ["h1"] })} />
```

**Fix — book/page.tsx:** Add alongside breadcrumb:
```tsx
import { buildBreadcrumbSchema, webPage } from "@/lib/schema";
// ...
<JsonLd schema={webPage({ path: "/book", name: `Book a Strategy Call | ${site.name}`, speakableSelectors: ["h1"] })} />
```

**Fix — privacy/page.tsx:** Add minimal WebPage (no speakable needed):
```tsx
import JsonLd from "@/components/JsonLd";
import { webPage } from "@/lib/schema";
// ...
<JsonLd schema={webPage({ path: "/privacy", name: `Privacy Policy | ${site.name}`, speakableSelectors: ["h1"] })} />
```
**Effort:** S (20 min)

---

### M4 · Promote FAQ questions from h3 to h2 on service pages
**[REPO]** `src/app/services/page.tsx` (~line 92–96); `src/app/services/[slug]/page.tsx` (~line 88–93)
**Impact:** SEO.md §4 specifies "H2s on content pages are literal questions." Featured-snippet and voice-assistant extraction is stronger from h2-level question text. The FAQPage schema already captures them correctly as questions regardless of HTML heading level, but the HTML hierarchy deviates from the AEO spec.

**Fix:** Change the FAQ question rendering from `<h3>` to `<h2>` and the "Common questions" section header from `<h2>` to a styled `<p>` or `<h3>` depending on page depth. Alternatively, simply rename "Common questions" to be a `<p className="font-mono text-xs">` section label and elevate the question text to `<h2>`.

**On services/page.tsx (~line 91–96):**
```tsx
// BEFORE
<h2 className="mt-20 font-display text-2xl text-foam">Common questions</h2>
<div className="mt-8 space-y-6 divide-y divide-marine/20">
  {serviceFaqs.map((faq) => (
    <div key={faq.question} className="pt-6">
      <h3 className="font-semibold text-foam">{faq.question}</h3>

// AFTER
<p className="mt-20 font-mono text-xs tracking-[0.2em] text-shoal uppercase">Common questions</p>
<div className="mt-8 space-y-6 divide-y divide-marine/20">
  {serviceFaqs.map((faq) => (
    <div key={faq.question} className="pt-6">
      <h2 className="text-lg font-semibold text-foam">{faq.question}</h2>
```
Apply the same pattern in `services/[slug]/page.tsx`.
**Effort:** S (15 min)

---

### M5 · Fix business field inputMode on QuoteForm
**[REPO]** `src/app/contact/QuoteForm.tsx` line 118
**Impact:** `inputMode="url"` on a field labeled "Business & website (if any)" shows a URL keyboard on mobile, which is wrong for a field that also accepts a business name. Low severity but a friction point on mobile.

```tsx
// BEFORE (line 118)
inputMode="url"

// AFTER
inputMode="text"
```
**Effort:** S (2 min)

---

### M6 · Document preview-project engagement status in PORTFOLIO.md
**[REPO]** `content/PORTFOLIO.md` §2
**Impact:** WaterVue Events Co., Aquamarine Pool Clean, and Alexander Hines Construction appear publicly on `/work` under "Private Preview" with real-sounding business names. The repo contains no documentation confirming whether these are real signed clients, in-progress builds, or concept work. For a studio that sells entity truthfulness, this ambiguity is a reputational risk.

**Fix:** For each preview project in PORTFOLIO.md §2, add one of:
```markdown
### WaterVue Events Co. — `preview`
- **Status:** Real engagement — build in progress; flip to `live` when launched.
  [OR]
- **Status:** Concept project (no live client). Rename tile to "Concept — Event Planning" in projects.ts.
```

If any entry is a concept (not a real client), update `projects.ts` to remove the real business name from the `title` field and replace with a category description (e.g., "Concept — Event Planning"). Showing real company names without their permission — even under "Private Preview" — carries a trust risk if the business discovers it.
**Effort:** S (20 min owner decision + 10 min code)

---

## LOW — post-freeze backlog (page-isolated, safe post-freeze)

### L1 · Replace brand plate images with real screenshots on live case studies
**[REPO]** `src/data/projects.ts` lines 29, 63, 98 (image field for live projects)
**Impact:** Three live case studies (Beach House Moving, Kai's Run, BashSnippets) use studio brand plates instead of real screenshots. Four of six portfolio cards on `/work` show the same `plate-calm.webp` image. For an agency selling custom work, brand-plate-only thumbnails look like a template. The code comment ("V1: brand plate — swap to a real screenshot later") acknowledges this. Real screenshots are one-line swaps per project.

Update each live project's `image` field to a real project screenshot:
```ts
// Beach House Moving
image: "/images/beach-house-moving-screenshot.webp",
// Kai's Run
image: "/images/kais-run-screenshot.webp",
// BashSnippets
image: "/images/bash-snippets-screenshot.webp",
```
Add the corresponding images to `public/images/`. Recommended: 1600×900px WebP, ≤300kB.
**Effort:** M (30 min asset prep + 5 min code)

---

### L2 · Fix privacy page "Last updated" date
**[REPO]** `src/app/privacy/page.tsx` line 19
**Impact:** `{site.founded}` evaluates to "2025" — the founding year, not the policy modification date. If the privacy policy is updated after 2025, the date will be misleading (still shows "2025"). Low risk now; becomes a compliance concern later.

```tsx
// BEFORE (line 19)
<p className="mt-2 text-sm text-foam/40">Last updated: {site.founded}</p>

// AFTER
<p className="mt-2 text-sm text-foam/40">Last updated: June 2025</p>
```
Or, add a `privacyPolicyUpdated` field to `site.ts` for future control.
**Effort:** S (5 min)

---

### L3 · Deduplicate h2 "Depth, by design." on homepage
**[REPO]** `src/components/sections/WhyUs.tsx` line 36 or `src/components/sections/CtaClose.tsx` line 57
**Impact:** Two h2 elements on the homepage carry identical text: "Depth, by design." (WhyUs section h2 + CtaClose section h2). Not an SEO failure but unusual; a crawler emitting the page's h2 outline would show the phrase twice. WhyUs is the "Why us" differentiation section — consider a more specific h2 there.

```tsx
// WhyUs.tsx — change h2 from "Depth, by design." to something specific:
<h2 id="why-heading" ...>
  Why Saltwater Studio
</h2>
// ...or: "Built to outrank templates." — more specific and not a duplicate of CtaClose
```
**Effort:** S (10 min)

---

### L4 · Plan blog/content route (post-freeze)
**[NOTE]** No /blog route exists. Per SEO.md, this is a post-launch growth item, not a blocker. When built: add MDX pipeline, Article schema, FAQPage-eligible posts, author = Person entity, and add routes to sitemap and IndexNow URL list.
**Effort:** L (post-freeze sprint)

---

## Manual-Only Checklist [MANUAL]

These items require off-repo action — they cannot be fixed by code changes alone:

| ID | Task | System | Priority |
|---|---|---|---|
| MA1 | Set `INDEXNOW_KEY=9e61e3d376bcfcb262b4bce2bcb2ef8a` in Vercel dashboard (Production env) | Vercel | HIGH |
| MA2 | Set `NEXT_PUBLIC_GTM_ID=GTM-M3RTZ7C8` in Vercel dashboard if not already set | Vercel | HIGH |
| MA3 | Verify Vercel preview URL returns `x-robots-tag: noindex` or canonical pointing to apex | Vercel / curl | HIGH |
| MA4 | Verify `http://saltwaterstudio.xyz` 301s to `https://saltwaterstudio.xyz` post-deploy | curl | HIGH |
| MA5 | Fire-test all 5 events in GTM Preview + GA4 DebugView before first traffic | GTM / GA4 | HIGH |
| MA6 | GSC domain property: add DNS TXT verification record at Namecheap | Namecheap / GSC | HIGH |
| MA7 | Submit sitemap in GSC (`https://saltwaterstudio.xyz/sitemap.xml`) | GSC | HIGH |
| MA8 | Request indexing on money pages via GSC URL Inspection: /, /services, /work, /contact, /book, /about | GSC | HIGH |
| MA9 | Import GSC into Bing Webmaster Tools (inherits verification + sitemap) | Bing Webmaster | HIGH |
| MA10 | Trigger first IndexNow ping manually after deploy to verify (watch Vercel function logs for `[indexnow] Ping accepted`) | Vercel logs | HIGH |
| MA11 | Resend DNS verification: SPF + DKIM records for saltwaterstudio.xyz | Namecheap / Resend | HIGH |
| MA12 | Test real form submit end-to-end: Travis receives email + autoresponder goes to lead | Live site | HIGH |
| MA13 | Run PageSpeed Insights on /, /services/web-design, /about: confirm SEO 100, A11y ≥95, BP 100; confirm mobile Perf ≥75 on homepage, ≥90 on inner pages | PageSpeed | MEDIUM |
| MA14 | Validate JSON-LD on /, /about, /services/web-design, /work/beach-house-moving via Rich Results Test | Google | MEDIUM |
| MA15 | Travis: decide and document WaterVue/Aquamarine/Alexander Hines engagement status in PORTFOLIO.md | Owner decision | MEDIUM |
| MA16 | Travis: decide whether to add a founding-client offer / risk-reversal framing to hero and CtaClose | Owner decision | MEDIUM |
| MA17 | Run `site:saltwaterstudio.xyz` check in Google and Bing 7 days post-launch | Browser | LOW |
| MA18 | Create Google Business Profile for Pensacola heartland once launched | GBP | LOW (post-freeze) |

---

## Estimated Impact by Priority

| Group | Effort | Impact |
|---|---|---|
| C1 (sitemap churn) | 15 min | Prevents full-site recrawl signal on every deploy; critical for freeze stability |
| H1–H7 (high) | ~2.5 hrs | Fixes entity consistency, tracking, crawlability, AI-search accuracy |
| M1–M6 (medium) | ~1.5 hrs | CRO dead-end removed, schema completeness, AEO heading structure |
| L1–L4 (low) | 1 hr + owner time | Portfolio credibility, minor copy fixes, future content |
| Manual (MA1–MA18) | Owner time | Indexing, tracking verification, domain/DNS, launch go/no-go |

---

## Freeze-Readiness Verdict

**Not yet ready — but one focused push makes it so.**

**MUST fix before the freeze push:**

1. **C1** — Sitemap churn (5 min fix, blocks clean crawl during freeze)
2. **H1** — llms.txt URL error (.com → .xyz)
3. **H2** — Founder name standardization (Travis → Travis Abadie in About + CONTENT.md)
4. **H3** — Standardize all booking CTAs to /book
5. **H5** — Add email_click to /contact mailto: link
6. **H6** — GTM noscript fallback
7. **H7** [MANUAL] — Set INDEXNOW_KEY in Vercel dashboard
8. **MA1–MA12** [MANUAL] — Vercel env vars, GSC/Bing submit, form test, Resend DNS

**Safe to defer post-freeze (page-isolated, no churn risk):**
- M1 (privacy CTA), M2 (custom 404), M3 (WebPage schema on /work /book /privacy), M4 (FAQ h3→h2), M5 (inputMode), M6 (preview documentation)
- All L items (image reuse, privacy date, duplicate h2, blog)
- MA13–MA18 (PageSpeed checks, GBP, site: check)

**H4 (Offer section SSR)** — Recommended for the pre-freeze push but deferrable. The content exists on /services which is correctly SSR'd. AI crawlers that follow links will find it. Defer only if the ScrollFX refactor introduces risk.

---

## Post-Fix Checklist

1. `npm run build` — exit 0, zero warnings
2. `npm run lint` — clean
3. `grep -rn "{{" src/` → zero unfilled tokens
4. Sitemap: confirm `lastModified` values are static ISO strings (not `new Date()`)
5. Build output: confirm DeepScene, ScrollFX not in first-load JS chunks (`next build` output)
6. [MANUAL] Rich Results Test on `/, /about, /services/web-design, /work/beach-house-moving`
7. [MANUAL] OG debugger (LinkedIn / Twitter) on homepage
8. [MANUAL] Submit sitemap in GSC + Request Indexing on money pages
9. [MANUAL] Bing Webmaster import from GSC
10. [MANUAL] Verify IndexNow ping succeeded (Vercel deploy logs: `[indexnow] Ping accepted — HTTP 202`)
11. [MANUAL] Fire-test all 5 events in GTM Preview + GA4 DebugView before first traffic
12. [MANUAL] Real form submit: Travis receives email, lead receives autoresponder
