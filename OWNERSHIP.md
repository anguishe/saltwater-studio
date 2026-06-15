# OWNERSHIP.md — Saltwater Studio

Every account in this list is owned by Travis under his personal accounts.
This file is the recovery-email + access record. Keep it updated.

## Accounts

| Service | Account | Login | Recovery email | Notes |
|---|---|---|---|---|
| Domain registrar (Namecheap) | saltwaterstudio.xyz | Travis personal | — | Renews annually; enable auto-renew |
| Vercel | saltwaterstudio | Travis personal | — | Hobby plan (studio's own property) |
| Google Analytics 4 | — | Travis personal Google | — | Property: Saltwater Studio; timezone: America/Chicago |
| Google Search Console | — | Travis personal Google | — | Domain property (DNS TXT verification) |
| Google Tag Manager | — | Travis personal Google | — | Container for all tags |
| Google Business Profile | — | Travis personal Google | — | TODO: create at launch |
| Resend | — | Travis personal | — | Domain: saltwaterstudio.xyz; verify SPF + DKIM |
| Cal.com | — | Travis personal | — | Booking link → site.calcom |
| GitHub | — | Travis personal | — | Source repo |
| Instagram | — | Travis personal | — | TODO: create |
| LinkedIn | — | Travis personal | — | TODO: create |
| Dribbble | — | Travis personal | — | TODO: create |

## Environment variables (Vercel dashboard — never in repo)

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend email delivery |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID |
| `STUDIO_EMAIL` | Receiving email for quote form |
| `INDEXNOW_KEY` | IndexNow ping on production deploy (postbuild) |

## Post-launch checklist

- [ ] GSC domain property verified (DNS TXT)
- [ ] Sitemap submitted in GSC
- [ ] Bing Webmaster imported from GSC
- [ ] IndexNow key file live at `/[key].txt`
- [ ] All `{{TOKENS}}` replaced (run `grep -rn "{{" src/`)
- [ ] Fire-tested: phone_click, form_submit, booking_click in GTM Preview + GA4 DebugView
- [ ] Real form submit tested end-to-end (email received by Travis + autoresponder to lead)
- [ ] PageSpeed: non-hero pages ≥90 mobile; homepage ≥75 mobile; SEO 100 all pages
