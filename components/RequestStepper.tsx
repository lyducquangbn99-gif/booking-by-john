// components/RequestStepper.tsx
"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Truck,
  Package,
  Ship,
  Train,
  Zap,
  Plane,
  Waves,
  HelpCircle,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  mode: "",
  origin: "",
  destination: "",
  weightRange: "",
  cargoType: "",
  urgency: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

// Internal stable values used for form.mode and urgency — decoupled from display labels
// so the API email subject stays locale-independent.
const MODE_ENTRIES: { value: string; labelKey: string; icon: LucideIcon }[] = [
  { value: "FTL",           labelKey: "step1.modes.ftl",        icon: Truck },
  { value: "LTL",           labelKey: "step1.modes.ltl",        icon: Package },
  { value: "Drayage",       labelKey: "step1.modes.drayage",    icon: Ship },
  { value: "Intermodal",    labelKey: "step1.modes.intermodal", icon: Train },
  { value: "Expedited",     labelKey: "step1.modes.expedited",  icon: Zap },
  { value: "Courier",       labelKey: "step1.modes.courier",    icon: Plane },
  { value: "Ocean Freight", labelKey: "step1.modes.ocean",      icon: Waves },
  { value: "Other",         labelKey: "step1.modes.other",      icon: HelpCircle },
];

const WEIGHT_KEYS = [
  "under5k",
  "from5kTo20k",
  "from20kTo40k",
  "over40k",
  "notSure",
] as const;

const CARGO_KEYS = [
  "dryGoods",
  "refrigerated",
  "oversized",
  "hazmat",
  "highValue",
  "other",
] as const;

const URGENCY_ENTRIES: { value: string; labelKey: string; subKey: string; icon: LucideIcon; color: string }[] = [
  { value: "Flexible", labelKey: "step3.urgencyOptions.flexible.label", subKey: "step3.urgencyOptions.flexible.sub", icon: CheckCircle, color: "text-accent-green" },
  { value: "Standard", labelKey: "step3.urgencyOptions.standard.label", subKey: "step3.urgencyOptions.standard.sub", icon: Clock,        color: "text-yellow-400" },
  { value: "Hot",      labelKey: "step3.urgencyOptions.hot.label",      subKey: "step3.urgencyOptions.hot.sub",      icon: AlertCircle,  color: "text-accent-orange" },
];

const PHONE = "+84 352 193 969";

export default function RequestStepper() {
  const t = useTranslations('stepper');
  const locale = useLocale();

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
      setError(t('step2.errorOriginDestination'));
      return;
    }
    setError("");
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    if (!form.name || !(form.email || form.phone)) {
      setError(t('step4.errorContactRequired'));
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode: form.mode || "Unspecified", locale }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setSuccess(true);
      } else {
        setError(t('error.generic', { phone: PHONE }));
      }
    } catch {
      setError(t('error.generic', { phone: PHONE }));
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
        <div
          className="animate-overlay-fade fixed inset-0 z-50 flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="animate-card-scale bg-bg-card border border-border-subtle rounded-2xl p-12 max-w-md w-full text-center">
            <CheckCircle
              className="mx-auto mb-6 text-accent-green"
              size={56}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2
              id="success-title"
              className="font-display text-2xl font-bold text-text-primary mb-4"
            >
              {t('success.title')}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              {t('success.body', { phone: PHONE })}
            </p>
            <button
              onClick={dismiss}
              className="font-display font-bold text-sm text-bg-primary bg-accent-green px-8 py-3 rounded-md hover:-translate-y-px transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-green"
            >
              {t('success.dismiss')}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          {t('tagline')}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12">
          {t('heading')}
        </h2>

        {/* Progress bar */}
        <div
          className="grid grid-cols-4 gap-1.5 mb-12"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={4}
          aria-label={t('progressLabel', { step })}
        >
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
          {step === 1 && (
            <Step1 t={t} mode={form.mode} onSelect={(v) => update("mode", v)} />
          )}
          {step === 2 && (
            <Step2
              t={t}
              origin={form.origin}
              destination={form.destination}
              weightRange={form.weightRange}
              cargoType={form.cargoType}
              onChange={update}
            />
          )}
          {step === 3 && (
            <Step3
              t={t}
              urgency={form.urgency}
              onSelect={(v) => update("urgency", v)}
            />
          )}
          {step === 4 && <Step4 t={t} form={form} onChange={update} error={error} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10">
          {step > 1 ? (
            <button
              onClick={() => {
                setError("");
                setStep((s) => s - 1);
              }}
              className="border border-border-subtle text-text-secondary text-sm px-6 py-3 rounded-md hover:text-text-primary hover:border-white/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green min-h-[44px]"
            >
              {t('backButton')}
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="font-display font-bold text-sm text-bg-primary bg-accent-green px-7 py-3 rounded-md hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.3)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-green min-h-[44px]"
            >
              {t('nextButton')}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              aria-disabled={submitting}
              className={`font-display font-bold text-sm text-bg-primary px-7 py-3 rounded-md transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-green ${
                submitting
                  ? "bg-text-muted cursor-not-allowed"
                  : "bg-accent-green hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.3)] cursor-pointer"
              }`}
            >
              {submitting ? t('submitting') : t('submitButton')}
            </button>
          )}
        </div>

        {error && step !== 4 && (
          <p
            className="text-accent-orange text-xs mt-3 text-right"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

/* ── Step sub-components ── */

type TFunc = ReturnType<typeof useTranslations<'stepper'>>;

function Step1({ t, mode, onSelect }: { t: TFunc; mode: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
        {t('step1.heading')}
      </h3>
      <p className="text-sm text-text-muted mb-7">
        {t('step1.subheading')}
      </p>
      <div
        className="grid grid-cols-4 gap-2.5"
        role="group"
        aria-label={t('step1.ariaGroupLabel')}
      >
        {MODE_ENTRIES.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.value}
              onClick={() => onSelect(m.value)}
              aria-pressed={mode === m.value}
              className={`flex flex-col items-center gap-2 rounded-xl p-4 border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green min-h-[72px] ${
                mode === m.value
                  ? "bg-accent-green/10 border-accent-green"
                  : "bg-bg-card border-border-subtle hover:border-white/20"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
                className={mode === m.value ? "text-accent-green" : "text-text-secondary"}
              />
              <span
                className={`font-display text-[11px] text-center ${
                  mode === m.value ? "text-accent-green" : "text-text-secondary"
                }`}
              >
                {t(m.labelKey as Parameters<TFunc>[0])}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step2({
  t,
  origin,
  destination,
  weightRange,
  cargoType,
  onChange,
}: {
  t: TFunc;
  origin: string;
  destination: string;
  weightRange: string;
  cargoType: string;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  const inputClass =
    "w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-green/50 transition-colors duration-200 min-h-[44px]";
  const labelClass = "block text-xs text-text-muted mb-2 tracking-wide";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">
          {t('step2.heading')}
        </h3>
        <p className="text-sm text-text-muted mb-7">
          {t('step2.subheading')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="origin" className={labelClass}>
            {t('step2.originLabel')}
          </label>
          <input
            id="origin"
            className={inputClass}
            placeholder={t('step2.originPlaceholder')}
            value={origin}
            onChange={(e) => onChange("origin", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="destination" className={labelClass}>
            {t('step2.destinationLabel')}
          </label>
          <input
            id="destination"
            className={inputClass}
            placeholder={t('step2.destinationPlaceholder')}
            value={destination}
            onChange={(e) => onChange("destination", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="weightRange" className={labelClass}>
          {t('step2.weightLabel')}
        </label>
        <select
          id="weightRange"
          className={inputClass}
          value={weightRange}
          onChange={(e) => onChange("weightRange", e.target.value)}
        >
          <option value="">{t('step2.weightPlaceholder')}</option>
          {WEIGHT_KEYS.map((key) => (
            <option key={key} value={t(`step2.weightOptions.${key}`)}>
              {t(`step2.weightOptions.${key}`)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cargoType" className={labelClass}>
          {t('step2.cargoLabel')}
        </label>
        <select
          id="cargoType"
          className={inputClass}
          value={cargoType}
          onChange={(e) => onChange("cargoType", e.target.value)}
        >
          <option value="">{t('step2.cargoPlaceholder')}</option>
          {CARGO_KEYS.map((key) => (
            <option key={key} value={t(`step2.cargoOptions.${key}`)}>
              {t(`step2.cargoOptions.${key}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Step3({ t, urgency, onSelect }: { t: TFunc; urgency: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
        {t('step3.heading')}
      </h3>
      <p className="text-sm text-text-muted mb-7">
        {t('step3.subheading')}
      </p>
      <div className="flex flex-col gap-3" role="group" aria-label={t('step3.ariaGroupLabel')}>
        {URGENCY_ENTRIES.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              aria-pressed={urgency === opt.value}
              className={`flex items-center gap-4 text-left rounded-xl px-6 py-5 border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green min-h-[72px] ${
                urgency === opt.value
                  ? "bg-accent-green/8 border-accent-green"
                  : "bg-bg-card border-border-subtle hover:border-white/20"
              }`}
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                aria-hidden="true"
                className={urgency === opt.value ? "text-accent-green" : opt.color}
              />
              <div>
                <div
                  className={`font-display font-bold text-sm ${
                    urgency === opt.value ? "text-accent-green" : "text-text-primary"
                  }`}
                >
                  {t(opt.labelKey as Parameters<TFunc>[0])}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {t(opt.subKey as Parameters<TFunc>[0])}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({
  t,
  form,
  onChange,
  error,
}: {
  t: TFunc;
  form: FormData;
  onChange: (key: keyof FormData, value: string) => void;
  error: string;
}) {
  const inputClass =
    "w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-green/50 transition-colors duration-200 min-h-[44px]";
  const labelClass = "block text-xs text-text-muted mb-2 tracking-wide";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-2">
          {t('step4.heading')}
        </h3>
        <p className="text-sm text-text-muted mb-7">
          {t('step4.subheading')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t('step4.nameLabel')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            className={inputClass}
            placeholder={t('step4.nameLabel')}
            autoComplete="name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {t('step4.companyLabel')}
          </label>
          <input
            id="company"
            className={inputClass}
            placeholder={t('step4.companyPlaceholder')}
            autoComplete="organization"
            value={form.company}
            onChange={(e) => onChange("company", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t('step4.emailLabel')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder={t('step4.emailPlaceholder')}
            autoComplete="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t('step4.phoneLabel')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            placeholder={t('step4.phonePlaceholder')}
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className={labelClass}>
          {t('step4.notesLabel')}
        </label>
        <textarea
          id="notes"
          className={`${inputClass} min-h-24 resize-y`}
          placeholder={t('step4.notesPlaceholder')}
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
        />
      </div>
      {error && (
        <p className="text-accent-orange text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
