"use client";

import { useState, useRef, useEffect } from "react";
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
  const startTimeRef = useRef<number>(0);
  const hasStartedRef = useRef(false);

  useEffect(() => { startTimeRef.current = Date.now(); }, []);

  function handleFirstInteraction() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      track.quoteStart();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business") || undefined,
          message: data.get("message"),
          company: data.get("company") ?? "", // honeypot
          t: startTimeRef.current,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          json.error ?? `Something hiccuped — call us at ${site.phoneDisplay}`
        );
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
  const labelClass = "block text-sm text-foam/70 mb-1.5";

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Quote request form">
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            inputMode="text"
            className={inputClass}
            onFocus={handleFirstInteraction}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            onFocus={handleFirstInteraction}
          />
        </div>

        <div>
          <label htmlFor="business" className={labelClass}>
            Business &amp; website (if any)
          </label>
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            inputMode="url"
            className={inputClass}
            onFocus={handleFirstInteraction}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            What you need <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${inputClass} resize-y`}
            onFocus={handleFirstInteraction}
          />
        </div>

        {/* Honeypot — hidden from humans, checked server-side */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company (leave blank)</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
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
          <p className="mt-3 text-center text-xs text-foam/40">
            Prefer to talk it through?{" "}
            <a
              href={site.calcom}
              className="underline underline-offset-2 hover:text-shoal transition-colors"
              onClick={() => track.bookingClick()}
            >
              Book a strategy call
            </a>
            .
          </p>
        </div>
      </div>
    </form>
  );
}
