# D&D DM Helper

Interfaccia desktop per Dungeon Master (D&D 5e) basata su React + TypeScript + Vite.

## Avvio

1. Installa Node.js LTS (se non gia presente).
2. Installa dipendenze:

```bash
npm install
```

3. Avvia in sviluppo:

```bash
npm run dev
```

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
# Dungeons-Dragons-DM-Helper
PersonalProject to help me "DM" better
