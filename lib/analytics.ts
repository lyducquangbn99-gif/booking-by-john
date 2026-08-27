"use client";

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
  return window.localStorage.getItem(INTERNAL_VISITOR_KEY) === "1";
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted";
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
      if (typeof value === "string" && value) result[key] = value.slice(0, 120);
    }
    return result;
  } catch {
    return {};
  }
}

export function trackBookingEvent(name: string, data: Record<string, EventValue> = {}) {
  if (isInternalVisitor() || !hasAnalyticsConsent() || !window.gtag) return;
  window.gtag("event", name, {
    ...getAcquisitionEventParams(),
    ...data,
    page_location: window.location.href,
  });
}
