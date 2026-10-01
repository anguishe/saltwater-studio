# Free-Page Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the prospect pipeline from free-audit offers into finished free landing pages (real owner photos, $50k bar) for no-site/broken-site businesses, delivered by MMS text, 5 per day.

**Architecture:** Reuse the existing pipeline (`ledger.py` → `gate.js` → text waves → :8890 dashboard → `promote-wave.sh`) and the `premium-landing-page` skill. Add: a `--pages` pool mode, photo list/pick/fetch tooling, a Meta-guard allowance for one exact photo-URL snippet, an MMS screenshot script, page-wave fields on the dashboard, and the runbook + skill/memory policy changes. Then run wave 1 end to end.

**Tech Stack:** Python 3 (stdlib), Node + Playwright (`/home/angsec/Projects/watervue-events/node_modules/playwright`, real Chrome channel), POSIX sh, ImageMagick 7 (`magick`, `identify`), curl, static HTML on Vercel (saltwater-studio `public/preview/<slug>/`).

**Spec:** `docs/superpowers/specs/2026-10-01-free-page-pivot-design.md` (saltwater-studio repo). Read it before any task.

## Global Constraints

- No prices in any written copy (texts, emails, Messenger, pages). $297/mo and the 4-month minimum are spoken only, after a reply.
- Absence-claim ban: no copy says or implies "no website" / "couldn't find" (enforced by `outreach_guard.BANNED`); every text/email passes `node gate.js <file>` the same day.
- Text identity line: starts `Hi, Travis with Saltwater Studio in Destin.`; page-wave close: `If you like it, text me back and I'll walk you through getting it live. No worries either way.`
- Exactly one link per page-wave text: `https://saltwaterstudio.xyz/preview/<slug>`.
- Never customer/reviewer photos. PII gate (full-size look + OCR) on every pick before it ships.
- Meta: anguisheh1 Chrome `7b769056-f05a-4478-9949-e6f928a2bcda` only, ≤ 20 page loads/hr and ≤ 50/24h, one session at a time; FB photos only as fallback (< 5 usable from other sources), ~4 loads per business.
- All Playwright runs block Meta hosts with `--host-resolver-rules` (except the claude-in-chrome FB grab itself).
- Previews stay noindex (`/preview/(.*)` X-Robots-Tag in `vercel.json`); takedown within 24 h on request.
- Texts sent manually by Travis, 8 AM–8 PM; one follow-up on day 3, then stop.
- Files under `~/.claude/` and `docs/prospects/` are NOT in git: back up before editing (`cp f f.bak-2026-10-01`); only `public/preview/**`, `vercel.json`, and `docs/superpowers/**` get commits.

## Review Focus

- A JS call on a Facebook page that isn't a single-photo viewer, or any snippet other than the exact photo-URL one → must be denied (Task 1 demo asserts).
- A prospect who replied, won, or said no (dashboard log `replied`/`won`/`dead`) or is DNC/active-thread → must never re-enter the page pool (Task 2 test).
- A photo whose long side is < 1600 px → flagged `SOFT` so it never becomes the hero (Task 3 test).
- A preview slug that isn't deployed → `mms.js` exits non-zero instead of shipping a 404 screenshot; an oversized shot is re-compressed to ≤ 600 KB (Task 4 checks).
- A page-wave text with a second link, a non-preview domain, a price, or the old audit close → lint FAIL (Task 5 test).

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `~/.claude/hooks/meta_guard.py` | modify | caps 20/50; allow exact `PHOTO_JS` on FB photo-viewer tabs |
| `docs/prospects/ledger.py` | modify | `--pages` pool mode, `page_eligible()`, `closed_slugs()` |
| `docs/prospects/pipeline/test_pages.py` | create | self-check for the two functions above |
| `~/.claude/skills/premium-landing-page/scripts/owner-photos.js` | modify | list + 400px thumbs only; full-size URL per photo in `urls.json` |
| `~/.claude/skills/premium-landing-page/scripts/fetch-picks.sh` | create | download picks only, report px, `SOFT` flag, WebP 800/1600 |
| `~/.claude/skills/premium-landing-page/scripts/test-fetch-picks.sh` | create | self-check with local fixtures |
| `docs/prospects/pipeline/mms.js` | create | 390×844@2x JPEG ≤ 600 KB of the live preview |
| `docs/prospects/pipeline/top10-lint.py` | modify | `--pages` rules (one preview link, page close) |
| `docs/prospects/pipeline/wave-build.py` | modify | pass `preview_url`, `mms`, generated `followup` |
| `docs/prospects/pipeline/test_wave_build.py` | create | fixture check for page-wave fields + lint |
| `docs/prospects/dashboard/build.py` | modify | carry the 3 new fields into `top5` |
| `docs/prospects/dashboard/index.html` | modify | MMS thumb, Open preview, Save image, Copy follow-up |
| `docs/prospects/promote-wave.sh` | modify | `-` batch arg = text-only (page) wave |
| `~/.claude/skills/premium-landing-page/SKILL.md` | modify | photo-first heroes for all verticals, FB protocol, page-wave hand-off |
| `docs/prospects/PAGES-RUNBOOK.md` | create | the daily 5-page procedure, text templates, $297 talking points |
| `docs/prospects/README.md` | modify | top block points at PAGES-RUNBOOK |
| `/home/angsec/CLAUDE.md` + memories | modify | Meta rule v2, photo rule, pivot record |

---

### Task 1: Meta guard v2

**Files:**
- Modify: `~/.claude/hooks/meta_guard.py` (constants line ~19, docstring rule 1, `decide()` READS branch, `demo()`)

**Interfaces:**
- Produces: `PHOTO_JS` (exact string the FB grab must send via `javascript_tool`), caps `MAX_HOUR=20`, `MAX_DAY=50`. Task 6 runbook quotes `PHOTO_JS` verbatim.

- [ ] **Step 1: Back up**

```bash
cp ~/.claude/hooks/meta_guard.py ~/.claude/hooks/meta_guard.py.bak-2026-10-01
```

- [ ] **Step 2: Write the failing demo asserts**

In `demo()`, replace the transcript fixture write with one that also lists two photo tabs:

```python
    with open(tr, 'w') as f:  # json.dumps reproduces the transcript's escaping
        f.write(json.dumps({'text': '• tabId 7: "Travis | Facebook" ("https://www.facebook.com/Abadiemt")\n'
                                    '• tabId 8: "Super Dad" ("https://yoursuperdad.org/x")\n'
                                    '• tabId 11: "Photo" ("https://www.facebook.com/SomeBiz/photos/a.1/2/")\n'
                                    '• tabId 12: "Photos" ("https://www.facebook.com/SomeBiz/photos")\n'
                                    '• tabId 13: "Photo" ("https://www.facebook.com/photo/?fbid=9")'}) + '\n')
```

Right after the line `assert call('A', 'javascript_tool', {'tabId': 8, 'text': '1'}) is None`, add:

```python
    assert call('A', 'javascript_tool', {'tabId': 11, 'text': PHOTO_JS}) is None      # photo viewer + exact snippet
    assert call('A', 'javascript_tool', {'tabId': 13, 'text': PHOTO_JS}) is None      # /photo/?fbid= viewer
    assert call('A', 'javascript_tool', {'tabId': 11, 'text': 'document.body.innerText'})  # other JS -> deny
    assert call('A', 'javascript_tool', {'tabId': 12, 'text': PHOTO_JS})              # photos grid -> deny
    assert call('A', 'javascript_tool', {'tabId': 7, 'text': PHOTO_JS})               # profile page -> deny
    assert call('A', 'get_page_text', {'tabId': 11})                                  # other reads still denied
```

- [ ] **Step 3: Run it, confirm FAIL**

Run: `python3 ~/.claude/hooks/meta_guard.py demo`
Expected: `NameError: name 'PHOTO_JS' is not defined`

- [ ] **Step 4: Implement**

Change the constants line to:

```python
MAX_HOUR, MAX_DAY, LOCK_MIN = 20, 50, 15  # v2 2026-10-01 (Travis): was 12/30; raised for the free-page FB photo fallback
```

Add below `READS = {...}`:

```python
# v2 2026-10-01: the free-page FB photo fallback may run THIS exact snippet on a single-photo viewer tab. It returns
# the full-size image URLs, which we then curl from fbcdn. Any other JS, or this one anywhere else, stays denied.
PHOTO_JS = "[...document.images].filter(i=>i.naturalWidth>=600).map(i=>i.currentSrc).join('\\n')"
PHOTO_PAGE = re.compile(r'^/(photo(\.php)?/?$|[^/]+/photos/.)')
```

In `decide()`, replace

```python
        if tool in READS:
```

with

```python
        if (tool == 'javascript_tool' and (i.get('text') or '').strip() == PHOTO_JS
                and PHOTO_PAGE.search(urlparse(target if '://' in target else 'https://' + target).path)):
            continue
        if tool in READS:
```

Update docstring rule 1 to: `1. screenshots + clicks only: no JS, page-text/DOM reads, form fills or uploads (one exception since 2026-10-01: PHOTO_JS on a single-photo viewer tab, for the free-page photo fallback)`.

- [ ] **Step 5: Run it, confirm PASS**

Run: `python3 ~/.claude/hooks/meta_guard.py demo`
Expected: `meta_guard demo: ok`

- [ ] **Step 6: Live hook smoke test (no Meta load)**

Run: `echo '{"session_id":"x","tool_name":"mcp__claude-in-chrome__navigate","tool_input":{"url":"https://example.com"}}' | python3 ~/.claude/hooks/meta_guard.py; echo "exit $?"`
Expected: no output, `exit 0`.

- [ ] **Step 7: Update the written rule**

In `/home/angsec/CLAUDE.md`, replace the bullet starting `**Meta (Facebook / Instagram): never scrape (2026-09-11).**` with:

```markdown
- **Meta (Facebook / Instagram): no scraping (2026-09-11), photo fallback allowed (2026-10-01).** Meta locked Travis's
  account after heavy browser automation. On Meta sites: screenshots + clicks only, only the anguisheh1 Chrome
  (`7b769056`), ≤20 page loads/hour and ≤50/day across all sessions, one session at a time. One exception: for
  free-page builds, when Google/ordering sites give < 5 usable photos, open the business Page's photos, screenshot to
  pick, open each pick and run the exact `PHOTO_JS` snippet, curl the fbcdn URL, get out (~4 loads per business).
  Enforced by `~/.claude/hooks/meta_guard.py`.
```

In `~/.claude/projects/-home-angsec/memory/facebook-scraping-workarounds.md`, append:

```markdown
**2026-10-01 v2 (Travis: "loosen up ... find them, download them and get out"):** caps 20/hr, 50/24h. Free-page photo
fallback only: Page → Photos (screenshot, pick ≤ 6) → open each pick → `javascript_tool` with the exact `PHOTO_JS` from
meta_guard.py → `curl` the fbcdn URL → leave. Only when Google By-owner + ordering/booking sites give < 5 usable photos.
Still: anguisheh1 Chrome only, one session, no other DOM reads. A second lock would kill Messenger as an outreach channel.
```

Update its MEMORY.md line to: `- [Facebook scraping RETIRED, photo fallback v2](facebook-scraping-workarounds.md) — 9/11 lock; screenshots only EXCEPT 10/01 free-page photo grab (PHOTO_JS, 20/hr 50/day, ~4 loads/business); Chrome 7b769056 only, 1 session`.

- [ ] **Step 8: No commit** (outside any repo; `.bak` file is the rollback).

---

### Task 2: `ledger.py --pages` pool

**Files:**
- Modify: `docs/prospects/ledger.py`
- Create: `docs/prospects/pipeline/test_pages.py`

**Interfaces:**
- Produces: `ledger.page_eligible(state: str|None) -> bool`, `ledger.closed_slugs(path: str = <dashboard/state.json>) -> set[str]`, `ledger.CLOSED = {"dead","won","replied"}`, CLI `python3 ledger.py --pages` → `pipeline/pages-pool.json` (list of pool dicts + `contacted` field: why-string or `""`).

- [ ] **Step 1: Back up**

```bash
cd ~/Projects/saltwater-studio/docs/prospects && cp ledger.py ledger.py.bak-2026-10-01
```

- [ ] **Step 2: Write the failing test** — `pipeline/test_pages.py`

```python
# Self-check for ledger.py --pages (free-page pivot, 2026-10-01). Run: python3 pipeline/test_pages.py
import json, os, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import ledger

for s in ["none", "none found", "facebook", "dead-nxdomain", "dead-ssl", "parked/placeholder", "outdated / not mobile",
          "broken-500", "dead-wix-disconnected", "none (meta-refresh to facebook", "for-sale/parked (godaddy"]:
    assert ledger.page_eligible(s), s
for s in ["ok", "outdated", "current (wix)", "dated (footer 2015)", "weak", "thin (godaddy website builder)", "", None]:
    assert not ledger.page_eligible(s), s

assert ledger.CLOSED == {"dead", "won", "replied"}
f = os.path.join(tempfile.mkdtemp(), "state.json")
json.dump({"a-b": {"log": [{"a": "texted", "t": 1}]}, "c-d": {"log": [{"a": "texted", "t": 1}, {"a": "dead", "t": 2}]},
           "e-f": {"log": [{"a": "replied", "t": 1}]}, "g-h": {"log": [{"a": "won", "t": 1}]}, "i-j": {"log": []}}, open(f, "w"))
assert ledger.closed_slugs(f) == {"c-d", "e-f", "g-h"}
assert ledger.closed_slugs(f + ".missing") == set()
print("test_pages: ok")
```

- [ ] **Step 3: Run, confirm FAIL**

Run: `python3 pipeline/test_pages.py`
Expected: `AttributeError: module 'ledger' has no attribute 'page_eligible'`

- [ ] **Step 4: Implement** — in `ledger.py`, after the `ACTIVE = {...}` line add:

```python
# Free-page waves (2026-10-01 spec): no site / broken site only. "outdated" or "ok" sites that work are OUT.
PAGE_OK = re.compile(r"none|facebook|dead|down|nxdomain|ssl|parked|placeholder|blank|expired|unregistered|broken"
                     r"|for-sale|not mobile|disconnected|not.found|\b40\d|\b50\d", re.I)
CLOSED = {"dead", "won", "replied"}  # said no, signed, or mid-conversation: never in a cold page wave

def page_eligible(state):
    return bool(PAGE_OK.search(state or ""))

def closed_slugs(path=None):
    path = path or P("dashboard", "state.json")
    s = json.load(open(path)) if os.path.exists(path) else {}
    return {k for k, v in s.items() if any(e.get("a") in CLOSED for e in v.get("log", []))}
```

Update the module docstring usage block with: `python3 ledger.py --pages          # free-page pool: no/broken site, contacted OK, minus replied/won/dead/DNC`.

In `main()`, after `emails, phones, logged, why = contacted()` add:

```python
    pages = "--pages" in sys.argv
    closed = closed_slugs()
```

In the pool loop replace

```python
        if (em and em in emails) or (d and d in phones): continue
```

with

```python
        if pages:
            if em in ACTIVE or not page_eligible(r.get("website_state") or r.get("domain_state")): continue
        elif (em and em in emails) or (d and d in phones): continue
```

and replace `if slug in logged: continue` with `if slug in (closed if pages else logged): continue`.

Add `contacted=why.get(em) or why.get(d) or ""` to the `pool.append(dict(...))` call. Replace the sort/dump/show lines with:

```python
    pool.sort(key=(lambda p: -p["score"]) if pages else (lambda p: (-bool(p["email"]), -p["score"])))
    out = "pages-pool.json" if pages else "pool.json"
    json.dump(pool, open(P("pipeline", out), "w"), indent=1)
    show = pool if "--all" in sys.argv else (pool[:40] if pages else [p for p in pool if p["email"]][:40])
```

and in the summary print change `-> pipeline/pool.json` to `-> pipeline/{out}`. In the row print, append `{p['contacted'][:18]}`.

- [ ] **Step 5: Run test, confirm PASS**

Run: `python3 pipeline/test_pages.py` → `test_pages: ok`

- [ ] **Step 6: Integration check**

Run: `python3 ledger.py --pages | head -5 && python3 ledger.py | head -1 && python3 -c "import json;p=json.load(open('pipeline/pages-pool.json'));print(len(p), sum(1 for x in p if x['contacted']))"`
Expected: pages summary line + rows; the default mode still prints `contacted: … pool: 422 rows` (unchanged); pages pool count > 100 with some contacted rows. Also `grep -c -i 'happypour\|crestviewfence' pipeline/pages-pool.json` → `0`.

- [ ] **Step 7: No commit** (`docs/prospects/` is untracked by design).

---

### Task 3: Photo list → pick → fetch tooling

**Files:**
- Modify: `~/.claude/skills/premium-landing-page/scripts/owner-photos.js`
- Create: `~/.claude/skills/premium-landing-page/scripts/fetch-picks.sh`, `.../scripts/test-fetch-picks.sh`

**Interfaces:**
- Produces: `node owner-photos.js <phone> <dir> [max=40]` → `<dir>/thumbs/owner-NN.jpg` (400px) + `<dir>/urls.json` `{name, at, source, saved:[{n, thumb, full}]}`; no full-size downloads. `fetch-picks.sh <origDir> <imgDir> name=url ...` → `<origDir>/<name>.<ext>` (original, private, for PII check) + `<imgDir>/<name>-800.webp`, `<imgDir>/<name>-1600.webp`; stdout one line per pick: `<name> <W>x<H> OK|SOFT`.

- [ ] **Step 1: Back up**

```bash
cd ~/.claude/skills/premium-landing-page/scripts && cp owner-photos.js owner-photos.js.bak-2026-10-01
```

- [ ] **Step 2: Write the failing test** — `test-fetch-picks.sh`

```sh
#!/bin/sh
# Self-check for fetch-picks.sh with local fixtures (file:// URLs). Run: sh test-fetch-picks.sh
set -e
H=$(cd "$(dirname "$0")" && pwd); T=$(mktemp -d)
magick -size 2000x1500 gradient:navy-gold "$T/big.jpg"
magick -size 900x600 gradient:red-blue "$T/small.jpg"
out=$(sh "$H/fetch-picks.sh" "$T/orig" "$T/img" hero="file://$T/big.jpg" card="file://$T/small.jpg")
echo "$out" | grep -qx 'hero 2000x1500 OK'  || { echo "FAIL hero line: $out"; exit 1; }
echo "$out" | grep -qx 'card 900x600 SOFT'  || { echo "FAIL soft line: $out"; exit 1; }
[ "$(identify -format %w "$T/img/hero-800.webp")" = 800 ]   || { echo "FAIL 800w"; exit 1; }
[ "$(identify -format %w "$T/img/hero-1600.webp")" = 1600 ] || { echo "FAIL 1600w"; exit 1; }
[ "$(identify -format %w "$T/img/card-1600.webp")" = 900 ]  || { echo "FAIL no-upscale"; exit 1; }
[ -f "$T/orig/hero.jpg" ] || { echo "FAIL original kept"; exit 1; }
if sh "$H/fetch-picks.sh" "$T/orig" "$T/img" bad="file://$T/nope.jpg" 2>/dev/null; then echo "FAIL missing url should exit non-zero"; exit 1; fi
rm -rf "$T"; echo "test-fetch-picks: ok"
```

- [ ] **Step 3: Run, confirm FAIL**

Run: `sh ~/.claude/skills/premium-landing-page/scripts/test-fetch-picks.sh`
Expected: non-zero exit (fetch-picks.sh not found).

- [ ] **Step 4: Implement `fetch-picks.sh`**

```sh
#!/bin/sh
# Download ONLY the picked photos at full size, report real pixels, export responsive WebP (EXIF/GPS stripped).
# usage: fetch-picks.sh <origDir> <imgDir> name=url [name=url ...]
#   origDir = private (e.g. ~/Projects/<slug>-poc/_inbox/photos) for the full-size PII look + OCR
#   imgDir  = public/preview/<slug>/img
# prints "<name> <W>x<H> OK|SOFT"   SOFT = long side < 1600px: OK for a card, never the hero
set -e
ORIG=$1; IMG=$2; shift 2
mkdir -p "$ORIG" "$IMG"
for kv in "$@"; do
  n=${kv%%=*}; u=${kv#*=}
  tmp=$(mktemp)
  curl -fsSL --max-time 30 -o "$tmp" "$u"
  ext=$(identify -format '%m' "$tmp[0]" | tr 'A-Z' 'a-z'); [ "$ext" = jpeg ] && ext=jpg
  mv "$tmp" "$ORIG/$n.$ext"
  wh=$(identify -format '%w %h' "$ORIG/$n.$ext[0]"); w=${wh% *}; h=${wh#* }
  for s in 800 1600; do magick "$ORIG/$n.$ext[0]" -auto-orient -strip -resize "${s}x>" -quality 78 "$IMG/$n-$s.webp"; done
  long=$w; [ "$h" -gt "$w" ] && long=$h
  echo "$n ${w}x${h} $([ "$long" -ge 1600 ] && echo OK || echo SOFT)"
done
```

- [ ] **Step 5: Run test, confirm PASS**

Run: `sh ~/.claude/skills/premium-landing-page/scripts/test-fetch-picks.sh` → `test-fetch-picks: ok`

- [ ] **Step 6: Make `owner-photos.js` list-only**

Update the header comment to:

```js
// List a business's OWNER-uploaded Google Maps photos (By owner tab). Signed-out real Chrome, read-only.
// usage: node owner-photos.js <phone 10 digits> <outDir> [max=40]
// Writes <outDir>/thumbs/owner-NN.jpg (400px, for picking) + urls.json {saved:[{n, thumb, full}]}.
// Downloads NO full-size photos: pick <= 6 from the thumbs, then fetch-picks.sh the chosen `full` URLs.
// Never pulls customer photos (prints error 'no By owner tab' and writes nothing if the tab is missing).
```

Replace the download loop (from `const list = [...seen]...` through the `fs.writeFileSync(path.join(out, 'urls.json')...` line) with:

```js
  const list = [...seen].slice(0, +max), saved = [];
  fs.mkdirSync(path.join(out, 'thumbs'), { recursive: true });
  for (let i = 0; i < list.length; i++) {
    const n = String(i + 1).padStart(2, '0'), r = await ctx.request.get(list[i] + '=w400-h400-k-no');
    if (r.ok()) { const f = path.join(out, 'thumbs', `owner-${n}.jpg`); fs.writeFileSync(f, await r.body()); saved.push({ n, thumb: f, full: list[i] + '=w2400-h2400-k-no' }); }
  }
  fs.writeFileSync(path.join(out, 'urls.json'), JSON.stringify({ name, at: new Date().toISOString(), source: 'Google Maps By owner tab', saved }, null, 1));
```

Also change its launch `args` to block every Meta host: `'--host-resolver-rules=MAP facebook.com ~NOTFOUND, MAP *.facebook.com ~NOTFOUND, MAP *.fbcdn.net ~NOTFOUND, MAP *.instagram.com ~NOTFOUND, MAP *.messenger.com ~NOTFOUND'`.

- [ ] **Step 7: Live check on a known business**

Run (Domo Izakaya had 17 owner photos on 10/01; phone from its RECON):
```bash
PH=$(grep -o -m1 '(\?[0-9]\{3\})\?[ -.]\?[0-9]\{3\}[-.][0-9]\{4\}' ~/Projects/domo-izakaya-poc/_inbox/RECON.md | tr -dc 0-9)
node ~/.claude/skills/premium-landing-page/scripts/owner-photos.js "$PH" /tmp/claude-1000/op-check 8
ls /tmp/claude-1000/op-check/thumbs | wc -l; python3 -c "import json;d=json.load(open('/tmp/claude-1000/op-check/urls.json'));print(d['saved'][0]['full'][-20:])"
identify -format '%w\n' /tmp/claude-1000/op-check/thumbs/owner-01.jpg
```
Expected: JSON line with `found` ≥ 8, `saved: 8`; 8 thumbs; `full` ends `=w2400-h2400-k-no`; thumb width ≤ 400. Then `rm -rf /tmp/claude-1000/op-check`.

- [ ] **Step 8: No commit** (outside any repo).

---

### Task 4: MMS image script

**Files:**
- Create: `docs/prospects/pipeline/mms.js`

**Interfaces:**
- Produces: `node pipeline/mms.js <slug>` → `docs/prospects/claim-audit/evidence/page-<slug>-mms.jpg` (780×1688, ≤ 600 KB); stdout `{"out":"claim-audit/evidence/page-<slug>-mms.jpg","kb":N}`; exit 1 if the preview isn't live (non-2xx). Task 5's `mms` field is that `out` path.

- [ ] **Step 1: Write the checks first (they fail: script missing)**

```bash
cd ~/Projects/saltwater-studio/docs/prospects
node pipeline/mms.js domo-izakaya; echo "exit $?"
node pipeline/mms.js no-such-preview-xyz; echo "exit $?"
```
Expected now: `Cannot find module` both times.

- [ ] **Step 2: Implement `pipeline/mms.js`**

```js
// MMS image for a page wave: phone-size shot of the LIVE preview hero (what the owner sees first).
// usage: node pipeline/mms.js <slug>   -> claim-audit/evidence/page-<slug>-mms.jpg (<= 600 KB; dashboard serves that dir)
const { chromium } = require('/home/angsec/Projects/watervue-events/node_modules/playwright');
const { execFileSync } = require('child_process'), fs = require('fs'), path = require('path');
const slug = process.argv[2];
if (!/^[a-z0-9-]+$/.test(slug || '')) { console.error('usage: node mms.js <slug>'); process.exit(2); }
const ROOT = path.join(__dirname, '..'), out = path.join(ROOT, 'claim-audit', 'evidence', `page-${slug}-mms.jpg`), png = out.replace(/jpg$/, 'png');
const META = 'MAP facebook.com ~NOTFOUND, MAP *.facebook.com ~NOTFOUND, MAP *.fbcdn.net ~NOTFOUND, MAP *.instagram.com ~NOTFOUND, MAP *.messenger.com ~NOTFOUND';
(async () => {
  const b = await chromium.launch({ headless: false, channel: 'chrome', args: [`--host-resolver-rules=${META}`] });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  const p = await ctx.newPage();
  const r = await p.goto(`https://saltwaterstudio.xyz/preview/${slug}`, { waitUntil: 'load' });
  if (!r || !r.ok()) { await b.close(); throw new Error(`preview not live: HTTP ${r && r.status()}`); }
  await p.waitForTimeout(4000); // loader + hero reveal
  await p.screenshot({ path: png });
  await b.close();
  for (const q of [82, 72, 62, 52]) { execFileSync('magick', [png, '-strip', '-quality', String(q), out]); if (fs.statSync(out).size <= 600e3) break; }
  fs.unlinkSync(png);
  const kb = Math.round(fs.statSync(out).size / 1024);
  if (kb > 600) throw new Error(`still ${kb} KB at q52`);
  console.log(JSON.stringify({ out: path.relative(ROOT, out), kb }));
})().catch(e => { console.error(e.message); process.exit(1); });
```

- [ ] **Step 3: Run checks, confirm PASS**

```bash
node pipeline/mms.js domo-izakaya; echo "exit $?"; identify -format '%wx%h %b\n' claim-audit/evidence/page-domo-izakaya-mms.jpg
node pipeline/mms.js no-such-preview-xyz; echo "exit $?"
```
Expected: `{"out":"claim-audit/evidence/page-domo-izakaya-mms.jpg","kb":<=600}`, `exit 0`, `780x1688 …`; second run `preview not live: HTTP 404`, `exit 1`. Look at the image once at ≤ 260px (`magick … -resize 260x /tmp/claude-1000/mms-look.jpg`) to confirm the hero rendered (not the loader). If the loader shows, raise the wait to 6000 and re-run.

- [ ] **Step 4: No commit** (untracked dir).

---

### Task 5: Page-wave text lint + wave builder

**Files:**
- Modify: `docs/prospects/pipeline/top10-lint.py`, `docs/prospects/pipeline/wave-build.py`
- Create: `docs/prospects/pipeline/test_wave_build.py`

**Interfaces:**
- Consumes: Task 4's `mms` path string.
- Produces: `python3 pipeline/top10-lint.py TEXTS.json --pages` (exit 0/1); wave items may carry `preview_url`, `mms`; `wave-build.py` writes each into the item and adds `followup` = `FOLLOW.format(name=…, url=…)` when `preview_url` is set. Task 6 reads `preview_url`, `mms`, `followup` from `TOP5-TEXTS.json` items.

- [ ] **Step 1: Back up**

```bash
cd ~/Projects/saltwater-studio/docs/prospects/pipeline && cp top10-lint.py top10-lint.py.bak-2026-10-01 && cp wave-build.py wave-build.py.bak-2026-10-01
```

- [ ] **Step 2: Write the failing test** — `pipeline/test_wave_build.py`

```python
# Self-check: page-wave texts lint + wave-build fields (2026-10-01). Run: python3 pipeline/test_wave_build.py
import json, os, subprocess, sys, tempfile
H = os.path.dirname(os.path.abspath(__file__)); T = tempfile.mkdtemp()
URL = "https://saltwaterstudio.xyz/preview/acme-fence"
GOOD = ("Hi, Travis with Saltwater Studio in Destin. 140 Google reviews at 4.9 for fencing is hard to earn, so I built "
        f"Acme Fence a free website preview using photos from your Google listing:\n\n{URL}\n\n"
        "If you like it, text me back and I'll walk you through getting it live. No worries either way.")
lint = lambda texts: subprocess.run([sys.executable, os.path.join(H, "top10-lint.py"), w(texts), "--pages"], capture_output=True, text=True)
def w(obj, name="t.json"):
    p = os.path.join(T, name); json.dump(obj, open(p, "w")); return p
assert lint({"acme-fence": GOOD}).returncode == 0, lint({"acme-fence": GOOD}).stdout
for bad, why in [(GOOD.replace(URL, URL + " and www.acme.com"), "second domain"),
                 (GOOD.replace(URL, "https://acme.lovable.app"), "non-preview link"),
                 (GOOD.replace("free website", "$0 website"), "price"),
                 (GOOD.replace(URL, URL + "\n" + URL), "two preview links")]:
    r = lint({"x": bad}); assert r.returncode == 1, why
# old audit wave still lints the old way (no --pages): a link is a FAIL there
r = subprocess.run([sys.executable, os.path.join(H, "top10-lint.py"), w({"acme-fence": GOOD})], capture_output=True, text=True)
assert r.returncode == 1 and "link/domain" in r.stdout
items = {"title": "Page wave 99", "intro": "test", "scope": "test", "near_misses": [], "send_notes": [],
         "items": [{"rank": 1, "slug": "acme-fence", "name": "Acme Fence", "phone": "(850) 555-0100", "why": "w", "checks": [],
                    "verified_at": "2026-10-01T12:00:00Z", "rechecked_at": "2026-10-01T12:00:00Z", "call_fallback": "call",
                    "preview_url": URL, "mms": "claim-audit/evidence/page-acme-fence-mms.jpg"}]}
out = os.path.join(T, "STAGED")
subprocess.run([sys.executable, os.path.join(H, "wave-build.py"), w(items, "i.json"), w({"acme-fence": GOOD}, "x.json"), "w99", out], check=True)
it = json.load(open(out + ".json"))["items"][0]
assert it["preview_url"] == URL and it["mms"].endswith("acme-fence-mms.jpg")
assert URL in it["followup"] and "Acme Fence" in it["followup"] and "$" not in it["followup"]
md = open(out + ".md").read()
assert "1 preview link" in md and "page-acme-fence-mms.jpg" in md and "Day-3 follow-up" in md
print("test_wave_build: ok")
```

- [ ] **Step 3: Run, confirm FAIL**

Run: `cd ~/Projects/saltwater-studio/docs/prospects && python3 pipeline/test_wave_build.py`
Expected: AssertionError on the first lint (page close / link rules don't exist yet).

- [ ] **Step 4: Implement lint `--pages`** — in `top10-lint.py` replace `T = json.load(open(sys.argv[1]))` with:

```python
PAGES = '--pages' in sys.argv  # free-page wave: exactly one preview link, page close
T = json.load(open([a for a in sys.argv[1:] if a != '--pages'][0]))
PREVIEW = re.compile(r'https://saltwaterstudio\.xyz/preview/[a-z0-9-]+')
CLOSE = ("If you like it, text me back and I'll walk you through getting it live. No worries either way." if PAGES
         else "I'm doing free web-presence audits this week, plain text. Want it here? No worries either way.")
```

Replace the link and close checks with:

```python
    rest = PREVIEW.sub('', t) if PAGES else t
    if re.search(r'https?://|www\.|\b[a-z0-9-]+\.(com|net|org|xyz|us|biz|co|app)\b', rest, re.I): probs.append('link/domain')
    if PAGES and len(PREVIEW.findall(t)) != 1: probs.append('needs exactly 1 preview link')
    if not t.startswith('Hi, Travis with Saltwater Studio in Destin.'): probs.append('identity line')
    if not t.endswith(CLOSE): probs.append('close')
```

- [ ] **Step 5: Implement wave-build fields** — in `wave-build.py`:

After the `CLOSE = ...` line add:

```python
FOLLOW = "Hi, Travis with Saltwater Studio again. Making sure the {name} preview came through: {url} No worries either way."
```

In the `out.append({...})` dict add: `'preview_url': it.get('preview_url'), 'mms': it.get('mms'), 'followup': FOLLOW.format(name=it['name'], url=it['preview_url']) if it.get('preview_url') else None,`

Replace the characters line with:

```python
    md.append(f"\n*{len(i['text'])} characters, {len(i['text'].split(chr(10)+chr(10)))} paragraphs, {'1 preview link' if i['preview_url'] else 'no links'}.*\n")
    if i['preview_url']:
        md.append(f"- **Preview:** {i['preview_url']} · **MMS image:** `{i['mms']}` (attach to the text / Messenger)\n")
        md.append(f"**Day-3 follow-up (only if no reply):**\n\n> {i['followup']}\n")
```

- [ ] **Step 6: Run test, confirm PASS**

Run: `python3 pipeline/test_wave_build.py` → `test_wave_build: ok`

- [ ] **Step 7: Regression: old wave still lints**

Run: `python3 -c "import json;d=json.load(open('TOP5-TEXTS.json'));json.dump({str(i['rank']):i['text'] for i in d['items']},open('/tmp/claude-1000/w04.json','w'))" && python3 pipeline/top10-lint.py /tmp/claude-1000/w04.json | tail -3`
Expected: same PASS lines as before the change.

- [ ] **Step 8: No commit** (untracked dir).

---

### Task 6: Dashboard page-wave card + text-only promote

**Files:**
- Modify: `docs/prospects/dashboard/build.py:165`, `docs/prospects/dashboard/index.html` (CSS block, `detail()` t5 branch, `copy()` line 340), `docs/prospects/promote-wave.sh`

**Interfaces:**
- Consumes: `preview_url`, `mms`, `followup` from Task 5 items.
- Produces: `./promote-wave.sh - NN` (text-only promote); dashboard card shows MMS thumb + buttons.

- [ ] **Step 1: Back up**

```bash
cd ~/Projects/saltwater-studio/docs/prospects && for f in dashboard/build.py dashboard/index.html promote-wave.sh; do cp $f $f.bak-2026-10-01; done
```

- [ ] **Step 2: Write the failing check (scratch copy, never the live board)**

```bash
S=/tmp/claude-1000/board-check; rm -rf $S; cp -r ~/Projects/saltwater-studio/docs/prospects $S && cd $S
python3 pipeline/wave-build.py <(python3 -c "import json;print(json.dumps({'title':'Page wave 05','intro':'t','scope':'page wave 05','near_misses':[],'send_notes':[],'items':[{'rank':1,'slug':'acme','name':'Acme Fence','phone':'(850) 555-0100','why':'w','checks':[],'verified_at':'2026-10-01T12:00:00Z','rechecked_at':'2026-10-01T12:00:00Z','call_fallback':'c','preview_url':'https://saltwaterstudio.xyz/preview/acme','mms':'claim-audit/evidence/page-acme-mms.jpg'}]}))") <(echo '{"acme":"Hi, Travis with Saltwater Studio in Destin. t"}') w05 STAGED-TEXTS-WAVE-05
rm -f STAGED-BATCH-14.md
./promote-wave.sh - 05; echo "exit $?"
python3 -c "import json;p=[x for x in json.load(open('dashboard/data.json')) if x.get('top5',{}).get('preview_url')];print(len(p), p[0]['top5']['followup'][:40])"
```
Expected now: `missing STAGED-BATCH--.md` and `exit 1`.

- [ ] **Step 3: Implement `promote-wave.sh` text-only mode**

Update the usage comment: add `#   ./promote-wave.sh - 05   text-only (free-page) wave: no email batch`. Replace the file-check line and the batch moves:

```sh
[ "$B" = - ] && NEED="STAGED-TEXTS-WAVE-$W.json STAGED-TEXTS-WAVE-$W.md TOP5-TEXTS.json" || NEED="STAGED-BATCH-$B.md STAGED-TEXTS-WAVE-$W.json STAGED-TEXTS-WAVE-$W.md TOP5-TEXTS.json"
for f in $NEED; do [ -f "$f" ] || { echo "missing $f"; exit 1; }; done
[ "$B" = - ] || [ ! -e "SEND-BATCH-$B.md" ] || { echo "SEND-BATCH-$B.md already exists, refusing"; exit 1; }
[ ! -e "TEXTS-WAVE-$PREV.json" ] || { echo "TEXTS-WAVE-$PREV.json already exists, refusing"; exit 1; }
```

and wrap the `mv STAGED-BATCH-$B.md SEND-BATCH-$B.md` line plus the BATCH_STATUS python heredoc in `if [ "$B" != - ]; then … fi`.

- [ ] **Step 4: Implement dashboard fields**

`dashboard/build.py:165` — add `"preview_url", "mms", "followup"` to the tuple of copied keys.

`dashboard/index.html`:
- CSS (next to `.shots` rules): `.pagekit{display:flex;gap:14px;align-items:flex-start;margin:14px 0}.pagekit img{width:120px;border:1px solid var(--rule);border-radius:var(--r-s);display:block}`
- `copy()` line 340 → `const v = field === "text" ? textOf(SEL) : field === "followup" ? SEL.top5?.followup : SEL[field];`
- In `detail()`, right after the `h += \`<div class="compose">…</div></div>\`;` statement of the t5 branch, add:

```js
    if (t5.preview_url) h += `<div class="pagekit">${t5.mms ? `<a href="/${esc(t5.mms)}" download><img src="/${esc(t5.mms)}" alt="MMS image of the ${esc(p.name)} preview"></a>` : ""}<div>
        <a class="btn sm go" href="${esc(t5.preview_url)}" target="_blank" rel="noopener">Open their preview</a>
        ${t5.mms ? `<a class="btn sm" href="/${esc(t5.mms)}" download>Save MMS image</a>` : ""}
        ${t5.followup ? `<button class="btn sm" data-copy="followup">Copy day-3 follow-up</button>` : ""}
        <p class="hint">Attach the image to the text (or Messenger), then send. Follow-up only if no reply by day 3.</p></div></div>`;
```

- [ ] **Step 5: Re-run Step 2 in a fresh scratch copy, confirm PASS**

Expected: promote prints the build summary, `exit 0`; final line `1 Hi, Travis with Saltwater Studio again. M`. Then open the scratch board: `cd $S/dashboard && python3 -m http.server 8899 &` → load `http://127.0.0.1:8899/#acme` in Playwright at 1280px, screenshot at ≤ 260px wide, confirm the MMS block + 3 buttons render (image itself is a broken icon in scratch; fine). Kill the server, `rm -rf $S`.

- [ ] **Step 6: Live board still builds**

Run: `cd ~/Projects/saltwater-studio/docs/prospects && python3 dashboard/build.py` → same `prospects -> data.json` summary as before; `curl -s 127.0.0.1:8890/ | grep -c pagekit` ≥ 1.

- [ ] **Step 7: No commit** (untracked dir).

---

### Task 7: Policy — skill, runbook, memories

**Files:**
- Modify: `~/.claude/skills/premium-landing-page/SKILL.md` (Phase 1 items 5–6, Phase 3 "No images unless approved", hand-off item 4)
- Create: `docs/prospects/PAGES-RUNBOOK.md`
- Modify: `docs/prospects/README.md` (new top block), memories `restaurant-hero-photos.md`, `premium-landing-page-bar.md`, `prospect-poc-previews.md`, `saltwater-prospect-outreach.md`, `MEMORY.md`

**Interfaces:**
- Consumes: `PHOTO_JS` (Task 1), `ledger.py --pages` (Task 2), `owner-photos.js`/`fetch-picks.sh` (Task 3), `mms.js` (Task 4), lint `--pages` + wave fields (Task 5), `promote-wave.sh -` (Task 6).

- [ ] **Step 1: Back up** `cp ~/.claude/skills/premium-landing-page/SKILL.md ~/.claude/skills/premium-landing-page/SKILL.md.bak-2026-10-01`

- [ ] **Step 2: SKILL.md** — replace Phase 1 items 5 and 6 with:

```markdown
5. **Real photos lead every page, every vertical (Travis 2026-10-01).** Hero = the single most authentic, hook-worthy
   real photo of the business (work, room, storefront, product, team at work); the 3D/WebGL piece becomes a secondary
   accent (overlay or later section), never a substitute. Standing go-ahead for owner photos; no per-business OK needed.
   - **Sources, in order:** Google Maps "By owner" → their own booking/ordering/menu pages, Yelp "from the business",
     Nextdoor business page → Facebook only if those give < 5 usable photos.
   - **List, pick, then download.** `scripts/owner-photos.js <phone> <dir>` writes 400px thumbs + `urls.json` only. Look at
     thumbs one at a time at ≤ 260px (image-token guard; no contact sheets), pick ≤ 6, then
     `scripts/fetch-picks.sh ~/Projects/<slug>-poc/_inbox/photos public/preview/<slug>/img hero=<full url> …`.
     `SOFT` (< 1600px long side) = card only, never hero. Portrait heroes preferred for phones.
   - **Facebook fallback** (claude-in-chrome, anguisheh1 Chrome `7b769056` only, ~4 loads): Page → Photos tab
     (screenshot, pick) → open each pick → `javascript_tool` with EXACTLY
     `[...document.images].filter(i=>i.naturalWidth>=600).map(i=>i.currentSrc).join('\n')` → pass that URL to
     fetch-picks.sh → leave. Any other read on Meta is denied by meta_guard. Never Instagram.
   - **Never** customer/reviewer photos. PII gate on every pick at full size (`_inbox/photos/`): look + OCR; blur or skip
     plates, house numbers, non-owner faces, paperwork. Log each photo's source URL + date in RECON.md.
6. Output: `<name>-800.webp` / `<name>-1600.webp` in `public/preview/<slug>/img/`, `<img srcset>` with width/height,
   hero `<link rel="preload">`, alt text describes what is actually in the photo.
```

In Phase 3 replace `No other CDNs; no images unless approved.` with `No other CDNs. Images = the picks from Phase 1 only.`
In the hand-off item, append: `Free-page waves: then run docs/prospects/PAGES-RUNBOOK.md steps 6–9 (MMS image, text, lint, gate, stage).`

- [ ] **Step 3: Write `docs/prospects/PAGES-RUNBOOK.md`**

```markdown
# Free-page waves: daily runbook (2026-10-01)

Spec: ~/Projects/saltwater-studio/docs/superpowers/specs/2026-10-01-free-page-pivot-design.md. 5 finished pages a day.

1. **Pool:** `python3 ledger.py --pages` → `pipeline/pages-pool.json` (no/broken site; contacted OK; replied/won/dead/DNC out).
2. **Shortlist 8:** top by score, skip chains, ≤ 1 restaurant (owner-run, strong reviews). Probe `<slug>.lovable.app`
   (concatenated + hyphenated) and flag hits (still include; lead authentic, never mention the vendor).
3. **Verify (same day):** write a `DAILY-PAGES-YYYY-MM-DD.md` with `## N. Name (City)` sections (phone in the heading),
   run `node gate.js DAILY-PAGES-YYYY-MM-DD.md`; any confirmed live site = drop. Line type: live lookup, `pipeline/lines.py`.
   Keep top 5 + 3 alternates, each with evidence links.
4. **Recon + photos:** per prospect `~/Projects/<slug>-poc/_inbox/RECON.md` (premium-landing-page Phase 1) and photos via
   owner-photos.js → pick ≤ 6 → fetch-picks.sh → PII gate. Facebook fallback runs serially in this session (one Meta
   session at a time) BEFORE builders start.
5. **Build:** 5 fresh `general-purpose` agents in the background, one page each (skill Phase 2–4, own QA port 8761–8765).
   Orchestrator: vercel.json rewrites, QA, compliance, one commit, `git push origin HEAD:main`, check each URL is 200 + noindex.
6. **MMS:** `node pipeline/mms.js <slug>` per page; look at each at ≤ 260px.
7. **Texts** (`pipeline/pNN-texts.json`, `{slug: text}`), Travis's voice, template:

   > Hi, Travis with Saltwater Studio in Destin. {ONE sourced fact: e.g. "140 Google reviews at 4.9 for fencing is hard
   > to earn"}, so I built {Business} a free website preview using {photo source: "photos from your Google listing" /
   > "your Facebook photos"}:
   >
   > https://saltwaterstudio.xyz/preview/{slug}
   >
   > If you like it, text me back and I'll walk you through getting it live. No worries either way.

   `python3 pipeline/top10-lint.py pipeline/pNN-texts.json --pages` must PASS.
8. **Stage:** items JSON (same shape as earlier waves + `preview_url`, `mms`) →
   `python3 pipeline/wave-build.py ITEMS TEXTS pNN STAGED-TEXTS-WAVE-NN` → `node gate.js STAGED-TEXTS-WAVE-NN.md`.
9. **Travis:** reviews, then `./promote-wave.sh - NN` → board "Text today": Save MMS image → attach → paste text → send
   (8 AM–8 PM) → Mark as texted. Messenger: same text + image from his phone. Email only for prospects who answer there
   (STAGED-BATCH flow, gate.js, From anguisheh1 "Saltwater Studio").
10. **Day 3, no reply:** "Copy day-3 follow-up" once. Then stop. "Stop"/"no" → log Not interested. Takedown request →
    remove `public/preview/<slug>` + its vercel.json rewrite within 24 h.

## When they reply (spoken, never written)
- $297 a month covers everything: the site live on their own domain, hosting, edits, Google Business Profile
  management, local SEO, and a monthly report. Same service Beach House Moving gets (never quote BHM numbers).
- 4-month minimum, billed monthly. After that, stay month to month or keep the site and go. Say it once, don't dwell.
- Anything beyond that: "I'll tell you straight what we can and can't do."
- Per-page talking points: `~/Projects/<slug>-poc/_inbox/TALKING-POINTS.md` (what's on the page, where each fact came
  from, open questions for the owner).
```

- [ ] **Step 4: README top block** — prepend to `docs/prospects/README.md`:

```markdown
# ▶ FREE-PAGE WAVES (2026-10-01): read PAGES-RUNBOOK.md. Audit-offer waves are retired.
STAGED-BATCH-14 + STAGED-TEXTS-WAVE-05 (audit offers, never sent) moved to pipeline/shelved/; their no-site rows
re-enter via `ledger.py --pages`. Page waves are text-only waves promoted with `./promote-wave.sh - NN`.

```

and run: `mkdir -p pipeline/shelved && mv STAGED-BATCH-14.md STAGED-TEXTS-WAVE-05.* pipeline/shelved/` (Gmail drafts for batch 14 stay in Gmail untouched; Travis decides).

- [ ] **Step 5: Memories** (each file already exists; append, don't rewrite):
  - `restaurant-hero-photos.md`: add `**2026-10-01 generalized:** the real-photo hero rule now applies to EVERY vertical (free-page pivot); see [[premium-landing-page-bar]] and the skill Phase 1 item 5. FB photos: v2 fallback per [[facebook-scraping-workarounds]].`
  - `premium-landing-page-bar.md`: add `**2026-10-01 pivot:** real owner photos lead every page now; 3D is the accent.`
  - `prospect-poc-previews.md`: add `**2026-10-01 free-page pivot:** photos default ON (standing go-ahead), list→pick→fetch-picks.sh; MMS image via docs/prospects/pipeline/mms.js.`
  - `saltwater-prospect-outreach.md`: prepend `**10/01 NIGHT PIVOT (Travis): audit offers retired → free finished landing pages for no-site/broken-site businesses, 5/day, MMS text first (Messenger/email backup, Travis sends). $297/mo all-in (BHM-level service + monthly report), 4-month minimum, spoken only. Runbook docs/prospects/PAGES-RUNBOOK.md; spec saltwater-studio docs/superpowers/specs/2026-10-01-free-page-pivot-design.md.**`
  - `MEMORY.md`: update those lines' hooks to mention the pivot (one line each, no content).

- [ ] **Step 6: Check**

Run: `grep -c 'fetch-picks' ~/.claude/skills/premium-landing-page/SKILL.md` (≥ 1); `grep -c 'unless approved' ~/.claude/skills/premium-landing-page/SKILL.md` (0); `ls docs/prospects/pipeline/shelved/` (3 files); `head -3 docs/prospects/README.md`.

- [ ] **Step 7: No commit** (outside repo / untracked).

---

### Task 8: Wave 1, end to end (acceptance)

**Files:**
- Create: `docs/prospects/DAILY-PAGES-2026-10-02.md`, `~/Projects/<slug>-poc/**` ×5, `public/preview/<slug>/**` ×5, `docs/prospects/STAGED-TEXTS-WAVE-05.{md,json}`
- Modify: `vercel.json` (5 rewrites)

**Interfaces:**
- Consumes: everything above. This task is the real test of the pipeline.

- [ ] **Step 1:** `python3 ledger.py --pages`; shortlist 8 per runbook step 2; write `DAILY-PAGES-2026-10-02.md`; `node gate.js DAILY-PAGES-2026-10-02.md`. Expected: ≥ 5 PASS with no confirmed live site. Fewer → take next by score and re-gate.
- [ ] **Step 2:** Recon + photos for each of the 5 (runbook step 4). Expected per prospect: RECON.md with sources, ≥ 3 picked photos with one `OK` hero (or a documented reason to go photo-light), PII gate notes in RECON.md. FB fallback count logged (`jq '.navs|length' ~/.claude/state/meta_guard.json` before/after ≤ 20).
- [ ] **Step 3:** Dispatch 5 fresh `general-purpose` builder agents (background), each with: SKILL.md path, RECON.md path, photo dir + `fetch-picks` output lines, creative brief, output `public/preview/<slug>/index.html`, QA port 8761–8765, "no git, no vercel.json, no other dirs", skill token budget.
- [ ] **Step 4:** Orchestrator QA on each: `qa.js` (390, then 360/430), `compliance.py`, one hero look ≤ 260px. Fix rounds ≤ 3.
- [ ] **Step 5:** Add the 5 rewrites to `vercel.json`; commit:

```bash
cd ~/Projects/saltwater-studio && git add public/preview/<slug1> … vercel.json && git commit -m "feat(preview): free-page wave 1 (5 previews)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

  Then **ask Travis before** `git push origin HEAD:main` (publishing). After deploy: each URL → 200 and `x-robots-tag: noindex, nofollow` (`curl -sI`).
- [ ] **Step 6:** `node pipeline/mms.js <slug>` ×5; texts JSON; `top10-lint.py --pages` PASS; items JSON; `wave-build.py … STAGED-TEXTS-WAVE-05`; `node gate.js STAGED-TEXTS-WAVE-05.md` PASS.
- [ ] **Step 7:** Hand to Travis: 5 links, MMS images, texts, Lovable flags, talking points. After his OK: `./promote-wave.sh - 05`; confirm the board shows 5 "Text today" cards with MMS + buttons.

---

### Task 9: Retrofit the 13 live previews (after wave 1)

**Files:**
- Modify: `public/preview/<slug>/index.html` for each still-open, photo-free prospect

- [ ] **Step 1:** List which of the 13 are still open prospects (not dropped: Dog Gone Cute and A Plus Outboard are dropped; Crestview Fence is an active thread) and photo-free: `for d in public/preview/*/; do [ -d "$d/img" ] || echo "$d"; done`.
- [ ] **Step 2:** For each remaining one: photo pass (Task 7 skill item 5), one fresh builder agent swaps the hero to the real photo and moves 3D to the accent, same QA gates. Ask Travis before push.
- [ ] **Step 3:** Stage them as a page wave like Task 8 Steps 6–7 (only those not already pitched in person; walk-in follow-ups stay with Travis).

---

## Self-review notes

- Spec coverage: §1 Selection → Tasks 2, 8.1 · §2 Photos → Tasks 3, 7.2 · §3 Meta guard → Task 1 · §4 Build → Tasks 7.3 step 5, 8.3–8.5 · §5 Outreach kit → Tasks 4, 5, 6, 7.3 · §6 Unchanged rules → Global Constraints · 13 previews → Task 9 · Success measures → runbook + Beat Last Week (no code).
- Type/name consistency: `PHOTO_JS`, `page_eligible`, `closed_slugs`, `CLOSED`, `pages-pool.json`, `preview_url`/`mms`/`followup`, `promote-wave.sh - NN` are used identically across tasks.
