"use client";

import QuoteRecoveryActions from "@/components/QuoteRecoveryActions";
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
