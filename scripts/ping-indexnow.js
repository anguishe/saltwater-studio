// @ts-check
// Pings IndexNow on every production Vercel deploy.
// Runs as postbuild and reads the URL list from the freshly built sitemap
// (src/app/sitemap.ts output), so the list can never go stale — the previous
// hand-maintained copy pinged 14 URLs, missed 17 sitemap URLs, and included
// the /book redirect (2026-10 audit).
// Skipped when INDEXNOW_KEY is unset or VERCEL_ENV !== "production": local
// builds (VERCEL_ENV unset) and preview deploys never ping.
// No external deps — Node built-in fetch (Node 18+).

const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.log("[indexnow] INDEXNOW_KEY not set — skipping ping.");
  process.exit(0);
}

if (process.env.VERCEL_ENV !== "production") {
  console.log(
    `[indexnow] VERCEL_ENV=${process.env.VERCEL_ENV ?? "(unset)"} — skipping ping (production only).`
  );
  process.exit(0);
}

const HOST = "saltwaterstudio.xyz";
// Where `next build` writes the prerendered sitemap route's body.
const SITEMAP_BODY = ".next/server/app/sitemap.xml.body";

async function ping() {
  const { readFile } = await import("node:fs/promises");

  let xml;
  try {
    xml = await readFile(SITEMAP_BODY, "utf8");
  } catch (err) {
    console.error(
      `[indexnow] Could not read ${SITEMAP_BODY}: ${err instanceof Error ? err.message : String(err)} — skipping ping.`
    );
    return; // Non-fatal: don't fail the build over a ping failure.
  }

  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    console.error("[indexnow] No <loc> entries in the built sitemap — skipping ping.");
    return;
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  };

  console.log(`[indexnow] Pinging ${urlList.length} URLs from the built sitemap…`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`[indexnow] Ping accepted — HTTP ${res.status}`);
  } else {
    const text = await res.text().catch(() => "");
    console.error(`[indexnow] Ping failed — HTTP ${res.status}: ${text}`);
    // Non-fatal: don't fail the build over a ping failure.
  }
}

ping().catch((err) => {
  console.error("[indexnow] Ping error:", err instanceof Error ? err.message : err);
  // Non-fatal.
});
