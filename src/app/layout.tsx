import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Martian_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/ui/Header";
import { services } from "@/data/services";
import Footer from "@/components/ui/Footer";
import { locations } from "@/data/locations";
import LeadSourceCapture from "@/components/LeadSourceCapture";
import StickyCTA from "@/components/ui/StickyCTA";
import JsonLd from "@/components/JsonLd";
import { buildOrgSchema, buildWebSiteSchema, personFounder } from "@/lib/schema";
import { site } from "@/config/site";

// Fonts (2026-10 perf PR 1.3): Fraunces keeps only the opsz axis (SOFT/WONK were
// never set in CSS and inflated the file). The body face uses display "optional":
// it is preloaded so it lands inside the block period, and a late face never swaps
// in mid-read, so it can't shift the hero paragraph (the 0.12 CLS source).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "optional",
});

// Small labels only: not preloaded, so it never competes with the LCP. "swap"
// keeps the look (optional + no preload showed Courier on cold loads); labels
// have a fixed line-height, so the swap doesn't move the layout.
const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Saltwater Studio | Web Design, Google Profiles & AI",
    template: "%s | Saltwater Studio",
  },
  description: site.tagline,
  openGraph: {
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: site.googleSiteVerification,
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable} ${martianMono.variable}`}
    >
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <JsonLd schema={[buildOrgSchema(), buildWebSiteSchema(), personFounder()]} />

        <Header />

        <main
          id="main"
          tabIndex={-1}
          className="pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0"
        >
          {children}
        </main>

        <LeadSourceCapture />
        <Footer
          serviceLinks={services.map(({ slug, title }) => ({ slug, title }))}
          areaLinks={locations.map(({ slug, city }) => ({ slug, city }))}
        />
        <StickyCTA />

        {/* GTM, zero analytics in this codebase. Lazy (2026-10 perf PR 1.3): gtm.js
            (and the GA4 tag it loads) is injected on the first input, or 4s after
            window load, so ~300KB of tag script stays off the critical path.
            dataLayer exists from the start; events pushed before GTM arrives are
            queued and replayed by GTM on load, so the event taxonomy is unchanged. */}
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,l,i){w[l]=w[l]||[];var done=false,
              ev=['pointerdown','keydown','touchstart','scroll','mousemove'];
              function load(){if(done)return;done=true;
              ev.forEach(function(e){w.removeEventListener(e,load)});
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var j=d.createElement('script');j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i;d.head.appendChild(j)}
              ev.forEach(function(e){w.addEventListener(e,load,{passive:true})});
              function arm(){setTimeout(load,4000)}
              if(d.readyState==='complete')arm();else w.addEventListener('load',arm);
              })(window,document,'dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
