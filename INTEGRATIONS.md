# INTEGRATIONS.md — Saltwater Studio

## 1. Quote form — Resend (house standard)

The quote form posts to a Next.js route handler that emails Travis via Resend.
No third-party form service.

**`app/api/contact/route.ts` logic:**
1. `zod`-parse body `{ name, email, business?, message, company?, t }` —
   `company` = honeypot, `t` = client timestamp.
2. Reject (400) if: honeypot filled · `(Date.now() - t) < 3000ms` (time-trap) ·
   zod fails.
3. `resend.emails.send` → TO `{{STUDIO_EMAIL}}`, subject
   `New quote — {name}` · reply-to the lead's email.
4. Autoresponder → TO the lead from `hello@saltwaterstudio.xyz`: "Got it — expect
   a reply within one business day" (CONTENT thanks copy).
5. On success the client component `router.push("/thanks")`; `/thanks` pushes
   `{ event: "form_submit" }` to `dataLayer`.
6. On Resend failure: never lose the lead silently — log to function logs AND show
   the fallback: "Something hiccuped — call us at {{STUDIO_PHONE_DISPLAY}}."

**Setup:** verify `saltwaterstudio.xyz` in Resend (SPF + DKIM DNS records) once the
domain is registered. Until verified, send from Resend's onboarding domain as a
stopgap. `RESEND_API_KEY` in env vars only — never in code or the repo. Free tier
(3k emails/mo, 100/day) is ample for leads.

CRO rules (DPOS 08) the form must honor: labels above fields (not placeholders),
`inputMode` + autocomplete correct, button says the outcome ("Send it"), friction-
reducer line under it, big touch targets.

## 2. Booking — Cal.com

- `@calcom/embed-react` on `/book`; also the primary CTA target site-wide.
- `{{CALCOM_URL}}` in `site.ts`. Intake questions configured in Cal.com (business
  name, site, what they need) so the call starts informed.
- Outbound booking link / confirmation fires `booking_click`.

## 3. Analytics & tracking — GA4 + GTM (DPOS 04/09)

All tags live in **GTM**; zero hardcoded analytics in the codebase. GTM loads once
via `next/script` `afterInteractive` in `layout.tsx`. `NEXT_PUBLIC_GTM_ID` env var.

**Event taxonomy (snake_case, never renamed once live):**

| Event | Fires when | Key Event? |
|---|---|---|
| `phone_click` | `tel:` click (header + sticky bar) | **Yes** |
| `form_submit` | dataLayer push on `/thanks` | **Yes** |
| `booking_click` | outbound to Cal.com / confirm | **Yes** |
| `email_click` | `mailto:` click | No |
| `quote_start` | first quote-form interaction | No |

Mark `phone_click`, `form_submit`, `booking_click` as **Key Events** in GA4
(makes them conversions, feeds any future ads). GA4 timezone America/Chicago,
currency USD, data retention 14 months, internal-traffic filter for Travis's IPs.
**Fire-test every event yourself in GTM Preview + GA4 DebugView before calling the
site live** (DPOS rule: never drive traffic you can't measure).

`lib/events.ts` holds typed dataLayer helpers so components push events
consistently.

## 4. Deploy hooks

Git push → Vercel auto-build (preview per branch/PR; production = main). Env vars
set in the Vercel dashboard: `RESEND_API_KEY`, `NEXT_PUBLIC_GTM_ID`. Post-deploy
ritual: real form submit · view-source spot-check metadata on 3 pages · IndexNow
ping · PageSpeed on changed pages.

## 5. Token / env summary

| Token | Lives in | Notes |
|---|---|---|
| `{{DOMAIN}}` = `saltwaterstudio.xyz` | site.ts, everywhere | confirm at Namecheap |
| `{{CALCOM_URL}}` | site.ts | pending |
| `{{RESEND_API_KEY}}` | **env only** | after domain + DNS verify |
| `{{STUDIO_EMAIL}}` | site.ts | pending (`hello@saltwaterstudio.xyz` suggested) |
| `{{STUDIO_PHONE_E164}}` / `_DISPLAY` | site.ts | pending |
| `{{GTM_ID}}` | env (`NEXT_PUBLIC_GTM_ID`) | pending |
| `{{GA4_ID}}` | inside GTM (not code) | pending |

Grep `{{` → must be 0 in `src/` before launch (env values excepted, they live in
the platform dashboard).
