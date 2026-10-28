# Decisions

## W001 — Static GitHub Pages site from `main` / `docs/` (2026-10-28)

Hand-written HTML/CSS with no build step and no third-party resources, published by GitHub Pages branch deployment (`main`, folder `/docs`, `.nojekyll`). Simplest option for a static site: no workflow file to maintain. Maintainer knowledge lives in `.docs/` (not served). Codex and Claude share `AGENTS.md`; Claude deltas in `CLAUDE.md`.

## W003 — Privacy Policy v2026-10-28 approved (2026-10-28)

The owner (controller) approved the EN/PL Privacy Policy text dated 2026-10-28 for publication, based on [privacy-data-inventory](privacy-data-inventory.md). Agent analysis only; no external legal review. Initial publication pushed `main` directly because the remote was empty; later changes use PRs per [workflow](workflow.md).

## W002 — Stable language-neutral policy entry `/privacy/` (2026-10-28)

The game has one configurable Privacy Policy URL. `/privacy/` forwards to `/pl/privacy/` for Polish browsers and `/en/privacy/` otherwise, and lists both links when JavaScript is unavailable.

## W004 — Terms of Service v2026-10-28 approved; provider is the owner's sole proprietorship (2026-10-28)

The owner decided Terms apply to v1 and approved the EN/PL Terms of Service text dated 2026-10-28 (Trello #370), published at `/{en,pl}/terms/` with the stable language-neutral entry `/terms/` for the game (same pattern as W002). Provider and controller: Maciej Niklas, sole proprietorship (NIP 5892065016, REGON 388732202); the Privacy Policy controller section was aligned in the same change. Support and complaints: support@maciejniklas.com. Polish law without depriving consumers of mandatory protection of their country of residence. The text describes the current build (no ads or IAP); the owner wants ads and IAP from the first release, so both documents must be updated and re-approved before any build that initializes them. Agent analysis only; no external legal review.
