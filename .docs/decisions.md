# Decisions

## W001 — Static GitHub Pages site from `main` / `docs/` (2026-10-28)

Hand-written HTML/CSS with no build step and no third-party resources, published by GitHub Pages branch deployment (`main`, folder `/docs`, `.nojekyll`). Simplest option for a static site: no workflow file to maintain. Maintainer knowledge lives in `.docs/` (not served). Codex and Claude share `AGENTS.md`; Claude deltas in `CLAUDE.md`.

## W003 — Privacy Policy v2026-10-28 approved (2026-10-28)

The owner (controller) approved the EN/PL Privacy Policy text dated 2026-10-28 for publication, based on [privacy-data-inventory](privacy-data-inventory.md). Agent analysis only; no external legal review. Initial publication pushed `main` directly because the remote was empty; later changes use PRs per [workflow](workflow.md).

## W002 — Stable language-neutral policy entry `/privacy/` (2026-10-28)

The game has one configurable Privacy Policy URL. `/privacy/` forwards to `/pl/privacy/` for Polish browsers and `/en/privacy/` otherwise, and lists both links when JavaScript is unavailable.
