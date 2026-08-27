# Attribution rollout — 2026-08-27

This note records the conversion/attribution behavior introduced on the feature branch before merge.

## What changes

- Blog commercial handoffs are topic-aware instead of always linking every article to Vietnam → Italy.
- Blog quote CTAs carry a `source=blog-<slug>` tag.
- Known commercial clusters route to Italy, Spain, Indonesia or Taiwan pages; Hai Phong and Mexico content fall back to Vietnam freight-forwarder support with a shipment-specific quote handoff.
- `source`, `utm_source`, `utm_medium`, `utm_campaign` and `utm_content` are sanitized and persisted for the browser session.
- GA4 events inherit the persisted attribution context after analytics consent.
- The existing booking form continues to read the acquisition source from session storage and includes it as `Lead Source` in the freight-request email.

## Privacy / claim boundaries

- Attribution values are campaign labels only; no name, email, phone, quote details or cargo notes are sent to GA4 by this patch.
- GA4 events remain gated by the existing analytics-consent logic and internal-visitor exclusion.
- The patch does not invent rate, space, transit-time, traffic or performance claims.

## Verification before merge

1. Build/CI passes.
2. Open a tagged URL such as `?utm_source=email&utm_medium=outbound&utm_campaign=italy-spain-test` and confirm route/blog events contain the UTM context after consent.
3. Navigate to the quote form in the same session and confirm the lead source persists.
4. Confirm Mexico and Hai Phong blog pages no longer show the irrelevant hard-coded Vietnam → Italy handoff.
