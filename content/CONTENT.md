# CONTENT.md — Saltwater Studio (all copy, verbatim)

Voice per BRAND §5. Pull copy from here; don't hardcode it in components beyond
what the data layer holds. Answer-first throughout. No banned words.

---

## GEO entity sentence (the canonical fact set — verbatim everywhere)

> **Saltwater Studio is a web design and AI studio founded in 2025 by Travis
> Abadie in Destin, Florida, building websites, Google Business Profile management,
> and AI automation for local businesses, in person along the Gulf Coast and
> remotely nationwide.**

Single-sourced from `site.entitySentence`. Change it there, not here — schema, the
About page, and the About section all read that one constant. Never write
"all businesses": vague entity classes are harder for answer engines to match.

This exact sentence (or a trivially-trimmed version) appears in: the About page,
the meta/OG description base, the Organization schema `description`, the llms.txt,
and every social bio — character-consistent. Inconsistency = entity confusion.

---

## Home

### Hero
- **Mono kicker:** `SALTWATER STUDIO — EST. 2025 · DESTIN, FL → NATIONWIDE`
- **H1:** *Most AI stops at the demo. We build what runs underneath.*
- **Subhead:** *AI systems for local business — built, not bolted on. The
  repetitive part of your day, handled. The calls you miss, answered. The search
  presence that gets you named when someone asks for a recommendation.*
- **Primary CTA:** `Start the conversation` → /contact
- **Secondary CTA:** `See what we build` → /services

### Trust strip
- **Line:** `Systems for Google · AI search · and the people in between.`
- **Proof ticks (mono):** `NATIONWIDE` · `DESTIN, FL` · `EST. 2025` ·
  `BUILT, NOT BOLTED ON`

### Offer — "What we build" (quote-only)
Section header (secondary tagline): **Websites engineered for Google, AI search,
and the people in between.**

1. **`01 / Websites, built right.`** — A custom Next.js site, fast where it counts
   and immersive where it earns attention. No page-builder bloat, no template
   you'll outgrow in eighteen months.
2. **`02 / SEO, AEO & GEO.`** — Ranked in Google, quoted in AI answers, named as
   the business when someone asks an assistant "who's good near me." Schema and
   entity strategy are built in from the first commit, not patched on later.
3. **`03 / Google presence.`** — Business Profile set up and optimized, reviews
   working as a system, the local pack worked the way it actually ranks.
4. **`04 / Social & content.`** — The weekly engine — posts, profile activity,
   the content that keeps you alive everywhere a customer checks you out.

Each card CTA: `Talk it through →` (→ strategy call).

### Process — "Right the first time"
- **Header:** *We build the version you don't have to redo.*
- **Lead:** Most small-business sites get rebuilt every couple of years because
  the first one skipped the parts you can't see — the schema, the tracking, the
  entity work that decides whether you get found. We don't skip them.
- **Steps:**
  1. **Strategy first.** We figure out how you actually win before anyone touches
     a layout.
  2. **Built to be found.** Schema, metadata, and analytics go in on day one —
     not in a panic six months after launch.
  3. **The build.** Custom, fast, and yours. You own the code, the domain, the
     accounts. All of it.
  4. **Launch, indexed.** Submitted to Google and Bing, verified, tracked, and
     confirmed working before we call it live.
  5. **Grown.** Content and presence work that compounds — or a clean handoff if
     you'd rather run it yourself.

### Why us
- *Schema & entity, from the first commit.* Structured data goes in on day one
  and is validated before launch — never bolted on after. The same build behind
  BashSnippets, a property the studio owns and runs, engineered so AI tools can
  quote it instead of skipping it. Your site tells Google and the assistants
  exactly what you do, for whom, and where.
- *You own everything.* Domain, hosting, analytics, every account — in your name,
  under your email, with your billing. The studio does the work and hands you the
  keys: no agency login, no hostage situation.
- *One canonical fact set.* Your name, location, services, and entity facts read
  the same on the site, in schema, in llms.txt, and on every profile — the
  consistency AI search rewards. It's the entity work that let Kai's Run claim a
  service category that didn't exist in search yet.
- *No template you'll outgrow.* Custom Next.js, not a page-builder you'll fight
  in eighteen months. It's how Beach House Moving got a service-area page for
  every county it works — depth a template can't fake, because the template never
  adds the schema or the local pages in the first place.

### CTA close
- **Headline:** *Depth, by design.*
- **Sub:** *Let's build the site you stop apologizing for.*
- **CTAs:** `Start the conversation` → /contact · `See the work` → /work

---

## About

- **H1:** *Saltwater Studio*
- **Entity paragraph (third person, GEO):** the canonical entity sentence, rendered
  from `site.entitySentence` — never retyped here. Followed by: *It works with local
  businesses across the United States, with a heartland on the Gulf Coast from Gulf
  Shores, Alabama to Panama City, Florida.*
- **The why (first person):** lives in `src/app/about/page.tsx`. Four paragraphs:
  what keeps failing (template sites then bolted-on AI, both failing the same way),
  the owned proof (BashSnippets, the Kai's Run heat-safety tool, Beach House Moving
  service-area pages, the internal asset system), and the method in one line — map
  the process, build what fits, document it well enough to hand over.
- **Proof rule:** outcome first, method second, tooling never. No platform names,
  no model names, no "built with." No metrics, no testimonials, until a real one
  exists.

## Services overview (page intro)
- **H1:** *What Saltwater Studio does*
- **Answer-first lead:** *Three AI services — strategy and logistics, automation,
  and agents — plus the web, search, Google Business Profile, and social work that
  decides whether any of it gets found. Everything is quote-based; tell us what the
  day actually looks like and we'll scope it honestly.*

---

## Contact / Quote
- **H1:** *Tell us about the business.*
- **Lead:** *The more specific you are, the more useful the quote. No spam, no
  obligation — Travis reads every message.*
- **Form fields:** Name · Email · Business & website (if any) · What are you
  after? · What eats the most time right now? · How many people? · Timeline ·
  Walk me through it · (honeypot: Company) — labels above fields, not placeholders.
  Select options live in `src/data/quoteOptions.ts` and are validated server-side
  against that same list.
- **No budget field**, ever. Quote-only pricing is a hard rule and a budget range
  is a price on the site by another name.
- **Button:** `Send it`
- **Under button:** *Rather just talk? [phone]. Travis picks up.*
- **Thanks page:** *Got it. Expect a reply within one business day. Need it
  sooner? Call (850) 218-5855.*

---

## FAQ (AEO answer-first, FAQPage schema)

**Source of truth: `src/data/faqs.ts`.** Answers were duplicated here and drifted, so
they now live in one place and this file points at it. Each entry carries a `page`
key (`home`, `services`, `ai-strategy`, `ai-automation`, `ai-agents`, `web-design`,
`seo-aeo-geo`, `google-presence`, `social-content`) and renders into both the visible
FAQ block and the FAQPage schema.

Rules when adding one:

- First sentence must be true out of context — that is the snippet test, and it is
  what an answer engine lifts.
- Answer the question actually asked before adding texture.
- No price, no metric, no testimonial.
- One entity mention where it fits naturally, never forced.
