"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { CheckCircle2, ChevronLeft, Mail, MessageCircle, Send, X } from "lucide-react";
import { PORT_ROUTES } from "@/lib/port-routes";
import { trackBookingEvent } from "@/lib/analytics";

const PHONE_NUMBER = "84352193969";
const DISPLAY_PHONE = "+84 352 193 969";
const EMAIL = "BookingbyJohnly@gmail.com";

type Flow = "menu" | "quote" | "partner" | "contact";
type Mode = "FCL" | "LCL" | "Air";

type QuoteForm = {
  origin: string; destination: string; mode: Mode; commodity: string; cargoDetails: string;
  readyDate: string; incoterm: string; name: string; email: string; phone: string; company: string;
};

const EMPTY_FORM: QuoteForm = {
  origin: "", destination: "", mode: "FCL", commodity: "", cargoDetails: "",
  readyDate: "", incoterm: "", name: "", email: "", phone: "", company: "",
};

const ROUTE_PRESETS: Record<string, [string, string]> = {
  "vietnam-to-italy": ["Vietnam", "Italy"],
  "vietnam-to-spain": ["Vietnam", "Spain"],
  "vietnam-to-indonesia": ["Vietnam", "Indonesia"],
  "vietnam-to-taiwan": ["Vietnam", "Taiwan"],
  "hai-phong-to-jakarta": ["Hai Phong, Vietnam", "Jakarta, Indonesia"],
};

function getRoutePreset(pathname: string): [string, string] | null {
  const slug = pathname.match(/\/routes\/([^/?#]+)/)?.[1];
  if (!slug) return null;
  const portRoute = PORT_ROUTES.find((route) => route.slug === slug);
  if (portRoute) return [portRoute.origin, portRoute.destination];
  return ROUTE_PRESETS[slug] || null;
}

export default function FreightChatbox() {
  const locale = useLocale();
  const pathname = usePathname();
  const preset = useMemo(() => getRoutePreset(pathname), [pathname]);
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>("menu");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<QuoteForm>({ ...EMPTY_FORM, origin: preset?.[0] || "", destination: preset?.[1] || "" });
  const [partnerScope, setPartnerScope] = useState("");
  const [partnerMarket, setPartnerMarket] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const startedAt = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button, input")?.focus(), 0);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  function launch(nextFlow: Flow) {
    setFlow(nextFlow);
    setStep(1);
    setStatus("idle");
    startedAt.current = Date.now();
    if (nextFlow === "quote" && preset) {
      setForm((current) => ({ ...current, origin: preset[0], destination: preset[1] }));
    }
    trackBookingEvent("chatbox_flow_start", { flow: nextFlow, locale, route_preset: Boolean(preset) });
  }

  function update(key: keyof QuoteForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function isContactValid() {
    return form.name.trim() && (form.email.trim() || form.phone.trim()) &&
      (!form.email || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email));
  }

  async function submit(kind: "quote" | "partner") {
    if (!isContactValid()) { setStatus("error"); return; }
    setStatus("sending");
    const oceanMode = form.mode === "Air" ? "Air Freight" : "Ocean Freight";
    const partnerNotes = `Vietnam handling partner request. Scope: ${partnerScope || "Not specified"}. Overseas market/base: ${partnerMarket || "Not specified"}.`;
    try {
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: kind === "partner" ? "Other" : oceanMode,
          origin: kind === "partner" ? "Vietnam local handling" : form.origin,
          destination: kind === "partner" ? (partnerMarket || "Overseas agent request") : form.destination,
          cargoType: kind === "partner" ? "Freight forwarder / logistics agent" : form.commodity,
          cargoVolume: kind === "partner" ? partnerScope : `${form.mode}: ${form.cargoDetails}`,
          readyDate: kind === "partner" ? "" : form.readyDate,
          incoterm: kind === "partner" ? "" : form.incoterm,
          weightRange: "", urgency: "Standard", name: form.name, email: form.email,
          phone: form.phone, company: form.company, notes: kind === "partner" ? partnerNotes : "Submitted via website chatbox.",
          website: "", locale, formStartedAt: startedAt.current || Date.now() - 2_000,
          sourcePage: `chatbox-${kind}:${pathname}`.slice(0, 120),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.status !== "success") throw new Error("send failed");
      setStatus("sent");
      trackBookingEvent("chatbox_submit", { flow: kind, locale, mode: kind === "quote" ? form.mode : "partner" });
    } catch {
      setStatus("error");
    }
  }

  const whatsappText = encodeURIComponent("Hi John, I have a freight inquiry and would like to discuss it directly.");

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 sm:right-6">
      {open && (
        <div id="byj-chat-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="byj-chat-title"
          className="mb-3 flex max-h-[min(680px,calc(100dvh-6rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-card text-text-primary shadow-2xl sm:w-[390px]">
          <header className="flex shrink-0 items-center gap-3 bg-[#0B1F3A] px-4 py-3.5 text-white">
            {flow !== "menu" && <button type="button" onClick={() => launch("menu")} aria-label="Back to chat menu" className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-2"><ChevronLeft size={19} /></button>}
            <div className="min-w-0 flex-1"><h2 id="byj-chat-title" className="font-black">Chat with John</h2><p className="text-xs text-slate-200">Freight support from Vietnam</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-2"><X size={20} /></button>
          </header>

          <div className="overflow-y-auto p-4">
            {flow === "menu" && <div className="space-y-3">
              <div className="rounded-xl bg-bg-primary p-3 text-sm leading-6 text-text-secondary">Hello! How can John help with your shipment today?</div>
              <MenuButton title="Get a quick freight quote" body="FCL, LCL or air freight" onClick={() => launch("quote")} />
              <MenuButton title="I need a Vietnam handling partner" body="For overseas forwarders and logistics agents" onClick={() => launch("partner")} />
              <MenuButton title="Talk directly with John" body="WhatsApp, Zalo or email" onClick={() => launch("contact")} />
              <p className="px-1 text-xs leading-5 text-text-muted">We never auto-generate freight rates, transit times or sailing schedules. John checks every request against current shipment details.</p>
            </div>}

            {flow === "quote" && status !== "sent" && <form onSubmit={(e) => { e.preventDefault(); if (step < 3) setStep(step + 1); else void submit("quote"); }}>
              <Progress step={step} />
              {preset && step === 1 && <p className="mb-3 rounded-lg bg-sky-50 p-2.5 text-xs font-semibold text-ocean-blue dark:bg-sky-950/50">Route prefilled from this page. You can edit it.</p>}
              {step === 1 && <div className="space-y-3"><Field label="Origin" value={form.origin} onChange={(v) => update("origin", v)} required /><Field label="Destination" value={form.destination} onChange={(v) => update("destination", v)} required />
                <fieldset><legend className="mb-2 text-sm font-bold">Mode</legend><div className="grid grid-cols-3 gap-2">{(["FCL", "LCL", "Air"] as Mode[]).map((mode) => <button key={mode} type="button" aria-pressed={form.mode === mode} onClick={() => update("mode", mode)} className={`rounded-lg border px-3 py-2.5 text-sm font-bold ${form.mode === mode ? "border-ocean-blue bg-sky-50 text-ocean-blue dark:bg-sky-950/50" : "border-border-subtle"}`}>{mode}</button>)}</div></fieldset></div>}
              {step === 2 && <div className="space-y-3"><Field label="Commodity" value={form.commodity} onChange={(v) => update("commodity", v)} required placeholder="e.g. furniture, garments" /><Field label={form.mode === "FCL" ? "Container & weight" : form.mode === "LCL" ? "CBM & gross weight" : "Packages, dimensions & weight"} value={form.cargoDetails} onChange={(v) => update("cargoDetails", v)} required placeholder={form.mode === "FCL" ? "e.g. 1×40HC, 18,000 kg" : "e.g. 4.2 CBM, 860 kg"} /><Field label="Cargo ready date" type="date" value={form.readyDate} onChange={(v) => update("readyDate", v)} required /><Select label="Incoterm" value={form.incoterm} onChange={(v) => update("incoterm", v)} options={["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "DDP", "Not sure"]} /></div>}
              {step === 3 && <ContactFields form={form} update={update} />}
              {status === "error" && <p role="alert" className="mt-3 text-sm font-semibold text-red-600 dark:text-red-400">Please check your contact details or email {EMAIL} / call {DISPLAY_PHONE}.</p>}
              <div className="mt-5 flex gap-2">{step > 1 && <button type="button" onClick={() => { setStep(step - 1); setStatus("idle"); }} className="rounded-lg border border-border-subtle px-4 py-2.5 font-bold">Back</button>}<button type="submit" disabled={status === "sending"} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-orange px-4 py-2.5 font-black text-white hover:bg-orange-700 disabled:opacity-60">{step < 3 ? "Continue" : status === "sending" ? "Sending…" : <><Send size={17} /> Send inquiry</>}</button></div>
            </form>}

            {flow === "partner" && status !== "sent" && <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); submit("partner"); }}><p className="text-sm leading-6 text-text-secondary">For overseas freight forwarders needing a reliable local handling contact in Vietnam.</p><Field label="Your company" value={form.company} onChange={(v) => update("company", v)} required /><Field label="Your market / country" value={partnerMarket} onChange={setPartnerMarket} required /><label className="block text-sm font-bold">Handling needed<textarea required value={partnerScope} onChange={(e) => setPartnerScope(e.target.value)} rows={3} placeholder="Origin handling, customs, trucking, warehouse, export booking…" className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 font-normal outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20" /></label><ContactFields form={form} update={update} hideCompany />{status === "error" && <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">Please complete the required details, or contact John directly.</p>}<button disabled={status === "sending"} className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-orange px-4 py-2.5 font-black text-white disabled:opacity-60"><Send size={17} />{status === "sending" ? "Sending…" : "Send partner request"}</button></form>}

            {status === "sent" && <div className="py-7 text-center"><CheckCircle2 className="mx-auto text-accent-green" size={48} /><h3 className="mt-4 text-xl font-black">Request received</h3><p className="mt-2 text-sm leading-6 text-text-secondary">John will personally review your details and reply during business hours.</p><button onClick={() => launch("menu")} className="mt-5 rounded-lg border border-border-subtle px-5 py-2.5 font-bold">Done</button></div>}

            {flow === "contact" && <div className="space-y-3"><p className="text-sm leading-6 text-text-secondary">Choose your preferred channel. Your message goes directly to John.</p><ContactLink href={`https://wa.me/${PHONE_NUMBER}?text=${whatsappText}`} label="WhatsApp John" detail={DISPLAY_PHONE} icon={<MessageCircle size={21} />} /><ContactLink href={`https://zalo.me/${PHONE_NUMBER}`} label="Zalo John" detail={DISPLAY_PHONE} icon={<MessageCircle size={21} />} /><ContactLink href={`mailto:${EMAIL}?subject=${encodeURIComponent("Freight inquiry — Booking by John")}`} label="Email John" detail={EMAIL} icon={<Mail size={21} />} /><p className="pt-1 text-xs leading-5 text-text-muted">Rates, transit times and schedules are confirmed only after John reviews the actual shipment.</p></div>}
          </div>
        </div>
      )}
      <button type="button" aria-expanded={open} aria-controls="byj-chat-panel" onClick={() => { setOpen(!open); if (!open) { launch("menu"); trackBookingEvent("chatbox_open", { locale, source_page: pathname }); } }} className="ml-auto flex min-h-12 items-center gap-2 rounded-full bg-[#0B1F3A] px-4 py-3 font-black text-white shadow-xl ring-1 ring-white/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 sm:px-5"><MessageCircle size={21} aria-hidden="true" /><span className="hidden sm:inline">Chat with John</span><span className="sm:hidden">Get a quote</span></button>
    </div>
  );
}

function MenuButton({ title, body, onClick }: { title: string; body: string; onClick: () => void }) { return <button type="button" onClick={onClick} className="w-full rounded-xl border border-border-subtle p-3.5 text-left hover:border-ocean-blue hover:bg-bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-blue"><span className="block font-black">{title}</span><span className="mt-1 block text-sm text-text-secondary">{body}</span></button>; }
function Progress({ step }: { step: number }) { return <div className="mb-4 flex items-center gap-2" aria-label={`Step ${step} of 3`}>{[1,2,3].map((n) => <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-ocean-blue" : "bg-border-subtle"}`} />)}</div>; }
function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) { return <label className="block text-sm font-bold">{label}<input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 font-normal outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20" /></label>; }
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) { return <label className="block text-sm font-bold">{label}<select required value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 font-normal outline-none focus:border-ocean-blue"><option value="">Select…</option>{options.map((o) => <option key={o}>{o}</option>)}</select></label>; }
function ContactFields({ form, update, hideCompany = false }: { form: QuoteForm; update: (key: keyof QuoteForm, value: string) => void; hideCompany?: boolean }) { return <div className="space-y-3"><Field label="Your name" value={form.name} onChange={(v) => update("name", v)} required />{!hideCompany && <Field label="Company (optional)" value={form.company} onChange={(v) => update("company", v)} />}<Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="name@company.com" /><Field label="Phone / WhatsApp" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="Include country code" /><p className="text-xs text-text-muted">Please provide at least an email or phone number.</p></div>; }
function ContactLink({ href, label, detail, icon }: { href: string; label: string; detail: string; icon: React.ReactNode }) { return <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-border-subtle p-3.5 hover:border-ocean-blue hover:bg-bg-primary"><span className="text-ocean-blue">{icon}</span><span><strong className="block">{label}</strong><span className="text-sm text-text-secondary">{detail}</span></span></a>; }
