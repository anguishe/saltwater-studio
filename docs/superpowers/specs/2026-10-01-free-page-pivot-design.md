# Free-Page Pivot — Design

**Date:** 2026-10-01 · **Owner:** Travis · **Status:** approved design, pending implementation plan

## Goal

Replace the free-audit offer with a **finished, free landing page** built for local businesses that have
no website or a broken one, put in front of the owner on first contact, to convert them to the
**$297/mo** all-in plan. Competitors (Lovable-built demo vendors) mine the same Google Maps "no website"
lists, so the edge is authenticity (the owner's own photos and real reviews), a local human, and speed.

## Locked decisions (Travis, 2026-10-01)

| Topic | Decision |
|---|---|
| Pool | Every prospect with no website or a broken one, **contacted or not**, minus anyone who said no/stop or is DNC |
| Offer | $297/mo covers build, hosting, management, SEO, GBP management, monthly report: everything done for BHM. Other asks quoted case by case |
| Term | 4-month minimum, billed monthly. After month 4 they continue or keep the site and leave. Mention once on the call; don't dwell. Goal = indefinite |
| Prices in writing | Never (standing [no-prices-in-copy] rule). Price and term are spoken after the owner replies |
| Lovable-demo prospects | Included. Lead with authenticity; never mention the other vendor |
| Volume | 5 finished pages per day |
| First contact | Text first: MMS screenshot of their page + link. Email or Messenger when that's where a strong prospect answers |
| Messenger | Travis sends from his phone. Claude only stages the copy and image |
| Facebook photos | Fallback only, capped (see §3) |

## Definitions

**No website:** Google listing and every source checked show no site, OR the only web presence is
Facebook / a directory. **Broken:** domain doesn't load, is parked or expired, throws an SSL error, or
renders broken in a real mobile render. An old site that works is **out**.

Every "no/broken" status is a private filter, never prospect-facing copy. The absence-claim ban stands:
no message says or implies "you don't have a website".

## 1. Selection

1. `python3 docs/prospects/ledger.py` builds the pool (all CSVs + contacted sources). New: a flag to
   include contacted rows and exclude only `no`/`stop`/DNC outcomes.
2. Filter `website_state` ∈ {none, facebook, parked, lapsed, dead, ssl, broken}.
3. Re-verify each candidate **the same day**: `gate.js` (Maps by phone, Bing, guessed + cited domains) and a
   headed real-Chrome render of any found URL at 390px and desktop. A live site found anywhere = drop.
4. Rank: Google reviews × rating, textable line (live line-type lookup, not prefix/block), usable-photo
   count (§2 step 1 dry run), distance from Destin. Skip chains. Restaurants: occasional, owner-run only.
5. Probe `<slug>.lovable.app` (concatenated + hyphenated); record as a flag, not an exclusion.
6. Output `docs/prospects/DAILY-PAGES-YYYY-MM-DD.md`: top 5 + 3 alternates, each with evidence links.

## 2. Photos (premium-landing-page skill update)

Replaces the skill's "photos for other verticals: none by default" rule and the per-business photo OK.
Travis's standing go-ahead now covers owner photos for **every** vertical.

- **Hero = the single most authentic, hook-worthy real photo of the business** (work, room, storefront,
  product, team at work) for every vertical. The 3D/WebGL piece becomes a secondary accent (overlay or a
  later section), never a substitute.
- **Source order:** Google Maps "By owner" (`scripts/owner-photos.js <phone> <dir>`, `=w2400` full-res) →
  the business's own booking/ordering/menu pages, Yelp "from the business", Nextdoor business page →
  Facebook (§3) only when the others yield < 5 usable photos.
- **Pick before download:** list candidate URLs → small thumbnail sheet within the image-token guard
  (≤ ~400 tokens per read) → choose the top 5–6 → `identify` the picks (hero ≥ 1600px long side, portrait
  preferred) → download **only** the picks.
- **Never** customer/reviewer photos. PII gate per pick: full-size look + OCR; blur or skip plates,
  house numbers, faces of non-owners, documents.
- **Output:** WebP 800w + 1600w (q≈78) in `public/preview/<slug>/img/`, hero preloaded, width/height set,
  alt text describes what's actually in the photo. `RECON.md` logs each photo's source URL + date.

## 3. Meta guard v2 (`~/.claude/hooks/meta_guard.py`)

| Rule | v1 | v2 |
|---|---|---|
| Page loads | 12/hr, 30/day | **20/hr, 50/day** |
| Browser | anguisheh1 Chrome `7b769056` only | unchanged |
| Sessions | one at a time (15-min lock) | unchanged |
| Reads | screenshots + clicks only | unchanged, **except**: on `facebook.com/photo*` / `/photos/*` viewer URLs, a `javascript_tool` call whose code only reads an `img` `src` is allowed |

FB photo grab = ~4 loads per business: Page → Photos tab (screenshot, pick) → open each pick, read its
`src`, then `curl` the fbcdn URL (a CDN fetch, no cookies). No scrolling sweeps, no DOM text reads, no
other Meta surface. Self-check (`meta_guard.py demo`) gains cases for the new allowance and caps.
CLAUDE.md "Meta: never scrape" line and the `facebook-scraping-workarounds` memory updated to match.

## 4. Build

- `premium-landing-page` skill as the floor; bar = `/preview/a-shade-darker-v2` ("$50k" look), now with
  real photos leading.
- 5 **fresh `general-purpose` agents** per day in parallel (never forks), one page each, own QA port,
  self-contained brief (SKILL.md path, RECON.md, creative brief, photo dir, output path). Skill token
  budget applies.
- Gates: `qa.js` (390 first, 360/430 at the end, one desktop), `compliance.py`, hero look by orchestrator.
  Orchestrator alone owns `vercel.json`, commit, deploy (`/preview/<slug>`, noindex meta + X-Robots-Tag).
- The 13 previews already live join wave 1 as built; each gets the photo pass if it's still photo-free.

## 5. Outreach kit (per prospect)

Staged in `docs/prospects/STAGED-PAGES-WAVE-NN.{md,json}`, shown on the :8890 dashboard as "Page wave NN".

- `mms.png`: their hero in a phone frame, from the qa.js 390px shot, ≤ 1 MB (MMS-safe).
- **Text** (Travis's voice, 2–3 lines): who he is (Travis, Destin), "built you a free page using your
  photos", the link. Passes `gate.js` the same day.
- **Messenger variant** for Facebook-first businesses; **email variant** when a verified address exists
  (From anguisheh1 "Saltwater Studio", Gmail safe-compose rules).
- **Reply kit** (`TALKING-POINTS.md`): what's on the page and where each fact came from, the $297/mo
  scope list, the 4-month minimum line, open questions for the owner.
- Cadence: one follow-up on day 3 if no reply, then stop. Sends 8 AM–8 PM, opt-out honored (FTSA).
- Takedown within 24 h on request.
- `promote-wave.sh` extended for page waves (staged → current → archived).

## 6. Unchanged rules

Absence-claim ban + `outreach_guard` hook; sourced facts only (RECON.md, don't-publish list); review quotes
verbatim, never names; no prices in writing; Meta hosts blocked in all Playwright runs; iPhone check by
Travis; signed-out browsers for all rank/data pulls.

## Out of scope (YAGNI)

Shared component kit / templates (revisit only if 5/day can't hold the bar); preview-visit analytics;
automated sending of texts or Messenger; custom domains per preview.

## Success measures

5 pages/day shipped through all gates; reply rate per page wave vs. the audit-offer waves; first
$297/mo signups. Reviewed weekly in the Beat Last Week ledger.
