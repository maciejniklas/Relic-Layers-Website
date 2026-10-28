# Relic Layers Website — start here

Public static website for the mobile game Relic Layers: home page and player-facing legal documents (Privacy Policy now; Terms, Support and account deletion later). Published with GitHub Pages from `main` / `docs/`.
Communicate with the owner in Polish; write code, comments, technical documentation and commit/PR text in English. Player-facing pages are bilingual EN/PL and must stay equivalent.

## Start and context

- Read [workflow](.docs/workflow.md) once per task. Load other topics only when relevant; do not scan the repository to rebuild documentation.
- Check `git status --short`; preserve unrelated changes. User instructions prevail.
- The game lives in the private repository `maciejniklas/Relic-Layers` (local `D:/Repositories/Relic-Layers`), governed by its own `AGENTS.md`. Never copy its code, internal documentation, identifiers of cloud projects, credentials or Trello data into this public repository.
- Codex and Claude Code share these instructions; [CLAUDE.md](CLAUDE.md) holds Claude-only deltas. Skills: canonical `.agents/skills/<name>/SKILL.md`, Claude wrappers in `.claude/skills/<name>/SKILL.md`.

## Repository map

| Path | Purpose |
| --- | --- |
| `docs/` | **Published site root** (GitHub Pages). Everything here is public. |
| `docs/assets/` | Shared CSS/JS. No third-party fonts, trackers, cookies or analytics. |
| `.docs/` | Maintainer knowledge (not served): workflow, page model, privacy data inventory, decisions. |
| `tools/check-site.mjs` | Local validator (links, EN/PL parity, placeholders, metadata). Node ≥ 20, no dependencies. |
| `.agents/skills/` | Canonical agent procedures. |

## Knowledge map

| Need | Read |
| --- | --- |
| Work, checks, publishing, Git | [.docs/workflow.md](.docs/workflow.md) |
| URLs, page structure, adding pages, style | [.docs/site-structure.md](.docs/site-structure.md) |
| What the game actually processes (policy source of truth) | [.docs/privacy-data-inventory.md](.docs/privacy-data-inventory.md) |
| Decisions | [.docs/decisions.md](.docs/decisions.md) |
| Validate a change | [.agents/skills/site-validate/SKILL.md](.agents/skills/site-validate/SKILL.md) |
| Change a legal document | [.agents/skills/site-legal-update/SKILL.md](.agents/skills/site-legal-update/SKILL.md) |
