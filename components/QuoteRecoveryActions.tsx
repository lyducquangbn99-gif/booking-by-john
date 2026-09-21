"use client";

import { getQuoteRecoveryLinks, type QuoteRecoveryShipment } from "@/lib/quoteRecovery";
import { trackBookingEvent } from "@/lib/analytics";

type Props = {
  shipment: QuoteRecoveryShipment;
  locale: string;
  sourcePage: string;
};

const COPY: Record<string, { intro: string; whatsapp: string; email: string }> = {
  en: {
    intro: "If the form did not go through, continue with your shipment details by WhatsApp or email. You will not need to enter them again.",
    whatsapp: "Continue on WhatsApp",
    email: "Continue by email",
  },
  vi: {
    intro: "Nếu biểu mẫu chưa gửi được, hãy tiếp tục bằng WhatsApp hoặc email với thông tin lô hàng đã nhập. Bạn không cần nhập lại.",
    whatsapp: "Tiếp tục qua WhatsApp",
    email: "Tiếp tục qua email",
  },
  it: {
    intro: "Se il modulo non è stato inviato, continua via WhatsApp o email con i dati della spedizione già inseriti. Non dovrai reinserirli.",
    whatsapp: "Continua su WhatsApp",
    email: "Continua via email",
  },
  es: {
    intro: "Si el formulario no se envió, continúa por WhatsApp o correo con los datos del envío ya ingresados. No tendrás que volver a escribirlos.",
    whatsapp: "Continuar por WhatsApp",
    email: "Continuar por correo",
  },
  id: {
    intro: "Jika formulir gagal terkirim, lanjutkan melalui WhatsApp atau email dengan detail kiriman yang sudah diisi. Anda tidak perlu mengisinya lagi.",
    whatsapp: "Lanjutkan di WhatsApp",
    email: "Lanjutkan lewat email",
  },
};

export default function QuoteRecoveryActions({ shipment, locale, sourcePage }: Props) {
  const copy = COPY[locale] || COPY.en;
  const links = getQuoteRecoveryLinks(shipment);

  function track(channel: "whatsapp" | "email") {
    trackBookingEvent("quote_recovery_click", {
      channel,
      locale,
      mode: shipment.mode || "unspecified",
      source_page: sourcePage || "direct",
    });
  }

  const buttonClass =
    "inline-flex min-h-[44px] items-center justify-center rounded-md border border-border-subtle px-4 py-3 text-center font-display text-sm font-bold text-text-primary transition-all duration-200 hover:border-accent-green/60 hover:text-accent-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green";

  return (
    <div className="rounded-xl border border-accent-orange/30 bg-bg-card p-4" role="group" aria-label="Quote recovery options">
      <p className="mb-3 text-xs leading-relaxed text-text-secondary">{copy.intro}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass} onClick={() => track("whatsapp")}>
          {copy.whatsapp}
        </a>
        <a href={links.email} className={buttonClass} onClick={() => track("email")}>
          {copy.email}
        </a>
      </div>
    </div>
  );
}
