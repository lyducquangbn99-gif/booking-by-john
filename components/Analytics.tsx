"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { usePathname } from "@/i18n/navigation";
import {
  ANALYTICS_CONSENT_KEY,
  INTERNAL_VISITOR_KEY,
  trackBookingEvent,
} from "@/lib/analytics";

const MEASUREMENT_ID = "G-J1N2YXRFDN";

const CONSENT_TEXT = {
  vi: {
    text: "Chúng tôi dùng Google Analytics để đo lường lượt truy cập và cải thiện dịch vụ. Không gửi tên, email, số điện thoại hoặc nội dung báo giá.",
    accept: "Đồng ý",
    decline: "Từ chối",
  },
  en: {
    text: "We use Google Analytics to measure visits and improve our service. Names, emails, phone numbers and quote details are never sent.",
    accept: "Accept",
    decline: "Decline",
  },
  it: {
    text: "Utilizziamo Google Analytics per misurare le visite e migliorare il servizio. Non inviamo nomi, email, numeri di telefono o dettagli dei preventivi.",
    accept: "Accetta",
    decline: "Rifiuta",
  },
  id: {
    text: "Kami menggunakan Google Analytics untuk mengukur kunjungan dan meningkatkan layanan. Nama, email, nomor telepon, dan rincian penawaran tidak dikirim.",
    accept: "Setuju",
    decline: "Tolak",
  },
  es: {
    text: "Usamos Google Analytics para medir visitas y mejorar el servicio. No enviamos nombres, correos, teléfonos ni detalles de cotizaciones.",
    accept: "Aceptar",
    decline: "Rechazar",
  },
} as const;

function localeFromPath(pathname: string) {
  return pathname.split("/").filter(Boolean)[0] || "en";
}

export default function Analytics() {
  const pathname = usePathname();
  const [gaReady, setGaReady] = useState(false);
  const enabled = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      window.addEventListener("booking-analytics-preference", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("booking-analytics-preference", onChange);
      };
    },
    () => window.localStorage.getItem(INTERNAL_VISITOR_KEY) !== "1",
    () => false,
  );
  const consent = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      window.addEventListener("booking-analytics-consent", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("booking-analytics-consent", onChange);
      };
    },
    () => window.localStorage.getItem(ANALYTICS_CONSENT_KEY),
    () => null,
  );

  const locale = localeFromPath(pathname) as keyof typeof CONSENT_TEXT;
  const copy = CONSENT_TEXT[locale] || CONSENT_TEXT.en;

  function setConsent(value: "granted" | "denied") {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    window.dispatchEvent(new Event("booking-analytics-consent"));
  }

  function initializeGa() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    setGaReady(true);
  }

  useEffect(() => {
    if (!enabled || consent !== "granted" || !gaReady || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      language: locale,
    });

    const blogMatch = pathname.match(/^\/(?:en|vi|it|id|es)\/blog\/([^/]+)/);
    if (blogMatch) {
      trackBookingEvent("blog_view", {
        locale,
        slug: blogMatch[1],
      });
    }
  }, [consent, enabled, gaReady, locale, pathname]);

  useEffect(() => {
    if (!enabled || consent !== "granted" || !gaReady) return;

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const locale = localeFromPath(window.location.pathname);

      if (href.startsWith("mailto:")) {
        trackBookingEvent("email_click", { locale });
      } else if (href.startsWith("tel:")) {
        trackBookingEvent("phone_click", { locale });
      } else if (/wa\.me|whatsapp/i.test(href)) {
        trackBookingEvent("whatsapp_click", { locale });
      } else if (href.includes("/blog/")) {
        trackBookingEvent("blog_open", { locale });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [consent, enabled, gaReady]);

  if (!enabled) return null;
  return (
    <>
      {consent === "granted" ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onLoad={initializeGa}
        />
      ) : null}
      {consent === null ? (
        <aside
          aria-label="Analytics consent"
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-3xl rounded-xl border border-white/15 bg-[#0B1F3A] p-4 text-sm text-white shadow-2xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-6 text-white/90">{copy.text}</p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="rounded-md border border-white/30 px-4 py-2 font-bold text-white"
              >
                {copy.decline}
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="rounded-md bg-white px-4 py-2 font-black text-[#0B1F3A]"
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}
