---
name: shiproom
description: Run an adversarial seven-seat validation council (CTO, CFO, VC, CMO, CEO, target customer, Chair) that stress-tests a project idea and returns a structured INVEST / SHIP_AND_SEE / SHELVE verdict with pre-committed go/no-go thresholds. Use when the user wants to validate a project, product idea, or side project before committing resources; when they ask "is this worth building", "should I turn this into a SaaS", "evaluate my idea", or want a red-team / devil's-advocate review of a business plan.
---

# Shiproom

An adversarial multi-persona review protocol. Seven seats argue in sequence, each
mandated to find the strongest failure case from their vantage point, each ending with a
mandatory VOTE / FLIP CONDITION / ONE ACTION. Output is a transcript plus a `verdict.json`
rendered by an interactive dashboard.

## CLI integration (prefer when available)

Check once per session whether the utility CLI is installed (`shiproom --help` exits 0).
Never probe with `npx shiproom`: that npm name belongs to an unrelated package.
If it is installed, use it for the deterministic steps instead
of doing them manually: `shiproom validate` (schema check after writing verdict.json),
`shiproom view` (serve the verdict page), `shiproom card` (1200×630 share image),
`shiproom docket` (package for publishing), `shiproom canary` (drift check on fixture
runs). The deliberation itself always runs here, in the agent — the CLI never thinks.

## Command vocabulary (guided flows)

If the harness supports commands, `/shiproom` dispatches per `commands/shiproom.md`:
`scope` (Clerk interview — one question at a time), `run` (deliberation with progress
and resume), `grill` (interrogation/appeal — free-text answers only), `verdict` (render
the page), `docket` (publish). State lives in `.council/` (scope.json, factbase.md,
verdict.json, transcript.md); every flow resumes from state rather than restarting.
Without command support, follow the same flow files in `council/flows/` when the user
asks to scope, run, grill, or publish.

## How to run

1. Read `../../shiproom/CHARTER.md` — it is the complete protocol and its ground rules
   are binding (especially: members react to prior members; no cheerleading; no invented
   statistics; the Chair adds no new arguments).
2. Complete the intake: project summary from its own docs, the builder's constraints,
   and a sourced fact base (use web search if available to verify competitor pricing and
   comparable outcomes).
3. Run seats 1-7 sequentially in one context.
4. Write `council-verdict-<date>.md` (full transcript) and `verdict.json` conforming to
   `../../shiproom/verdict.schema.json`.
5. Copy `../../dashboard/index.html` next to `verdict.json`; the page auto-loads it when
   served over HTTP (e.g. `python3 -m http.server`) and shows an embedded sample otherwise.

## Rules that survive any summarization

- The verdict format is mandatory for every seat.
- Seats 6 (target customer) and 7 (Chair) can never be dropped.
- Never edit a committed verdict to be more positive; its value is as a pre-commitment.
- If the target project's docs are not provided, ask for them before running — the
  council argues from documents, not vibes.
