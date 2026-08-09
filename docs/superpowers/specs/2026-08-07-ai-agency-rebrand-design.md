# Saltwater Studio → AI Agency Rebrand — Design Spec

**Date:** 2026-08-07 · **Revised:** 2026-08-09
**Status:** Approved — implementing
**Owner:** Travis Abadie

---

## 1. Summary

Saltwater Studio repositions from a web-design studio to an **AI agency** for local
businesses. Web, SEO/AEO/GEO, Google presence, and social remain as services — they move
from headline to supporting cast.

Same entity, same domain, same brand world. The *what we do* changes, plus the SEO, docs,
profiles, assets, and content that carry it.

---

## 2. Decisions locked

| Decision | Choice | Why |
|---|---|---|
| Name / domain | `saltwaterstudio.xyz` unchanged | Preserves indexation and the 92.1/100 audit position |
| Visual brand | Unchanged; banner lockups only get a light systems motif | BRAND §2–4 (depth world, tokens, Fraunces/Hanken/Martian Mono) survive intact |
| City anchor | **Destin, FL** (was Pensacola) | Where Travis actually is; three other "Saltwater" studios exist and a named city is the cheapest disambiguation available |
| ICP | Local businesses, broadly | Owner's call, 2026-08-07 |
| First client | **Network-first, no niche gate** | Owner's call, 2026-08-09 |
| Entry offer | **None** | No pilot, no lead magnet, no free teardown. Services sell direct, quote-only |
| Services | 3 new AI pages, all 4 existing pages retained | Zero 301s, zero lost equity |
| Service page copy | **Fully platform-agnostic** — no tool names customer-facing | Premium register; zero maintenance as tools change. Accepts the loss of tool-name long-tail |
| Proof framing | **Outcome-only.** Never "built with Claude Code" | Luxury/professional positioning; AI-built reads as cheap to some local buyers |
| Delivery capability | Automation platforms, custom-coded agents, voice/SMS front-ends | Owner confirmed all three deliverable today |
| Booking | Cal.com out, qualifying form in | Owner's call; Cal.com may return once there's a foothold |
| Motion assets | Higgsfield 3-day MCP trial, burned deliberately later | Free tier is 0 credits / no video; $19 Starter deferred until output is proven |
| Nextdoor | Free Business Page + neighborly personal posts | Personal-profile promotion violates their Community Guidelines |
| Handles | **Deferred** — plain and dotted variants all taken on Facebook | Resolved when the other platform accounts get created |
| GBP | **Last**, after the site ships | Owner's call, 2026-08-09 |

---

## 3. Entity and naming

### 3.1 Canonical fact set

> **Saltwater Studio is a remote AI agency founded in 2025 by Travis Abadie in Destin,
> Florida, building AI automation and AI-search presence for local businesses nationwide.**

Appears verbatim (or trivially trimmed) in: About page, meta/OG description base,
Organization schema `description`, `llms.txt`, every social bio.

Structure deliberately mirrors the outgoing sentence — name, founded, founder, place,
"for … nationwide". Only the predicate changes. Preserves entity continuity with what
Google and the assistants already indexed instead of resetting it.

**Do not write "all businesses"** anywhere. Vague entity classes are harder for assistants
to match to a query. "Local businesses" is the widest phrasing that stays concrete.

### 3.2 Entity disambiguation

Verified collisions: `studio-saltwater.com`, `saltwaterdesignstudio.com`,
`saltwatrstudios.com`, plus Pensacola's `salzstudio.com` already selling "workflow
automation." Levers, in order of strength:

1. Named city (Destin) in the entity sentence and `geo`
2. Founder `Person` node — "Travis Abadie" is unique across the collision set
3. `.xyz` domain written out in every bio
4. `knowsAbout` array pinning the AI topic cluster

### 3.3 Taglines

- **Primary:** *AI systems for local business — built, not bolted on.*
- **Secondary:** *Systems engineered for Google, AI search, and the people in between.*
- **Mnemonic:** *Depth, by design.* — unchanged

### 3.4 Voice deltas (BRAND §5)

Existing ban list stands. Add the AI-hype register:

`AI-powered` · `agentic` (outside genuine technical context) · `revolutionize` ·
`transform your business` · `10x` · `cutting-edge` · `harness` · `supercharge` ·
`future-proof` · `AI-first` (as a slogan)

Read-aloud test and paste-test still apply: if a competitor could paste the sentence onto
their site unchanged, rewrite it.

---

## 4. Phase 1 — Docs and source of truth

| File | Change |
|---|---|
| `src/config/site.ts` | `baseCity` → Destin · `geo` → 30.3935, −86.4958 · `heartland` → "Gulf Coast (Gulf Shores, AL to Panama City, FL)" · new taglines · `calcom` commented out with reason · `sameAs` stays `[]` |
| `BRAND.md` | Rewrite §1 positioning, §5 banned words, §6 taglines. §2–4 untouched |
| `content/CONTENT.md` | Rewrite home, about, services overview; add 3 AI service copy blocks |
| `content/PORTFOLIO.md` | Add owned-proof case studies; permission gates unchanged |
| `SEO.md` | New keyword map, title/description patterns, FAQ targets |
| `public/llms.txt` | Regenerate: new entity sentence, 7 services, new proof |

`sameAs[]` rule: a URL enters only after it returns 200. No speculative entries.

---

## 5. Phase 2 — Site refactor

### 5.1 New service pages

| Route | Covers |
|---|---|
| `/services/ai-strategy` | Audit, roadmap, buy-vs-build, SOPs, staff rollout and training |
| `/services/ai-automation` | Process automation, CRM plumbing, data sync, intake and quoting. **AI workflows live here** as a dedicated H2 cluster plus their own FAQ block |
| `/services/ai-agents` | Chat, voice, and SMS front-ends — receptionist, missed-call text-back, booking, inbox triage |

Workflows do not get their own route: "AI automation" and "AI workflow" resolve to the
same intent and the same buyer, and two pages would split their own signal.

`Service` interface gains two optional fields — `sections?` and `faqs?`. No CMS.

### 5.2 Existing pages

`web-design`, `seo-aeo-geo`, `google-presence`, `social-content` stay at current URLs. No
redirects. Light copy pass so they read as supporting the AI work.

### 5.3 Homepage

- New H1 leading with the AI reposition, keeping the depth metaphor
- Offer section 7 cards → 4: `01 AI strategy` · `02 AI automation` · `03 AI agents` ·
  `04 Web & search presence` (links `/services`, where the four legacy pages live)
- Trust strip proof ticks updated

### 5.4 Booking → qualifying form

- `/book` becomes `redirect('/contact')`. `CalEmbed.tsx` stays on disk, unreferenced,
  with a comment recording why. `site.calcom` commented out, not deleted
- Nav, footer, sitemap, and the in-form "book a strategy call" link all drop `/book`
- `contact/QuoteForm.tsx` gains selects: what they want · biggest bottleneck (missed calls
  / manual data entry / scheduling / follow-up / quoting / reporting / other) · team size ·
  timeline
- **No budget field.** A budget range is a price on the site by another name
- Honeypot and submit-timing checks stay. `api/contact/route.ts` zod schema and the Resend
  template extend to match

### 5.5 Schema

- `Organization` gains `knowsAbout` and `slogan`; `geo` moves to Destin
- Three generated `Service` nodes — no inline nodes, hard rule
- New AI-targeted `FAQPage` entries for AEO
- Speakable selectors on answer-first paragraphs
- `sitemap.ts` +3 routes; `/book` removed

---

## 6. Proof and portfolio policy

Outcome-first, method second, tooling never named. No metrics, no testimonials, no
"built with Claude Code."

**May be cited:**

| Asset | Framing |
|---|---|
| Heat-safety tool (Kai's Run) | A question every dog owner asks in July, answered in under a second from live local weather |
| BashSnippets | A technical library built so answer engines can quote it cleanly |
| Beach House Moving | Live client site, PORTFOLIO §0 LIVE gate |
| Production system | One input, every asset a launch needs, rendered without a human in the loop |

Client sites stay under existing PORTFOLIO §0 gates: LIVE = Beach House Moving, Kai's Run,
BashSnippets. PREVIEW = WaterVue, Aquamarine, Alexander Hines (no link, no endorsement).

**May NOT be cited — third-party repos, not Travis's work:** `hexstrike-ai`
(`0x4m4`), `MetasploitMCP` (`GH05TCREW`), `claude-seo` (`AgriciDaniel`), `voicebox`
(`jamiepine`). Tools he runs, not products he built. `chaosProject` is a synthetic audit
target. None appear on the site, in schema, in bios, or in content.

**The gap, stated plainly:** automation platforms, custom agents, and voice/SMS are all
deliverable today, but **no client case study exists for any of them**. Those pages ship
with capability and method — no results, no metrics — until one is real.

---

## 7. Phase 3 — Brand asset kit

Mark, palette, and type untouched. The refresh is confined to banner lockups picking up a
systems motif consistent with the depth world.

Every platform size rendered and staged for swap-in:

| Target | Size | Note |
|---|---|---|
| Facebook profile | 512×512 | Renders as a circle |
| Facebook cover | 1640×856 | Mobile crops to ~640×360 centered |
| Instagram profile | 320×320 | Circle |
| Instagram post | 1080×1080 | |
| Instagram story / Reel cover | 1080×1920 | |
| YouTube profile | 800×800 | |
| YouTube banner | 2560×1440 | Safe area 1546×423 centered |
| LinkedIn logo | 300×300 | |
| LinkedIn cover | 1128×191 | |
| Nextdoor business logo | 1200×1200 | |
| OG / Twitter card | 1200×630 | |
| Favicons | 16–512 + ICO | |

Built by `build_cards.sh` + ImageMagick derivatives. Deterministic, free, on-brand.

---

## 8. Phase 4 — 30-day content plan

Format follows `WEEK-02-CONTENT-GUIDE.md`. Card numbering continues from 14.

| Channel | Volume | Notes |
|---|---|---|
| Facebook page | 22 posts, 5×/wk Mon–Fri | Primary |
| Nextdoor | 8 topics × 2 versions | Business Page version + neighborly personal version for the Destin / Mattie M Kelly feed |
| Instagram | 22 mirrors + 4 Reels | |
| Reels / Shorts | 4 | ffmpeg motion from cards now; Higgsfield trial burned on the best 4 later |
| Personal LinkedIn | 4 | Travis's personal profile, more technical register |

**Per post:** body text, hashtags, first comment (link goes here only, never in the body),
asset filename, alt text, personal-profile share caption.

**Constraints:** BRAND §5 voice as amended in §3.4 · no emoji · no invented metrics,
results, or testimonials · no client names without PORTFOLIO §0 permission · answer-first
opening line · one entity mention · question CTA · goal is followers and comments.

---

## 9. Phase 5 — Manual setup guide

Written for Travis to execute. Covers: handle claim order across platforms, Facebook page
fields (name, username, category, About, CTA button, cover, pinned post), Instagram and
YouTube creation, Nextdoor Business Page, **GBP last**, `sameAs` backfill with 200
verification, Higgsfield trial timing, Canva MCP usage.

---

## 10. Verification gates

- `npm run build` exits 0
- `npm run lint` clean
- `grep -rn "{{" src/` → 0 real tokens
- Entity sentence byte-identical across About, schema, `llms.txt`, and all bios
- Schema validates; no inline nodes outside `src/lib/schema.ts`
- Every `sameAs[]` URL returns 200 (currently zero entries)

---

## 11. Out of scope

Domain change · visual rebrand · new logo · pricing on the site (quote-only is a hard
rule) · client migrations · building an actual AI product · Cal.com removal from the
codebase (commented, not deleted)

---

## 12. Known risks

1. **Transition window.** Indexed equity currently says "web design studio." Same-domain
   repositioning means a period ranking cleanly for neither. Keeping the domain is still
   correct — entity continuity beats a clean slate — but rankings will wobble.
2. **Capability without proof.** Three sellable capabilities, zero case studies. Copy must
   describe method, never results, until that changes.
3. **Network-first has no keyword sharpening.** Outreach and content can't be tuned to one
   buyer. Accepted trade for speed to a first yes.
