"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";

interface FormState {
  status: "idle" | "loading" | "error";
  error?: string;
}

export default function QuoteForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>({ status: "idle" });
  const startTimeRef = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    track.quoteStart();
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          t: startTimeRef.current,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong");
      }

      router.push("/thanks");
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

  const inputClass =
    "w-full rounded border border-marine/50 bg-marine/10 px-4 py-3 text-foam placeholder:text-foam/30 focus:border-shoal focus:outline-none focus:ring-1 focus:ring-shoal transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Quote request form"
      onChange={() => track.quoteStart()}
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-foam/70 mb-1.5">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Travis Saltwater"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-foam/70 mb-1.5">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            placeholder="you@yourbusiness.com"
          />
        </div>

        <div>
          <label htmlFor="business" className="block text-sm text-foam/70 mb-1.5">
            Business name
          </label>
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Gulf Coast Plumbing"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-foam/70 mb-1.5">
            What do you need? <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${inputClass} resize-y`}
            placeholder="Tell us about your site, your goals, and where you're at now."
          />
        </div>

        {/* Honeypot — hidden from humans, checked server-side */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company (leave blank)</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {state.status === "error" && (
          <p role="alert" className="text-sm text-sun">
            {state.error}
          </p>
        )}

        <div>
          <Button
            type="submit"
            variant="primary"
            disabled={state.status === "loading"}
            className="w-full justify-center text-base py-4"
          >
            {state.status === "loading" ? "Sending…" : "Send it"}
          </Button>
          <p className="mt-2 text-center text-xs text-foam/30">
            No spam. Reply within one business day.
          </p>
        </div>
      </div>
    </form>
  );
}
