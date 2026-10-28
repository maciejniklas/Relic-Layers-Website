---
name: site-legal-update
description: Change a Relic Layers player-facing legal document (Privacy Policy, later Terms) from verified facts, keep EN/PL equivalent, obtain owner approval and publish without changing its URL.
---

# Update a legal document

1. Establish facts first: read [privacy-data-inventory](../../../.docs/privacy-data-inventory.md); if the game changed, re-check its code/configuration and official provider documentation, then update the inventory (current vs planned).
2. List facts that cannot be derived (controller, contacts, legal bases, retention, request handling, markets). Ask the owner in one short set. Never invent them.
3. Edit the EN and PL documents together; keep section `id`s identical and set the same `data-updated` date and visible "Last updated" date in both.
4. Run [site-validate](../site-validate/SKILL.md).
5. Present the concrete text (both languages) and a local preview to the owner. State that this is not legal advice or legal approval.
6. Only after explicit approval: record it in [decisions](../../../.docs/decisions.md) (date, scope), commit and deliver per [workflow](../../../.docs/workflow.md). Keep the URL unchanged so the game and store listings keep working.
