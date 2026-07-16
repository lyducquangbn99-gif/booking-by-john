"use client";

import { useSyncExternalStore } from "react";
import {
  ANALYTICS_CONSENT_KEY,
  INTERNAL_VISITOR_KEY,
} from "@/lib/analytics";

export default function InternalVisitorControl() {
  const excluded = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      window.addEventListener("booking-analytics-preference", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("booking-analytics-preference", onChange);
      };
    },
    () => window.localStorage.getItem(INTERNAL_VISITOR_KEY) === "1",
    () => false,
  );

  function update(value: boolean) {
    if (value) {
      window.localStorage.setItem(INTERNAL_VISITOR_KEY, "1");
    } else {
      window.localStorage.removeItem(INTERNAL_VISITOR_KEY);
    }
    window.dispatchEvent(new Event("booking-analytics-preference"));
  }

  function resetConsent() {
    window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    window.dispatchEvent(new Event("booking-analytics-consent"));
  }

  return (
    <main className="min-h-screen bg-bg-primary px-5 py-20 text-text-primary">
      <div className="mx-auto max-w-xl rounded-xl border border-border-subtle bg-white p-8 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">
          Internal analytics control
        </p>
        <h1 className="mt-4 text-3xl font-black text-[#0B1F3A]">
          Exclude this browser from visitor reports
        </h1>
        <p className="mt-4 leading-7 text-text-secondary">
          Use this once on John&apos;s office computer and once on the home laptop. The setting stays only in this browser and does not collect an IP address.
        </p>
        <div className="mt-7 rounded-lg bg-bg-secondary p-4 text-sm font-bold text-text-secondary">
          Current status: {excluded ? "Excluded" : "Included"}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => update(true)}
            className="rounded-md bg-[#0B1F3A] px-5 py-3 font-black text-white"
          >
            Exclude this browser
          </button>
          <button
            type="button"
            onClick={() => update(false)}
            className="rounded-md border border-border-subtle px-5 py-3 font-black text-[#0B1F3A]"
          >
            Include again
          </button>
          <button
            type="button"
            onClick={resetConsent}
            className="rounded-md border border-border-subtle px-5 py-3 font-black text-[#0B1F3A]"
          >
            Reset analytics consent
          </button>
        </div>
      </div>
    </main>
  );
}
