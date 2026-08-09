/**
 * Options for the qualifying fields on the /contact form.
 *
 * Shared by the client form and the /api/contact zod schema so the two can't
 * drift — the server validates against exactly what the form offered, which is
 * what keeps arbitrary strings out of the notification email.
 *
 * Deliberately no budget field. Quote-only pricing is a hard rule (CLAUDE.md),
 * and a budget range on the form is a price on the site by another name.
 */

export const INTERESTS = [
  "AI strategy & logistics",
  "AI automation",
  "AI agents (calls, chat, SMS)",
  "Website build or rebuild",
  "SEO / AI search presence",
  "Not sure yet — help me figure it out",
] as const;

export const BOTTLENECKS = [
  "Missed calls and slow follow-up",
  "Typing the same thing into two places",
  "Scheduling and reminders",
  "Quoting and estimates",
  "Chasing invoices and reviews",
  "Reporting — nobody has time to build it",
  "Something else",
] as const;

export const TEAM_SIZES = [
  "Just me",
  "2–5",
  "6–20",
  "More than 20",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Next month or two",
  "This year, planning ahead",
  "Just researching",
] as const;
