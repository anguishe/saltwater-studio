---
name: saltwater-insights
description: Use when planning, writing, refreshing, or publishing a Saltwater Studio /insights article (saltwaterstudio.xyz/insights, src/data/insights.ts), choosing the next insight topic or keyword, or turning real client/owned-site work into a search-targeted post.
---

# Saltwater Insights

An insight earns its place only where **real search demand** meets **first-hand proof**.
Demand without proof = generic content any agency could write. Proof without demand = a
diary nobody searches for. Ship only the overlap.

## 1. Demand — find the question people actually type

Run all three. Save raw output to `~/Projects/docs/insights-evidence/<slug>/` (outside the
public repo; the scratchpad dies). The PR body links or summarizes it.

Seeds come from two places: the pain points the services sell against, **and** the areas where
your strongest proof lives (indexing, Bing/Copilot, GBP, site speed…). Fan out from both.

```bash
# Autocomplete fan-out (free, real typed queries, no volume). Swap in your seeds.
for q in "why is my business not" "how long does it take for google to" "how much does a small business website" \
         "google business profile" "do i need a website for"; do
  curl -s "https://suggestqueries.google.com/complete/search?client=firefox&gl=us&q=${q// /+}" | jq -r '.[1][]'
done
```
- **SERP:** WebSearch. Note what ranks (forums? Google help? agency listicles?) and what they
  all repeat secondhand. That's the gap first-hand data fills.
- **People Also Ask:** signed-out Playwright on google.com (WebSearch doesn't return PAA; never
  the logged-in Chrome). PAA questions become H2s.
- **Owner wording:** r/smallbusiness / r/GoogleMyBusiness threads. Copy their phrasing of the
  pain, not their facts.
- Optional volume: `python3 ~/claude-seo/scripts/keyword_planner.py` (free Keyword Planner, needs
  `pip install --user google-ads`; Google Ads acct is **no-spend**: never create campaigns).
  Saltwater's own GSC is brand-only until the site grows.

Seed the fan-out with the pain points the site sells against, not with what's fun to write.
Websites / Google Business Profile / local search lead (~65%); AI topics stay ≤ about 1 in 3.

## 2. Proof — what we can say from our own work

| Source | Allowed |
|---|---|
| Owned: BashSnippets, Kai's Run | Real numbers, pulled fresh this session (GSC, Bing WMT, GA4) |
| Saltwater's own site | Real numbers; unflattering ones (e.g. low index count) are Travis's call |
| WaterVue Event Rentals (Travis part owner, Kiera = business contact) | Outcomes OK; ask Travis before printing its figures |
| Beach House Moving (live client) | Outcomes and method only, **never figures** |
| Preview clients (Aquamarine, Hines) | Never named |
| Prospect outreach (`docs/prospects/`, git-excluded) | Anonymized patterns ("most of the 40 sites we checked…") counted from the ledger. Never a name. Never an absence claim about a business |
| Commands run on this box (site-gate, curl, GSC pull) | Yes, show the real output |
| Google/Bing official docs | Supporting facts only, with URL |

Data tools: search queries = `cd ~/.claude/skills/seo && python3 scripts/gsc_query.py -p sc-domain:<site> --json`.
Index status per URL = copy `~/Projects/docs/indexing-audit-2026-10-02/inspect_all.py`, narrow `SITES`, run (read-only URL Inspection API).
Prior findings: that folder's `REPORT.md`.

## 3. Topic gate (all yes, or pick another)

1. A real query string from step 1 the article targets verbatim.
2. A first-hand finding from step 2 that **answers or reframes** that query.
3. **Competitor test:** could an agency with no client work write this same article? If yes, it isn't ready.
4. Not a duplicate: `grep -n 'slug:' src/data/insights.ts`.
5. Answerable without prices (quote-only rule; the audit's `site.auditOffer` is the only exception).
6. A service page to link to (`grep -n 'slug:' src/data/services.ts`).

Demand with no proof yet? Don't pad it with secondhand facts. Tell Travis what work would create the proof.

## 4. The article (an `Insight` object in `src/data/insights.ts`)

Before drafting, build the **claim ledger**: every factual sentence → first-hand source (path,
command, URL) | official doc URL | "Travis confirmed". A sentence mixing a doc fact with our data
cites both. A claim with no row is cut **before**
drafting, not flagged after. Judgments like "the most common…" or "takes ten minutes" need a
count or Travis.

- `headline`: uses the target query's wording. `seoTitle` ≤ 41 chars (46 hard max, check-meta). `metaDescription` 150–160.
- `summary`: answers the query in ≤ 60 words and can stand alone.
- 4–6 `sections`. H2 = a literal question taken from PAA/autocomplete. First paragraph answers it
  alone (snippet test, SEO.md §4).
- **Proof spine:** the first-hand finding carries the thesis and appears by section 2.
  Official docs back it up; they don't replace it.
- `datePublished` = the real ship date. A refresh sets `dateModified`, not a new date.
- `links`: 2–4 internal routes that exist (`/services/<slug>`, `/insights/<slug>`, `/web-design-<city>`).
- Voice: BRAND §5 / CLAUDE.md banned list, no emoji. First-person plural ("we saw").

## 5. Publish

1. Append the object. Add its line to `public/llms.txt` under "## Insights". Bump
   `LAST_UPDATED` in `src/app/sitemap.ts`. Link it from 1–2 related insights' `links`.
2. `npm run build` (postbuild check-meta) + `npm run lint`.
3. Change control: cloud session → PR only. Local → push only when Travis asks. PR body =
   target query + demand evidence + claim ledger. Run site-gate on the Vercel preview before merge.
4. After the production deploy: IndexNow fires from postbuild. Add the URL to `~/Projects/docs/GSC-INDEXING-QUEUE.md`.

## Common mistakes

- Paraphrasing Google's help center with one "in our work" paragraph bolted on. That fails the competitor test.
- Shipping a soft claim and flagging it in notes. Cut it first.
- Picking the topic from the proof you have and then hunting for a keyword. Demand comes first.
- Using BHM numbers, or naming a prospect.
