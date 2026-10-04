// @ts-check
// Build-time meta gate (runs as `postbuild`, before the IndexNow ping).
// Reads every prerendered page under .next/server/app/**/*.html and FAILS the build
// (exit 1) on the classes the 2026-10-02 site-gate kept finding:
//   - missing <title> or meta description
//   - <title> > 65 chars (the " | Saltwater Studio" suffix included) — warns > 60
//   - meta description > 160 chars
//   - duplicate <title> across indexable pages
//   - near-duplicate titles: equal after normalizing case/punctuation, or same first 5 words
//   - a [location] slug that collides with a static route, public/ file, redirect source
//     or reserved name; duplicate slugs inside a src/data set; redirect chains
// Scope: /preview/* prospect pages are static files in public/, never in the Next build
// output, so they are not scanned here (they have their own landing-page-audit gate).
// Pages marked robots noindex (concept tiles, /thanks, 404) are still length-checked but
// are left out of the duplicate check: they never compete in search.
// Dependency-free: Node built-ins only.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = join(process.cwd(), ".next", "server", "app");
const TITLE_MAX = 65;
const TITLE_WARN = 60;
const DESC_MAX = 160;
// Next's internal error shells: no route, no metadata of their own.
const SKIP = new Set(["/_global-error"]);

if (!existsSync(ROOT)) {
  console.error(`[check-meta] ${ROOT} not found — run after \`next build\`.`);
  process.exit(1);
}

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith(".html") ? [p] : [];
  });
}

/** @param {string} s */
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

/** @param {string} html @param {RegExp} re */
const pick = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : null;
};

const errors = [];
const warns = [];
/** @type {Map<string, string[]>} */
const titles = new Map();
let pages = 0;

for (const file of walk(ROOT)) {
  const route =
    "/" + relative(ROOT, file).split(sep).join("/").replace(/\.html$/, "").replace(/^index$/, "");
  if (SKIP.has(route)) continue;
  pages++;
  const html = readFileSync(file, "utf8");
  const title = pick(html, /<title[^>]*>([^<]*)<\/title>/i);
  const desc = pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const robots = pick(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i) ?? "";
  const noindex = /noindex/i.test(robots) || route === "/_not-found";

  if (!title) errors.push(`${route}: missing <title>`);
  else {
    if (title.length > TITLE_MAX) errors.push(`${route}: title ${title.length} chars (>${TITLE_MAX}): "${title}"`);
    else if (title.length > TITLE_WARN) warns.push(`${route}: title ${title.length} chars (>${TITLE_WARN}): "${title}"`);
    if (!noindex) titles.set(title, [...(titles.get(title) ?? []), route]);
  }
  if (!desc) errors.push(`${route}: missing meta description`);
  else if (desc.length > DESC_MAX) errors.push(`${route}: description ${desc.length} chars (>${DESC_MAX}): "${desc}"`);
}

for (const [t, routes] of titles) {
  if (routes.length > 1) errors.push(`duplicate title on ${routes.join(", ")}: "${t}"`);
}

// ---- Near-duplicate titles (SW-033) ----
// Two indexable titles that only differ in case/punctuation, or that open with the same
// five words, compete for the same query (the 2026-10 audit's SW-024: the web design
// service page vs the Destin city page). Titles are compared without the brand.
/** @param {string} t */
const titleKey = (t) =>
  t
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\s*\|\s*saltwater studio\s*$/, "")
    .replace(/^saltwater studio\s*\|\s*/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
// Known near-duplicates, waived by exact title until the fix lands. An entry stops
// matching the moment its title changes, and a stale entry is reported as a warning.
const NEAR_DUP_WAIVERS = new Map([]);
const indexable = [...titles.entries()].map(([t, routes]) => ({ t, route: routes[0], key: titleKey(t) }));
for (const w of NEAR_DUP_WAIVERS.keys()) {
  if (!titles.has(w)) warns.push(`stale near-duplicate waiver (title no longer exists): "${w}"`);
}
for (let i = 0; i < indexable.length; i++) {
  for (let j = i + 1; j < indexable.length; j++) {
    const a = indexable[i];
    const b = indexable[j];
    const wa = a.key.split(" ");
    const wb = b.key.split(" ");
    const same = a.key === b.key;
    const lead = wa.length >= 5 && wb.length >= 5 && wa.slice(0, 5).join(" ") === wb.slice(0, 5).join(" ");
    if (!same && !lead) continue;
    const msg = `near-duplicate titles (${same ? "same after normalizing" : "same first 5 words"}) on ${a.route}, ${b.route}: "${a.t}" / "${b.t}"`;
    const waiver = NEAR_DUP_WAIVERS.get(a.t) ?? NEAR_DUP_WAIVERS.get(b.t);
    if (waiver) warns.push(`${msg} [waived: ${waiver}]`);
    else errors.push(msg);
  }
}

// ---- Root-route namespace (SW-033) ----
// [location] serves city pages at the site root. A location slug equal to a static route,
// a public/ file, a redirect source or a reserved name is silently shadowed (no error,
// wrong page), so the build fails on it instead.
const CWD = process.cwd();
const RESERVED = new Set([
  "about", "api", "areas", "book", "contact", "insights", "preview", "privacy", "review",
  "services", "thanks", "tools", "websites", "work",
  "_next", "_vercel", ".well-known", "favicon.ico", "icon.png", "apple-icon.png",
  "robots.txt", "sitemap.xml", "manifest.webmanifest", "llms.txt", "llms-full.txt",
]);
/** @type {Map<string, string>} root name -> what owns it */
const rootOwners = new Map();
for (const name of RESERVED) rootOwners.set(name, "reserved");
for (const e of readdirSync(join(CWD, "src", "app"), { withFileTypes: true })) {
  // Static route folders only: skip [dynamic], (groups), _private and @slots.
  if (e.isDirectory() && !/^[[(_@]/.test(e.name)) rootOwners.set(e.name, "src/app route");
}
for (const name of readdirSync(join(CWD, "public"))) rootOwners.set(name, "public/ file");

const routesManifest = JSON.parse(readFileSync(join(CWD, ".next", "routes-manifest.json"), "utf8"));
/** @type {{ source: string, destination: string, internal?: boolean }[]} */
const redirects = (routesManifest.redirects ?? []).filter(
  (/** @type {{ internal?: boolean, has?: unknown[] }} */ r) => !r.internal && !r.has,
);
const redirectSources = new Set(redirects.map((r) => r.source));
for (const r of redirects) {
  const m = r.source.match(/^\/([^/:()*]+)$/);
  if (m) rootOwners.set(m[1], `redirect to ${r.destination}`);
  // No chains: a redirect must land on a real page, not on another redirect.
  if (r.destination.startsWith("/") && redirectSources.has(r.destination)) {
    errors.push(`redirect chain: ${r.source} -> ${r.destination} -> (redirects again)`);
  }
}

const prerender = JSON.parse(readFileSync(join(CWD, ".next", "prerender-manifest.json"), "utf8"));
const locationSlugs = Object.entries(prerender.routes ?? {})
  .filter(([, v]) => v.srcRoute === "/[location]")
  .map(([route]) => route.slice(1));
for (const slug of locationSlugs) {
  const owner = rootOwners.get(slug);
  if (owner) errors.push(`location slug "/${slug}" collides with a root route (${owner}); the city page would be shadowed`);
}

// Duplicate slugs inside a data set: generateStaticParams dedupes them silently, so one
// record would never render.
for (const file of ["services", "locations", "insights", "projects"]) {
  const src = readFileSync(join(CWD, "src", "data", `${file}.ts`), "utf8");
  const seen = new Set();
  for (const [, slug] of src.matchAll(/^\s+slug: "([^"]+)"/gm)) {
    if (seen.has(slug)) errors.push(`duplicate slug "${slug}" in src/data/${file}.ts`);
    seen.add(slug);
  }
}

for (const w of warns) console.log(`[check-meta] WARN  ${w}`);
for (const e of errors) console.error(`[check-meta] ERROR ${e}`);
if (pages === 0) {
  console.error("[check-meta] no prerendered pages found — refusing to pass an empty scan.");
  process.exit(1);
}
if (errors.length) {
  console.error(`[check-meta] FAIL: ${errors.length} error(s) across ${pages} pages. Fix the metadata (see CLAUDE.md "Change control and quality gate").`);
  process.exit(1);
}
console.log(`[check-meta] PASS: ${pages} pages, ${warns.length} warning(s).`);
