import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Saltwater Studio — how we handle data submitted through our contact form and website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-ink">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h1 className="font-display text-4xl text-foam">Privacy Policy</h1>
          <p className="mt-2 text-sm text-foam/40">Last updated: {site.founded}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 prose prose-invert prose-foam max-w-none space-y-6 text-foam/70">
            <p>
              {site.name} (&ldquo;Studio,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) takes your privacy seriously. This
              policy describes what information we collect and how we use it.
            </p>

            <h2 className="font-display text-xl text-foam mt-8">Information we collect</h2>
            <p>
              When you submit the contact or quote form, we collect your name, email address,
              and any details you provide. We use this information solely to respond to your
              inquiry.
            </p>

            <h2 className="font-display text-xl text-foam mt-8">Analytics</h2>
            <p>
              We use Google Analytics 4 via Google Tag Manager to understand how visitors
              use the site. This data is aggregated and anonymous. You can opt out by using
              your browser&apos;s privacy settings or a tool like uBlock Origin.
            </p>

            <h2 className="font-display text-xl text-foam mt-8">Third parties</h2>
            <p>
              We use Resend to deliver email and Cal.com for booking. These services have
              their own privacy policies. We do not sell your data.
            </p>

            <h2 className="font-display text-xl text-foam mt-8">Contact</h2>
            <p>
              Questions? Email us at{" "}
              <a href={`mailto:${site.email}`} className="text-shoal hover:text-glow">
                {site.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
