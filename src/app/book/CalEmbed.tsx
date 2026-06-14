"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { track } from "@/lib/events";

interface CalEmbedProps {
  calcomUrl: string;
}

export default function CalEmbed({ calcomUrl }: CalEmbedProps) {
  useEffect(() => {
    getCalApi({}).then((cal) => {
      cal("on", {
        action: "bookingSuccessful",
        callback: track.bookingClick,
      });
    });
  }, []);

  // calcomUrl is a placeholder until filled — render a fallback
  if (calcomUrl.startsWith("{{")) {
    return (
      <div className="rounded-lg border border-marine/30 p-8 text-center bg-marine/10">
        <p className="font-mono text-xs tracking-widest text-foam/30 uppercase">
          Cal.com embed — configure CALCOM_URL in site.ts
        </p>
      </div>
    );
  }

  return (
    <Cal
      calLink={calcomUrl}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
