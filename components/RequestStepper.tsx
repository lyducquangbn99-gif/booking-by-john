// components/RequestStepper.tsx
"use client";

import { useState } from "react";

type FormData = {
  mode: string;
  origin: string;
  destination: string;
  weightRange: string;
  cargoType: string;
  urgency: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
};

const EMPTY_FORM: FormData = {
  mode: "", origin: "", destination: "", weightRange: "",
  cargoType: "", urgency: "", name: "", email: "",
  phone: "", company: "", notes: "",
};

const modes = [
  { label: "FTL",           icon: "🚛" },
  { label: "LTL",           icon: "📦" },
  { label: "Drayage",       icon: "🚢" },
  { label: "Intermodal",    icon: "🚂" },
  { label: "Expedited",     icon: "⚡" },
  { label: "Courier",       icon: "✈️" },
  { label: "Ocean Freight", icon: "🌊" },
  { label: "Other",         icon: "❓" },
];

const weightOptions = [
  "Under 5,000 lbs", "5,000–20,000 lbs",
  "20,000–40,000 lbs", "40,000+ lbs", "Not sure yet",
];

const cargoOptions = [
  "Dry Goods", "Refrigerated/Temp-Controlled",
  "Oversized/Heavy Haul", "Hazmat", "High Value", "Other",
];

const urgencyOptions = [
  { label: "Flexible", sub: "5+ days",          icon: "🟢" },
  { label: "Standard", sub: "2–4 days",          icon: "🟡" },
  { label: "Hot",      sub: "Need it yesterday", icon: "🔴" },
];

export default function RequestStepper() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function canProceed(): boolean {
    if (step === 2) return !!(form.origin || form.destination);
    return true;
  }

  function handleNext() {
    if (!canProceed()) {
      setError("Please enter at least an origin or destination.");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    if (!form.name || !(form.email || form.phone)) {
      setError("Please enter your name and at least one way to reach you.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode: form.mode || "Unspecified" }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setSuccess(true);
      } else {
        setError("Something went wrong. Please call Mr. John directly at +84 352 193 969");
      }
    } catch {
      setError("Something went wrong. Please call Mr. John directly at +84 352 193 969");
    } finally {
      setSubmitting(false);
    }
  }

  function dismiss() {
    setSuccess(false);
    setStep(1);
    setForm(EMPTY_FORM);
    setError("");
  }

  return (
    <section id="request" className="relative bg-bg-secondary py-24 px-6">

      {/* Success overlay */}
      {success && (
        <div className="animate-overlay-fade fixed inset-0 z-50 flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md">
          <div className="animate-card-scale bg-bg-card border border-border-subtle rounded-2xl p-12 max-w-md w-full text-center">
            <div className="text-5xl mb-6">✅</div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Request received — John&apos;s on it.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Expect a personal follow-up within 2 hours during business hours.
              For urgent requests, call directly:{" "}
              <strong className="text-text-primary">+84 352 193 969</strong>
            </p>
            <button
              onClick={dismiss}
              className="font-display font-bold text-sm text-bg-primary bg-accent-green px-8 py-3 rounded-md hover:-translate-y-px transition-all duration-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          Get a quote
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12">
          Send me the details — I&apos;ll handle the rest.
        </h2>

        {/* Progress bar */}
        <div className="grid grid-cols-4 gap-1.5 mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-colors duration-300 ${
                s <= step ? "bg-accent-green" : "bg-border-subtle"
              }`}
            />
          ))}
        </div>

        {/* Step content — key forces remount → triggers fadeStep animation */}
        <div key={step} className="animate-fade-step">
          {step === 1 && <Step1 mode={form.mode} onSelect={(v) => update("mode", v)} />}
          {step === 2 && (
            <Step2
              origin={form.origin}
              destination={form.destination}
              weightRange={form.weightRange}
              cargoType={form.cargoType}
              onChange={update}
            />
          )}
          {step === 3 && <Step3 urgency={form.urgency} onSelect={(v) => update("urgency", v)} />}
          {step === 4 && <Step4 form={form} onChange={update} error={error} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10">
          {step > 1 ? (
            <button
              onClick={() => { setError(""); setStep((s) => s - 1); }}
              className="border border-border-subtle text-text-secondary text-sm px-6 py-3 rounded-md hover:text-text-primary hover:border-white/20 transition-all duration-200"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="font-display font-bold text-sm text-bg-primary bg-accent-green px-7 py-3 rounded-md hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.3)] transition-all duration-200"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`font-display font-bold text-sm text-bg-primary px-7 py-3 rounded-md transition-all duration-200 ${
                submitting
                  ? "bg-text-muted cursor-not-allowed"
                  : "bg-accent-green hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.3)]"
              }`}
            >
              {submitting ? "Sending..." : "Let's move your freight →"}
            </button>
          )}
        </div>

        {error && step !== 4 && (
          <p className="text-accent-orange text-xs mt-3 text-right">{error}</p>
        )}
      </div>
    </section>
  );
}

/* ── Step sub-components ── */

function Step1({ mode, onSelect }: { mode: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
        What type of move?
      </h3>
      <p className="text-sm text-text-muted mb-7">
        Select the mode that best fits. Not sure? Pick &quot;Other&quot; and we&apos;ll sort it out.
      </p>
      <div className="grid grid-cols-4 gap-2.5">
        {modes.map((m) => (
          <button
            key={m.label}
            onClick={() => onSelect(m.label)}
            className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all duration-150 ${
              mode === m.label
                ? "bg-accent-green/10 border-accent-green"
                : "bg-bg-card border-border-subtle hover:border-white/20"
            }`}
          >
            <span className="text-2xl">{m.icon}</span>
            <span className={`font-display text-[11px] text-center ${
              mode === m.label ? "text-accent-green" : "text-text-secondary"
            }`}>
              {m.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({
  origin, destination, weightRange, cargoType, onChange,
}: {
  origin: string; destination: string; weightRange: string;
  cargoType: string; onChange: (key: keyof FormData, value: string) => void;
}) {
  const inputClass = "w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-green/50 transition-colors duration-200";
  const labelClass = "block text-xs text-text-muted mb-2 tracking-wide";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">
          Where&apos;s it going?
        </h3>
        <p className="text-sm text-text-muted mb-7">
          City or ZIP is fine — we&apos;ll confirm the details on our call.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Origin</label>
          <input className={inputClass} placeholder="e.g. Ho Chi Minh City"
            value={origin} onChange={(e) => onChange("origin", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Destination</label>
          <input className={inputClass} placeholder="e.g. Rotterdam"
            value={destination} onChange={(e) => onChange("destination", e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Weight Range</label>
        <select className={inputClass} value={weightRange}
          onChange={(e) => onChange("weightRange", e.target.value)}>
          <option value="">Select weight range</option>
          {weightOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Cargo Type (optional)</label>
        <select className={inputClass} value={cargoType}
          onChange={(e) => onChange("cargoType", e.target.value)}>
          <option value="">Select cargo type</option>
          {cargoOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

function Step3({ urgency, onSelect }: { urgency: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
        How soon does it need to move?
      </h3>
      <p className="text-sm text-text-muted mb-7">
        This helps me prioritize and find the best rate match.
      </p>
      <div className="flex flex-col gap-3">
        {urgencyOptions.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onSelect(opt.label)}
            className={`flex items-center gap-4 text-left rounded-xl px-6 py-5 border transition-all duration-150 ${
              urgency === opt.label
                ? "bg-accent-green/8 border-accent-green"
                : "bg-bg-card border-border-subtle hover:border-white/20"
            }`}
          >
            <span className="text-2xl">{opt.icon}</span>
            <div>
              <div className={`font-display font-bold text-sm ${
                urgency === opt.label ? "text-accent-green" : "text-text-primary"
              }`}>
                {opt.label}
              </div>
              <div className="text-xs text-text-muted mt-0.5">{opt.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step4({
  form, onChange, error,
}: {
  form: FormData; onChange: (key: keyof FormData, value: string) => void; error: string;
}) {
  const inputClass = "w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-green/50 transition-colors duration-200";
  const labelClass = "block text-xs text-text-muted mb-2 tracking-wide";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">
          How do I reach you?
        </h3>
        <p className="text-sm text-text-muted mb-7">
          Mr. John will follow up personally — no bots, no auto-emails.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input className={inputClass} placeholder="Your name"
            value={form.name} onChange={(e) => onChange("name", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Company</label>
          <input className={inputClass} placeholder="Company (optional)"
            value={form.company} onChange={(e) => onChange("company", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" className={inputClass} placeholder="you@company.com"
            value={form.email} onChange={(e) => onChange("email", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input type="tel" className={inputClass} placeholder="+1 (555) 000-0000"
            value={form.phone} onChange={(e) => onChange("phone", e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Notes / Special Requirements</label>
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          placeholder="Anything else we should know?"
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
        />
      </div>
      {error && (
        <p className="text-accent-orange text-xs">{error}</p>
      )}
    </div>
  );
}
