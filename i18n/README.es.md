# Shiproom

**El consejo de IA que no te dirá que tu idea es genial.**

Pídele a una IA que evalúe tu proyecto y recibirás halagos. El Shiproom son siete asientos adversariales — CTO, CFO, VC, CMO, CEO, tu cliente objetivo y un Presidente — cada uno con el mandato de encontrar primero la razón más fuerte por la que tu proyecto **fracasa**, y solo después decir qué le haría cambiar de opinión. Cada asiento termina con un voto (`INVEST` / `SHIP_AND_SEE` / `SHELVE`), una condición de cambio y una acción concreta. El resultado es un veredicto que no puedes suavizar después, renderizado como una página interactiva.

## Empieza en 30 segundos (sin instalación)

Pega [`SHIPROOM.md`](../SHIPROOM.md) en cualquier chat de IA (Claude, ChatGPT, Gemini, Cursor, Codex) junto con la descripción de tu proyecto. Tu agente ejecuta el consejo **en tu idioma** — el protocolo no necesita traducción.

## Versión completa (todos los agentes de código principales)

Instálalo como skill: `npx skills add nicobts/shiproom` (Claude Code, Codex, Cursor, Gemini CLI, OpenCode…) o, en Claude Code, `/plugin marketplace add nicobts/shiproom`. En Claude Code: `/shiproom scope` → `/shiproom run` → `/shiproom grill` (modo interrogatorio: los asientos te preguntan a **ti**; esquivar dos veces deja la pregunta registrada textualmente como "herida abierta") → `/shiproom docket` (publicar el veredicto).

## Por qué funciona

1. **Mandatos de ataque** — cada asiento argumenta primero el caso de fracaso. 2. **Base de hechos con fuentes** — las afirmaciones sin fuente se descartan. 3. **Confrontación obligatoria** — cada asiento debe coincidir o discrepar con uno anterior, por nombre. 4. **Precompromiso** — votos, condiciones y umbrales se escriben antes de conocer el resultado y nunca se editan. 5. **Alarma de unanimidad** — una ejecución unánimemente entusiasta cuenta como fallida.

## El Docket

Galería pública de veredictos. La primera entrada: el veredicto del consejo sobre **sí mismo** — 5–1–1, con el asiento VC votando SHELVE. La disidencia es el producto funcionando. Publica el tuyo, especialmente los SHELVE.

Licencia MIT · Creado por Nicolas ([LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/)) · [English](../README.md)
