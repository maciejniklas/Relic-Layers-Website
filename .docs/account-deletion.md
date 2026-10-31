# Account deletion resource

Prepared 2026-10-31. Publication and owner approval of the EN/PL legal text remain pending; local validation is not legal approval.

## Contract

`/{en,pl}/account-deletion/` contains equivalent sections (`email`, `in-game`, `deleted`, `retained`, `unity-account`). `/account-deletion/` chooses Polish for a Polish browser, English otherwise, and exposes both language links without JavaScript. Use the full published language-neutral URL for Play Console only after deployment and live verification.

The page gives a prominent `mailto:` route to the existing privacy mailbox. It accepts requests without the app or a known Player ID, while explaining that identification is necessary before deletion. There is no form or automatic submission. Navigation and both existing legal documents link to it; their stable URLs are preserved.

The in-game path and local cleanup description were checked against the game's current implementation. Provider behavior was rechecked against [Google Play's deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111), [Unity Analytics FAQ](https://docs.unity.com/en-us/analytics/faq) and [Authentication privacy](https://docs.unity.com/en-us/authentication/privacy-and-consent/overview). Correspondence retention remains the owner's existing three-year policy. Diagnostics has no verified fixed retention period; this limit is disclosed rather than replaced by an invented deadline.

## Validation and release acceptance

- `node tools/check-site.mjs`: PASS, 13 pages and 4 EN/PL pairs; internal paths/anchors, metadata, date/section parity and no placeholders/external resource hosts.
- `git diff --check`: PASS.
- Local HTTP: 200 for the deletion page. Browser checks: EN/PL switch, neutral entry selecting Polish, keyboard focus and skip anchor; layouts inspected at 375 and 1280 px without horizontal overflow. Dark palette inspected on actual source; light palette inspected using an untracked QA copy with only the dark media rule disabled, since the preview browser follows the dark system preference. This is not a phone-device test or native light-preference emulation.
- Game/Unity tests and Rider analysis: not applicable; no game or C# files change.
- Pending: owner text approval, owner merge/publication, real HTTPS checks in both languages, and Play Console Data safety entry. Confirm the production game's deletion endpoint is deployed before shipping its instructions to players. A precise Diagnostics retention period remains an owner/provider compliance follow-up.

Risk: MEDIUM. This is a reversible static content change, but its public statements govern deletion expectations and retention disclosures. Owner review must cover both languages and the Diagnostics limitation before publication.
