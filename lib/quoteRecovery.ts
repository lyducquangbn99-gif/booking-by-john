export type QuoteRecoveryShipment = {
  mode?: string;
  origin?: string;
  destination?: string;
  weightRange?: string;
  cargoType?: string;
  cargoVolume?: string;
  readyDate?: string;
  incoterm?: string;
  urgency?: string;
};

const WHATSAPP_NUMBER = "84352193969";
const RECOVERY_EMAIL = "BookingbyJohnly@gmail.com";

function clean(value?: string) {
  return value?.trim().replace(/\s+/g, " ").slice(0, 160) || "";
}

export function buildQuoteRecoverySummary(shipment: QuoteRecoveryShipment) {
  const rows: Array<[string, string]> = [
    ["Mode", clean(shipment.mode)],
    ["Origin", clean(shipment.origin)],
    ["Destination", clean(shipment.destination)],
    ["Weight", clean(shipment.weightRange)],
    ["Cargo", clean(shipment.cargoType)],
    ["Volume / container", clean(shipment.cargoVolume)],
    ["Ready date", clean(shipment.readyDate)],
    ["Incoterm", clean(shipment.incoterm)],
    ["Urgency", clean(shipment.urgency)],
  ];

  const details = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    "Hi BYJ Logistics, I tried to submit a quote request on the website but it did not go through.",
    details ? `\nShipment details:\n${details}` : "",
    "\nPlease help me continue this quote request.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function getQuoteRecoveryLinks(shipment: QuoteRecoveryShipment) {
  const message = buildQuoteRecoverySummary(shipment);
  const subject = "BYJ Logistics - quote request recovery";

  return {
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    email: `mailto:${RECOVERY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
  };
}
