# Contributing to Shiproom

Three kinds of PRs are especially welcome, in increasing order of glory.

## 1. Translations — the easiest first PR

Condensed READMEs live in [`i18n/`](./i18n/). Copy one, translate it, add your language
to the switcher line at the top of the main `README.md`. The protocol itself needs no
translation — your agent runs the council in your language natively.

## 2. Seats and council templates

A new seat is a ~30-line markdown file: mandate, kill question, verdict semantics.
Grant Reviewer for nonprofits, Game Designer, PhD Advisor, Clinical Regulator — if you
know a vantage point that kills bad ideas, PR it.

Invariants (see [`references/CHARTER.md`](./skills/shiproom/references/CHARTER.md)):

- The ICP seat and the Chair are never removed.
- The verdict format is mandatory everywhere: every seat ends with `VOTE`
  (INVEST / SHIP_AND_SEE / SHELVE), a `FLIP CONDITION` (one concrete metric), and
  `ONE ACTION` (next 2 weeks).
- Kill mandates stay: each seat must argue the failure case first.
- No cheerleading. A unanimously cheerful template is a broken template.

## 3. Docket entries — publish your verdict

Ran the Council and willing to show the scars? PR your verdict folder into `docket/`:

```
docket/NNN-your-project/
  verdict.json    required — must validate against skills/shiproom/references/verdict.schema.json
  README.md       required — tally, one line per seat, your thresholds
  index.html      generated — the verdict page with your verdict baked in
  card.svg        generated — share card (card.png too, for social previews)
```

`index.html`, `card.svg` and `card.png` are built from your `verdict.json`; run
`node tools/docket-build.js` and commit what it writes. Never edit them by hand — CI
rebuilds them and fails if they drift. CI also rejects any change to a published
`verdict.json`: the record stands, only the page around it improves.

Use the next free `NNN`. Validate before pushing:

```bash
node skills/shiproom/scripts/shiproom.js validate docket/NNN-your-project/verdict.json
```

CI runs the same check on every PR. Two rules:

- **Verdicts are published unedited.** No softening after the fact — the pre-commitment
  is the product.
- **SHELVE verdicts are especially welcome.** Getting roasted well is a badge of honor.

## How changes land

Shiproom uses GitHub Flow. `main` is protected: every change arrives through a pull
request from a short-lived branch (`feat/…`, `fix/…`, `docs/…`, `chore/…`), and CI must
pass (tests on Node 18, 20 and 22, plus verdict validation) before merging. Releases are
tags (`v0.3.0`, …) on `main`; tags are protected too.

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

## Ground rules for all PRs

- Zero dependencies stays zero dependencies (helper script and dashboard).
- Everything the skill needs stays inside `skills/shiproom/`.
- Run `npm test` before opening a PR.
- The dashboard remains a single HTML file with no build step.
- No invented statistics anywhere — cite a source or label it ESTIMATE.
