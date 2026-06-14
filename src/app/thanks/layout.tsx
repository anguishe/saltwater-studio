import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank you",
  description:
    "Your message has been received. Saltwater Studio will reply within one business day.",
  path: "/thanks",
  noIndex: true,
});

export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
