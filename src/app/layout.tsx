import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Martian_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import StickyCTA from "@/components/ui/StickyCTA";
import JsonLd from "@/components/JsonLd";
import { buildOrgSchema, buildWebSiteSchema } from "@/lib/schema";
import { site } from "@/config/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Saltwater Studio | Web Design for Service Businesses",
    template: "%s | Saltwater Studio",
  },
  description: site.tagline,
  openGraph: {
    siteName: site.name,
    locale: "en_US",
    type: "website",
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <JsonLd schema={[buildOrgSchema(), buildWebSiteSchema()]} />

        <Header />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
        <StickyCTA />

        {/* GTM — afterInteractive, zero analytics in this codebase */}
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
