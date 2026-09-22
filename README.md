# Shiproom

**The go/no-go room for your idea — an AI council that won't tell you it's great.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Self-verdict: Ship & See 5-1-1](https://img.shields.io/badge/self--verdict-Ship%20%26%20See%205--1--1-0f766e)](./docket/001-shiproom/)
[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-compatible-6e56cf)](https://agentskills.io)

**English** · [简体中文](./i18n/README.zh-CN.md) · [日本語](./i18n/README.ja.md) · [Español](./i18n/README.es.md) · [Italiano](./i18n/README.it.md) · [Français](./i18n/README.fr.md) — [add your language](./i18n/)

Built by **Nicolas Bossi** ([LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/) · [nicolasbossi@gmail.com](mailto:nicolasbossi@gmail.com)) —
I got tired of every AI telling me every idea was great, so I built the thing that wouldn't.

Ask an AI to evaluate your project and you get flattery. Ask the Council and you get
seven adversarial seats — CTO, CFO, VC, CMO, CEO, your target customer, and a Chair —
each mandated to find the strongest reason your project *fails* before saying what would
change its mind. Every seat must end with a vote (`INVEST` / `SHIP_AND_SEE` / `SHELVE`),
a flip condition, and one concrete action. The output is a committed verdict you're not
allowed to soften, rendered as an interactive verdict page.

<p align="center">
  <img src="assets/hero.jpg" alt="The Shiproom: seven shadowed seats on a judicial bench — six teal verdict lights, one red dissent — judging an idea, a paper boat folded from a pitch document" width="100%">
</p>

> **It judged itself first.** We ran the Council on this very repo before launching.
> Verdict: **Ship & See, 5–1–1** — the VC voted to SHELVE it ("no revenue mechanism,
> no moat, and I will not launder the vocabulary to avoid saying so"). The dissent is
> the product working. [Read Docket entry #001](./docket/001-shiproom/) or
> [view the live verdict page](https://nicobts.github.io/shiproom/docket/001-shiproom/).

## Run it in 30 seconds — no install

Paste [`SHIPROOM.md`](./SHIPROOM.md) into any capable AI agent or chat — Claude, ChatGPT,
Gemini, Cursor, Codex, anything — along with a description of your project. That's the
whole setup. The repo version below adds web-verified fact bases, structured
`verdict.json` output, and the interactive verdict page.

## Install — as a skill, in any coding agent

Shiproom is a standard [Agent Skill](https://agentskills.io): one self-contained folder,
`skills/shiproom/`, that any skills-aware agent can load. Pick one:

**Claude Code — plugin**

```
/plugin marketplace add nicobts/shiproom
/plugin install shiproom@shiproom
```

**Claude Code, Codex, Cursor, Gemini CLI, OpenCode, Copilot and more — via the
[skills CLI](https://github.com/vercel-labs/skills)**

```bash
npx skills add nicobts/shiproom            # this project
npx skills add nicobts/shiproom --global   # every project
```

`npx skills update` and `npx skills remove shiproom` handle upgrades and uninstall.

**By hand** — copy `skills/shiproom/` into your agent's skills folder:
`.claude/skills/` for Claude Code, `.agents/skills/` for Codex, Cursor, Gemini CLI and
OpenCode (or the user-level equivalent, e.g. `~/.claude/skills/`).

Nothing is written to your project except the council's own state in `.council/`. Your
`AGENTS.md`, `CLAUDE.md` and other files are never touched.

Then, in your agent:

> /shiproom scope

or, in agents without slash commands:

> Run the Shiproom on this project. My docs are in ./docs.
> My constraints: [hours/week, funding, team, goal].

Your agent runs the council in your language — an Italian founder's council argues in
Italian. Zero i18n, global by construction.

## The guided experience

The Council is a five-step flow with resumable state in `.council/`:

```
/shiproom scope    the Clerk interviews you (one question at a time), seats the bench
/shiproom run      the deliberation — seat-by-seat, progress headers, resume-safe
/shiproom grill    the appeal — seats question YOU; answers can flip votes
/shiproom verdict  render the verdict page
/shiproom docket   package it for the public Docket
```

Quit mid-grill tonight; `/shiproom grill` resumes at the same seat tomorrow. As a
plugin, the command is namespaced: `/shiproom:shiproom scope`.

## The helper script — plumbing, not thinking

The deliberation runs in *your* agent. A zero-dependency Node 18+ script inside the
skill, `scripts/shiproom.js`, handles the deterministic parts; the skill tells your agent
when to call it, so you rarely run it yourself:

```
node skills/shiproom/scripts/shiproom.js validate   check verdict.json against the schema and protocol rules
node skills/shiproom/scripts/shiproom.js view       serve the verdict page on 127.0.0.1
node skills/shiproom/scripts/shiproom.js card       generate a 1200×630 share card (--png for social previews)
node skills/shiproom/scripts/shiproom.js docket     package a verdict for the public Docket
node skills/shiproom/scripts/shiproom.js canary     drift check on a run of the flawed fixture
```

`canary` is the anti-sycophancy test: run the council on
[`references/canary/FIXTURE.md`](./skills/shiproom/references/canary/FIXTURE.md) with any
new model — if the verdict comes back cheerful, the protocol failed, not passed.

> **Note — npm.** Shiproom is not published to npm, and the unscoped name `shiproom`
> belongs to an unrelated package: never run `npx shiproom`. If a standalone CLI is
> published later, it will be under a scoped name such as `@nicobts/shiproom`.

## The verdict page — summary on the bench, depth one click deeper

Each seat appears twice: the ~250-word floor argument you can scan in seconds, and —
expandable beneath it — the seat's full written assessment: analysis, evidence with
every estimate flagged, ranked risks, the flip condition expanded into the signals to
watch, and 3–5 prioritized recommendations. The verdict tells you the decision; the
filings tell you what to do about it.


The run writes `.council/verdict.json`; `/shiproom verdict` (or the helper's `view`)
serves the page locally. You get the bench (one seat, one vote, at a glance), the
tally, every seat's argument with its flip condition, and the pre-committed go/no-go
thresholds. Single file, zero build, no accounts, no telemetry — nobody is farming you.

## Grill mode — appeal the verdict

The deliberation judges your documents; the grill judges *you*. Each seat questions you
directly, one question at a time — answers must be numbers, facts, names, or decisions.
Dodge twice and the question is recorded verbatim as an **open wound** in your verdict.
Answer well and seats revise their votes; the Chair re-tallies. Frank, not cruel: the
protocol bans insults and theatrics — specificity is the aggression. See
[`references/GRILL.md`](./skills/shiproom/references/GRILL.md).

## The Docket

Published verdicts, starting with our own. Ran the Council and willing to show the
scars? PR your verdict folder into `docket/` — SHELVE verdicts especially welcome;
getting roasted well is a badge of honor.

| # | Project | Verdict | Tally |
|---|---------|---------|-------|
| 001 | [Shiproom (this repo)](./docket/001-shiproom/) | Ship & See | 5–1–1, VC dissenting |

## Why this works when "be brutally honest" doesn't

Prompt-level honesty collapses back into agreement within a couple of turns — the model
wants to please you, whatever costume it wears. The Council attacks the problem
structurally:

1. **Kill mandates** — each seat must argue the failure case first.
2. **A sourced fact base** — claims without sources are struck; unverifiable numbers
   are labeled ESTIMATE.
3. **Forced engagement** — every seat must explicitly agree or disagree with a prior
   seat, by name.
4. **Pre-committed verdicts** — votes, flip conditions, and thresholds written before
   you know the outcome, never edited after.
5. **The unanimity alarm** — a unanimously cheerful run is treated as a failed run.

## Contributing — add a seat, or a language

Translations are the easiest first PR: condensed READMEs live in [`i18n/`](./i18n/) —
copy one, translate, add yourself to the switcher line. The protocol itself needs no
translation: your agent runs the council in your language natively.

## Contributing — add a seat to the bench

A new seat or council template is a ~30-line markdown file: mandate, kill question,
verdict semantics. Grant Reviewer for nonprofits, Game Designer, PhD Advisor, Clinical
Regulator — if you know a vantage point that kills bad ideas, PR it. See
[`references/CHARTER.md`](./skills/shiproom/references/CHARTER.md) for the invariants (the ICP seat and the Chair are never removed;
the verdict format is mandatory everywhere).

## Repository layout

```
skills/shiproom/                   the Agent Skill — self-contained, install this folder
  SKILL.md                         entry point: subcommands, global rules, helper usage
  references/CHARTER.md            the protocol: seats, ground rules, verdict format
  references/GRILL.md              interrogation rules and tone clause
  references/flows/                guided flows: scope, run, grill, verdict, docket
  references/verdict.schema.json   output contract
  references/canary/FIXTURE.md     flawed fixture project for drift checks
  references/examples/             a full sample verdict
  assets/dashboard.html            the verdict page (single file, zero build)
  scripts/shiproom.js              zero-dependency helper: validate, view, card, docket, canary
.claude-plugin/                    Claude Code plugin + marketplace manifests
SHIPROOM.md                        one-file zero-install edition — paste into any AI
docket/                            published verdicts — #001 is this repo judging itself
tests/                             node:test suite for the helper (npm test)
```

## Roadmap

### Next steps

- [x] Self-contained Agent Skill layout — installable with `npx skills add`
- [x] Claude Code plugin and marketplace manifests
- [x] Helper script validates against the full schema, serves on localhost only, and is
      covered by tests in CI (Node 18, 20, 22)
- [ ] Verify the install end to end in Claude Code (plugin and `npx skills`), Codex,
      Cursor, Gemini CLI and OpenCode
- [x] Tag the first release, `v0.3.0`, with release notes
- [ ] Record a 20-second demo of a verdict landing and embed it at the top of this README
- [ ] Submit to skill and plugin directories (skills.sh, Claude Code plugin marketplaces)

### Recommended improvements

- [ ] Publish a second Docket entry with a SHELVE verdict, to show the council kills
      ideas and not just blesses its author's
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

## Honest limitation

All seven seats run on the same model, so the Council structures your decision and
forces pre-commitment — it cannot replace real market contact. Treat its verdict as a
hypothesis and its thresholds as the experiment that tests it. And model behavior
drifts: the repo ships a fixture project with a known honest verdict as a drift canary —
if a new model returns unanimous cheerfulness on it, the protocol needs tightening, not
celebrating.

## About

I'm Nicolas — a solo builder working nights and weekends. This protocol came out of
validating one of my own side projects: I wanted an evaluation I couldn't sweet-talk.
The council's first verdict — on itself — is in the [Docket](./docket/), unedited,
including the seat that voted against this repo existing. If it's useful to you, a star
helps others find it, and a published verdict in the Docket helps even more.
Say hi on [LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/) or write to
[nicolasbossi@gmail.com](mailto:nicolasbossi@gmail.com).

## License

MIT
