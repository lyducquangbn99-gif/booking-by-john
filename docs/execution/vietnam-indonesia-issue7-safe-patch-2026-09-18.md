# Vietnam–Indonesia Issue #7 — safe implementation patch

Checked: 2026-09-18
Target: `app/[locale]/routes/vietnam-to-indonesia/page.tsx`
Verified current blob SHA: `f65e4aa5363d658dd2dd1fbdd7f2cf9e7300924b`

## Objective
Add a contextual reverse link from the commercial route page's Customs/import card to the existing localized PI/LS/PIB readiness guide, without making the guide sound universally mandatory.

## Safe JSX insertion
Insert immediately after `{copy.customsBody}` in the Customs article:

```tsx
<Link
  href="/blog/vietnam-indonesia-pi-ls-pib-document-check-2026"
  className="mt-4 inline-flex font-bold text-[#0B1F3A] underline decoration-accent-orange decoration-2 underline-offset-4"
>
  {locale === "vi"
    ? "Xem checklist PI / LS / PIB cho tuyến Indonesia"
    : locale === "id"
      ? "Lihat checklist kesiapan dokumen PI / LS / PIB"
      : locale === "it"
        ? "Consulta la checklist documenti PI / LS / PIB"
        : locale === "es"
          ? "Ver checklist de documentos PI / LS / PIB"
          : "Check PI / LS / PIB document readiness"}
</Link>
```

Because the project uses the localized `Link` from `@/i18n/navigation`, keep the href locale-neutral so the navigation layer prefixes the active locale.

## Verification gate before merge/deploy
1. Re-fetch target and require blob SHA `f65e4aa5363d658dd2dd1fbdd7f2cf9e7300924b`; if it changed, re-review before applying.
2. Preserve the full multilingual `COPY` object; do not reconstruct it from truncated connector output.
3. Build/typecheck.
4. Verify EN/VI/IT/ES/ID route pages render the contextual link.
5. Click each localized link and confirm it resolves to the same-locale PI/LS/PIB guide.
6. Confirm quote CTA and embedded `RequestStepper` remain intact.

## Current blocker
The available GitHub contents write action is whole-file replacement. Current connector reads of this large multilingual source are truncated, so replacing the file from retrieved text would risk deleting COPY content. Do not perform that replacement until a complete source representation or patch-capable write path is available.
