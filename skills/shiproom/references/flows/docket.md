# Flow: /shiproom docket — publish the verdict

1. Require `.council/verdict.json`. Ask (options): "Publish under the project's real
   name, or anonymized?" — if anonymized, strip identifying strings from a COPY; never
   modify the original.
2. If the `shiproom` CLI is available: `shiproom docket` builds the entry folder,
   including the share card (`card.svg`, plus `card.png` when Chrome or Edge is
   installed) — then continue at step 3 with its output. Manual
   fallback: build `docket-entry/<slug>/` containing: `verdict.json` (with `"sample": false`),
   a rendered `index.html` (dashboard with the verdict embedded, so it works as a
   static page), and a 5-line `README.md`: project, date, tally, decision, one-line
   story (the dissent, the flipped vote, or the best open wound).
3. Print the PR instructions for the upstream repo's `docket/`, and generate share text:
   one tweet-length line that leads with the most dramatic true fact (a dissent, a
   re-tally, an open wound) and links the entry. Never invent drama that isn't in the
   verdict.
4. Remind once: published verdicts are never edited afterward.
