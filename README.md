# Shiproom

**The go/no-go room for your idea — an AI council that won't tell you it's great.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Self-verdict: Ship & See 5-1-1](https://img.shields.io/badge/self--verdict-Ship%20%26%20See%205--1--1-0f766e)](./docket/001-shiproom/)
[![AGENTS.md compatible](https://img.shields.io/badge/AGENTS.md-compatible-6e56cf)](https://agents.md)

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

## Full version — works with every major coding agent

```bash
git clone https://github.com/nicobts/shiproom
cd your-project
node ../shiproom/cli/index.js init   # auto-detects your harness
```

No `.claude/`, `.cursor/`, `.agents/` or `.gemini/` folder yet? Pass the harness
explicitly: `init --claude` (or `--cursor`, `--codex`, `--gemini`, `--all`).

Shiproom is not on npm yet — run the CLI from your clone as above. Everything is plain
markdown plus one HTML file, so copying the folders by hand also works.

Then, in your agent:

> Run the Shiproom per council/CHARTER.md on this project.
> My docs are in ./docs. My constraints: [hours/week, funding, team, goal].

- **Codex / Cursor / Copilot / Windsurf / Devin** read `AGENTS.md` natively
  (the [Linux Foundation-stewarded standard](https://agents.md), 60K+ repos).
- **Claude Code** reads `CLAUDE.md` (imports `AGENTS.md`) and the portable skill in
  `skills/shiproom/`.
- **Gemini CLI** reads `GEMINI.md`, or set `context.fileName` to `AGENTS.md`.
- Your agent runs in your language — an Italian founder's council argues in Italian.
  Zero i18n, global by construction.

## In your terminal — the guided experience

Inside Claude Code (or any command-capable harness) the Council is a five-command flow
with resumable state in `.council/`:

```
/shiproom scope    the Clerk interviews you (one question at a time), seats the bench
/shiproom run      the deliberation — seat-by-seat, progress headers, resume-safe
/shiproom grill    the appeal — seats question YOU; answers can flip votes
/shiproom verdict  render the verdict page
/shiproom docket   package it for the public Docket
```

Quit mid-grill tonight; `/shiproom grill` resumes at the same seat tomorrow. Other
harnesses (Codex, Cursor, Copilot, Gemini CLI, OpenCode) get the same flows via
`AGENTS.md` and the portable skill — run `scripts/build-dist.sh` for per-tool bundles.

## The CLI — plumbing, not thinking

The deliberation runs in *your* agent (skill-first, near-zero context cost while idle);
a zero-dependency CLI (Node 18+) handles the deterministic parts. `shiproom` below means
`node <path-to-clone>/cli/index.js`, or plain `shiproom` after `npm link` in the clone:

```
shiproom init                  install into a project (detects Claude Code/Cursor/Codex/Gemini)
shiproom validate              check a verdict.json against the protocol contract
shiproom view                  serve the verdict page locally
shiproom card                  generate a 1200×630 share image from a verdict
shiproom docket                package a verdict for the public Docket
shiproom canary                drift check: run the council on the flawed fixture
                              (council/canary/FIXTURE.md) with any new model — if the
                              verdict comes back cheerful, the protocol failed, not passed
```

Your agent uses the CLI automatically when it's installed (the skill teaches it) — the
CLI+Skills pattern, with the token-heavy thinking staying in the agent where it belongs.

## The verdict page — summary on the bench, depth one click deeper

Each seat appears twice: the ~250-word floor argument you can scan in seconds, and —
expandable beneath it — the seat's full written assessment: analysis, evidence with
every estimate flagged, ranked risks, the flip condition expanded into the signals to
watch, and 3–5 prioritized recommendations. The verdict tells you the decision; the
filings tell you what to do about it.


The run writes `verdict.json`; drop `dashboard/index.html` next to it and serve
(`python3 -m http.server`). You get the bench (one seat, one vote, at a glance), the
tally, every seat's argument with its flip condition, and the pre-committed go/no-go
thresholds. Single file, zero build, no accounts, no telemetry — nobody is farming you.

## Grill mode — appeal the verdict

The deliberation judges your documents; the grill judges *you*. Each seat questions you
directly, one question at a time — answers must be numbers, facts, names, or decisions.
Dodge twice and the question is recorded verbatim as an **open wound** in your verdict.
Answer well and seats revise their votes; the Chair re-tallies. Frank, not cruel: the
protocol bans insults and theatrics — specificity is the aggression. See
[`council/GRILL.md`](./council/GRILL.md).

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
`council/CHARTER.md` for the invariants (the ICP seat and the Chair are never removed;
the verdict format is mandatory everywhere).

## Repository layout

```
SHIPROOM.md                    one-file zero-install edition — paste into any AI
AGENTS.md                     canonical agent instructions (cross-tool standard)
CLAUDE.md / GEMINI.md         thin pointers for Claude Code and Gemini CLI
council/CHARTER.md            the protocol: seats, ground rules, verdict format
council/verdict.schema.json   output contract
council/examples/             a full sample verdict
skills/shiproom/    portable SKILL.md
dashboard/index.html          the verdict page (single file, zero build)
commands/shiproom.md           the /shiproom dispatcher (slash-command harnesses)
council/flows/                guided multi-step flows: scope, run, grill, verdict, docket
scripts/build-dist.sh         builds per-harness bundles (dist/claude-code, dist/cursor, ...)
docket/                       published verdicts — #001 is this repo judging itself
```

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
