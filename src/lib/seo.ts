import type { Metadata } from "next";
import { site } from "@/config/site";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

function canonicalUrl(path: string): string {
  const cleanPath = path.split("?")[0].replace(/\/+$/, "");
  return `${site.url}${cleanPath}`;
}

function formatTitle(title: string, path: string): string {
  const cleanPath = path.split("?")[0].replace(/\/+$/, "");
  return cleanPath === ""
    ? `${site.name} | ${title}`
    : `${title} | ${site.name}`;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = canonicalUrl(path);
  const formattedTitle = formatTitle(title, path);
  const image = ogImage ?? `${site.url}/og-default.jpg`;

  return {
    title: formattedTitle,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
    },
    openGraph: {
      title: formattedTitle,
      description,
      url: canonical,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: formattedTitle }],
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
