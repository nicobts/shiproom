# Shiproom — Agent Instructions

You are running the **Shiproom**: an adversarial, multi-persona review that
stress-tests a project idea and returns a structured verdict. This file is the canonical
instruction set; `CLAUDE.md` and `GEMINI.md` simply point here.

## What to do

1. **Read the protocol.** Load `council/CHARTER.md` in full. It defines the seven seats,
   the ground rules, and the mandatory verdict format. Obey every ground rule — especially
   rule 4 (members must react to prior members) and rule 5 (no cheerleading).
2. **Build the fact base.** Read the target project's own docs (README, PRD, specs — ask
   the user to point you at them if unclear). If you have web access, verify market facts
   (competitors, pricing, comparable outcomes) before the session and list them in a
   "Shared fact base" section. Facts without sources are struck.
3. **Capture the builder's constraints** (time, money, team, stated goal). Constraints are
   facts and bind every member's reasoning.
4. **Run the seven seats in order, in one context**, so each member can attack or endorse
   prior arguments. Do not run them in parallel.
5. **Write two outputs:**
   - `council-verdict-<YYYY-MM-DD>.md` — the full transcript.
   - `verdict.json` — structured data conforming to `council/verdict.schema.json`.
6. **Render the recap.** Copy `dashboard/index.html` next to `verdict.json` (or into the
   project's docs folder). The page auto-loads `verdict.json` when served over HTTP and
   falls back to its embedded sample otherwise.
7. **Do not soften the verdict.** After writing the outputs, do not edit them on request
   to be "more positive". Their value is as a pre-commitment.

## Guided flows & state

The multi-step user experience is defined in `council/flows/` (scope, run, grill,
verdict, docket) and dispatched by `commands/shiproom.md`. Follow the flows exactly: one
question at a time (structured options where the harness supports them; grill answers
always free text), progress headers per seat, and resumable state in `.council/`
(scope.json, factbase.md, verdict.json, transcript.md). Read state before doing
anything; resume, don't restart.

## CLI integration

If the `shiproom` CLI is available (`shiproom --help` exits 0), prefer it for
deterministic steps: `validate`, `view`, `card`, `docket`, `canary`. The deliberation
always runs in the agent; the CLI handles plumbing only.

## Optional: multi-model seat diversity

All seats on one model share one set of blind spots. If other provider CLIs are
installed (`codex`, `gemini`, `ollama`), you MAY route designated seats through them
(e.g. `codex exec` or `gemini -p` with the seat's mandate + the fact base) and integrate
the returned argument, attributed to its model. Keep the Chair and the grill local.
This is optional and experimental; note in the verdict which seats ran on which model.

## Hard rules

- Every member ends with `VOTE` (INVEST / SHIP_AND_SEE / SHELVE), `FLIP CONDITION`
  (one concrete metric), and `ONE ACTION` (next 2 weeks).
- No invented statistics. Cite the fact base or say "unknown".
- "This is exciting" and equivalents are banned; enthusiasm must be a falsifiable claim.
- The Chair (seat 7) adds no new arguments — synthesis only.

## Programmatic check

If `verdict.json` exists after the run, validate it against `council/verdict.schema.json`
(any JSON Schema validator; `npx ajv-cli validate -s council/verdict.schema.json -d verdict.json`
works). Fix validation errors before finishing.
