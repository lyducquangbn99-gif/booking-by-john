# Quote recovery wiring v2 — 2026-09-25

## Purpose
Stage the P0 conversion fix on an isolated branch before touching production `main`.

## Verified production state
- `components/RequestStepper.tsx` still sends both non-success `/api/send-booking` responses and network exceptions to the generic error string.
- `QuoteRecoveryActions` already exists and is the intended WhatsApp/email fallback.
- Contact details are now preserved in the recovery payload on `main`.

## Safe implementation contract
1. Import `QuoteRecoveryActions` into `RequestStepper`.
2. Add a dedicated `submissionFailed` boolean; do not reuse validation `error` as the recovery trigger.
3. Clear `submissionFailed` immediately before each real submit attempt.
4. Set it only when the API returns a non-success status or the fetch/response path throws.
5. On success, explicitly clear failure state before showing success.
6. Reset failure state when the user edits form data, navigates back, or dismisses/resets the form.
7. At step 4, render `QuoteRecoveryActions` only when `submissionFailed` is true, passing the current contact + shipment data and current source page.
8. Keep the normal submit button available so the user can retry after a transient failure.
9. Build/typecheck and inspect the diff before any merge to `main`.

## Release gate
Do not merge solely because this branch exists. Require a green Build verification for the actual wiring commit and confirm the recovery UI is unreachable for client-side validation errors.
