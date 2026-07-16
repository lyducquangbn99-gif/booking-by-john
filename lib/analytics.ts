"use client";

import { track } from "@vercel/analytics";

export const INTERNAL_VISITOR_KEY = "booking_by_john_internal_visitor";

type EventValue = string | number | boolean | null;

export function isInternalVisitor() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(INTERNAL_VISITOR_KEY) === "1";
}

export function trackBookingEvent(name: string, data: Record<string, EventValue> = {}) {
  if (isInternalVisitor()) return;
  track(name, data);
}

