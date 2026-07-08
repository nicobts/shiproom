# Docket #001 — Shiproom, judged by itself

> **Verdict: SHIP & SEE — 5–1–1** · 2026-07-04 · published unedited, per protocol

Before launching, we ran the Council on this very repo. This is the first entry in the
public Docket, and the dissent below is the product working.

**[View the interactive verdict page →](https://nicobts.github.io/shiproom/docket/001-shiproom/)**
(or serve this folder locally: `npx shiproom view` / `python3 -m http.server`)

## The bench

| Seat | Vote | The one line |
|------|------|--------------|
| CTO | SHIP_AND_SEE | "The moat is exactly zero… the real risk nobody has named yet: prompt rot." |
| CFO | SHIP_AND_SEE | "Not a business — a reputation asset. ~2 part-time weeks is the entire downside." |
| **VC** | **SHELVE** | "No revenue mechanism, no moat, and I will not launder the vocabulary to avoid saying so." |
| CMO | INVEST | "The side-by-side screenshot will outperform every sentence of copy we write." |
| CEO | SHIP_AND_SEE | "Sequencing is the entire risk here; the tool is cheap, the calendar is not." |
| ICP (target user) | SHIP_AND_SEE | "I will not `git clone` a repo to ask a question, ever; I WILL paste one file." |
| Chair | SHIP_AND_SEE | "The split is the healthiest possible outcome for a tool whose brand is refusing unanimity." |

## What the verdict changed

Two seat demands were adopted as launch requirements, not suggestions:

- **The ICP's zero-install mode** — `SHIPROOM.md`, the one-paste edition, exists because
  the customer seat refused to clone a repo.
- **The CTO's drift canary** — `council/canary/` exists because the CTO predicted the
  protocol will silently rot as models drift back toward flattery.

## Pre-committed thresholds

Measured 3 weeks after launch day. Clearing them promotes the repo to a maintained
project; missing all of them sends it to maintenance mode the same week. Not renegotiable.

| Metric | Target |
|--------|--------|
| GitHub stars | 500 |
| HN front page or PH top 10 | 1 of 2 |
| External seat/template PRs | 3 |
| Published Docket verdicts by others | 10 |

## Files

- [`verdict.json`](./verdict.json) — the structured verdict (conforms to [`council/verdict.schema.json`](../../council/verdict.schema.json))
- [`index.html`](./index.html) — the verdict page (auto-loads `verdict.json` when served)
- [`card.svg`](./card.svg) — the 1200×630 share card
