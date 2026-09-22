# Shiproom

**Il consiglio AI che non ti dirà che la tua idea è fantastica.**

Chiedi a un'AI di valutare il tuo progetto e riceverai complimenti. Il Shiproom è composto da sette seggi avversariali — CTO, CFO, VC, CMO, CEO, il tuo cliente target e un Presidente — ognuno con il mandato di trovare prima la ragione più forte per cui il tuo progetto **fallisce**, e solo dopo dire cosa gli farebbe cambiare idea. Ogni seggio termina con un voto (`INVEST` / `SHIP_AND_SEE` / `SHELVE`), una condizione di ribaltamento e un'azione concreta. Il risultato è un verdetto che non puoi ammorbidire a posteriori, reso come pagina interattiva.

## Inizia in 30 secondi (senza installazione)

Incolla [`SHIPROOM.md`](../SHIPROOM.md) in qualsiasi chat AI (Claude, ChatGPT, Gemini, Cursor, Codex) insieme alla descrizione del tuo progetto. Il tuo agente esegue il consiglio **nella tua lingua** — il protocollo non richiede traduzione.

## Versione completa (tutti i principali coding agent)

Installalo come skill: `npx skills add nicobts/shiproom` (Claude Code, Codex, Cursor, Gemini CLI, OpenCode…) oppure, in Claude Code, `/plugin marketplace add nicobts/shiproom`. In Claude Code: `/shiproom scope` → `/shiproom run` → `/shiproom grill` (modalità interrogatorio: i seggi interrogano **te**; eludere due volte lascia la domanda registrata testualmente come "ferita aperta") → `/shiproom docket` (pubblica il verdetto).

## Perché funziona

1. **Mandati d'attacco** — ogni seggio argomenta prima il caso di fallimento. 2. **Base fattuale con fonti** — le affermazioni senza fonte vengono eliminate. 3. **Confronto obbligatorio** — ogni seggio deve concordare o dissentire da uno precedente, per nome. 4. **Pre-impegno** — voti, condizioni e soglie si scrivono prima di conoscere l'esito e non si modificano mai. 5. **Allarme unanimità** — un'esecuzione unanimemente entusiasta è un'esecuzione fallita.

## Il Docket

Galleria pubblica di verdetti. La prima voce: il verdetto del consiglio su **sé stesso** — 5–1–1, con il seggio VC che ha votato SHELVE. Il dissenso è il prodotto che funziona. Pubblica il tuo, specialmente gli SHELVE.

Licenza MIT · Creato da Nicolas ([LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/)) · [English](../README.md)
