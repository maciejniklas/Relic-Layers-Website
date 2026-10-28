# Relic Layers Website — Claude Code entry

@AGENTS.md

AGENTS.md above is the shared, runtime-neutral entry for Codex and Claude. This file holds only Claude Code deltas. Do not copy shared rules here.

- **Branches:** use `claude/` instead of `codex/` for task branches.
- **Skills:** `.claude/skills/*` are thin wrappers; edit the canonical `.agents/skills/*/SKILL.md` and keep wrapper `name`/`description` identical (`node tools/check-site.mjs` verifies this).
- **Preview:** use the `site` entry in `.claude/launch.json` (static server on port 4173) with the built-in browser; check phone (375 px) and desktop widths.
- Personal overrides go in ignored `CLAUDE.local.md` / `.claude/settings.local.json`.
