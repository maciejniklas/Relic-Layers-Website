# Site structure

## URLs

Live base URL (verified through the Pages API and HTTP checks, 2026-10-28): `https://maciejniklas.github.io/Relic-Layers-Website/`. The game links to `https://maciejniklas.github.io/Relic-Layers-Website/privacy/`; never change that path.

Language-first paths; every player page has an EN and PL twin with the same relative path. Paths are stable — the game and store listings link to them.

| Path (relative to the site root) | Content |
| --- | --- |
| `/` | Bilingual language chooser |
| `/en/`, `/pl/` | Home |
| `/en/privacy/`, `/pl/privacy/` | Privacy Policy |
| `/privacy/` | Stable language-neutral entry used by the game: forwards to the browser-language policy (Polish → PL, otherwise EN) and shows both links without JavaScript |
| `/404.html` | Not-found page (GitHub serves it for any missing path, so it uses absolute `/Relic-Layers-Website/…` links) |

Future pages follow the same pattern when their content is real: `/{en,pl}/terms/`, `/{en,pl}/support/`, `/{en,pl}/account-deletion/`, plus a language-neutral entry only if the game or a store needs one URL. Add the page to the header/footer navigation of every page in both languages.

## Page template

Copy an existing page of the same depth. Required: doctype, `<html lang>`, viewport, title, description, skip link, header (brand, nav with `aria-current`, `lang-switch` link to the twin), `<main id="main">`, footer. Use relative links only (the site is served under a sub-path). Legal documents use `<article class="wrap doc" data-updated="YYYY-MM-DD">`, a visible "Last updated" line, a contents list and `<section id>`s that are identical in both languages.

## Style

`docs/assets/site.css`: system font stack, light/dark via `prefers-color-scheme`, 44 px touch targets, single readable column (42 rem), no horizontal scroll at 320 px. No web fonts, icons fonts or images are required; add images only with explicit `width`/`height` and `alt`.
