# Flow: /shiproom run — the deliberation

Requires `.council/scope.json` (if missing, say so and run the scope flow first).
Ground rules: `council/CHARTER.md` — binding, especially the verdict format, seat 2+
reactions, no cheerleading, no invented statistics.

## Steps

**1. Resume check.** If `.council/transcript.md` exists with completed seats, print
"Resuming at seat N — [role]" and continue from there. Never re-run completed seats.

**2. Fact base (interactive).** Build `council/CHARTER.md`'s shared fact base:
constraints from scope.json, plus market facts. If web access is available, verify
competitor pricing and comparable outcomes now; label anything unverifiable `ESTIMATE`.
Show the fact base and ask:
> "Anything to add or correct before the seats argue from this?" — options: `Proceed` / `Add a fact` / `Correct a fact`
Write it to `.council/factbase.md`.

**3. The seats, sequentially.** For each seat in the approved bench, print a progress
header first:

```
── Seat 3 of 7 — VC · venture shape ─────────────
```

Then the seat works in two layers per the charter's "floor and filing" rule:
(a) write the FULL WRITTEN ASSESSMENT first (Framing / Analysis / Evidence & assumptions
/ Risks / What would change my mind / Recommendations — unbudgeted, markdown), append it
to `.council/transcript.md` immediately and store it in the member's `fullAssessment`
field; (b) then deliver the FLOOR ARGUMENT in the chat — a ~250-word faithful
compression: kill case first, explicit reaction to a prior seat (seat 2 onward), and the
mandatory closing block — VOTE / FLIP CONDITION / ONE ACTION. Writing the filing first
and compressing second keeps the floor statement honest.

Between seats, no commentary from you-as-narrator. The seats speak; you don't.

**4. After the Chair.** Write `.council/verdict.json` conforming to
`council/verdict.schema.json` (validate it; fix errors before finishing). Copy
`dashboard/index.html` into `.council/` so the verdict page is one `python3 -m
http.server` away, and say so.

**5. Close with the tally and exactly two offers:**
> "Verdict: [decision], [tally]. You can appeal — `/shiproom grill` puts you in the chair
> and your answers can flip votes, in either direction. Or publish: `/shiproom docket`."

Never offer to soften, re-run for a better result, or "take another look."
