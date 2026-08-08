# Saltwater Studio → AI Agency Rebrand — Design Spec

**Date:** 2026-08-07
**Status:** Awaiting review
**Owner:** Travis Abadie

---

## 1. Summary

Saltwater Studio repositions from a web-design studio to an **AI agency** for local
businesses. Web, SEO/AEO/GEO, Google presence, and social remain as services — they move
from headline to supporting cast.

Same entity, same domain, same brand world. Only the *what we do* changes, plus the SEO,
docs, profiles, and content that carry it.

---

## 2. Decisions locked

| Decision | Choice | Why |
|---|---|---|
| Name / domain | `saltwaterstudio.xyz` unchanged | Preserves indexation and the 92.1/100 audit position |
| Visual brand | Unchanged | BRAND §2–4 (depth world, tokens, Fraunces/Hanken/Martian Mono) survive the pivot intact |
| ICP | Local businesses, broadly — not only service businesses | Owner's call, 2026-08-07 |
| Services | 3 new AI pages, all 4 existing pages retained | Zero 301s, zero lost equity |
| Proof standard | Only what Travis actually built | Never-invent-proof rule (CLAUDE.md) |
| Static assets | `build_cards.sh` | Free, deterministic, already on-brand |
| Motion assets | Higgsfield Starter | Free tier has 0 credits and no video |

---

## 3. Entity and naming

### 3.1 Canonical fact set (the single most important string)

> **Saltwater Studio is a remote AI agency founded in 2025 by Travis Abadie on Florida's
> Gulf Coast, building AI automation and AI-search presence for local businesses
> nationwide.**

Appears verbatim (or trivially trimmed) in: About page, meta/OG description base,
Organization schema `description`, `llms.txt`, every social bio.

Structure deliberately mirrors the outgoing sentence — name, founded, founder, place,
"for … nationwide". Only the predicate changes. This preserves entity continuity with
what Google and the assistants have already indexed instead of resetting it.

**Do not write "all businesses"** anywhere in copy, schema, or `llms.txt`. Vague entity
classes are harder for assistants to match to a query than concrete ones. "Local
businesses" is the widest phrasing that stays concrete.

### 3.2 Taglines

- **Primary:** *AI systems for local business — built, not bolted on.*
- **Secondary:** *Systems engineered for Google, AI search, and the people in between.*
  (adapted from the existing line — "Websites" → "Systems")
- **Mnemonic:** *Depth, by design.* — unchanged

### 3.3 Voice deltas (BRAND §5)

Existing banned list stands. Add the AI-hype register:

`AI-powered` · `agentic` (outside genuine technical context) · `revolutionize` ·
`transform your business` · `10x` · `cutting-edge` · `harness` · `supercharge` ·
`future-proof` · `the future of work` · `AI-first` (as a slogan)

The read-aloud test and the paste-test both still apply: if a competitor could paste the
sentence onto their site unchanged, rewrite it.

---

## 4. Phase 1 — Docs and source of truth

Everything downstream generates from these. This phase lands first and alone.

| File | Change |
|---|---|
| `BRAND.md` | Rewrite §1 positioning, §5 banned words, §6 taglines. §2–4 untouched. |
| `src/config/site.ts` | `tagline`, `taglineSecondary`, populate `sameAs[]` |
| `content/CONTENT.md` | Rewrite home, about, services overview; add 3 AI service page copy blocks |
| `content/PORTFOLIO.md` | Add the automation-pipeline case study; permission gates unchanged |
| `SEO.md` | New keyword map, new title/description patterns, new FAQ targets |
| `public/llms.txt` | Regenerate: new entity sentence, 7 services, new case study |

---

## 5. Phase 2 — Site refactor

### 5.1 New service pages

| Route | Covers |
|---|---|
| `/services/ai-automation` | Workflow automation (n8n/Make/Zapier), CRM plumbing, data sync, quoting and intake flows |
| `/services/ai-agents` | Chat, voice, and SMS front-ends — AI receptionist, missed-call text-back, booking bots, inbox triage |
| `/services/ai-strategy` | Audit, roadmap, buy-vs-build, SOPs, staff training and rollout |

### 5.2 Existing pages

`web-design`, `seo-aeo-geo`, `google-presence`, `social-content` all stay live at their
current URLs. No redirects. Their copy gets a light pass so it reads as supporting the AI
work rather than as the main event.

### 5.3 Homepage

- **H1** replaced. Current: *"Most websites stop at the surface. We build deeper."*
  New H1 leads with the AI reposition while keeping the depth metaphor.
- **Offer section → 4 cards, not 7:**
  `01 / AI automation` · `02 / AI agents` · `03 / AI strategy` ·
  `04 / Web & search presence` (single card linking to `/services`, where the four legacy
  pages live). Keeps the homepage tight; keeps every legacy page reachable and indexed.
- Trust strip proof ticks updated.

### 5.4 Schema

- `sameAs[]` populated on Organization and Person — the June audit's #1 open GEO lever.
- Three new `Service` nodes, generated from `site.ts` via `src/lib/schema.ts`. No inline
  nodes (hard rule).
- New FAQPage entries targeting AI questions, for AEO.
- `sitemap.ts`: 3 new routes; `SITE_LAUNCH_DATE` constant bumped once, deliberately.

### 5.5 New case study

`/work/production-automation` — the build pipelines Travis actually wrote and runs:
`build_cards.sh`, `build_carousels.sh`, `build_shorts.sh`, `build_montage.py`,
`build_longform.py`, `build_reels.py`, `generate-og.mjs`, `generate-favicons.mjs`,
`submit-indexnow.mjs`, the headless-PDF invoicing pipeline.

This is the second proof asset. It is true, it is his, and it demonstrates exactly the
skill being sold: finding a repetitive business process and automating it end to end.

---

## 6. Proof and portfolio policy

**May be cited:**

- **BashSnippets** — owned property, structured for AI citation. Primary AI-search proof.
- **The production pipelines** (§5.5) — authored automation.
- **Client sites** under existing PORTFOLIO §0 gates: LIVE = Beach House Moving, Kai's Run,
  BashSnippets. PREVIEW = WaterVue, Aquamarine, Alexander Hines (no link, no endorsement).

**May NOT be cited — verified third-party repos, not Travis's work:**

| Repo | Actual origin |
|---|---|
| `hexstrike-ai` | `github.com/0x4m4/hexstrike-ai` |
| `MetasploitMCP` | `github.com/GH05TCREW/MetasploitMCP` |
| `claude-seo` | `github.com/AgriciDaniel/claude-seo` |
| `voicebox` | `github.com/jamiepine/voicebox` |

Tools he runs, not products he built. `chaosProject` is a synthetic audit target, not a
product. None of these appear on the site, in schema, in bios, or in content.

**The gap, stated plainly:** four capabilities are offered; two carry hard proof. No
authored code calling the Anthropic or OpenAI APIs exists in the workspace today, and no
n8n/Make/Zapier configs. AI build services therefore ship with capability descriptions and
method — **no case studies, no metrics, no invented results** — until a real one exists.

---

## 7. Phase 3 — Identity and sameAs

Canonical handle `saltwaterstudio` everywhere it is available. Fallback order:
`saltwaterstudioxyz` → `saltwaterstudiofl`. Availability must be checked before any account
is made; one handle mismatch across platforms weakens the whole sameAs cluster.

| Platform | Target | Note |
|---|---|---|
| Instagram | `instagram.com/saltwaterstudio` | Requested |
| YouTube | `youtube.com/@saltwaterstudio` | Requested; strong sameAs signal |
| LinkedIn | `linkedin.com/company/saltwater-studio` | Highest-authority node for this positioning |
| GitHub | `github.com/anguishe` | Already real — cheapest credible node |
| Facebook | existing page | URL to be confirmed |
| Google Business Profile | TBD | Existence unconfirmed — see §11 |

**Profile pack** (identical across all platforms): bio derived from §3.1 and trimmed per
platform character limit, `saltwater-studio-mark.png` as avatar, banner rendered by
`build_cards.sh`, one link — `https://saltwaterstudio.xyz`.

Claude prepares every field. **Travis performs all signups** — account creation and
credential entry are out of scope for the agent. After each account is live, its URL goes
into `site.ts` `sameAs[]` and gets verified 200.

---

## 8. Phase 4 — Facebook page

Name, category, About (entity sentence), CTA button, cover image, pinned post. Page
currently has ~5 followers, so there is nothing to lose in a hard reposition.

---

## 9. Phase 5 — 30-day content guide

Format follows the existing `WEEK-02-CONTENT-GUIDE.md`. Card numbering continues from 14
(next asset is 15).

| Platform | Cadence | Volume |
|---|---|---|
| Facebook | 5×/week, Mon–Fri | 22 posts (primary) |
| Instagram | Mirror of FB cards + Reels | 22 + 4 |
| YouTube | Shorts, weekly | 4 |
| LinkedIn | 2×/week, more technical register | 8 |

**Per post:** body text, hashtags, first comment (link goes here only, never in the body),
asset filename, alt text.

**Unique assets:** ~22 static cards + 4 motion pieces.

**Constraints:** BRAND §5 voice as amended in §3.3 · no emoji · no invented metrics,
results, or testimonials · no client names without PORTFOLIO §0 permission · goal is
followers and comments, not clicks.

---

## 10. Asset pipeline

- **Static cards** — `build_cards.sh` at 2160². Needs one addition: an AI-theme card
  variant. Everything else about it already conforms to brand.
- **Motion** — Higgsfield, Starter tier. Their ToS §4.4 confirms outputs carry no
  ownership claim, no commercial-use restriction, and are sublicensable to clients, so
  client work is covered too. Free tier is 0 credits with no video access and cannot serve
  this campaign.

---

## 11. Open items — require Travis

1. **Higgsfield** — create the account, decide $0 (static only) vs. $19/mo Starter (motion).
2. **Google Business Profile** — does one exist for Saltwater Studio? It is the strongest
   sameAs anchor and the audit flagged the empty array specifically.
3. **Facebook page URL** — needed for `sameAs[]`.
4. **Social signups** — once the profile pack is handed over.
5. **Delivery readiness** — which of the four AI capabilities can be sold and scoped
   *today*, for pricing conversations. Does not block the build.

---

## 12. Verification gates

Per CLAUDE.md and SEO.md §8:

- `npm run build` exits 0
- `npm run lint` clean
- `grep -rn "{{" src/` → 0 real tokens
- Every `sameAs[]` URL returns 200
- Schema validates; no inline nodes outside `src/lib/schema.ts`
- Entity sentence byte-identical across About, schema, `llms.txt`, and all bios

---

## 13. Out of scope

Domain change · visual rebrand · new logo · pricing on the site (quote-only is a hard
rule) · client migrations · building an actual AI product (tracked separately; the site
makes no claim that depends on it)

---

## 14. Known risk

Indexed equity is currently "web design studio." Repositioning on the same domain means a
transition window ranking cleanly for neither. Keeping the domain is still correct — the
entity-continuity gain outweighs it — but the cost is real and should not be a surprise
when rankings wobble.
