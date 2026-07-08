# Flow: /shiproom scope — the Clerk

A guided interview. One question at a time; use the harness's structured question tool
(options) where available. Total: ~2 minutes for the user.

## Steps

**1. Detect and confirm the project.**
Look for docs (README, prd.md, docs/, or a path given as an argument). Write a
one-paragraph summary in plain words — no embellishment — and ask:
> "Is this a fair summary of what you're building?" — options: `Yes` / `Let me correct it`
If no docs exist, ask the user to describe the project in a few sentences instead.

**2. Four classification questions, one at a time, with options:**

- **Ambition** — "If this works, what is it?"
  `Side project` / `Lifestyle business` / `Venture-scale attempt` / `Internal tool`
- **Domain** — "What kind of thing is it?"
  `B2B SaaS` / `Dev tool` / `Consumer` / `Marketplace` / `Content or community` / `Regulated (health, fintech, legal)` / `Other`
- **Stage** — "Where is it today?"
  `Idea only` / `Prototype` / `MVP built` / `Live with users` / `Revenue`
- **Builder context** — "What are you working with?"
  `Solo, nights & weekends` / `Solo, full-time` / `Small team` / `Funded team`

**3. One open question, free text:**
> "What do you most fear is wrong with this idea? (One sentence — this seat gets asked first.)"

**4. Propose the bench.** From the answers, select seats with ONE-LINE justification each.
Rules: ICP and Chair always seated; `Regulated` domain seats Legal/Compliance regardless
of anything else; `Internal tool` swaps verdict vocabulary to BUILD / BUY / SKIP and the
ICP becomes the internal user; `Venture-scale` adds a Competitor-CEO seat; the user's
feared weakness assigns the opening kill mandate to the most relevant seat. Present as a
short table and ask:
> "Approve this bench?" — options: `Approve` / `Add a seat` / `Remove a seat` / `Change a mandate`
Loop edits until approved. Never run an unapproved bench.

**5. Write state and hand off.** Write `.council/scope.json`:

```json
{
  "project": "...", "summary": "...",
  "ambition": "...", "domain": "...", "stage": "...", "builder": "...",
  "fearedWeakness": "...",
  "verdictSet": ["INVEST","SHIP_AND_SEE","SHELVE"],
  "bench": [ { "seat": 1, "role": "CTO", "mandate": "...", "justification": "..." } ],
  "approved": true, "date": "YYYY-MM-DD"
}
```

Close with exactly this shape of message:
> "Scope locked. The bench is seated. Run the deliberation with `/shiproom run` —
> it will build a fact base first (I'll verify competitor pricing on the web if I can)."
