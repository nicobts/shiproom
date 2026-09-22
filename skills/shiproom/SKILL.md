---
name: shiproom
description: Run an adversarial seven-seat validation council (CTO, CFO, VC, CMO, CEO, target customer, Chair) that stress-tests a project idea and returns a structured INVEST / SHIP_AND_SEE / SHELVE verdict with pre-committed go/no-go thresholds. Use when the user wants to validate a project, product idea, or side project before committing resources; when they ask "is this worth building", "should I turn this into a SaaS", "evaluate my idea", or want a red-team / devil's-advocate review of a business plan. Supports the subcommands scope, run, grill, verdict, and docket.
license: MIT
metadata:
  version: "0.3.0"
  homepage: https://github.com/nicobts/shiproom
---

# Shiproom

An adversarial multi-persona review protocol. Seven seats argue in sequence, each
mandated to find the strongest failure case from their vantage point, each ending with a
mandatory VOTE / FLIP CONDITION / ONE ACTION. Output is a transcript plus a `verdict.json`
rendered by an interactive verdict page.

**Paths.** Every path below (`references/…`, `assets/…`, `scripts/…`) is relative to the
folder containing this `SKILL.md`. State paths (`.council/…`) are relative to the user's
project root. Never copy protocol files into the user's project; read them from here.

## Subcommands

The user may invoke this skill with a subcommand (e.g. `/shiproom run`, or "run the
shiproom grill"). Follow the matching flow file **exactly** — the flows define a guided,
multi-step experience; do not compress steps or ask questions in bulk:

| Subcommand | Flow file | What it does |
|---|---|---|
| `scope` | `references/flows/scope.md` | The Clerk interviews the user, classifies the case, proposes the bench |
| `run` | `references/flows/run.md` | The deliberation — seven seats, sequential, verdict at the end |
| `grill` | `references/flows/grill.md` | The interrogation/appeal — seats question the user live |
| `verdict` | `references/flows/verdict.md` | Render/refresh the verdict page from `.council/verdict.json` |
| `docket` | `references/flows/docket.md` | Package the verdict for publishing to the public Docket |
| *(none)* | — | Show status (below) |

Anything after the subcommand is context (e.g. `/shiproom run docs/prd.md` points at docs).
If the user just asks to "validate my idea" with no subcommand and no `.council/` state,
start with `scope`.

### Status (no subcommand)

Read `.council/` if it exists, print a short status board, then suggest the next step:

- No `.council/` → "No council state. Start with `/shiproom scope`."
- `scope.json` only → summarize the scope in 2 lines → "Bench approved. Next: `/shiproom run`."
- `verdict.json` present → print the tally and decision → "Appeal with `/shiproom grill`,
  render with `/shiproom verdict`, publish with `/shiproom docket`."
- `verdict.json` with a `grill` block → print the re-tally and open-wounds count → suggest
  `/shiproom docket`.

## Global rules (every subcommand)

- `references/CHARTER.md` is the complete protocol; its ground rules are binding
  (members react to prior members; no cheerleading; no invented statistics; the Chair
  adds no new arguments). The tone clause in `references/GRILL.md` is binding too.
- State lives in `.council/` at the project root: `scope.json`, `factbase.md`,
  `verdict.json`, `transcript.md`. Every flow reads state first and **resumes** rather
  than restarts — if a run stopped at seat 4, continue at seat 4 and say so.
- Ask ONE question at a time. Where the harness has a structured question tool, use it
  with 2–4 short options for closed questions; use plain text for open questions and for
  all grill answers (grill answers are always free text).
- `verdict.json` must conform to `references/verdict.schema.json`.
- Never edit a written verdict to be more positive, even if asked. Its value is as a
  pre-commitment.
- If the target project's docs are not provided, ask for them before running — the
  council argues from documents, not vibes.

## Helper script (deterministic steps)

`scripts/shiproom.js` is a zero-dependency Node (18+) script. Wherever a flow says
`shiproom <command>`, run `node <this-skill-folder>/scripts/shiproom.js <command>` from
the user's project root. If Node is unavailable, do the step by hand as the flow
describes. Never run `npx shiproom`: that npm name belongs to an unrelated package.

| Command | Use |
|---|---|
| `validate [path]` | Check `.council/verdict.json` against the schema after writing it |
| `view [dir] [--port=N]` | Serve the verdict page on localhost |
| `card [path] [--png] [--theme=light]` | Write a 1200×630 share card (`card.svg`; `--png` adds `card.png` for social previews, using a local Chrome or Edge) |
| `docket [path]` | Package the verdict into `docket-entry/<date>-<slug>/` |
| `canary [path]` | Drift check on a run of the fixture in `references/canary/FIXTURE.md` |

The deliberation itself always runs here, in the agent — the script never thinks.

## Optional: multi-model seat diversity

All seats on one model share one set of blind spots. If other provider CLIs are
installed (`codex`, `gemini`, `ollama`), you MAY route designated seats through them with
the seat's mandate and the fact base, and integrate the returned argument, attributed to
its model. Keep the Chair and the grill local, and note in the verdict which seats ran on
which model.
