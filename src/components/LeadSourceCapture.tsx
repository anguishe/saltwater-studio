"use client";

import { useEffect } from "react";

export const LEAD_SOURCE_KEY = "ss_lead_source";

// First-touch attribution: landing path, referrer, and UTM params, captured once
// per session and attached to the quote email so Travis knows which channel the
// lead came from. sessionStorage per guard rails — may be unavailable (private
// mode), in which case the lead simply arrives without a source line.
export default function LeadSourceCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(LEAD_SOURCE_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const utm = ["utm_source", "utm_medium", "utm_campaign"]
        .map((k) => (params.get(k) ? `${k.slice(4)}=${params.get(k)}` : null))
        .filter(Boolean)
        .join(" ");
      const parts = [
        `landing: ${window.location.pathname}`,
        document.referrer ? `ref: ${document.referrer}` : "ref: direct",
        utm || null,
      ].filter(Boolean);
      sessionStorage.setItem(LEAD_SOURCE_KEY, parts.join(" · ").slice(0, 400));
    } catch {
      // storage unavailable — skip attribution, never break the page
    }
  }, []);

  return null;
}
