"use client";

export const INTERNAL_VISITOR_KEY = "booking_by_john_internal_visitor";
export const ANALYTICS_CONSENT_KEY = "booking_by_john_analytics_consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventValue = string | number | boolean | null;

export function isInternalVisitor() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(INTERNAL_VISITOR_KEY) === "1";
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted";
}

export function trackBookingEvent(name: string, data: Record<string, EventValue> = {}) {
  if (isInternalVisitor() || !hasAnalyticsConsent() || !window.gtag) return;
  window.gtag("event", name, {
    ...data,
    page_location: window.location.href,
  });
}
