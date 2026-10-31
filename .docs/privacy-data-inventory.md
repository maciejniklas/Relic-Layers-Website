# Privacy data inventory

Source of truth for the Privacy Policy. Derived 2026-10-28 from the game repository (code, package manifest, project settings, maintainer docs) at `develop` 3c00fd8 + #244 branch 4034c43, the GDD (Drive, modified 2026-10-10, verified unchanged 2026-10-28; §§3, 79–95, 117), and official provider documentation linked below. Re-verify when the game changes. This is engineering analysis, not legal advice.

The game is pre-release (no store build). "Current" = implemented in code for the v1 release path; "Planned" = required by the design or owner but not implemented; "Not used" = absent from code or explicitly disabled.

## Controller

Maciej Niklas, sole proprietorship (business name Maciej Niklas, NIP 5892065016, REGON 388732202), ul. Długa 23, 83-330 Skrzeszewo, Poland; privacy@maciejniklas.com, support@maciejniklas.com for game support and complaints (owner, 2026-10-28). Market: worldwide. Supervisory authority: Prezes UODO.

## Current processing and legal bases

| Processing | Data | Provider | Legal basis (decided 2026-10-28) |
| --- | --- | --- | --- |
| Anonymous sign-in | Random Player ID, session tokens on device | Unity Authentication (processor) | Art. 6(1)(b) |
| Game progress | `profile` (created/last seen, language, linked flag), `progress` (unlocked/completed levels, relics), `attempts` (IDs, level, content version, level hash, start/completion time, trace digest) | Unity Cloud Save via Cloud Code | 6(1)(b); server validation also 6(1)(f) anti-cheat |
| Optional account link | Link Player ID ↔ Unity Player Account; Unity collects e-mail as **independent controller** | Unity Player Accounts | 6(1)(b) for the link |
| Remote config / content | IP, app version, platform, technical IDs | Unity Remote Config, CCD | 6(1)(b) |
| Analytics (opt-in) | GDD §80 events; SDK adds installation ID, approximate location from IP, device/app info | Unity Analytics | 6(1)(a) + ePrivacy consent |
| Crash/error reports | Error, stack, device/OS, app version, custom keys `client_version`, `environment`, `content_version`, `level_id`; no player ID or free text | Unity Diagnostics (Developer Data), **enabled** (`m_EngineDiagnosticsEnabled: 1`), not consent-gated | 6(1)(f) — see open items |
| Device storage | Settings, consent choice, tokens, attempt counters, offline queue, content cache | Device | Strictly necessary (counter leaves only via opt-in analytics) |
| Website | IP logs by host | GitHub Pages | 6(1)(f) |
| Correspondence / rights requests | E-mail, message | Owner mailbox | 6(1)(c) for rights requests, 6(1)(f) otherwise |

Retention: account/progress until deletion request or shutdown of online services (Unity retains Authentication/Cloud Save data until the developer deletes it); analytics raw events 13 months (Unity); diagnostics only as needed, bounded by Unity's retention (not documented by Unity); correspondence 3 years after closure (owner-delegated decision).

Transfers: Unity Gaming Services DPA is incorporated into the UGS Terms of Service and includes the EU SCCs (Unity, 2022 signed DPA + later amendments). GitHub: own safeguards per its privacy statement.

Deletion mechanics (Unity): deleting an Authentication player does **not** delete Cloud Save data — delete both (Dashboard, Admin API or CLI); analytics deletion via `RequestDataDeletion` (after denying consent) or Dashboard Game Data Deletion, processed within 30 days. Unity Player Accounts are deleted by the player at player-account.unity.com.

Sources: [Analytics FAQ](https://docs.unity.com/en-us/analytics/faq), [Analytics Google Play data safety](https://docs.unity.com/en-us/analytics/privacy-and-consent/google-data-safety), [Authentication privacy](https://docs.unity.com/en-us/authentication/privacy-and-consent/overview), [Player Accounts privacy](https://docs.unity.com/ugs/manual/authentication/manual/data-privacy-unity-player-accounts), [Delete a player](https://docs.unity.com/en-us/services/player-management/delete-a-player), [Cloud Save privacy](https://docs.unity.com/en-us/cloud-save/privacy-and-consent/overview), [End-user consent](https://docs.unity.com/en-us/cloud/developer-data-framework/end-user-consent), [Developer Data privacy](https://docs.unity.com/en-us/cloud/developer-data/privacy-and-consent), [Unity UGS DPA (2022)](https://images.response.unity3d.com/Web/Unity/%7Bf51b41f7-b4be-4d63-8da1-f68cbef9538e%7D_Signed_Unity_Gaming_Services_DPA_November_30__2022.docx.pdf), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

## Publication status and planned features

- Player ID visible and copyable in Settings → Account in all builds: implemented in the current game source (verified 2026-10-31); the policy names this location since 2026-10-30. This source review does not establish phone-device clipboard acceptance.
- Self-service account deletion is implemented in Settings → Account → Delete account (verified against game code on 2026-10-31): Cloud Save deletion precedes best-effort Analytics deletion request and Authentication account deletion; local credentials and scoped progress/queue data are cleared on success. The game is pre-release. The website text describes this path; publication awaits owner approval.
- Analytics consent toggle in Settings (owner, 2026-10-28).
- In-app bug report form (GDD §117).
- Ads (Unity LevelPlay, rewarded/interstitial) and IAP (Unity IAP) — owner wants them from the first release (2026-10-28); GDD §91 and the v1.0 milestone exclude active monetization. Before any build that initializes them, the policy needs: ads section (LevelPlay as **controller** since Dec 2024 per Unity DPA amendment), purchase data, advertising IDs, ATT on iOS, an IAB TCF-compatible consent flow for personalized ads in the EEA/UK, age screening for Families policy, store disclosures. The Terms of Service also need purchase, virtual-item, refund (store-handled) and consumer-withdrawal rules for digital content.
- Account-deletion web page: bilingual source and stable `/account-deletion/` entry prepared on 2026-10-31; owner text approval, publication and Play Console Data safety URL entry remain pending. E-mail requests remain available without game access. No fixed Diagnostics retention period is established; do not invent one.

## Not used

- Active ads/IAP in v1: `com.unity.purchasing` and `com.unity.services.levelplay` are in the manifest but referenced by no game code.
- Legacy Unity Analytics and legacy Cloud Diagnostics crash reporting: disabled.
- Open question: `ProjectSettings` `submitAnalytics: 1`; effect in Unity 6000.6 unconfirmed.
- The game does not collect name, e-mail, contacts, photos, microphone or precise location.

## Open compliance items (track before store release)

1. Consent withdrawal must be as easy as giving it (GDPR Art. 7(3)) → in-game toggle.
2. Rights requests need a findable identifier → release-visible Player ID.
3. Crash reports are sent without consent; device access for non-essential purposes may require consent under ePrivacy Art. 5(3) / Polish PKE Art. 399. Decide: consent-gate Diagnostics or document necessity; Unity places consent responsibility on the developer.
4. Age: not directed at under-13s; EEA digital-consent age is 13–16 (Poland 16) — consider a neutral age screen, mandatory before personalized ads.
5. Diagnostics retention period is not documented by Unity.
6. Website account-deletion page before Google Play release.
