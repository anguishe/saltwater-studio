import type { Metadata } from "next";
import { site } from "@/config/site";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = `${site.url}${path}`;
  const image = ogImage ?? `${site.url}/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
