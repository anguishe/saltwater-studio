# BRAND.md — Saltwater Studio

## 1. Positioning

Saltwater Studio builds premium websites for service businesses — and the search
presence (SEO/AEO/GEO + Google + social) that makes them found. Remote, nationwide,
out of the Florida Gulf Coast. The wedge: **built right the first time.** Most
small-business sites are rebuilt every two years because the first one was a
template with no schema, no tracking, and no entity strategy. Saltwater ships the
version you don't have to redo.

- **Founder:** Travis · **Founded:** 2025 · **Heartland:** Pensacola / FL Panhandle
- **Service area:** United States (nationwide), Gulf Coast heartland Gulf Shores AL → Miami FL
- **Model:** remote services studio (not a local storefront) · **KPI:** booked strategy calls + quote leads
- **Pricing:** quote-only, never displayed

## 2. The brand world — "the full water column"

One coherent idea reconciles the coastal feel with the surreal/immersive build:
the brand lives on a **vertical journey from the sunlit coastal surface down into
the bioluminescent deep.**

- **Surface (the approachable face — used for logo, OG, social, banners):** warm,
  beachy, Gulf-Coast coastal — turquoise shallows, foam white, warm sand, low sun.
  A *refined cousin* of beach-lifestyle branding. Hard rule: **no decal-sticker
  energy** — no skulls, marlins, distressed-stamp logos, "salt life" lettering
  tropes. We borrow the *feeling* (salt, sun, water, coast), never the genre's
  visual clichés. If it would look at home on a truck-window sticker, it's wrong.
- **Deep (the immersive face — used for the website hero/3D):** descend past the
  shallows into a dark, surreal, bioluminescent deep. This is where the 3D scene
  and the futuristic spectacle live.
- **The signature object:** a single **molten-chrome form** (the studio mark)
  suspended in the deep — the focal hero piece, carrying a premium/luxury edge.

Thesis line: **"Depth, by design."** Everyone else stops at the surface template.
We build deeper — schema, entity, tracking, the parts you can't see that decide
whether you get found.

## 3. Color tokens

Dark-first. The site background is the deep; the surface palette appears in
imagery, the hero descent, and light accent moments.

```css
/* Deep (base) */
--ink:        #05161B;  /* near-black teal — primary background */
--marine:     #0C3B45;  /* deep teal — panels, depth mid-tones */
--abyss:      #02090C;  /* deepest shadow */

/* Surface (coastal) */
--foam:       #F4F1EA;  /* warm off-white — primary text on dark */
--sand:       #E9E0CE;  /* warm neutral — secondary surfaces */
--shoal:      #2FC6B6;  /* coastal turquoise — THE interactive accent */
--sun:        #E8B04B;  /* warm gold — rare secondary highlight */

/* Bioluminescence (sparingly — glow/emphasis only) */
--glow:       #5FF2E0;  /* cyan bioluminescent highlight */

/* Molten chrome (hero signature object ONLY) */
--chrome-hi:  #DCE3E8;
--chrome-mid: #8A949B;
--chrome-warm:#C9A227;  /* gold-tinted molten edge */
```

**Ratio doctrine (restraint = premium):** ~85% ink/marine/abyss · ~10% foam/sand
text · ~3% shoal (the *only* interactive accent — links, buttons, focus) · ~2%
sun + glow as rare highlights · chrome reserved exclusively for the hero object.
One accent color does the interactive work everywhere; discipline reads as luxury.

## 4. Typography (website)

Self-host all via `next/font`. Distinctive on purpose — no Inter / Roboto / Clash
/ Satoshi / Space Grotesk.

- **Display — Fraunces** (variable; high-contrast "wonky" optical serif). Use the
  optical-size and soft axes; tracking tight on large display. Editorial-luxury
  with personality — reads surreal/premium, not techno-default.
- **Body — Hanken Grotesk.** Clean, warm, legible workhorse. Not Inter.
- **Mono accent — Martian Mono** (sparingly): spec labels, section indices
  (`01 / DEPTH`), UI ticks, the "engineered" texture. Uppercase, wide tracking.

> DPOS 11 prefers 2 families. The mono is a **deliberate third**, scoped to small
> label use only, for the "engineered" spec-sheet feel. Drop it to hit 2 families
> if the perf pass demands it; the design survives on Fraunces + Hanken alone.

**Branding/imagery type (logo & OG — generated, then cleaned up):** the coastal-
surface face may use a warmer, slightly more organic display treatment than the
site (see ASSETS.md), as long as it stays distinct from beach-sticker lettering.

## 5. Voice

Confident, plainspoken, specific. Coastal-confident, not bro-y. Premium, not
stiff. Short sentences earn their length.

- **Specificity is the brand.** Name the real thing: "schema your competitor's
  template never added," not "cutting-edge optimization." If a competitor could
  paste the sentence onto their site unchanged — rewrite it.
- **Answer-first.** Lead with the answer, then the texture. No throat-clearing
  ("In today's digital landscape…" is banned).
- **Banned words:** elevate, seamless, solutions, leverage, unlock, empower,
  synergy, "we pride ourselves," "passionate about," "take it to the next level,"
  "in today's digital landscape," "game-changer." 
- **No emoji** in body copy (a single footer mark is the only allowance).
- **Read-aloud test:** would Travis say this sentence to a business owner over
  coffee? If not, rewrite.

## 6. Taglines (locked)

- **Primary tagline:** *A web design studio for service businesses that refuse to
  look like everyone else.* — hero subhead, meta description base, OG.
- **Secondary line (use as a services/section header or OG description):**
  *Websites engineered for Google, AI search, and the people in between.*
- **Brand mnemonic:** *Depth, by design.* — logo lockup, OG image, footer,
  preloader resolve.

## 7. Logo direction

A wordmark-led identity with a compact mark that works as favicon and as the
hero's molten-chrome object.

- **Wordmark:** "Saltwater Studio" set in the display face (or the warmer coastal
  treatment), letter-spacing slightly open; "Studio" can drop to a lighter weight
  or mono to create hierarchy. Lowercase or sentence case — never all-caps shouty.
- **Mark concept:** an abstract form that reads as **both a wave/water surface and
  a depth-cross-section** — e.g., a horizon line dissolving into a downward
  gradient/curve, or a single fluid "S" that bends from surface light into deep
  shadow. Should survive at 32px (favicon) and scale into the chrome hero object.
- **Lockups:** horizontal (mark + wordmark), stacked (mark over wordmark), mark-
  only (favicon / social avatar). Provide on `--ink` (primary) and `--foam` (light).
- **Don't:** literal beach scenes, sunset clip-art, palm trees, rope/anchor/
  compass clichés, distressed stamps, or anything resembling existing salt/beach
  lifestyle marks.
