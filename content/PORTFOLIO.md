# PORTFOLIO.md — Saltwater Studio

## 0. PERMISSION GATE (enforce in code — `data/projects.ts`)

The portfolio component **must not emit a link or imply endorsement** for any
project marked `preview`. Live projects may link out and use the name freely.
Preview projects render as a labeled "private preview" tile (visual + role only,
no client name as endorsement, no live link) until Travis flips them to `live`.

| Project | Permission | Public link? |
|---|---|---|
| Beach House Moving | **live** | ✅ |
| Kai's Run | **live** | ✅ |
| BashSnippets | **live** | ✅ |
| WaterVue Events Co. | **preview** | ❌ |
| Aquamarine Pool Clean | **preview** | ❌ |
| Alexander Hines Construction | **preview** | ❌ |

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

### Kai's Run — `live`
- **What:** Mobile dog-conditioning service, Destin / Okaloosa County FL.
- **Role line:** *A novel mobile service with no direct competitor in AI search —
  built around a founding-member offer and a booking flow.*
- **Highlight:** Square/booking integration; "Founding 20" launch-offer
  architecture; entity + AEO work on a brand-new category.
- **Tags:** Web design · Booking · AEO · Offer design

### BashSnippets — `live`
- **What:** Linux snippet library + content property (owned).
- **Role line:** *A content site engineered for both search and AI citation —
  structured snippets, schema, llms.txt, and a real monetization stack.*
- **Highlight:** JSON-LD TechArticle/HowTo schema, AI-extractable structure,
  affiliate + display monetization, multi-channel distribution.
- **Tags:** Content site · AEO/GEO · Schema · Monetization

---

## 2. Preview-only (NO public link yet)

### WaterVue Events Co. — `preview`
- **Role line (label only):** *Cinematic event-planning rebuild — full Next.js +
  R3F scroll experience.* — private preview.

### Aquamarine Pool Clean — `preview`
- **Role line (label only):** *Local service build, Fort Walton Beach.* — private
  preview.

### Alexander Hines Construction — `preview`
- **Role line (label only):** *Construction services site.* — private preview.

---

## 3. Display rules

- Each live tile: full-bleed project visual (ASSETS — use a real screenshot/plate,
  never stock), project name, the role line (one specific sentence), tags, and a
  `Visit →` link. No invented numbers; "result" lines describe what was built, not
  metrics we can't verify.
- Preview tiles: same visual treatment, name shown as the *project* not a client
  endorsement, **no link**, small `Private preview` mono label.
- Specificity per BRAND §5: every role line must be something only that project
  could say.
