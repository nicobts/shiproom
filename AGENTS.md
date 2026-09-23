# Shiproom — instructions for agents working on this repository

This repository **is** the Shiproom skill. To *run* a council, load
`skills/shiproom/SKILL.md` and follow it; everything below is about changing the repo.

## Layout

- `skills/shiproom/` — the Agent Skill, self-contained. `SKILL.md` is the entry point;
  `references/` holds the protocol (charter, grill rules, flows, schema, canary fixture,
  sample verdict); `assets/dashboard.html` is the verdict page; `scripts/shiproom.js` is
  the zero-dependency helper.
- `.claude-plugin/` — Claude Code plugin and marketplace manifests. The plugin exposes
  the same `skills/` folder.
- `SHIPROOM.md` — the one-file, paste-anywhere edition. Keep it in sync with the charter.
- `docket/` — published verdicts. **Never edit a published verdict.**
- `tests/` — `node:test` suite for the helper script.
- `tools/embed-assets.js` — re-embeds the fonts and `assets/council.jpg` into the verdict
  page after either changes; a test fails if the page is stale.

## Rules

- Everything the skill needs lives inside `skills/shiproom/`. Paths inside it are
  relative to that folder; never reference files outside it.
- Zero runtime dependencies for the script and the dashboard. The dashboard stays a
  single HTML file with no build step.
- Bump the version in all three places together: `skills/shiproom/SKILL.md`
  (`metadata.version`), `.claude-plugin/plugin.json`, and `package.json`. CI checks this.
- Run `npm test` before committing. CI also validates every verdict in `docket/` and
  `references/examples/`.
- No invented statistics anywhere — cite a source or label it ESTIMATE.
