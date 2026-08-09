"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { track } from "@/lib/events";
import {
  INTERESTS,
  BOTTLENECKS,
  TEAM_SIZES,
  TIMELINES,
} from "@/data/quoteOptions";

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
          interest: data.get("interest") || undefined,
          bottleneck: data.get("bottleneck") || undefined,
          teamSize: data.get("teamSize") || undefined,
          timeline: data.get("timeline") || undefined,
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
  // Native select. Right rung of the ladder: it is keyboard accessible, screen-reader
  // correct, and mobile-native for free. A custom listbox would be more code and worse.
  const selectClass = `${inputClass} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10 [&>option]:bg-ink [&>option]:text-foam`;

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
            inputMode="text"
            className={inputClass}
            onFocus={handleFirstInteraction}
          />
        </div>

        <div>
          <label htmlFor="interest" className={labelClass}>
            What are you after?
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            className={selectClass}
            onFocus={handleFirstInteraction}
          >
            <option value="">Pick the closest one</option>
            {INTERESTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bottleneck" className={labelClass}>
            What eats the most time right now?
          </label>
          <select
            id="bottleneck"
            name="bottleneck"
            defaultValue=""
            className={selectClass}
            onFocus={handleFirstInteraction}
          >
            <option value="">Pick the closest one</option>
            {BOTTLENECKS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="teamSize" className={labelClass}>
              How many people?
            </label>
            <select
              id="teamSize"
              name="teamSize"
              defaultValue=""
              className={selectClass}
              onFocus={handleFirstInteraction}
            >
              <option value="">Select</option>
              {TEAM_SIZES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className={labelClass}>
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              defaultValue=""
              className={selectClass}
              onFocus={handleFirstInteraction}
            >
              <option value="">Select</option>
              {TIMELINES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Walk me through it <span aria-hidden="true">*</span>
          </label>
          <p className="mb-1.5 text-xs text-foam/40">
            What happens today, step by step, and where it falls apart. Specifics
            beat summaries — that is what makes the quote real.
          </p>
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
            Rather just talk?{" "}
            <a
              href={`tel:${site.phone}`}
              className="underline underline-offset-2 hover:text-shoal transition-colors"
              onClick={() => track.phoneClick()}
            >
              {site.phoneDisplay}
            </a>
            . Travis picks up.
          </p>
        </div>
      </div>
    </form>
  );
}
