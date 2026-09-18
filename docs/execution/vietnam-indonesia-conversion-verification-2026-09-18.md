# Vietnam–Indonesia conversion / attribution verification

Checked: 2026-09-18

## Production evidence

Live EN route: `https://www.bookingbyjohnly.com/en/routes/vietnam-to-indonesia`

Verified on the live page:
- Hero CTA is present: `Request a Vietnam–Indonesia quote`.
- Details-section CTA is present.
- Final CTA is present.
- Embedded request stepper renders below the commercial content.
- Step 1 exposes the expected freight modes and a Next action.
- Contact fallback remains visible in the footer: BookingbyJohnly@gmail.com and WhatsApp +84 352 193 969.

## Source evidence

`app/[locale]/routes/vietnam-to-indonesia/page.tsx` currently:
- pre-fills `initialOrigin="Vietnam"`;
- pre-fills `initialDestination="Indonesia"`;
- pre-fills `initialMode="Ocean Freight"`;
- sets `sourcePage="vietnam-to-indonesia-embedded-form"`;
- keeps the final CTA pointed at `#request`.

`components/RequestStepper.tsx` currently:
- renders the stepper section with `id="request"`, so the final CTA anchor has a real target;
- records `source_page` from the supplied source page;
- records `lead_source` on `generate_lead` after a successful submission;
- only sets the success state after the submission returns success.

## Result

The Vietnam–Indonesia route has a coherent route-page → request-form → successful-lead attribution path in source, and the production page visibly renders the route CTAs plus request stepper. This check does **not** claim that a real test inquiry was submitted, that analytics received a live event, or that any traffic/conversion volume exists.

## Remaining conversion task

Issue #7 remains useful: add the contextual PI/LS/PIB readiness link inside the Customs card so compliance-intent visitors can move from the commercial route page to the existing guide and back into the quote flow. Apply only from a complete-source or patch-safe write path, then build/typecheck and verify EN/VI/IT/ES/ID.
