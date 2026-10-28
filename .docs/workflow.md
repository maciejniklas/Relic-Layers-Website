# Workflow

Status: standing owner instructions, 2026-10-28.

## Principles

- The site is small, static and fast: hand-written HTML/CSS, minimal JavaScript, no framework, no build step.
- No trackers, analytics, ads, cookies, `localStorage`, external fonts, external scripts or embedded third-party content without a concrete, owner-approved need. If one is ever added, the Privacy Policy must be updated first.
- Never add empty pages, fake forms, links to store listings that do not exist, or promises of features that are not implemented. A page exists only when its content is real.
- Player-facing text exists in EN and PL with the same structure and meaning (section `id`s match).

## Legal documents

- Policy content must follow [privacy-data-inventory.md](privacy-data-inventory.md), which is derived from the game's code and official provider documentation. Distinguish current from planned features.
- Never invent controller details, contact addresses, legal bases, retention periods, procedures or guarantees. Missing facts are questions for the owner.
- Agents' analysis is not legal approval. Content changes require explicit owner approval of the concrete text before publishing; record the approval in [decisions](decisions.md).
- Every material change updates the "Last updated" date in both languages and keeps the URL stable. Follow [site-legal-update](../.agents/skills/site-legal-update/SKILL.md).

## Checks

Run `node tools/check-site.mjs` before every commit (see [site-validate](../.agents/skills/site-validate/SKILL.md)). For visual changes also preview locally (`python -m http.server 4173 -d docs` or the Claude `site` launch entry) at phone and desktop widths and check keyboard navigation.

## Git and publishing

- Branch prefix: `codex/` for Codex, `claude/` for Claude Code. Deliver through a PR to `main`; the owner merges. Merging to `main` publishes the site (GitHub Pages, branch `main`, folder `/docs`).
- Never force-push or rewrite `main`. Stage explicit paths; English commit messages.
- After a publish, verify the real HTTPS URLs (status, content, both languages) rather than assuming them from the repository name.
- Keep secrets out of the repository. This repository is public.
