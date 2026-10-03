"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";
import { LEAD_SOURCE_KEY } from "@/components/LeadSourceCapture";
import { INTERESTS } from "@/data/quoteOptions";

/*
 * Post-payment intake — posts to the existing /api/contact route with
 * leadSource prefixed "post-payment" so the notification (and the Blob
 * archive) is unmistakably a buyer, not a quote request. Only the fields
 * fulfillment needs; the buyer just paid, this is not the place to qualify.
 */

// The purchasable tiers (src/data/tiers.ts) — audit first, as the default.
const PURCHASES = [
  INTERESTS[0], // Google & AI Visibility Audit
  INTERESTS[1], // Page Plan
  INTERESTS[2], // Buy It
  INTERESTS[3], // Local Growth
  INTERESTS[4], // Google Profile Fix
] as const;

function postPaymentSource(): string {
  let source = "post-payment: /thanks/audit";
  try {
    const firstTouch = sessionStorage.getItem(LEAD_SOURCE_KEY);
    if (firstTouch) source += ` · ${firstTouch}`;
  } catch {
    // sessionStorage unavailable — the post-payment marker alone is enough
  }
  return source;
}

// Same rule as the quote form: "mybusiness.com" is a valid answer; the
// server's z.url() check is not the place to punish a missing protocol.
function normalizeUrl(value: FormDataEntryValue | null): string | undefined {
  const raw = String(value ?? "").trim();
  if (!raw) return undefined;
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

interface FormState {
  status: "idle" | "loading" | "done" | "error";
  error?: string;
}

export default function IntakeForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setState({ status: "loading" });

    try {
      const note = String(data.get("note") ?? "").trim();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business") || undefined,
          siteUrl: normalizeUrl(data.get("siteUrl")),
          interest: data.get("interest") || undefined,
          message: `Post-payment intake from /thanks/audit.${note ? `\n\n${note}` : ""}`,
          company: data.get("company") ?? "", // honeypot
          t: startTimeRef.current,
          leadSource: postPaymentSource(),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          json.error ?? `Something hiccuped — call us at ${site.phoneDisplay}`
        );
      }

      track.formSubmit();
      setState({ status: "done" });
    } catch (err) {
      setState({
        status: "error",
        error:
          err instanceof Error
            ? err.message
            : `Something hiccuped — call us at ${site.phoneDisplay}`,
      });
    }
  }

  if (state.status === "done") {
    return (
      <div
        className="rounded border border-shoal/40 bg-marine/20 p-8"
        role="status"
      >
        <p className="font-display text-2xl text-foam">
          Got it — the clock is running.
        </p>
        <p className="mt-3 text-foam/70">
          Your details are in and a confirmation is on its way to your inbox.
          Nothing else to do on your end.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded border border-marine/50 bg-marine/10 px-4 py-3 text-foam placeholder:text-foam-subtle focus:border-shoal focus:outline-none focus:ring-1 focus:ring-shoal transition-colors";
  const labelClass = "block text-sm text-foam/70 mb-1.5";
  const selectClass = `${inputClass} appearance-none pr-10 [&>option]:bg-ink [&>option]:text-foam`;

  return (
    <form onSubmit={handleSubmit} aria-label="Post-payment details form">
      <div className="space-y-5">
        <div>
          <label htmlFor="pp-name" className={labelClass}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="pp-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="pp-email" className={labelClass}>
            Email you used at checkout <span aria-hidden="true">*</span>
          </label>
          <input
            id="pp-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="pp-business" className={labelClass}>
            Business name <span aria-hidden="true">*</span>
          </label>
          <input
            id="pp-business"
            name="business"
            type="text"
            required
            autoComplete="organization"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="pp-siteUrl" className={labelClass}>
            Website or Google Business Profile link
          </label>
          <input
            id="pp-siteUrl"
            name="siteUrl"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="mybusiness.com — or a Google Maps link to your profile"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="pp-interest" className={labelClass}>
            What did you buy?
          </label>
          <select
            id="pp-interest"
            name="interest"
            defaultValue={PURCHASES[0]}
            className={selectClass}
          >
            {PURCHASES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pp-note" className={labelClass}>
            Anything we should know? (optional)
          </label>
          <textarea
            id="pp-note"
            name="note"
            rows={3}
            maxLength={4000}
            className={inputClass}
          />
        </div>

        {/* Honeypot — hidden from people, filled by bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="pp-company">Company</label>
          <input
            id="pp-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state.status === "error" && (
          <p className="text-sm text-sun" role="alert">
            {state.error}
          </p>
        )}

        <Button type="submit" disabled={state.status === "loading"}>
          {state.status === "loading" ? "Sending…" : "Send it — start the clock"}
        </Button>
      </div>
    </form>
  );
}
