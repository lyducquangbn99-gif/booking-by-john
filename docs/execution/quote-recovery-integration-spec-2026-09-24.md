# Quote recovery integration spec — 2026-09-24

## Production evidence
`components/RequestStepper.tsx` currently treats both a non-success `/api/send-booking` response and a network exception as a generic error. The form therefore leaves a qualified user at step 4 without an explicit recovery action.

`components/QuoteRecoveryActions.tsx` already exists and is the intended recovery surface. It provides WhatsApp/email recovery and emits `quote_recovery_click` analytics.

## Minimal safe patch
1. Import `QuoteRecoveryActions` into `components/RequestStepper.tsx`.
2. Add a dedicated boolean submission-failure state, separate from validation `error`.
3. Clear the recovery state before every new submit attempt and when the user edits/navigates/resets the form.
4. Set recovery state only when `/api/send-booking` returns a non-success result or throws.
5. On step 4, render `QuoteRecoveryActions` immediately after the existing error message when submission-failure state is true, passing the current shipment/form context expected by the component.
6. Preserve the existing generic error text as an accessible status; recovery actions supplement it rather than replacing validation behavior.
7. Do not emit `quote_form_submit` or `generate_lead` on failure. Existing success analytics remain unchanged.

## Acceptance checks before merge
- `npm run build` passes.
- Validation errors do not show recovery actions.
- API/network submission failure shows WhatsApp + email recovery without clearing entered shipment/contact data.
- Retrying submit clears stale recovery state before request and success still opens the success overlay.
- Back/edit/reset clears stale recovery UI.
- Recovery clicks emit the existing `quote_recovery_click` event.
- EN/VI/IT/ES/ID form pages compile because no new translation key is required by this patch.

## Release rule
Implement on an isolated branch first. Do not merge to `main` until the full-file diff is reviewed and build evidence is available. This avoids a risky whole-file replacement of the large `RequestStepper.tsx` through the connector.