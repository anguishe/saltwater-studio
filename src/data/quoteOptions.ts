/**
 * Options for the qualifying fields on the /contact form.
 *
 * Shared by the client form and the /api/contact zod schema so the two can't
 * drift — the server validates against exactly what the form offered, which is
 * what keeps arbitrary strings out of the notification email.
 *
 * Deliberately no budget field. Plan prices are published on the site
 * (CLAUDE.md pricing rule, 2026-10-03), so the form preselects a plan via
 * /contact?plan=<slug> instead of asking the visitor to name a number.
 */

// Mirrors the tier ladder in src/data/tiers.ts; QuoteForm.tsx maps
// /contact?plan=<slug> and /contact?interest=<id> onto these entries by index.
export const INTERESTS = [
  "Google & AI Visibility Audit",
  "Page Plan — website, $149/mo",
  "Buy It — website, $497 once",
  "Local Growth — site + Google care, $297/mo",
  "Google Profile Fix — $199 flat",
  "Custom AI systems — automation, agents, integrations",
  "Website build or rebuild",
  "Google Care — monthly Google Business Profile management",
  "AI receptionist — missed-call text-back and after-hours answering",
  "Not sure yet — help me figure it out",
] as const;

export const PREFERRED_CONTACT = ["Email — async works", "Call me"] as const;

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
