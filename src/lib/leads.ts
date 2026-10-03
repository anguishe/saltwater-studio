import { put } from "@vercel/blob";

/*
 * Lead archive — every form submission is written to a private Vercel Blob
 * store BEFORE any email goes out, so a Resend outage (or a typo'd API key)
 * can never lose a lead. One JSON file per submission:
 *
 *   leads/<YYYY-MM>/<ISO timestamp>-<kind>-<suffix>.json
 *
 * Pattern borrowed from the Beach House Moving repo (src/lib/leads.ts there),
 * which has run it in production since 2026-09.
 *
 * Degrades gracefully: with no Blob store connected (neither BLOB_STORE_ID
 * via OIDC nor BLOB_READ_WRITE_TOKEN set — local dev, preview without the
 * store, CI builds) it logs and returns, and the route carries on. A write
 * failure is logged without PII and never blocks the notification email.
 */
export async function storeLead(
  kind: "contact" | "post-payment",
  data: Record<string, unknown>
): Promise<void> {
  if (!process.env.BLOB_STORE_ID && !process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn(
      "[leads] no Blob store configured (BLOB_STORE_ID / BLOB_READ_WRITE_TOKEN) — lead not archived"
    );
    return;
  }
  try {
    const at = new Date().toISOString();
    await put(
      `leads/${at.slice(0, 7)}/${at}-${kind}.json`,
      JSON.stringify({ kind, at, ...data }),
      {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: true,
      }
    );
  } catch (error) {
    // Log the failure type only (no PII) and let the email path proceed.
    console.error(
      "[leads] archive failed:",
      error instanceof Error ? error.name : "UnknownError"
    );
  }
}
