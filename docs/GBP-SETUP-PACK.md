# Google Business Profile — Setup Pack (prep only, 2026-10-02)

Ready-to-paste values for creating the Saltwater Studio GBP. Every field matches
`src/config/site.ts` character-for-character (SEO.md §7: NAP must match). Travis
creates and verifies; verification is the longest pole (days–weeks), so start it
when ready and let it run. Nothing on the site waits for this.

## Profile type

**Service-area business.** Enter the real Destin address for verification, then
HIDE it (no storefront). Service area: see list below.

## Fields (paste exactly)

| Field | Value |
|---|---|
| Business name | `Saltwater Studio` |
| Phone | `(850) 218-5855` |
| Website | `https://saltwaterstudio.xyz` |
| Appointment link | `https://saltwaterstudio.xyz/contact` |
| Opening date | 2025 |
| Short name / handle | `saltwaterstudiofl` (if offered; `saltwaterstudio` likely taken) |

## Categories

- **Primary:** Website designer
- Secondary: Marketing agency · Internet marketing service · Business management consultant

(Don't add "Advertising agency" — we don't sell ads, and category bloat dilutes.)

## Description (750-char limit; this is 717)

> Saltwater Studio is a remote web design and AI studio founded in 2025 by Travis Abadie in Destin, Florida, building websites, Google Business Profile management, and AI automation for local businesses nationwide. Custom Next.js websites built to rank in Google, Bing, and AI search — schema, analytics, and Search Console set up before launch, never bolted on after. Monthly Google Care keeps your Business Profile active: posts from real job photos, review replies, hours and services kept current. AI services cover receptionists, automation, and agents for owners who want the phone answered and the follow-up handled. Based on the Emerald Coast, working in person from Navarre to 30A and remotely everywhere else.

(First sentence is the canonical entity sentence, verbatim — GEO rule.)

## Service area (20 max; start with these)

Destin FL · Fort Walton Beach FL · Santa Rosa Beach FL · Miramar Beach FL ·
Niceville FL · Valparaiso FL · Mary Esther FL · Shalimar FL · Navarre FL ·
Crestview FL · Okaloosa County FL · Walton County FL

## Services (add under each category)

- Web design (primary) — Custom website design and build
- Google Business Profile management — monthly posts, reviews, hours, reporting
- Local SEO — ranking in Google Maps and local results
- SEO / AEO / GEO — Google ranking plus AI-search visibility
- Website audit — Google & AI Visibility Audit (flat-rate)
- AI receptionist — missed-call text-back, after-hours answering
- AI automation — intake, follow-up, quoting, scheduling workflows

## After verification (same day)

1. Add the logo (`public/saltwater-studio-logo.png`) + cover.
2. Add the GBP URL to `site.ts` `sameAs[]` (only once it's live and public — 200 rule).
3. First post: the $50 audit offer (runs through 2026-10-31; post the regular-price version after).
4. Link GBP website field → homepage, appointment → /contact (UTM: `?utm_source=gbp&utm_medium=organic`
   — the site's lead-source capture will then tag every GBP lead in the quote email).
5. Reviews: ask Beach House Moving + Zach to repost their Facebook recommendations as Google reviews
   (their words already exist; Google reviews are the stronger corroboration node).

## Don'ts

- Don't rename, don't keyword-stuff the name ("Saltwater Studio | Web Design Destin" = suspension bait).
- Don't mark attributes that don't apply.
- NAP changes after creation: update `site.ts` first, then GBP, same day.
