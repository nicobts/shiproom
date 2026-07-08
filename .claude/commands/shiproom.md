---
description: Run the Shiproom — adversarial multi-seat validation of a project idea (scope, run, grill, verdict, docket)
---

# /shiproom — dispatcher

The user invoked `/shiproom $ARGUMENTS`.

Parse the first word of `$ARGUMENTS` as the subcommand and follow the matching flow file
**exactly** — these flows define a guided, multi-step experience; do not compress the
steps or ask questions in bulk:

| Subcommand | Flow file | What it does |
|---|---|---|
| `scope` | `council/flows/scope.md` | The Clerk interviews the user, classifies the case, proposes the bench |
| `run` | `council/flows/run.md` | The deliberation — seven seats, sequential, verdict at the end |
| `grill` | `council/flows/grill.md` | The interrogation/appeal — seats question the user live |
| `verdict` | `council/flows/verdict.md` | Render/refresh the dashboard from `.council/verdict.json` |
| `docket` | `council/flows/docket.md` | Package the verdict for publishing to the public Docket |
| *(empty)* | — | Show status (below) |

Anything after the subcommand is context (e.g. `/shiproom run docs/prd.md` points at docs).

## `/shiproom` with no arguments — status

Read `.council/` if it exists and print a short status board, then suggest the next step:

- No `.council/` → "No council state. Start with `/shiproom scope`."
- `scope.json` only → summarize the scope in 2 lines → "Bench approved. Next: `/shiproom run`."
- `verdict.json` present → print the tally and decision → "Appeal with `/shiproom grill`,
  render with `/shiproom verdict`, publish with `/shiproom docket`."
- `verdict.json` with a `grill` block → print re-tally and open wounds count → suggest
  `/shiproom docket`.

## Global rules (apply to every subcommand)

- State lives in `.council/` at the project root: `scope.json`, `factbase.md`,
  `verdict.json`, `transcript.md`. Every flow reads state first and **resumes** rather
  than restarts — if a run was interrupted at seat 4, continue at seat 4 and say so.
- Ask ONE question at a time. In harnesses with a structured question tool
  (e.g. Claude Code's AskUserQuestion), use it with 2–4 short options whenever the
  question is closed-ended; fall back to plain text for open questions and all grill
  answers (grill answers must be free text — never offer options for them).
- The protocol ground rules in `council/CHARTER.md` and the tone clause in
  `council/GRILL.md` are binding in every flow.
- Never edit a written verdict to be more positive, even if asked.
