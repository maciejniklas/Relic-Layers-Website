---
name: site-validate
description: Validate a Relic Layers Website change - static checks, EN/PL parity, links, placeholders, and local phone/desktop preview - and report what was and was not verified.
---

# Validate a website change

1. Run `node tools/check-site.mjs`. It must print `PASS`. It checks: every HTML page has `lang`, `<title>`, description, viewport, one `<h1>` and `<main id="main">`; internal links, anchors and assets resolve with relative paths; each EN page has a PL twin (and vice versa) with identical section `id`s and identical `data-updated` dates; no `TODO`/`TBD`/`{{…}}`/`lorem` placeholders; no external script/style/font hosts; skill wrappers match their canonical files.
2. For visual or content changes, serve `docs/` locally (`python -m http.server 4173 -d docs`) and inspect at 375 px and ≥ 1024 px: language switch goes to the twin page, navigation works with keyboard (visible focus, skip link), no horizontal scroll, readable contrast in light and dark mode.
3. After publishing, fetch the real HTTPS URLs and confirm status 200 and expected content in both languages.
4. Report each step as PASS, FAIL or NOT RUN (with reason). A local preview is not proof of the deployed site, and a desktop browser is not proof of a phone browser.
