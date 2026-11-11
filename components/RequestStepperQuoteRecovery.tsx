"use client";

import { useEffect, useRef } from "react";
import QuoteRecoveryActions from "@/components/QuoteRecoveryActions";
import { trackBookingEvent } from "@/lib/analytics";
import type { QuoteRecoveryShipment } from "@/lib/quoteRecovery";

type Props = {
  failed: boolean;
  shipment: QuoteRecoveryShipment;
  locale: string;
  sourcePage: string;
};

/**
 * Thin integration boundary for RequestStepper quote recovery.
 * Keeping recovery rendering isolated makes the eventual RequestStepper patch
 * small and lets failure-only behaviour be reviewed independently.
 */
export default function RequestStepperQuoteRecovery({
  failed,
  shipment,
  locale,
  sourcePage,
}: Props) {
  const trackedFailureRef = useRef(false);

  useEffect(() => {
    if (!failed) {
      trackedFailureRef.current = false;
      return;
    }
    if (trackedFailureRef.current) return;

    trackedFailureRef.current = true;
    trackBookingEvent("quote_recovery_impression", {
      locale,
      mode: shipment.mode || "unspecified",
      source_page: sourcePage || "direct",
    });
  }, [failed, locale, shipment.mode, sourcePage]);

  if (!failed) return null;

  return (
    <div className="mt-4">
      <QuoteRecoveryActions
        shipment={shipment}
        locale={locale}
        sourcePage={sourcePage}
      />
    </div>
  );
}
