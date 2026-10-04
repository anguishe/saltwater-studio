# Saltwater Studio optimization: design (drafted 2026-10-03)

Drafted on 2026-10-03 from two independent audits of saltwaterstudio.xyz and Travis's owner decisions of the same day.
Travis approves each wave before it starts and every merge inside it. The facts copy may use are in
[README.md](README.md). The research behind this plan (audit reports, search-console and analytics pulls, keyword
data, SERP notes) is kept outside this public repo, in `~/Projects/docs/saltwater-optimization-2026-10/`. Item IDs
(`SW-###`) point to the master finding register in that private folder.

## Problem
- **Google barely knows the site.** 4 of 32 sitemap URLs were indexed on 2026-10-03. Every city page, every insight,
  the pricing page and most service pages are "unknown to Google" or "discovered, currently not indexed", and Google
  last crawled the site on 09-12. All search impressions in 90 days were for the studio's own name.
- **Leads can't be counted.** The tag manager container forwards none of the site's five tracked events, so 90 days of
  analytics show zero calls, quotes or checkouts. Nothing added from here could be judged.
- **Nothing outside the site corroborates the business.** Until 2026-10-03 no other site linked here (the four
  portfolio footer credits are the first). The Google Business Profile has 2 reviews and 4 screenshot photos; there
  are no other directory listings.
- **The site tells two stories.** `llms.txt` and four FAQ answers still say pricing is quoted, although the plans are
  published; one FAQ says the work is "remote by design", which contradicts the in-person service area.
- **The offer has no landing pages.** Five priced plans live only as anchors on `/services`, so they can't rank,
  be cited, or receive the Google Business Profile's product links. The two largest local markets measured
  (Pensacola and Panama City, 100–1K monthly searches each for "web design <city>") have no page.
- **What works and must be protected:** one fact source (`site.ts`), the build-time metadata gate, a clean schema
  graph, six genuinely local city pages, first-person insights, published prices, and the permission-gated portfolio.

## Principles
1. **Fix and get indexed before adding.** Wave 1 adds no URLs. New URLs join a host Google is actually crawling.
2. **Few strong pages, not many thin ones.** At most 7 new URLs per wave (hard cap 8, about 25% growth at most).
   The next wave opens only when at least 60% of the previous wave's new URLs are indexed (URL Inspection). If under
   half of a wave is indexed after 14 days, pause new URLs and put the time into links, depth and authority.
3. **Owner-confirmed facts only.** Claims about the studio come from README.md, `site.ts` or `tiers.ts`. Facts about a
   place need a source URL and an as-of date. No metrics, no testimonials that don't exist, no numbers for Beach House
   Moving.
4. **One fact set everywhere.** Site, schema, `llms.txt`, Google Business Profile and every listing say the same name,
   phone, hours, service area, prices and entity sentence.
5. **Web first, AI second.** About 65% websites + Google Business Profile + local search, 35% AI. AI pages get
   deeper; they don't take the lead.
6. **Every PR passes the gate:** `npm run build` (runs `check-meta`), `npm run lint`, and site-gate on the preview with
   no new errors versus the 2026-10-02 baseline, under the change-control rules in CLAUDE.md.

## Wave 0: now (interactive, no code)
Travis and Claude in the browser, one item per sitting. No new URLs.
- **Search Console:** resubmit the sitemap, re-run URL Inspection, and work the indexing queue at 10 URLs a day,
  Travis approving each (SW-001).
- **Bing Webmaster Tools:** verify by importing from Search Console, submit the sitemap, create an API key, submit the
  top 10 URLs by hand (SW-004).
- **GA4:** the property exists; confirm it, give the reporting service account Viewer, enable the Admin API, set the
  internal-traffic filter and 14-month retention, and keep `/preview/*` out of the studio's numbers (SW-005).
- **Tag manager:** rebuild the container so `phone_click`, `form_submit`, `quote_start`, `booking_click` and
  `email_click` reach GA4, with `tel:`/`mailto:` click triggers as backup. Retire the page-load lead tag that can't
  fire after a client-side form submit. Mark `phone_click`, `form_submit` and `booking_click` as key events.
  Fire-test every event before publishing (SW-002). Confirm each plan's checkout returns to `/thanks/audit` (SW-006).
- **Lead archive:** attach the private Blob store in production and run one real end-to-end form test (SW-007).
- **Google Business Profile:** read the live service area and *propose* any change, but **make no GBP edit of any
  kind unless Travis confirms that specific edit**. No Alabama areas. Editing the service area soon after verification
  can trigger a re-review (SW-008). Review replies go out only once Travis approves them.
- **Reviews:** a review link and a plain ask routine Travis runs by text after each delivery, with one reminder. Real
  customers only, no incentives, no gating, and no reviews from businesses Travis owns (SW-009).
- **Listings, one at a time:** Bing Places, Apple Business Connect, LinkedIn company page, Yelp, Nextdoor, then a
  chamber directory. Same name, phone, hours, categories and entity sentence on each; a URL enters `site.sameAs` only
  after it returns 200 (SW-010).
- **Footer credits:** DONE 2026-10-03 on all four portfolio sites (SW-003).
- Also: a signed-in AI-assistant baseline (SW-013), a signed-out SERP and map snapshot (SW-014), a real-photo plan
  for the profile (SW-011), and a calendar item to redeploy on 11-01 so the audit price change reaches the site and
  schema (SW-012).

**Exit:** the sitemap is read with 32 URLs; all five events show in DebugView and key events are marked; Bing is
verified; a test lead is archived; the service-area decision is recorded.

## Wave 1: fix what exists (no new URLs)
Six PRs, each from a fresh `origin/main`.

| PR | Scope | Items |
|---|---|---|
| 1.1 Truth and copy | Rewrite the `llms.txt` pricing note (generate it from `tiers.ts`), the four "quoted"/"remote by design" FAQ answers and the stale schema comment; remove the internal file name from `/services/social-content`; source or soften unsourced local claims on city pages; align the Destin timeline FAQ with the 3-business-day plans; retitle `/services/web-design` to "Custom Web Design for Local Business" so it stops competing with the Destin page; keyword H1s on service pages (brand label becomes the eyebrow); answer-first cost H2s on web design and Google Care with prices rendered from `tiers.ts`; a "not to be confused with" line for the studios that share the name | SW-019 to SW-026, SW-043 |
| 1.2 Schema | Organization: logo, image, telephone, email, locality-only address, price range, map link and profile URL in `sameAs` (after 200), alternate name; `areaServed` = the five Florida counties, with the country on remote-capable services only; opening hours 7 days, 8 AM–6 PM; monthly prices as monthly (`UnitPriceSpecification`, P1M), Buy It as one-time + monthly; one Page Plan node instead of two; `serviceType`, `@id` and offers on every Service plus an offer catalog; Person node fixed (no business page as a personal profile); Article ↔ WebPage wiring | SW-034 to SW-042 |
| 1.3 Performance | No 3D chunk on phones; the 3D scene on desktop mounts after first interaction with the poster as LCP; tag manager loads lazily (after the Wave 0 rebuild, re-tested); bundle analysis; fewer font axes and no preload for the label font; fixed logo box and font display to cut layout shift; the preloader replaced by CSS; priority image on `/work` | SW-044 to SW-050 |
| 1.4 Visual, CRO, tracking | `form_submit` pushed on success, not on `/thanks` load; the quote form server-rendered and cut to 4–5 visible fields; a mobile first-screen line naming web design, Destin and the in-person range; a readable wordmark on the hero; `/about` layout fixed before the photo arrives; 44 px tap targets; no duplicate sticky quote on `/contact`; inline CTAs on city pages; hours, area and response time on `/contact` | SW-027, SW-028, SW-051 to SW-059 |
| 1.5 Technical | Security headers and `security.txt`; `/book` as a permanent redirect with the route removed; robots groups that keep `/api/` disallowed and let `/thanks` noindex be read, plus explicit AI user agents; 308 aliases for the six city-slug twins; `check-meta` extended to catch slug collisions, reserved routes and near-duplicate titles; per-page `dateModified` driving sitemap `lastmod` and a visible "Updated" line; generated `llms-full.txt`; `/review` redirect to the review form | SW-029 to SW-033, SW-060, SW-061, SW-063 |
| 1.6 Internal links | A related-links block on every service page (service, insight, city); `/websites` linked from web design, the home offer and city pages; an insights row on the home page; peer links between insights | SW-062 |

**Exit:** the standard gate (below), plus a grep for "quote-based", "quoted per" and "remote by design" that returns
only the custom-AI line, and clean rich-result tests on `/`, `/services`, `/websites`, one city and one insight.

## Wave 2: product and service pages (7 new URLs)
Entry: Wave 1 live, and at least 20 of the 32 baseline URLs indexed. Order follows search demand and the 65/35 rule.
Pages blocked on an open question move behind the unblocked ones.

| # | New URL | Target (Keyword Planner, US, monthly) |
|---|---|---|
| 1 | `/services/website-redesign` (quote-based) | website redesign 1K–10K; website migration 100–1K |
| 2 | `/services/hosting-and-care` ($29/mo, sold standalone too) | website maintenance services 1K–10K; website hosting and maintenance 100–1K |
| 3 | `/services/google-profile-fix` | google business profile optimization 1K–10K |
| 4 | `/services/local-growth` | gbp management 100–1K (supporting) |
| 5 | `/services/visibility-audit` | not measured (entry offer) |
| 6 | `/services/page-plan` | not measured |
| 7 | `/services/buy-it` | not measured |

Expanded in place (no new URL): `/services/seo-aeo-geo` (local SEO, answer and generative engine optimization; each
1K–10K), `/services/ai-receptionist` (ai receptionist 10K–100K; missed-call text-back 100–1K), `/services/ai-agents`
(de-overlapped from the receptionist), `/services/social-content` (folded into Google Care as a secondary line, with a 308 to
`/services/google-presence`; social is still offered but not pushed), `/services/web-design` (pillar, 1,000+ words), `/services/google-presence` (do-it-yourself vs
managed, checklist), and `/websites` (becomes the "which plan fits" comparison hub that points to each product page).
The audit explainer insight is retitled so it doesn't compete with the audit product page. Per-page OG images arrive
with the product template. After each product page is indexed, the matching Google Business Profile product link moves
to it.

## Wave 3: E-E-A-T and new offers (5 new URLs)
Entry: at least 5 of Wave 2's 7 URLs indexed. **Step one is a 10-question bio interview with Travis; nothing about
him is written before the answers.**
- `/about` rebuilt with a real headshot, a short bio from the interview, and a "What is Saltwater Studio?" answer
  block. Visible bylines and "Updated" dates on every insight; the Person node gets its image. Case studies get
  question headings (outcomes only).
- New URLs:
  - `/services/logo-brand-kit`: quote-based (scope, process, quote form). brand identity package 100–1K.
  - `/services/white-label`: quote-based. white label SEO 100–1K; white label web design 100–1K.
  - `/insights/small-business-website-cost`: how much does a website cost 1K–10K. Cost ranges by method (sourced or
    labelled as ranges), ongoing costs, and it ends with the studio's published prices.
  - `/insights/when-to-redesign-your-website`: the informational side of "website redesign"; links the redesign page.
  - `/insights/google-business-profile-service-area-businesses`: first-hand, from the studio's own service-area
    verification.
- The content log starts here. Existing insights get 3–5 FAQs each. Weekly posting happens inside each wave's URL
  budget; between waves the weekly slot refreshes existing posts.

## Wave 4: local architecture 1 (7 new URLs)
Entry: at least 3 of Wave 3's 5 URLs indexed; the location data model (a `kind` field for city vs county) and an
automated unique-content check merged first; a 10-minute interview per new place.
- **City template upgrade (existing six):** a price strip rendered from `tiers.ts`, an inline quote and audit CTA, 3–5
  FAQs unique to the town, verified local facts with sources, links to the county page and `/areas`, a real photo only
  if one exists, and a "Local SEO in Destin" section on the Destin page. **Proof borrowed from other towns is removed
  from Navarre, Niceville and Crestview**; a client is named only on the page for the town it is based in.
- New URLs:
  - `/areas`: the hub (all five counties, every town served, the in-person range).
  - `/web-design-okaloosa-county-fl`, `/web-design-walton-county-fl`: county pages (county terms get almost no
    searches; these are structure and parents).
  - `/web-design-bay-county-fl`, `/web-design-escambia-county-fl`: moved up from Wave 5 so the two new city pages have
    a county parent and breadcrumb from day one.
  - `/web-design-pensacola-fl`, `/web-design-panama-city-fl`: the largest local demand measured (100–1K each).
- Breadcrumb becomes Home → Areas → County → City. The footer shows the main towns plus an "All areas" link instead of
  every city.

## Wave 5: local architecture 2 and industries (7 new URLs)
Entry: at least 5 of Wave 4's 7 URLs indexed; interviews per place.
- `/web-design-santa-rosa-county-fl` (Navarre, Gulf Breeze, Milton, with Pace as a section)
- `/web-design-gulf-breeze-fl` (local SEO Gulf Breeze 100–1K)
- `/web-design-panama-city-beach-fl`, `/web-design-miramar-beach-fl`, `/web-design-milton-fl` (several terms at 10–100)
- `/web-design-for-moving-companies` (moving company website design 100–1K), `/web-design-for-event-rentals`
  (10–100): proven verticals with a live portfolio client.
- Not built: towns with no measured searches (they get a mention on the hub or county page), any Alabama page, any
  service × town page. The dog-trainer vertical moves to Wave 6 because of the 7-URL cap.
- After Wave 5 there are 19 location pages, under the 30-page review threshold.

## Wave 6: authority and AI visibility
No-URL work here can start any time and is the first thing to pull forward when a wave stalls on indexing.
- A chamber or business association (within the capital limit), real partner mentions, one local press pitch built
  on first-party data, agency directories once there are 3+ reviews, a LinkedIn presence, and screen-recorded build
  logs (no on-camera appearances, and not a video service).
- Review velocity: a steady cadence of genuine reviews, every review answered within 48 hours, never incentives.
- Monthly, report-only: an AI-assistant prompt log and a signed-out search and map snapshot.
- New URLs (up to 3, gated on Wave 5): `/tools/google-profile-checkup` (a free linkable tool that leads into the
  audit), `/web-design-for-dog-trainers`, and a Pace page only if its interview supports it.
- Measurement reviews at 30, 60 and 90 days from 2026-10-03, and a full re-baseline on 2027-01-03. Service × town pages
  or a split of the SEO page happen only if Search Console shows that demand.

## Every new page
- **Title** leads with the search phrase; body ≤ 41 characters so the full title stays ≤ 60 with " | Saltwater
  Studio"; unique. Description ≤ 160.
- **One H1** carrying the search phrase; the brand label is the eyebrow, not the H1.
- **Answer-first.** The first 40–60 words answer the query. Each H2 is a question with a 40–60-word answer followed by
  100–120 words of specifics (process, who it's for, what it costs, an outcome).
- **Prices come from `tiers.ts` and `site.auditOffer`, rendered in code, never typed into copy.** Quote-based offers
  (Logo & brand kit, white-label, custom AI) show scope, process and a quote CTA, and no price.
- **First screen:** the call link and the quote CTA (product pages also show their plan CTA).
- **FAQ:** 3–5 questions on location pages, 5–8 on product pages, with FAQPage schema matching the visible text
  exactly.
- **Schema** only from `src/lib/schema.ts`: Service with `@id`, `serviceType` and offers referenced by `@id` (never a
  second copy of a price), BreadcrumbList, WebPage.
- **Contrast:** AA-safe text tokens only (table in CLAUDE.md); check every new color or opacity pairing.
- **Links:** linked from at least 2 pages Google already indexes, plus its pillar or hub. Links out to its pillar, the
  related product, and the relevant city or service pages, with descriptive anchors that vary.
- **Real photos only**, through the photo privacy check. No stock or generated job photos; no photo is better than a
  fake one.
- **Proof:** only the four live portfolio clients, through the portfolio permission gate. No metrics. Beach House
  Moving: outcomes in words only, never numbers.
- **Freshness:** a visible "Updated" date backed by `dateModified`, which also feeds the sitemap `lastmod`.
- **Voice:** BRAND §5. No banned words, no emoji.
- **Ship list:** `llms.txt` source data, ARCHITECTURE.md routes, sitemap (automatic), GSC indexing queue, IndexNow.

### Location pages, additionally
- In-person service is confirmed for the whole range (Gulf Shores to Panama City), and each new place gets a
  10-minute interview with Travis first.
- At least 3 facts true only of that place, each with a source URL and an as-of date, and at least 500 words that
  could only be about that place.
- Passes the unique-content check (at least 60% unique against every sibling, with nav, footer and shared FAQ
  stripped).
- A client is named only if it is a live portfolio client based in that town. No office or storefront claims.
- Prices via the price strip, and links hub ↔ county ↔ city ↔ at least 3 service pages.
- If the material isn't there, the town is a line on its county page, not a page.

## Standard exit gate (every code wave)
`npm run build` exit 0 (with `check-meta`) · `npm run lint` clean · site-gate on the preview with 0 new errors versus
the 2026-10-02 baseline · after merge, IndexNow fires on the production build · every new or changed URL enters the GSC
indexing queue (10 a day, Travis approves) · a URL Inspection snapshot is recorded.

## Success measures (direction only, never positions)
- **Wave 0:** Google's last-crawl dates move; key events start recording; Bing shows the current homepage; reviews and
  listings rise from 2.
- **Wave 1:** mobile lab performance up on the five template pages; layout shift under 0.1; more of the 32 URLs indexed;
  the first events attributed to landing pages.
- **Wave 2:** product URLs indexed within 30 days; the first non-brand impressions on product searches; profile product
  clicks landing on product pages.
- **Wave 3:** `/about` indexed; cost-guide impressions; quote requests for branding and white-label.
- **Waves 4–5:** location URLs indexed; the first impressions for "web design <town>" searches (zero today); map
  visibility trending the right way in the monthly snapshot.
- **Wave 6:** more referring domains, citations and reviews; AI assistants moving from not mentioning the studio to
  mentioning it with correct facts; non-brand impressions and key events up month over month.

## Out of scope
- Paid ads of any kind (the ads account is for keyword research only).
- Service × town matrix pages, and any page for an Alabama town or county.
- Video or reels as a service.
- Domain change (revisit at 180 days).
