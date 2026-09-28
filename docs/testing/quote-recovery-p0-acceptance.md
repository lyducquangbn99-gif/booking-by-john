# Quote recovery P0 — acceptance matrix

Purpose: merge gate for PR #13. The recovery UI must rescue a real inquiry only after a transport/API submission failure, without creating false failure states or losing the user's shipment/contact data.

## Required wiring

- `RequestStepper` owns a boolean `submissionFailed` state, default `false`.
- Set `submissionFailed=true` only when `/api/send-booking` returns a non-success application result or the request throws.
- Validation failures (missing name/contact, invalid email, missing origin/destination) must never enable recovery.
- Clear failure state before a retry and on any edit, Back, successful submit, or form reset/dismiss.
- Keep the existing form object intact when a submission fails.
- On step 4 render `RequestStepperQuoteRecovery` with `failed={submissionFailed}`, the current shipment/form fields, locale, and source page.
- Existing `quote_form_submit` and `generate_lead` success analytics must remain success-only.
- `quote_recovery_impression` must fire once per failure episode, not on validation errors and not repeatedly on rerender.

## Manual acceptance cases

| Case | Action | Expected |
| --- | --- | --- |
| Validation: no contact | Submit step 4 without name/email/phone | Inline validation only; no recovery; no recovery impression |
| Validation: bad email | Submit invalid email | Inline validation only; no recovery |
| API non-success | Valid form, API returns non-success | Generic error + recovery actions visible; all entered fields preserved |
| Network failure | Valid form, request throws | Generic error + recovery actions visible; all entered fields preserved |
| Retry after failure | Submit again after failure | Old recovery state clears before request; may reappear only if retry fails |
| Edit after failure | Change any step-4 field | Recovery clears; edited data remains |
| Back after failure | Use Back | Recovery clears; shipment/contact data remains |
| Success after prior failure | Retry succeeds | Success overlay; recovery hidden; existing lead analytics fire once |
| Dismiss/reset | Dismiss success/reset form | Recovery false; form returns to intended reset state |

## Deployment gate

Do not mark PR #13 ready and do not merge until the integrated head (not merely the isolated recovery component) receives a successful Vercel/build result. After deployment, exercise at least the validation case plus one forced API/network-failure case in Preview and confirm recovery rendering and data preservation.

## Current evidence (2026-09-28)

At the time this matrix was added, PR #13 still contains the isolated `RequestStepperQuoteRecovery` component but `RequestStepper.tsx` has not yet been wired. The earlier Vercel Ready result therefore proves only that the isolated component builds, not that the end-to-end failure flow works.