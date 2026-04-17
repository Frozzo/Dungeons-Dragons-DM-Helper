import type { ConditionKey } from "../data/conditions";

export type Locale = "en" | "it";

interface RuleText {
  title: string;
  text: string;
}

export interface UiText {
  topBar: {
    title: string;
    sessionAriaLabel: string;
    resetRound: string;
    newCombat: string;
    languageLabel: string;
  };
  players: {
    title: string;
    add: string;
    defaultNamePrefix: string;
    nameAriaLabel: string;
    initiative: string;
    lastRoll: string;
    hpCurrent: string;
    hpMax: string;
    condition: string;
    none: string;
    healthState: string;
    notes: string;
    lastRollPlaceholder: string;
    notesPlaceholder: string;
  };
  enemies: {
    title: string;
    add: string;
    defaultNamePrefix: string;
    nameAriaLabel: string;
    initiative: string;
    armorClass: string;
    hpCurrent: string;
    hpMax: string;
    defeated: string;
    notes: string;
    notesPlaceholder: string;
  };
  combat: {
    title: string;
    round: string;
    prev: string;
    nextTurn: string;
    endRound: string;
    noCombatants: string;
    playerSide: string;
    enemySide: string;
  };
  quickRules: {
    title: string;
    conditionsTitle: string;
    rules: RuleText[];
  };
  soundboard: {
    title: string;
    layoutReady: string;
    audioSourceText: string;
    categories: Record<"ambience" | "combat" | "sfx", string>;
  };
  healthStates: Record<"ok" | "wounded" | "critical" | "down", string>;
  conditions: Record<ConditionKey, string>;
}

export const UI_TEXT: Record<Locale, UiText> = {
  en: {
    topBar: {
      title: "DM Screen",
      sessionAriaLabel: "Session name",
      resetRound: "Reset Round",
      newCombat: "New Combat",
      languageLabel: "Language"
    },
    players: {
      title: "Players",
      add: "+ Add",
      defaultNamePrefix: "Player",
      nameAriaLabel: "Player name",
      initiative: "Initiative",
      lastRoll: "Last Roll",
      hpCurrent: "HP Current",
      hpMax: "HP Max",
      condition: "Condition",
      none: "None",
      healthState: "Health State",
      notes: "Notes",
      lastRollPlaceholder: "e.g. 17",
      notesPlaceholder: "e.g. concentration on Bless"
    },
    enemies: {
      title: "Enemies",
      add: "+ Add",
      defaultNamePrefix: "Enemy",
      nameAriaLabel: "Enemy name",
      initiative: "Initiative",
      armorClass: "Armor Class",
      hpCurrent: "HP Current",
      hpMax: "HP Max",
      defeated: "Defeated",
      notes: "Notes",
      notesPlaceholder: "Template/manual config soon"
    },
    combat: {
      title: "Combat",
      round: "Round",
      prev: "Prev",
      nextTurn: "Next Turn",
      endRound: "End Round",
      noCombatants: "No combatants yet.",
      playerSide: "player",
      enemySide: "enemy"
    },
    quickRules: {
      title: "Quick Rules",
      conditionsTitle: "Conditions",
      rules: [
        {
          title: "Attack Roll",
          text: "d20 + attack modifier vs target AC. Natural 20 is a critical hit."
        },
        {
          title: "Saving Throw",
          text: "d20 + save modifier vs DC set by spell/effect."
        },
        {
          title: "Ability Check",
          text: "d20 + ability modifier + proficiency if proficient."
        },
        {
          title: "Advantage / Disadvantage",
          text: "Roll two d20, keep highest (advantage) or lowest (disadvantage)."
        },
        {
          title: "Concentration",
          text: "When damaged, DC 10 or half damage (whichever is higher)."
        }
      ]
    },
    soundboard: {
      title: "Soundboard",
      layoutReady: "Layout ready",
      audioSourceText: "Audio file paths are configured in src/data/soundboard.ts and files must be placed under public/audio.",
      categories: {
        ambience: "ambience",
        combat: "combat",
        sfx: "sfx"
      }
    },
    healthStates: {
      ok: "ok",
      wounded: "wounded",
      critical: "critical",
      down: "down"
    },
    conditions: {
      blinded: "Blinded",
      charmed: "Charmed",
      deafened: "Deafened",
      frightened: "Frightened",
      grappled: "Grappled",
      incapacitated: "Incapacitated",
      invisible: "Invisible",
      paralyzed: "Paralyzed",
      petrified: "Petrified",
      poisoned: "Poisoned",
      prone: "Prone",
      restrained: "Restrained",
      stunned: "Stunned",
      unconscious: "Unconscious"
    }
  },
  it: {
    topBar: {
      title: "Schermo DM",
      sessionAriaLabel: "Nome sessione",
      resetRound: "Reset Round",
      newCombat: "Nuovo Combattimento",
      languageLabel: "Lingua"
    },
    players: {
      title: "Giocatori",
      add: "+ Aggiungi",
      defaultNamePrefix: "Giocatore",
      nameAriaLabel: "Nome giocatore",
      initiative: "Iniziativa",
      lastRoll: "Ultimo Tiro",
      hpCurrent: "PF Correnti",
      hpMax: "PF Massimi",
      condition: "Condizione",
      none: "Nessuna",
      healthState: "Stato Salute",
      notes: "Note",
      lastRollPlaceholder: "es. 17",
      notesPlaceholder: "es. concentrazione su Bless"
    },
    enemies: {
      title: "Nemici",
      add: "+ Aggiungi",
      defaultNamePrefix: "Nemico",
      nameAriaLabel: "Nome nemico",
      initiative: "Iniziativa",
      armorClass: "Classe Armatura",
      hpCurrent: "PF Correnti",
      hpMax: "PF Massimi",
      defeated: "Sconfitto",
      notes: "Note",
      notesPlaceholder: "Template/config manuale presto"
    },
    combat: {
      title: "Combattimento",
      round: "Round",
      prev: "Prec",
      nextTurn: "Turno Successivo",
      endRound: "Fine Round",
      noCombatants: "Nessun partecipante al combattimento.",
      playerSide: "giocatore",
      enemySide: "nemico"
    },
    quickRules: {
      title: "Regole Rapide",
      conditionsTitle: "Condizioni",
      rules: [
        {
          title: "Tiro Per Colpire",
          text: "d20 + modificatore di attacco contro la CA del bersaglio. Un 20 naturale e un critico."
        },
        {
          title: "Tiro Salvezza",
          text: "d20 + modificatore del TS contro la CD dell'effetto."
        },
        {
          title: "Prova Di Caratteristica",
          text: "d20 + modificatore caratteristica + competenza se competente."
        },
        {
          title: "Vantaggio / Svantaggio",
          text: "Tira due d20, tieni il piu alto (vantaggio) o il piu basso (svantaggio)."
        },
        {
          title: "Concentrazione",
          text: "Quando subisci danni: CD 10 o meta danno (il valore piu alto)."
        }
      ]
    },
    soundboard: {
      title: "Soundboard",
      layoutReady: "Layout pronto",
      audioSourceText: "I percorsi audio sono configurati in src/data/soundboard.ts e i file vanno in public/audio.",
      categories: {
        ambience: "ambiente",
        combat: "combattimento",
        sfx: "sfx"
      }
    },
    healthStates: {
      ok: "ok",
      wounded: "ferito",
      critical: "critico",
      down: "a terra"
    },
    conditions: {
      blinded: "Accecato",
      charmed: "Ammaliato",
      deafened: "Assordato",
      frightened: "Spaventato",
      grappled: "Afferrato",
      incapacitated: "Incapacitato",
      invisible: "Invisibile",
      paralyzed: "Paralizzato",
      petrified: "Pietrificato",
      poisoned: "Avvelenato",
      prone: "Prono",
      restrained: "Trattenuto",
      stunned: "Stordito",
      unconscious: "Privo di sensi"
    }
  }
};
