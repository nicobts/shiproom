# Flow: /shiproom verdict — render the page

0. If the `shiproom` CLI is available, run `shiproom validate && shiproom view` and relay
   the URL — done. Otherwise, manual path:
1. Require `.council/verdict.json`; validate against `references/verdict.schema.json` and
   report any errors precisely.
2. Copy `assets/dashboard.html` to `.council/index.html` (overwrite — the page always loads
   `verdict.json` fresh from disk when served).
3. Print: how to view (`cd .council && python3 -m http.server 8080`), the tally, open
   wounds count if any, and the file paths.
4. If the harness can open a browser or render HTML, offer to.
