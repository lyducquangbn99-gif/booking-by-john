"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { usePathname } from "@/i18n/navigation";
import {
  INTERNAL_VISITOR_KEY,
  trackBookingEvent,
} from "@/lib/analytics";

function localeFromPath(pathname: string) {
  return pathname.split("/").filter(Boolean)[0] || "en";
}

export default function Analytics() {
  const pathname = usePathname();
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

  useEffect(() => {
    if (!enabled) return;

    const locale = localeFromPath(pathname);
    const blogMatch = pathname.match(/^\/(?:en|vi|it|id|es)\/blog\/([^/]+)/);
    if (blogMatch) {
      trackBookingEvent("blog_view", {
        locale,
        slug: blogMatch[1],
      });
    }
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled]);

  if (!enabled) return null;
  return <VercelAnalytics />;
}
