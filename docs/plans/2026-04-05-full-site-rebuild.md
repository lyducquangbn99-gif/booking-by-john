# Booking by John — Full Site Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the minimal MVP page with a full single-page marketing site matching the PRD spec: sticky nav, hero, stats bar, 7 service cards, 6 trust cards, ocean routes, 4-step stepper form, tricky shipment CTA, and footer.

**Architecture:** One React component per section, all imported into `app/page.tsx`. The stepper manages its own local state. The API route is updated to accept the full stepper form payload and write expanded columns to Supabase.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4 (`@theme` tokens in globals.css), Nodemailer (Gmail SMTP), Supabase (PostgreSQL), next/font/google (Space Mono + DM Sans)

---

## Pre-flight: Supabase Schema Migration

Before any code, run this SQL in the Supabase dashboard SQL editor:

```sql
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS mode TEXT,
  ADD COLUMN IF NOT EXISTS origin TEXT,
  ADD COLUMN IF NOT EXISTS destination TEXT,
  ADD COLUMN IF NOT EXISTS weight_range TEXT,
  ADD COLUMN IF NOT EXISTS cargo_type TEXT,
  ADD COLUMN IF NOT EXISTS urgency TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT;
```

---

## Tailwind v4 Token Strategy

Tailwind v4 uses `@theme` in `globals.css` to register design tokens. Once defined, tokens become utility classes automatically:

| Token defined as | Used as Tailwind class |
|---|---|
| `--color-bg-primary: #0C0F12` | `bg-bg-primary`, `text-bg-primary` |
| `--color-accent-green: #00E87B` | `bg-accent-green`, `text-accent-green`, `border-accent-green` |
| `--color-text-secondary: #8A93A6` | `text-text-secondary` |
| `--font-display: ...` | `font-display` |
| `--font-body: ...` | `font-body` |

Inline styles are only used for truly dynamic values (e.g. computed widths, JS-driven transforms).

---

## Task 1: Global Styles, Design Tokens & Fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Replace globals.css with Tailwind v4 theme tokens + keyframes**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Background colors */
  --color-bg-primary: #0C0F12;
  --color-bg-secondary: #141820;
  --color-bg-card: #1A1F28;

  /* Accent colors */
  --color-accent-green: #00E87B;
  --color-accent-orange: #FF6B35;

  /* Text colors */
  --color-text-primary: #F0F2F5;
  --color-text-secondary: #8A93A6;
  --color-text-muted: #5A6377;

  /* Border */
  --color-border-subtle: rgba(255, 255, 255, 0.06);

  /* Fonts */
  --font-display: var(--font-space-mono), monospace;
  --font-body: var(--font-dm-sans), sans-serif;

  /* Keyframe animations */
  --animate-fade-step: fadeStep 350ms ease forwards;
  --animate-logo-pulse: logoPulse 2s ease-in-out infinite;
  --animate-overlay-fade: overlayFadeIn 300ms ease forwards;
  --animate-card-scale: cardScaleIn 350ms ease forwards;
}

@keyframes fadeStep {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes logoPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.85); }
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes cardScaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0C0F12;
  color: #F0F2F5;
  font-family: var(--font-dm-sans), sans-serif;
}
```

**Step 2: Update layout.tsx — load fonts, update metadata**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const dmSans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Booking by John — Freight Brokerage & Ocean Freight from Vietnam",
  description:
    "Freight broker Vietnam. Ocean freight VNSGN to Europe & South America. Courier Vietnam worldwide. Vetted carriers, real-time visibility, 2-hour quote SLA.",
  openGraph: {
    title: "Booking by John — Freight Brokerage & Ocean Freight from Vietnam",
    description:
      "No runaround, no generic quotes. Vetted carriers, real-time visibility, and a broker who picks up the phone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 3: Verify**

Run `npm run dev`. Inspect `<html>` in devtools — confirm `--font-space-mono` and `--font-dm-sans` CSS variables are present. Body background should be #0C0F12.

**Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: Tailwind v4 design tokens, keyframes, Space Mono + DM Sans fonts"
```

---

## Task 2: Nav Component

**Files:**
- Create: `components/Nav.tsx`

**Step 1: Create Nav.tsx**

```tsx
// components/Nav.tsx
"use client";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle backdrop-blur-md bg-bg-primary/85">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
          Booking by John
          <span className="animate-logo-pulse inline-block w-2 h-2 rounded-full bg-accent-green" />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          <a
            href="#services"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#trust"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Why Us
          </a>
          <a
            href="#routes"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Routes
          </a>
          <a
            href="#request"
            className="font-display text-sm font-bold text-bg-primary bg-accent-green px-5 py-2.5 rounded-md hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.4)] transition-all duration-200"
          >
            Get Moving
          </a>
        </nav>
      </div>
    </header>
  );
}
```

**Step 2: Wire into page.tsx temporarily**

```tsx
// app/page.tsx
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
    </main>
  );
}
```

**Step 3: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: sticky glassmorphism nav with logo pulse and CTA"
```

---

## Task 3: Hero Section

**Files:**
- Create: `components/Hero.tsx`

**Step 1: Create Hero.tsx**

```tsx
// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-bg-primary">

      {/* Radial glow — top right */}
      <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,123,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-6">
          Freight brokerage — done right
        </p>

        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-text-primary max-w-3xl mb-7">
          Your cargo is revenue.{" "}
          <span className="text-accent-green">We treat it that way.</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-xl leading-relaxed mb-12">
          No runaround, no generic quotes. Vetted carriers, real-time
          visibility, and a broker who picks up the phone.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#request"
            className="font-display font-bold text-sm text-bg-primary bg-accent-green px-8 py-4 rounded-md hover:-translate-y-px hover:shadow-[0_0_24px_rgba(0,232,123,0.35)] transition-all duration-200"
          >
            Let&apos;s move your freight →
          </a>
          <a
            href="#trust"
            className="font-display text-sm text-text-secondary border border-border-subtle px-8 py-4 rounded-md hover:text-text-primary hover:border-white/20 transition-all duration-200"
          >
            See the numbers
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx, verify dark background + green headline + two CTAs in browser.**

**Step 3: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: hero section with headline, radial glow, and CTAs"
```

---

## Task 4: Stats Bar

**Files:**
- Create: `components/StatsBar.tsx`

**Step 1: Create StatsBar.tsx**

```tsx
// components/StatsBar.tsx
const stats = [
  { value: "500+",   label: "Shipments Handled" },
  { value: "97.2%",  label: "On-Time Rate" },
  { value: "<2hr",   label: "Avg. Quote Time" },
  { value: "0.3%",   label: "Claim Rate" },
];

export default function StatsBar() {
  return (
    <section className="bg-bg-secondary border-y border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`py-10 px-6 text-center ${
              i < stats.length - 1 ? "border-r border-border-subtle" : ""
            }`}
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-accent-green mb-2">
              {stat.value}
            </div>
            <div className="text-xs text-text-muted tracking-widest uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx, commit**

```bash
git add components/StatsBar.tsx app/page.tsx
git commit -m "feat: stats bar with 4 key metrics"
```

---

## Task 5: Services Section

**Files:**
- Create: `components/Services.tsx`

**Step 1: Create Services.tsx**

```tsx
// components/Services.tsx
const services = [
  { icon: "🚛", title: "Full Truckload (FTL)",    description: "Dedicated capacity for loads 10K+ lbs. Direct, no stops, fast transit." },
  { icon: "📦", title: "LTL",                      description: "Cost-efficient for palletized freight under 10K lbs with flexible pickup." },
  { icon: "🚢", title: "Drayage",                  description: "Port-to-warehouse container moves. Chassis management included." },
  { icon: "🚂", title: "Intermodal",               description: "Rail + truck combo for long-haul savings without sacrificing reliability." },
  { icon: "⚡", title: "Expedited",                description: "Hot shots, team drivers, air freight. When it absolutely can't wait." },
  { icon: "✈️", title: "Courier — VN to World",   description: "Authorized agent for UPS, DHL, and FedEx in Vietnam. Fast, door-to-door delivery worldwide." },
  { icon: "🌊", title: "Ocean Freight",            description: "From/to Vietnam to the world. Competitive rates with suitable schedules for your shipment." },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg-primary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          What we move
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          Seven ways to ship
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle rounded-xl p-8 hover:-translate-y-1 hover:border-accent-green transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx, commit**

```bash
git add components/Services.tsx app/page.tsx
git commit -m "feat: services section with 7 service cards"
```

---

## Task 6: Trust Section

**Files:**
- Create: `components/Trust.tsx`

**Step 1: Create Trust.tsx**

```tsx
// components/Trust.tsx
const trustPoints = [
  {
    title: "Carrier Vetting",
    detail: "FMCSA clearance, $1M+ cargo insurance, safety score monitoring, no double-brokering.",
  },
  {
    title: "Live Tracking",
    detail: "GPS pings every 15 min, proactive check-call updates.",
  },
  {
    title: "2-Hour Quote SLA",
    detail: "Standard lanes within 2 hours; complex lanes same-day.",
  },
  {
    title: "Claims Under 0.5%",
    detail: "Full claims support, resolution typically under 30 days.",
  },
  {
    title: "One Point of Contact",
    detail: "Named rep with direct line, knows your lanes and preferences.",
  },
  {
    title: "Specialized Freight",
    detail: "Oversized, temp-controlled, hazmat, high-value experience.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="bg-bg-secondary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          Why us
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          Built on proof, not promises
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustPoints.map((point, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle border-t-transparent hover:border-t-accent-green rounded-xl p-8 hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx, commit**

```bash
git add components/Trust.tsx app/page.tsx
git commit -m "feat: trust section with 6 proof-point cards and green top-border hover"
```

---

## Task 7: Ocean Routes Section

**Files:**
- Create: `components/OceanRoutes.tsx`

**Step 1: Create OceanRoutes.tsx**

```tsx
// components/OceanRoutes.tsx
const routes = [
  { port: "Antwerp, Belgium",        code: "BEANR", hot: true },
  { port: "Rotterdam, Netherlands",  code: "NLRTM", hot: true },
  { port: "Hamburg, Germany",        code: "DEHAM", hot: true },
  { port: "Le Havre, France",        code: "FRLEH", hot: false },
  { port: "Genoa, Italy",            code: "ITGOA", hot: false },
  { port: "Durres, Albania",         code: "ALDRZ", hot: false },
  { port: "Santos, Brazil",          code: "BRSSZ", hot: false },
  { port: "Buenos Aires, Argentina", code: "ARBUE", hot: false },
];

const origins = [
  "Ho Chi Minh City (VNSGN)",
  "Hai Phong (VNHPH)",
];

export default function OceanRoutes() {
  return (
    <section id="routes" className="bg-bg-primary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          Ocean coverage
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          Vietnam to Europe &amp; South America
        </h2>

        <div className="flex flex-col gap-12">
          {origins.map((origin) => (
            <div key={origin}>
              <p className="font-display text-xs text-text-muted tracking-widest uppercase mb-5">
                Origin: {origin}
              </p>
              <div className="flex flex-wrap gap-3">
                {routes.map((route) => (
                  <div
                    key={route.code}
                    className="inline-flex items-center gap-2 border border-border-subtle rounded-full px-4 py-2 text-sm text-text-secondary hover:border-accent-green hover:text-accent-green hover:bg-accent-green/5 transition-all duration-200 cursor-default"
                  >
                    <span className="font-display text-xs text-text-muted">
                      {route.code}
                    </span>
                    <span>{route.port}</span>
                    {route.hot && (
                      <span className="font-display text-[10px] font-bold text-white bg-accent-orange px-1.5 py-0.5 rounded tracking-wide">
                        HOT
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx, commit**

```bash
git add components/OceanRoutes.tsx app/page.tsx
git commit -m "feat: ocean routes section with lane tags and HOT badges"
```

---

## Task 8: Request Stepper

**Files:**
- Create: `components/RequestStepper.tsx`

**Key pattern:** `key={step}` on the step wrapper div forces React to remount it on each step change, triggering the `animate-fade-step` CSS animation automatically.

**Step 1: Create RequestStepper.tsx**

```tsx
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
```

**Step 2: Add to page.tsx, verify all 4 steps work, back button preserves state, success overlay appears.**

**Step 3: Commit**

```bash
git add components/RequestStepper.tsx app/page.tsx
git commit -m "feat: 4-step request stepper with validation, CSS animations, and success overlay"
```

---

## Task 9: Tricky Shipment CTA Banner

**Files:**
- Create: `components/TrickyShipmentCTA.tsx`

**Step 1: Create TrickyShipmentCTA.tsx**

```tsx
// components/TrickyShipmentCTA.tsx
export default function TrickyShipmentCTA() {
  return (
    <section className="relative bg-bg-primary py-24 px-6 overflow-hidden">
      {/* Orange radial glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(255,107,53,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-5">
          Got a tricky shipment?
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
          Oversized, hazmat, multi-stop, cross-border — the harder it is, the
          more you need someone who&apos;s done it before. Let&apos;s figure it
          out together.
        </p>
        <a
          href="#request"
          className="inline-block font-display font-bold text-sm text-white bg-accent-orange px-9 py-4 rounded-md hover:-translate-y-px hover:shadow-[0_0_24px_rgba(255,107,53,0.4)] transition-all duration-200"
        >
          Tell me about it →
        </a>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx, commit**

```bash
git add components/TrickyShipmentCTA.tsx app/page.tsx
git commit -m "feat: tricky shipment CTA banner with orange accent and radial glow"
```

---

## Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`

**Step 1: Create Footer.tsx**

```tsx
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8">
        <div>
          <div className="font-display text-base font-bold text-text-primary mb-3">
            Booking by John
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Freight brokerage &amp; ocean freight from Vietnam.
            <br />
            MC# TBD · USDOT# TBD
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-xs text-text-muted tracking-widest uppercase mb-1">
            Contact
          </p>
          <a
            href="mailto:BookingbyJohnly@gmail.com"
            className="text-sm text-text-secondary hover:text-accent-green transition-colors duration-200"
          >
            BookingbyJohnly@gmail.com
          </a>
          <a
            href="tel:+84352193969"
            className="text-sm text-text-secondary hover:text-accent-green transition-colors duration-200"
          >
            +84 352 193 969
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border-subtle text-center text-xs text-text-muted">
        © {new Date().getFullYear()} Booking by John. All rights reserved.
      </div>
    </footer>
  );
}
```

**Step 2: Add to page.tsx, commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: footer with contact info and licensing placeholders"
```

---

## Task 11: Final page.tsx Assembly

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace page.tsx with full assembly**

```tsx
// app/page.tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import OceanRoutes from "@/components/OceanRoutes";
import RequestStepper from "@/components/RequestStepper";
import TrickyShipmentCTA from "@/components/TrickyShipmentCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsBar />
      <Services />
      <Trust />
      <OceanRoutes />
      <RequestStepper />
      <TrickyShipmentCTA />
      <Footer />
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full single-page site in page.tsx"
```

---

## Task 12: Update API Route

**Files:**
- Modify: `app/api/send-booking/route.ts`

**Step 1: Replace route.ts**

```ts
// app/api/send-booking/route.ts
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      mode, origin, destination, weightRange, cargoType,
      urgency, name, email, phone, company, notes,
    } = data;

    const { error: dbError } = await supabase.from("bookings").insert([{
      name,
      email,
      message: notes || "",
      mode,
      origin,
      destination,
      weight_range: weightRange,
      cargo_type: cargoType,
      urgency,
      phone,
      company,
      notes,
    }]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return Response.json({ error: "Database error" }, { status: 500 });
    }

    // Admin notification
    await transporter.sendMail({
      from: '"Booking by John" <bookingbyjohnly@gmail.com>',
      to: "bookingbyjohnly@gmail.com",
      subject: `New Freight Request from ${name} — ${mode}`,
      html: `
        <div style="font-family:monospace;background:#0C0F12;color:#F0F2F5;padding:32px;border-radius:8px;">
          <h2 style="color:#00E87B;margin-bottom:24px;">New Freight Request</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#8A93A6;width:140px;">Mode</td><td>${mode}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Origin</td><td>${origin || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Destination</td><td>${destination || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Weight</td><td>${weightRange || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Cargo Type</td><td>${cargoType || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Urgency</td><td>${urgency || "—"}</td></tr>
            <tr><td colspan="2" style="border-top:1px solid #1A1F28;padding:12px 0 0;"></td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Email</td><td>${email || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Company</td><td>${company || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#8A93A6;">Notes</td><td>${notes || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    // Customer confirmation — only if email provided
    if (email) {
      await transporter.sendMail({
        from: '"Booking by John" <bookingbyjohnly@gmail.com>',
        to: email,
        subject: "Request received — John's on it.",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:560px;margin:0 auto;">
            <h2 style="color:#00E87B;">Request received ✅</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your freight inquiry has been received. Expect a personal follow-up from Mr. John within <strong>2 hours</strong> during business hours.</p>
            <p>For urgent requests, call directly: <strong>+84 352 193 969</strong></p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="color:#666;font-size:13px;">Booking by John · BookingbyJohnly@gmail.com</p>
          </div>
        `,
      });
    }

    return Response.json({ status: "success" });
  } catch (err) {
    console.error(err);
    return Response.json({ status: "error", message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "API send-booking is live ✅" });
}
```

**Step 2: Commit**

```bash
git add app/api/send-booking/route.ts
git commit -m "feat: update API to handle full stepper payload and expanded Supabase columns"
```

---

## Task 13: Final QA Checklist

Run `npm run build` — fix any TypeScript errors before proceeding.

Then verify in browser:

- [ ] All 9 sections render (Nav, Hero, Stats, Services, Trust, Routes, Stepper, Tricky CTA, Footer)
- [ ] Nav text links hidden on mobile (< 768px), only CTA button visible
- [ ] Nav links scroll to correct sections
- [ ] Stats bar: 4 columns on desktop, 2×2 on mobile
- [ ] Service cards: hover lifts and shows green border
- [ ] Trust cards: hover lifts and reveals green top border
- [ ] Lane tags: hover turns green
- [ ] Stepper Step 1: can skip (soft), mode button highlights on select
- [ ] Stepper Step 2: Next blocked if both origin and destination empty
- [ ] Stepper Step 3: urgency button highlights on select
- [ ] Stepper Step 4: submit blocked without name + email/phone
- [ ] Stepper: Back button preserves all previous selections
- [ ] Stepper: fadeStep animation plays on every step transition
- [ ] Stepper: Success overlay appears on submit, "Got it" resets to Step 1
- [ ] API: form submission sends email to bookingbyjohnly@gmail.com
- [ ] Footer links: email and phone are clickable

**Final commit:**

```bash
git commit -m "chore: full site rebuild QA complete"
```
