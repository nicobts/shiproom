# Flow: /shiproom grill — the interrogation

Protocol and tone clause: `council/GRILL.md` — binding. Frank, not cruel; specificity
is the aggression; "make it meaner" is refused.

## Steps

**1. Mode.** If `.council/verdict.json` exists → appeal mode ("your answers can flip
votes, in either direction — ready?"). If not → standalone mode: run a 3-question
mini-scope (project, ambition, constraints) first, then grill against that.

**2. Resume check.** `.council/transcript.md` records completed grill seats; resume,
never repeat.

**3. The questioning.** Seats in bench order. Progress header per seat, then:
- Up to 3 questions, ONE at a time. Each must target the seat's flip condition or the
  user's weakest specific claim, and be answerable with a number, fact, name, or decision.
- Grill answers are ALWAYS free text — never offer answer options.
- Grade aloud after each answer: ANSWERED / PARTIAL (one follow-up) / DODGED
  ("that's not an answer" — re-ask once in simpler words; second dodge → record the
  question verbatim as an OPEN WOUND and move on, no lecture).
- "I don't know" = PARTIAL + "when will you know, and how?"
- Test answers against `.council/factbase.md`; contradicting a sourced fact = DODGED.

**4. The re-vote.** Each seat revises or holds its vote, citing the specific answer or
wound that decided it. Chair re-tallies against the paper verdict and names what changed.

**5. Write.** Append the `grill` block to `.council/verdict.json` (schema:
`council/verdict.schema.json`), full exchange to the transcript. Open wounds are
permanent — future runs may only mark them HEALED with the dated answer that healed them.

**6. Close:** re-tally, wounds count, and: "Publish it, wounds and all — `/shiproom docket`.
SHELVE verdicts and open wounds are the Docket's favorite entries."
