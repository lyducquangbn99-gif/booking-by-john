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

## Minimal integration points verified against current RequestStepper

1. Import `RequestStepperQuoteRecovery` next to the existing analytics/import block.
2. Add `const [submissionFailed, setSubmissionFailed] = useState(false);` beside the existing submit/success/error state.
3. In `update(...)`, clear `submissionFailed` before preserving the current edit and existing `quote_form_start` behaviour.
4. In `handleSubmit()`, leave validation branches unchanged, then clear `submissionFailed` immediately before starting the API request.
5. In the `data.status === "success"` branch, explicitly keep failure state false before showing success.
6. In the API non-success branch and `catch`, set `submissionFailed(true)` while preserving the existing generic error.
7. In `dismiss()`, reset failure state together with success, form, timers and error.
8. In Back navigation, clear failure state before decrementing the step.
9. Immediately after Step 4, render `RequestStepperQuoteRecovery` using the current `form`, `locale`, and `sourcePageRef.current || window.location.pathname`.

These are deliberately narrow integration points: no API contract change, no success-analytics change, and no form-data mutation is required.

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

## Current evidence (2026-09-30)

- PR #13 remains Draft and open.
- Current feature head before this documentation refresh was `c1e2ab77a96bf670565f2f55ecd59453ba4ff3ed`.
- `components/RequestStepper.tsx` on that head has blob SHA `8cecb13a5fd072be810e063c8ee184d7cd89896c` and is still not part of the PR changed-file set.
- Fresh source inspection confirms both API non-success and network failure currently only set the generic error; Step 4 still renders no recovery component.
- The full RequestStepper blob is now retrievable safely through the repository blob endpoint, removing the earlier source-truncation uncertainty. The remaining work is the actual narrow integration plus build/Preview verification.
