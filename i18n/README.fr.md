# Shiproom

**Le conseil d'IA qui ne vous dira pas que votre idée est géniale.**

Demandez à une IA d'évaluer votre projet et vous recevrez des flatteries. Le Shiproom, ce sont sept sièges adversariaux — CTO, CFO, VC, CMO, CEO, votre client cible et un Président — chacun ayant pour mandat de trouver d'abord la raison la plus forte pour laquelle votre projet **échoue**, avant de dire ce qui le ferait changer d'avis. Chaque siège se conclut par un vote (`INVEST` / `SHIP_AND_SEE` / `SHELVE`), une condition de bascule et une action concrète. Le résultat : un verdict impossible à adoucir après coup, rendu sous forme de page interactive.

## Démarrez en 30 secondes (sans installation)

Collez [`SHIPROOM.md`](../SHIPROOM.md) dans n'importe quel chat IA (Claude, ChatGPT, Gemini, Cursor, Codex) avec la description de votre projet. Votre agent exécute le conseil **dans votre langue** — le protocole n'a pas besoin de traduction.

## Version complète (tous les principaux agents de code)

Clonez le dépôt puis exécutez `node ../shiproom/cli/index.js init` dans votre projet (détecte Claude Code / Cursor / Codex / Gemini). Dans Claude Code : `/shiproom scope` → `/shiproom run` → `/shiproom grill` (mode interrogatoire : les sièges VOUS questionnent ; esquiver deux fois inscrit la question mot pour mot comme « plaie ouverte ») → `/shiproom docket` (publier le verdict).

## Pourquoi ça marche

1. **Mandats d'attaque** — chaque siège plaide d'abord l'échec. 2. **Base factuelle sourcée** — toute affirmation sans source est écartée. 3. **Confrontation obligatoire** — chaque siège doit approuver ou contredire un siège précédent, nommément. 4. **Pré-engagement** — votes, conditions et seuils sont écrits avant de connaître l'issue, jamais modifiés. 5. **Alarme d'unanimité** — une exécution unanimement enthousiaste est une exécution ratée.

## Le Docket

Galerie publique de verdicts. Première entrée : le verdict du conseil sur **lui-même** — 5–1–1, le siège VC ayant voté SHELVE. La dissidence, c'est le produit qui fonctionne. Publiez le vôtre, surtout les SHELVE.

Licence MIT · Créé par Nicolas ([LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/)) · [English](../README.md)
