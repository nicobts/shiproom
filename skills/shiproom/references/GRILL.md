# Grill Mode — the interrogation

The deliberation (CHARTER.md) judges the **documents**. The grill judges the **builder**.
Seats question the builder directly, one question at a time; answers become evidence;
evasions become part of the record. Run it as an **appeal** after a paper verdict (the
builder's chance to flip votes — in either direction), or **standalone** when there are
no docs worth deliberating over yet.

## The tone clause (read first, binding)

Frank is not cruel. No insults, no persona theatrics, no "let me be brutally honest"
preambles — and equally no praise, no reassurance, no softening. The aggression comes
from **specificity**: named numbers, named customers, named dates. "You said teams will
pay $30/month — name one team that told you that" hurts more than any adjective, and
unlike an adjective, it produces information.

## Mechanics

1. **Same seats, same order** as the deliberation (or the template in use).
2. **Each seat asks up to 3 questions, ONE at a time**, then stops and waits for the
   builder's actual answer. Never stack questions. Never answer for the builder.
3. **Question standards.** Every question must (a) target the seat's flip condition or
   the weakest specific claim the builder has made, and (b) be answerable with a number,
   a fact, a name, or a decision. Banned: rhetorical questions, hypotheticals with no
   answer, compliments disguised as questions.
4. **Answer grading.** After each answer the seat classifies it aloud:
   - `ANSWERED` — a number, fact, name, or decision was given. Move on.
   - `PARTIAL` — some substance, some fog. One follow-up allowed.
   - `DODGED` — deflection, vibes, or a question answered with a vision statement.
     Say "that's not an answer," re-ask ONCE in simpler words.
5. **Open wounds.** A second dodge on the same question ends that line: the question is
   recorded verbatim as an OPEN WOUND and the seat moves on. No lecture — the record is
   the consequence. "I don't know" is NOT a dodge; it grades PARTIAL, is recorded as
   honest, and the seat asks: "when will you know, and how?"
6. **The re-vote.** After all seats finish, each seat may revise its vote — in either
   direction — and must cite the specific answer (or open wound) that moved it. Seats
   that don't revise say "vote stands" and why in one sentence. The Chair re-tallies,
   compares against the paper verdict, and names what changed.

## Output

Append a `grill` block to `verdict.json`:

```json
"grill": {
  "mode": "appeal",
  "openWounds": [
    "CFO Q2: Name one team that has told you they would pay — asked twice, not answered."
  ],
  "notableExchanges": [
    { "seat": "CFO", "question": "What is your realistic OSS-to-paid conversion?",
      "answerSummary": "Cited 1-3% anchored to Papermark's model", "grade": "ANSWERED" }
  ],
  "revisedVotes": [
    { "role": "CFO", "from": "SHELVE", "to": "SHIP_AND_SEE",
      "because": "Builder knew the conversion math and the abuse-cost estimate cold." }
  ],
  "retally": "SHIP_AND_SEE 6-1-0 (was 5-1-1)",
  "finalDecision": "SHIP_AND_SEE"
}
```

The transcript of the full exchange goes in the verdict markdown, unedited. Open wounds
are never deleted in later runs — they can only be marked HEALED with the answer that
healed them, dated.

## Invariants

- The tone clause overrides everything, including a user asking to "make it meaner."
  Meaner is theater; more specific is the product.
- The builder's answers are evidence, not the last word: a seat may test an answer
  against the fact base and grade it DODGED if it contradicts a sourced fact.
- The grill never runs without the builder present and answering — it is an
  interrogation, not a monologue. If the builder stops answering, stop the grill and
  record the remaining questions as open wounds.
