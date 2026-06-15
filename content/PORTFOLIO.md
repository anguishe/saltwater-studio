# PORTFOLIO.md — Saltwater Studio

## 0. PERMISSION GATE (enforce in code — `data/projects.ts`)

The portfolio component **must not emit a link or imply endorsement** for any
project marked `preview`. Live projects may link out and use the name freely.
Preview projects render as a labeled "Concept" tile (visual + role only,
no client name as endorsement, no live link) until Travis flips them to `live`.

| Project | Permission | Public link? |
|---|---|---|
| Beach House Moving | **live** | ✅ |
| Kai's Run | **live** | ✅ |
| BashSnippets | **live** | ✅ |
| Concept — Event Planning | **preview** | ❌ |
| Concept — Pool Service | **preview** | ❌ |
| Concept — Construction | **preview** | ❌ |

When in doubt, treat as `preview`. Never invent results, metrics, or testimonials.

---

## 1. Live case studies (showable now)

### Beach House Moving — `live`
- **What:** Service-area moving company, Florida Gulf Coast.
- **Role line:** *Custom Next.js site with county-level service-area pages built
  to rank — the local SEO moat done right.*
- **Highlight (factual, no invented metrics):** hyper-local service-area pages
  written from real job knowledge; schema-first; conversion-focused (call + quote).
- **Tags:** Web design · Local SEO · Service-area pages
- **Screenshots:** hero (`portfolio-bhm-hero.webp`) + gallery: service-area pages,
  reviews section, Google-review CTA and footer.

### Kai's Run — `live`
- **What:** Mobile dog-conditioning service, Destin / Okaloosa County FL.
- **Role line:** *A novel mobile service with no direct competitor in AI search —
  built around a founding-member offer and a booking flow.*
- **Highlight:** Square/booking integration; "Founding 20" launch-offer
  architecture; entity + AEO work on a brand-new category.
- **Tags:** Web design · Booking · AEO · Offer design
- **Screenshots:** hero (`portfolio-kaisrun-hero.webp`) + gallery: about page,
  blog / founding-member offer.

### BashSnippets — `live`
- **What:** Linux snippet library + content property (owned).
- **Role line:** *A content site engineered for both search and AI citation —
  structured snippets, schema, llms.txt, and a real monetization stack.*
- **Highlight:** JSON-LD TechArticle/HowTo schema, AI-extractable structure,
  affiliate + display monetization, multi-channel distribution.
- **Tags:** Content site · AEO/GEO · Schema · Monetization
- **Screenshots:** hero (`portfolio-bashsnippets-hero.webp`) + gallery: snippet
  library, about page.

---

## 2. Concept demos (capability showcases — not real clients)

These are fully built sample sites produced by Saltwater Studio to demonstrate
what we can do for a given business type. There is no real client engagement
behind any of them. Each has its own detail page at `/work/[slug]` (NOINDEX,
not in sitemap) showing the hero, an "A closer look" gallery, a "Visit the
concept →" link to the live demo, and a disclaimer: "Concept project — a
sample site built by Saltwater Studio to demonstrate this kind of business.
Not a real company or client."

The tile on `/work` shows the "Concept" badge. No client endorsement, no real
business name used in a testimonial context. If any concept becomes a real
engagement, Travis flips permission to `live` in `projects.ts`, populates
case-study copy, and removes the concept label.

### Concept — Event Planning — `preview`
- **What:** Studio-built sample site for an event-planning business.
- **Role line:** *A cinematic event-planning concept — a full Next.js + R3F
  scroll experience, built to show what the format can do.*
- **Live demo:** https://watervue-events.vercel.app
- **Slug:** `watervue`
- **Gallery:** about page, reviews section.

### Concept — Pool Service — `preview`
- **What:** Studio-built sample site for a local pool-service business.
- **Role line:** *A local pool-service concept — the local-service playbook
  applied end to end.*
- **Live demo:** https://aquamarine-pool-clean.vercel.app
- **Slug:** `aquamarine`
- **Gallery:** services page, service-area map.

### Concept — Construction — `preview`
- **What:** Studio-built sample site for a construction-services business.
- **Role line:** *A construction-services concept — schema-first and structured
  for local search.*
- **Live demo:** https://hines-construction.vercel.app
- **Slug:** `alexander-hines`
- **Gallery:** services page, project gallery.

---

## 3. Display rules

- Each live tile: full-bleed project screenshot (hero image), project name, the
  role line (one specific sentence), tags, and a `View case study →` link.
  No invented numbers; "result" lines describe what was built, not metrics
  we can't verify.
- Each live detail page: hero screenshot at top (full-width, aspect-video),
  then challenge / approach / what shipped / stack copy, then a "A closer look"
  gallery of the remaining views before the cross-link CTA.
- Concept tiles: same visual treatment, name shown as "Concept — [Category]"
  not a client endorsement, small `Concept` mono badge. Tile links to the
  NOINDEX detail page at `/work/[slug]`.
- Concept detail pages: NOINDEX + absent from sitemap. Shows hero, "A closer
  look" gallery, a disclaimer ("Concept project — a sample site built by
  Saltwater Studio to demonstrate this kind of business. Not a real company
  or client."), and a "Visit the concept →" button to the live demo URL.
  No case-study copy (challenge / approach / what shipped / stack).
- Specificity per BRAND §5: every role line must be something only that project
  could say.
