# Canada inquiry sprint — 17 November 2026

## Scope and content evidence

Existing `/en/services/freight-forwarder-vietnam` describes FCL/LCL, air freight, export coordination and delivery review. Canada content offers review of those services, subject to cargo acceptance and availability. It does not assert a Canadian office, licensed Canadian brokerage, fixed rates, transit guarantees or guaranteed door delivery. All five locales use the same qualifications.

## URLs

`https://www.bookingbyjohnly.com/{en,vi,it,es,id}/routes/vietnam-to-canada`

Each page has its own canonical, five reciprocal hreflang links plus English x-default, index/follow metadata, a localized footer link, a route-directory link and sitemap entry. Indexability does not guarantee Google indexing.

## Analytics contract

Existing property tag: `G-J1N2YXRFDN`.

- `whatsapp_click`: one delegated event per normal click, including dynamically rendered chat/recovery links. Parameters: `page_path`, query/hash-free `page_location`, `locale`, `contact_channel=whatsapp`, `cta_location`, `click_type=outbound`, `acquisition_source`, and available `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`. No destination URL, phone number, message, form content or contact details are included.
- `quote_cta_click`: same safe page/acquisition context plus `cta_location`.
- `discovery_response`: optional select after successful submission only, with `discovery_channel` in `search|social|recommendation|other` and `cta_location=quote-success`. Only visible with analytics consent. No free-text input or new server storage.
- Existing `contact_click` remains for contact-channel reporting; it is a different event and must not be summed with `whatsapp_click` as unique inquiries.
- A click is intent, not a confirmed lead. Existing `generate_lead` stays tied to successful form submission.

Consent and internal-visitor exclusions are preserved. Acquisition is captured at consent and retained for the session. Untagged external visits use broad source categories, never full referrer URLs. A visitor who changes pages before granting consent may lose initial landing attribution. Denied consent/ad blockers mean incomplete counts by design.

Marketing values are explicitly allowlisted in `lib/attribution.ts`; unknown values become `other`. Example: `?utm_source=linkedin&utm_medium=social&utm_campaign=canada-growth&utm_content=article`. Register approved new campaign values in that file before launch. No `utm_term` is collected. Existing stored values are sanitized again when read. Legacy free-form `source_page`/`lead_source` event parameters are omitted; use `page_path` and `cta_location` instead.

## Privacy and verification limits

No new dependency, paid service, endpoint, secret, form delivery change or security-header change. The optional question is not required to request freight. Existing production deployment remains GitHub → Vercel.

Account-level GA4 Enhanced Measurement must be checked separately: automatic outbound link tracking can collect `link_url`, and automatic history pageviews can duplicate manual pageviews. Disable outbound clicks, form interactions, site search and history pageviews in the web stream when using this manual tracking design. Account admin credentials are not available in this checkout. Custom dimensions for `cta_location`, `locale`, `acquisition_source`, UTM parameters and `discovery_channel` may need registration for reports. The deployment alone cannot prove receipt in GA4 Realtime/DebugView.

Reference: https://developers.google.com/analytics/devguides/collection/ga4/views and https://support.google.com/analytics/answer/9216061

## Checks

- Production build and TypeScript pass (both Turbopack and webpack).
- `node scripts/test-growth.cjs`: consent, internal exclusion, blocked storage, attribution allowlist, locale and query/hash privacy pass.
- Local browser preview is blocked by a pre-existing Windows junction/path resolution issue in Next runtime; production HTTP/browser results are reported separately.
- No real inquiry/email is submitted as part of verification.
