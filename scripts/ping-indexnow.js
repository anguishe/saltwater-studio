// @ts-check
// Pings IndexNow on every production Vercel deploy.
// Skipped when INDEXNOW_KEY is unset or VERCEL_ENV !== "production".
// No external deps — uses Node built-in fetch (Node 18+).

const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.log("[indexnow] INDEXNOW_KEY not set — skipping ping.");
  process.exit(0);
}

// Only ping on actual Vercel production deploys; skip preview & local.
const vercelEnv = process.env.VERCEL_ENV;
if (vercelEnv && vercelEnv !== "production") {
  console.log(`[indexnow] VERCEL_ENV=${vercelEnv} — skipping ping (production only).`);
  process.exit(0);
}

const HOST = "saltwaterstudio.xyz";

const URL_LIST = [
  `https://${HOST}`,
  `https://${HOST}/work`,
  `https://${HOST}/services`,
  `https://${HOST}/services/web-design`,
  `https://${HOST}/services/seo-aeo-geo`,
  `https://${HOST}/services/google-presence`,
  `https://${HOST}/services/social-content`,
  `https://${HOST}/about`,
  `https://${HOST}/contact`,
  `https://${HOST}/book`,
  `https://${HOST}/privacy`,
  // Live case studies only — preview slugs (watervue, aquamarine, alexander-hines) excluded
  `https://${HOST}/work/beach-house-moving`,
  `https://${HOST}/work/kais-run`,
  `https://${HOST}/work/bash-snippets`,
];

async function ping() {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URL_LIST,
  };

  console.log(`[indexnow] Pinging ${URL_LIST.length} URLs…`);

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
  console.error("[indexnow] Ping error:", err.message);
  // Non-fatal.
});
