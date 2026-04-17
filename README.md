# D&D DM Helper

Interfaccia desktop per Dungeon Master (D&D 5e) basata su React + TypeScript + Vite.

## Setup

1. Installa Node.js LTS.
2. Installa dipendenze:

```bash
npm install
```

## Avvio Rapido (Windows)

- `start-dev.bat`: avvia Vite in sviluppo con hot reload su `http://127.0.0.1:5173`
- `start-local.bat`: build + server locale produzione su `http://127.0.0.1:4173`
- `stop-server.bat`: chiude processi in ascolto su porte `4173` e `5173`

## Avvio Manuale

Sviluppo:

```bash
npm run dev
```

Build + server locale:

```bash
npm run build
npm run serve:dist
```

## Nota Su Chrome E file://

Chrome blocca module script e CSS caricati via `file://` (origine `null`) per policy CORS.
Per questo l'app va aperta tramite HTTP locale (`127.0.0.1`).

## Stack

- React 18
- TypeScript
- Vite

## Struttura

- `src/components`: componenti UI (players, combat, enemies, rules, soundboard)
- `src/logic`: logica dominio (iniziativa)
- `src/state`: reducer e stato applicativo
- `src/data`: dati statici (condizioni, quick rules, soundboard resources)
- `src/styles`: token tema scuro e stili globali/layout

## Soundboard

La configurazione dei bottoni e dei file audio e in:

- `src/data/soundboard.ts`

I file audio vanno inseriti in:

- `public/audio`

I path usano il formato `"/audio/nome-file.mp3"`.
