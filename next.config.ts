import type { NextConfig } from "next";

// Content-Security-Policy, shipped as Report-Only (SW-029). Violations log to the browser
// console without blocking anything, so GTM/GA4 tags added later in the container can't
// break silently. Flip to enforcing only after a clean console pass on the preview.
// 'unsafe-inline' scripts: Next streams inline bootstrap scripts and the GTM snippet is
// inline; nonces would force dynamic rendering and lose the static prerender.
// vercel.live: the preview-deployment toolbar.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://www.google.com https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://www.googletagmanager.com https://vercel.live",
  "worker-src 'self' blob:",
  "media-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// Unused powerful features, locked off for every origin.
const permissionsPolicy = [
  "camera=()",
  "microphone=()",
  "geolocation=()",
  "payment=()",
  "usb=()",
  "browsing-topics=()",
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Every route, /preview/* prospect pages included.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // frame-ancestors is ignored in a Report-Only policy, so it ships enforced on its own.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
      {
        // The studio's own pages. /preview/* are standalone static prospect pages with
        // their own asset hosts and their own audit gate, so they're left out.
        source: "/((?!preview/).*)",
        headers: [
          { key: "Permissions-Policy", value: permissionsPolicy },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.saltwaterstudio.xyz" }],
        destination: "https://saltwaterstudio.xyz/:path*",
        permanent: true,
      },
      // Concept tile retired 2026-09-25; the real business is now a live case study.
      { source: "/work/watervue", destination: "/work/watervue-event-rentals", permanent: true },
      // Cal.com booking retired 2026-08-09 for the quote form (SW-030). The route is gone;
      // src/app/book/CalEmbed.tsx stays unreferenced for the day booking comes back
      // (restore the page from git history, drop this redirect, re-add /book to sitemap.ts).
      { source: "/book", destination: "/contact", permanent: true },
      // City-slug twins (SW-032): natural guesses at the live slugs land on the live page.
      // Live slugs never change; every destination returns 200 (no chains).
      { source: "/web-design-destin", destination: "/web-design-destin-fl", permanent: true },
      { source: "/web-design-crestview", destination: "/web-design-crestview-fl", permanent: true },
      { source: "/web-design-navarre", destination: "/web-design-navarre-fl", permanent: true },
      { source: "/web-design-niceville", destination: "/web-design-niceville-fl", permanent: true },
      { source: "/web-design-fort-walton-beach-fl", destination: "/web-design-fort-walton-beach", permanent: true },
      { source: "/web-design-santa-rosa-beach-fl", destination: "/web-design-santa-rosa-beach", permanent: true },
      // Google review form (SW-063). Temporary: the target is an external Google URL.
      { source: "/review", destination: "https://g.page/r/Cdft8m7CyDo-EBM/review", permanent: false },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
