import { redirect } from "next/navigation";

// Cal.com booking retired 2026-08-09 in favor of the qualifying form at /contact —
// a scoped brief beats a raw calendar slot when every lead needs discovery anyway.
// This route stays as a permanent redirect so existing links and any indexed copy
// of /book land somewhere useful instead of 404ing.
//
// CalEmbed.tsx is intentionally left in place, unreferenced, for the day booking
// comes back. Re-enabling means: uncomment site.calcom, restore this page from
// git history (see commit before this one), and re-add /book to sitemap.ts.
export default function BookPage() {
  redirect("/contact");
}
