# SEO.md — Saltwater Studio (SEO / AEO / GEO — built in, not bolted on)

The whole point of this property: ship it correct once. Follow the DPOS decision
hierarchy — indexation → crawlability → tracking → technical SEO → content →
entity → authority → AI search. Below is everything the build must satisfy.

## 1. Per-page requirements (every page, no exceptions)

- Unique `<title>` 50–60 chars: `Primary | Saltwater Studio` (home inverts:
  `Saltwater Studio | Web Design for Service Businesses`).
- Unique meta description 150–160 chars, ends in a soft CTA.
- Canonical = apex, https, no trailing slash, no query strings.
- One `<h1>` with the primary phrase; strict heading order.
- First 100 words contain: **Saltwater Studio + web design + service businesses**
  (GEO anchor).
- ≥2 contextual internal links out, ≥1 in (no orphans).
- All images: entity-rich alt + explicit dimensions via `next/image`.
- In `sitemap.ts`; allowed by `robots.ts`.
- OG/Twitter handled centrally (§2).

## 2. Metadata system (`src/lib/seo.ts`)

One `buildMetadata({ title, description, path, ogImage?, type?, noIndex? })`
helper; every page imports it; OG/Twitter/canonical never hand-written twice.
Dynamic routes (`work/[slug]`, `services/[slug]`) use `generateMetadata` calling
the same helper. **A page without `buildMetadata` fails the pre-launch audit.**
`og` default = `${site.url}/og-default.jpg` (1200×630, from ASSETS). `locale`
`en_US`. Twitter `summary_large_image`.

## 3. Schema stack (`src/lib/schema.ts` — built from `site.ts`, never inline)

This is an agency entity, not a local storefront. Stack:

| Page | Schema |
|---|---|
| Home | `Organization` (+ `ProfessionalService` additionalType) + `WebSite` |
| About | `AboutPage` + `Person` (Travis, the founder entity) |
| Services overview / `services/[slug]` | `Service` (provider = the org `@id`) + `BreadcrumbList` + `FAQPage` if FAQs |
| Work / `work/[slug]` | `CreativeWork`/`WebSite` reference + `BreadcrumbList` |
| Contact | `ContactPage` |
| Any page with FAQs | `FAQPage` |

Key fields on the business node:

```ts
"@type": ["Organization", "ProfessionalService"],
"@id": `${site.url}/#studio`,            // stable entity id all schemas reference
name: site.name,
url: site.url,
foundingDate: site.founded,              // "2025"
founder: { "@type": "Person", name: site.owner, "@id": `${site.url}/#founder` },
slogan: site.mnemonic,                   // "Depth, by design."
description: /* the canonical GEO sentence from CONTENT.md */,
areaServed: { "@type": "Country", name: "United States" },
knowsAbout: ["Web design","SEO","Answer engine optimization",
             "Generative engine optimization","Google Business Profile","Next.js"],
sameAs: site.sameAs,                      // every live profile — fill as they go live
contactPoint: { "@type": "ContactPoint", telephone: site.phone,
                contactType: "sales", email: site.email, areaServed: "US" },
```

The `Person` (Travis) node carries `sameAs` to any real profiles (LinkedIn,
GitHub, Dribbble) — the founder entity is a GEO asset. Service items reference the
org `@id` as `provider`. Validate every template on Rich Results Test +
validator.schema.org before launch and after any `site.ts` change.

## 4. AEO (answer-engine optimization)

- Every services + FAQ answer is **answer-first**: the first 40–60 sentence fully
  answers the question, 8th-grade level, includes "Saltwater Studio" once where
  natural. Elaboration follows.
- H2s on content pages are literal questions ("How much does a website cost?").
- ≥1 FAQPage-schema'd FAQ block on home + each services page (CONTENT.md FAQ).
- One `speakable` block per key page (intro + FAQ answers), declared via
  `SpeakableSpecification` in the page/WebPage schema.
- The snippet test (DPOS 02): any H2 + first paragraph must stand alone as a
  complete, correct answer. If it needs the rest of the page, rewrite it.

## 5. GEO (generative-engine optimization)

1. **One canonical fact set** — the CONTENT.md entity sentence, founder, founded,
   area, verbatim across site, schema, llms.txt, every social bio.
2. **Third-person falsifiable About paragraph** (CONTENT.md) — LLMs quote
   sentences like that.
3. **Specificity** — name the real services and the real method; generic copy is
   statistically invisible to a model.
4. **Third-party corroboration** is half the game and the site can't win it
   alone: get the studio listed and consistent (see §7), and let the live
   portfolio (Beach House Moving, Kai's Run, BashSnippets) corroborate the entity.

## 6. AI crawlers + llms.txt

- `app/robots.ts`: **allow everything** — GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, Bingbot. We want to be found; blocking AI crawlers is
  self-sabotage for a studio that *sells* AI visibility.
- Ship `/llms.txt` at the root: the canonical entity sentence, the four service
  one-liners with URLs, the live portfolio URLs, contact + booking, area served.
  15 minutes in scaffold; it's also a live demo of a service we sell.

## 7. Indexation, Bing & IndexNow (non-optional — it's the AI index)

- **GSC domain property** (DNS TXT) + submit `sitemap.xml` on launch; URL-inspect
  → request indexing on home + top pages.
- **Bing Webmaster:** import from GSC (inherits verification + sitemap). ChatGPT
  search / Copilot lean on Bing — skipping it means invisible in half of AI search.
- **IndexNow:** key file in `/public`, ping on deploy (INTEGRATIONS deploy hook).
- **Optional but recommended local signal:** a "Web designer" Google Business
  Profile for the Pensacola heartland (service-area, address hidden) — legitimate,
  free, and strong for "web designer near me" + local AI answers. Not required for
  v1; note it as a launch-week add. If created, its NAP must match `site.ts`
  character-for-character.

## 8. Pre-launch SEO audit (run on the Vercel preview before going live)

Hard fails (any one blocks launch):
- `grep -rn "{{" src/` returns **0** (no unfilled tokens).
- Every route exports `buildMetadata` with unique title/description + canonical.
- Schema: real data, valid types, no warnings on required fields (Rich Results
  Test + schema.org validator on home, a service page, About, a work page).
- `www → apex` 308; one URL per resource.
- `sitemap.ts` covers every route; `robots.ts` allows; `/llms.txt` present.
- All `<Image>` have `alt` + `sizes`; one `h1`/page; heading order clean.
- Form works (real submit), honeypot present, `/thanks` noindexed and fires
  `form_submit`.
- `site:` check in **both** Google and Bing 7 days post-launch.
- Targets: non-hero pages PageSpeed mobile ≥90; homepage ≥75 (DESIGN §0 exception),
  SEO 100 / A11y ≥95 / BP 100 on all.
