# The Shiproom — Protocol

**Purpose:** adversarial validation of a project idea before choosing between:
(a) **INVEST** — commit serious resources (build the business / raise / go full-time),
(b) **SHIP_AND_SEE** — run the cheapest real-market experiment and let results decide,
(c) **SHELVE** — release as a portfolio piece or drop it, and move on.

**This is not a feedback session.** Each member's mandate is to find the strongest reason
the project FAILS from their vantage point, argue it with evidence, and only then state
what evidence would change their mind.

---

## Intake (before seat 1 speaks)

Assemble and print:

1. **The project** — one paragraph, from the project's own docs. No embellishment.
2. **The builder's constraints** — hours/week, funding, team size, runway, stated goal.
   Constraints are facts and bind every member's reasoning.
3. **Shared fact base** — verified market facts: named competitors with real pricing,
   comparable company outcomes, market-size signals. Each fact needs a source (a doc,
   a URL, or the builder's own statement, labeled as such). If web access is available,
   verify before the session. **No invented statistics — unverifiable claims are struck.**

## Ground rules (apply to every member)

1. Argue only from the shared fact base and the project docs.
2. **Mandatory verdict format.** Every member ends with:
   - **VOTE:** `INVEST` / `SHIP_AND_SEE` / `SHELVE`
   - **FLIP CONDITION:** the single concrete metric or fact that would change this vote.
   - **ONE ACTION:** the one thing the builder should do in the next 2 weeks from this seat.
3. From seat 2 onward, each member must explicitly agree or disagree with at least one
   prior argument, by name. No parallel monologues.
4. **No cheerleading.** "This is exciting" is banned. Enthusiasm must be expressed as a
   falsifiable claim.
5. Scores of pain, difficulty, or confidence use a 1–10 scale and must be justified in
   one sentence.

## The Restate Gate (before seat 1 speaks)

Immediately after intake, every seated member restates the problem in one sentence and
offers one alternative framing. If three or more members restate it materially
differently, STOP: the question is the problem — surface the framings to the builder and
let them choose (or re-scope) before any analysis begins.

## Word budgets

Seat arguments: max ~250 words. Chair synthesis: max ~150 words. Grill answers-grading
commentary: one sentence. Brevity forces crystallization; a seat that needs more words
usually has less argument.

## The seven seats (run in this order)

### 1. CTO — technical defensibility & maintenance reality
Attack the claim that anything here is hard to copy. Estimate, in engineering-weeks, how
long the best-positioned competitor needs to replicate the core differentiator. Name the
hidden operational burdens (security, abuse, on-call, upgrades) and price them in
builder-hours per week. Rule on whether the current architecture is a ceiling that
matters at this stage or a red herring.

### 2. CFO / business-model expert — unit economics
Kill the revenue math. Model honestly: realistic conversion rates for the chosen model,
ARPU anchored to real competitor pricing from the fact base, support and infra costs,
and the builder's actual available hours. Compute the users/customers needed for the
first meaningful revenue milestone and the plausible months to reach it. Compare against
the opportunity cost of the same hours.

### 3. VC — is this venture-shaped at all?
Assess as an investment, not a product. TAM honesty: how many people have this problem
today, and is that growing fast enough that being early matters? Classify explicitly:
**venture-scale** / **good bootstrapped business** / **feature, not company**. Address the
closest comparable outcome in the fact base: does it prove the market or prove the
position is taken?

### 4. CMO — distribution & positioning
Attack distribution, the usual real bottleneck. Does the builder have the hours for the
growth engine this category demands? Is the positioning a term people already search, or
does the category need to be created (expensive)? Name the concrete channels for the
first 100 users and estimate what each yields.

### 5. CEO — focus & sequencing
Protect the scarcest resource (usually builder hours). Given all prior arguments, name
the ONE bet worth making and what must be explicitly killed or deferred to make it.
Set the go/no-go thresholds as concrete numbers with a deadline (e.g. stars, signups,
installs, revenue, within N weeks).

### 6. The target customer (ICP voice) — the reality check
Role-play the actual buyer. Walk the honest journey: what do they do TODAY without this
product, how painful is it (1–10, justified), and what would they pay, if anything.
If the pain is a 4, say it is a 4. This seat outranks strategy: a low pain score here
should weigh more than any elegant argument above it.

### Mid-run agreement check (Chair's standing duty)

If, at any point after seat 4, more than 70% of votes cast agree, the Chair pauses the
run and directs the next seat to steelman the strongest opposing verdict before giving
its own. Early consensus is treated as a symptom, not a signal.

### 7. The Chair — synthesis (no new arguments)
Tally the votes. Name the strongest unresolved disagreement. State the council's verdict
and the pre-committed experiment (using the CEO's numbers). Close with the three-sentence
summary the builder should reread at the deadline when deciding.

## Outputs

1. `council-verdict-<YYYY-MM-DD>.md` — full transcript, committed and never edited.
2. `verdict.json` — structured summary conforming to `verdict.schema.json`, consumed by
   `dashboard/index.html` for the interactive recap.

## Customization

Seats may be added (e.g. Legal/Compliance for regulated spaces, Design for consumer
products) or renamed, but never below five seats, and seats 6 (ICP) and 7 (Chair) are
mandatory — the customer voice and the synthesis are the two parts that keep the council
honest.
