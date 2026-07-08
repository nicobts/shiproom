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

Invariants (see [`council/CHARTER.md`](./council/CHARTER.md)):

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
  verdict.json    required — must validate against council/verdict.schema.json
  README.md       required — tally, one line per seat, your thresholds
  index.html      optional — copy of dashboard/index.html for the interactive page
  card.svg        optional — share card (npx shiproom card)
```

Use the next free `NNN`. Validate before pushing:

```bash
node cli/index.js validate docket/NNN-your-project/verdict.json
```

CI runs the same check on every PR. Two rules:

- **Verdicts are published unedited.** No softening after the fact — the pre-commitment
  is the product.
- **SHELVE verdicts are especially welcome.** Getting roasted well is a badge of honor.

## Ground rules for all PRs

- Zero dependencies stays zero dependencies (CLI and dashboard).
- The dashboard remains a single HTML file with no build step.
- No invented statistics anywhere — cite a source or label it ESTIMATE.
