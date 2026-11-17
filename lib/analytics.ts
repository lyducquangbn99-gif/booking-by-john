"use client";
import { safeTag } from "./attribution";

export const INTERNAL_VISITOR_KEY = "booking_by_john_internal_visitor";
export const ANALYTICS_CONSENT_KEY = "booking_by_john_analytics_consent";
export const ACQUISITION_SOURCE_KEY = "booking_by_john_acquisition_source";
export const ACQUISITION_CONTEXT_KEY = "booking_by_john_acquisition_context";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventValue = string | number | boolean | null;
type AcquisitionContext = {
  acquisition_source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export function isInternalVisitor() {
  if (typeof window === "undefined") return true;
  try { return window.localStorage.getItem(INTERNAL_VISITOR_KEY) === "1"; } catch { return true; }
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted"; } catch { return false; }
}

export function getAcquisitionEventParams(): AcquisitionContext {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(ACQUISITION_CONTEXT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result: AcquisitionContext = {};
    for (const key of [
      "acquisition_source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
    ] as const) {
      const value = parsed[key];
      if (typeof value === "string" && value) result[key] = safeTag(value, key);
    }
    return result;
  } catch {
    return {};
  }
}

export function trackBookingEvent(name: string, data: Record<string, EventValue> = {}) {
  if (isInternalVisitor() || !hasAnalyticsConsent() || !window.gtag) return;
  // Legacy form source fields can contain user-provided query values. Never transmit them.
  const { source_page: _source, lead_source: _lead, ...safeData } = data;
  window.gtag("event", name, {
    ...getAcquisitionEventParams(),
    ...safeData,
    page_location: window.location.origin + window.location.pathname,
    page_path: window.location.pathname,
    page_referrer: "",
    locale: window.location.pathname.split("/")[1] || "en",
    transport_type: "beacon",
  });
}
