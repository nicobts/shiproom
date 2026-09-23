# Roadmap

What's done, what's next, and what might come later. Checked items shipped; the rest
are intentions, not promises. Suggestions are welcome as issues.


### Next steps

- [x] Self-contained Agent Skill layout — installable with `npx skills add`
- [x] Claude Code plugin and marketplace manifests
- [x] Helper script validates against the full schema, serves on localhost only, and is
      covered by tests in CI (Node 18, 20, 22)
- [x] Verified the install end to end with `npx skills add` for Claude Code and Codex
- [ ] Verify the plugin install, and Cursor, Gemini CLI and OpenCode
- [x] Tag the first release, `v0.3.0`, with release notes
- [ ] Record a 20-second demo of a verdict landing and embed it at the top of the README
- [ ] Submit to skill and plugin directories (skills.sh, Claude Code plugin marketplaces)

### Recommended improvements

- [ ] Publish a second Docket entry with a SHELVE verdict, to show the council kills
      ideas and not just blesses its author's
- [x] Dark and light themes on the verdict page and the share card, matching the site
- [x] Published entries rebuilt from their verdicts, with social preview cards
- [ ] Run the canary in CI against stored reference verdicts, one that must pass and one
      that must fail
- [ ] Generate `SHIPROOM.md` from `references/` so the paste-anywhere edition cannot drift
      from the charter
- [ ] Alternative benches as templates: nonprofit, research project, internal tool
- [ ] Issue templates for new seats and Docket submissions
- [x] A one-command PNG export for the share card (`card --png`)

### Possible later

- [ ] Scoped npm package (`@nicobts/shiproom`) exposing the helper as a standalone CLI
- [ ] Gemini CLI extension and Codex plugin manifests, alongside the Claude Code plugin
- [ ] Multi-model benches as a first-class option, with the model per seat recorded in
      `verdict.json`
- [ ] Measure verdict stability: repeat runs across models and report how often the
      decision changes
- [ ] A Docket gallery on GitHub Pages, filterable by decision

