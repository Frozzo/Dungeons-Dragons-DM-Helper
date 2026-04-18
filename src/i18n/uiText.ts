import type { ConditionKey } from "../data/conditions";

export type Locale = "en" | "it";

interface RuleText {
  title: string;
  text: string;
  highlights: string[];
}

export interface UiText {
  topBar: {
    title: string;
    sessionAriaLabel: string;
    resetRound: string;
    newCombat: string;
    languageLabel: string;
    saveSession: string;
    loadSession: string;
  };
  players: {
    title: string;
    add: string;
    defaultNamePrefix: string;
    nameAriaLabel: string;
    classAndSubclass: string;
    armorClass: string;
    shield: string;
    primaryWeapon: string;
    secondaryWeapon: string;
    noPlayersHint: string;
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
    coreRulesTitle: string;
    conditionsTitle: string;
    conditionDetailsTitle: string;
    showConditionDetails: string;
    hideConditionDetails: string;
    rules: RuleText[];
    conditionDetails: Record<ConditionKey, string>;
  };
  soundboard: {
    title: string;
    layoutReady: string;
    audioSourceText: string;
    categories: Record<"ambience" | "combat" | "sfx", string>;
  };
  characters: {
    title: string;
    newCharacter: string;
    removeCharacter: string;
    empty: string;
    inventory: string;
    savedInSession: string;
    chooseFolder: string;
    folderReady: string;
  };
  builder: {
    title: string;
    stepBasic: string;
    stepAbilities: string;
    stepReview: string;
    back: string;
    next: string;
    saveCharacter: string;
    close: string;
    chooseFolder: string;
    folderReady: string;
    name: string;
    race: string;
    subrace: string;
    className: string;
    background: string;
    alignment: string;
    level: string;
    abilityScores: string;
    review: string;
    notes: string;
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
      languageLabel: "Language",
      saveSession: "Save Session",
      loadSession: "Load Session"
    },
    players: {
      title: "Players",
      add: "+ Add",
      defaultNamePrefix: "Player",
      nameAriaLabel: "Player name",
      classAndSubclass: "Class / Subclass",
      armorClass: "Armor Class",
      shield: "Shield",
      primaryWeapon: "Primary Weapon",
      secondaryWeapon: "Secondary Weapon",
      noPlayersHint: "Create a character in the Characters panel to add a player to combat.",
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
      coreRulesTitle: "Core 5e Combat",
      conditionsTitle: "Conditions",
      conditionDetailsTitle: "Condition Effects",
      showConditionDetails: "Show Condition Details",
      hideConditionDetails: "Hide Condition Details",
      rules: [
        {
          title: "Attack Roll",
          text: "d20 + attack modifier vs target AC. Natural 20 is a critical hit.",
          highlights: ["d20", "attack modifier", "target AC", "Natural 20", "critical hit"]
        },
        {
          title: "Saving Throw",
          text: "d20 + save modifier vs DC set by spell/effect.",
          highlights: ["d20", "save modifier", "DC", "spell/effect"]
        },
        {
          title: "Ability Check",
          text: "d20 + ability modifier + proficiency if proficient.",
          highlights: ["d20", "ability modifier", "proficiency"]
        },
        {
          title: "Advantage / Disadvantage",
          text: "Roll two d20, keep highest (advantage) or lowest (disadvantage).",
          highlights: ["two d20", "highest", "advantage", "lowest", "disadvantage"]
        },
        {
          title: "Concentration",
          text: "When damaged, DC 10 or half damage (whichever is higher).",
          highlights: ["DC 10", "half damage", "whichever is higher"]
        },
        {
          title: "Action Economy",
          text: "On your turn: move up to speed, take one action, and possibly one bonus action. One reaction per round.",
          highlights: ["On your turn", "one action", "one bonus action", "One reaction per round"]
        },
        {
          title: "Opportunity Attack",
          text: "Triggered when a creature you can see leaves your reach. Uses reaction for one melee attack.",
          highlights: ["leaves your reach", "reaction", "one melee attack"]
        },
        {
          title: "Cover",
          text: "Half cover: +2 AC and Dex saves. Three-quarters cover: +5 AC and Dex saves. Total cover: cannot be targeted directly.",
          highlights: ["+2 AC", "+5 AC", "Total cover"]
        },
        {
          title: "Death Saves",
          text: "At 0 HP and not stable: roll d20 each turn, 10+ success. 3 successes stabilize, 3 failures die.",
          highlights: ["0 HP", "d20", "10+ success", "3 successes", "3 failures"]
        },
        {
          title: "Grapple / Shove",
          text: "Special melee attack: Athletics vs Athletics or Acrobatics. Shove can knock prone or push 5 feet.",
          highlights: ["Athletics", "Acrobatics", "knock prone", "push 5 feet"]
        },
        {
          title: "Light And Vision",
          text: "Heavy obscurement effectively blinds. Dim light is lightly obscured and causes disadvantage on Perception that relies on sight.",
          highlights: ["Heavy obscurement", "blinds", "Dim light", "disadvantage on Perception"]
        }
      ],
      conditionDetails: {
        blinded: "Cannot see and automatically fails sight-based checks. Attack rolls against it have advantage; its attacks have disadvantage.",
        charmed: "Cannot attack the charmer or target it with harmful abilities. The charmer has advantage on social checks against it.",
        deafened: "Cannot hear and automatically fails checks that require hearing.",
        frightened: "Has disadvantage on checks and attacks while source of fear is in line of sight, and cannot willingly move closer.",
        grappled: "Speed becomes 0; condition ends if grappler is incapacitated or moved out of reach.",
        incapacitated: "Cannot take actions or reactions.",
        invisible: "Cannot be seen without special sense or magic. Attack rolls against it have disadvantage; its attacks have advantage.",
        paralyzed: "Incapacitated and cannot move or speak. Fails Str and Dex saves. Attacks have advantage; hits from within 5 feet are critical.",
        petrified: "Transformed into inanimate substance. Incapacitated, unaware, resistant to all damage, immune to poison and disease.",
        poisoned: "Has disadvantage on attack rolls and ability checks.",
        prone: "Crawls or stands by spending movement. Attacks against it have advantage within 5 feet and disadvantage from farther away; its attacks have disadvantage.",
        restrained: "Speed becomes 0. Attacks against it have advantage; its attacks have disadvantage. Has disadvantage on Dex saves.",
        stunned: "Incapacitated, cannot move, can speak only falteringly, fails Str and Dex saves, attacks against it have advantage.",
        unconscious: "Incapacitated, cannot move or speak, unaware, drops held items, falls prone, fails Str and Dex saves, attacks against it have advantage, and hits from within 5 feet are critical."
      }
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
    characters: {
      title: "Characters",
      newCharacter: "New Character",
      removeCharacter: "Delete",
      empty: "No characters saved yet.",
      inventory: "Inventory",
      savedInSession: "Saved in session",
      chooseFolder: "Choose Character Folder",
      folderReady: "Folder ready"
    },
    builder: {
      title: "Character Builder",
      stepBasic: "Basics",
      stepAbilities: "Ability Scores",
      stepReview: "Review & Save",
      back: "Back",
      next: "Next",
      saveCharacter: "Save Character",
      close: "Close",
      chooseFolder: "Choose Folder",
      folderReady: "Folder connected",
      name: "Name",
      race: "Race",
      subrace: "Subrace",
      className: "Class",
      background: "Background",
      alignment: "Alignment",
      level: "Level",
      abilityScores: "Ability Scores",
      review: "Review",
      notes: "Notes"
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
      resetRound: "Reimposta round",
      newCombat: "Nuovo Combattimento",
      languageLabel: "Lingua",
      saveSession: "Salva Sessione",
      loadSession: "Carica Sessione"
    },
    players: {
      title: "Giocatori",
      add: "+ Aggiungi",
      defaultNamePrefix: "Giocatore",
      nameAriaLabel: "Nome giocatore",
      classAndSubclass: "Classe / Sottoclasse",
      armorClass: "Classe Armatura",
      shield: "Scudo",
      primaryWeapon: "Arma Primaria",
      secondaryWeapon: "Arma Secondaria",
      noPlayersHint: "Crea un personaggio nel pannello Personaggi per aggiungerlo al combattimento.",
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
      coreRulesTitle: "Fondamenti del combattimento 5e",
      conditionsTitle: "Condizioni",
      conditionDetailsTitle: "Effetti delle condizioni",
      showConditionDetails: "Mostra dettagli condizioni",
      hideConditionDetails: "Nascondi dettagli condizioni",
      rules: [
        {
          title: "Tiro per colpire",
          text: "d20 + modificatore di attacco contro la CA del bersaglio. Un 20 naturale e un critico.",
          highlights: ["d20", "modificatore di attacco", "CA", "20 naturale", "critico"]
        },
        {
          title: "Tiro salvezza",
          text: "d20 + modificatore del TS contro la CD dell'effetto.",
          highlights: ["d20", "modificatore del TS", "CD"]
        },
        {
          title: "Prova di caratteristica",
          text: "d20 + modificatore caratteristica + competenza se competente.",
          highlights: ["d20", "modificatore caratteristica", "competenza"]
        },
        {
          title: "Vantaggio / Svantaggio",
          text: "Tira due d20, tieni il piu alto (vantaggio) o il piu basso (svantaggio).",
          highlights: ["due d20", "piu alto", "vantaggio", "piu basso", "svantaggio"]
        },
        {
          title: "Concentrazione",
          text: "Quando subisci danni: CD 10 o meta danno (il valore piu alto).",
          highlights: ["CD 10", "meta danno", "valore piu alto"]
        },
        {
          title: "Economia delle azioni",
          text: "Nel tuo turno: movimento fino alla velocita, una azione, e in alcuni casi una azione bonus. Una reazione per round.",
          highlights: ["Nel tuo turno", "una azione", "una azione bonus", "Una reazione per round"]
        },
        {
          title: "Attacco di opportunita",
          text: "Si attiva quando una creatura che vedi esce dalla tua portata. Usa la reazione per un attacco in mischia.",
          highlights: ["esce dalla tua portata", "reazione", "attacco in mischia"]
        },
        {
          title: "Copertura",
          text: "Mezza copertura: +2 CA e TS Des. Tre quarti: +5 CA e TS Des. Copertura totale: non bersagliabile direttamente.",
          highlights: ["+2 CA", "+5 CA", "Copertura totale"]
        },
        {
          title: "Tiri salvezza contro morte",
          text: "A 0 PF e non stabile: tira d20 ogni turno, 10+ successo. 3 successi = stabile, 3 fallimenti = morto.",
          highlights: ["0 PF", "d20", "10+ successo", "3 successi", "3 fallimenti"]
        },
        {
          title: "Afferrare / spingere",
          text: "Attacco speciale in mischia: Atletica vs Atletica o Acrobazia. Spingere puo buttare prono o spostare di 1,5 m.",
          highlights: ["Atletica", "Acrobazia", "buttare prono", "1,5 m"]
        },
        {
          title: "Luce e visione",
          text: "Oscurita pesante rende di fatto accecati. Luce fioca e oscuramento leggero e impone svantaggio a Percezione basata sulla vista.",
          highlights: ["Oscurita pesante", "accecati", "Luce fioca", "svantaggio a Percezione"]
        }
      ],
      conditionDetails: {
        blinded: "Non puo vedere e fallisce automaticamente le prove basate sulla vista. Gli attacchi contro di lui hanno vantaggio; i suoi attacchi hanno svantaggio.",
        charmed: "Non puo attaccare chi lo ha ammaliato ne bersagliarlo con effetti dannosi. L'ammaliatore ha vantaggio nelle prove sociali contro di lui.",
        deafened: "Non puo sentire e fallisce automaticamente le prove che richiedono udito.",
        frightened: "Ha svantaggio a prove e attacchi finche vede la fonte della paura, e non puo avvicinarsi volontariamente.",
        grappled: "La velocita diventa 0; termina se chi afferra e incapacitato o viene allontanato dalla portata.",
        incapacitated: "Non puo compiere azioni o reazioni.",
        invisible: "Non puo essere visto senza sensi speciali o magia. Gli attacchi contro di lui hanno svantaggio; i suoi attacchi hanno vantaggio.",
        paralyzed: "Incapacitato e non puo muoversi o parlare. Fallisce TS For e Des. Gli attacchi hanno vantaggio; i colpi entro 1,5 m sono critici.",
        petrified: "Trasformato in sostanza inanimata. Incapacitato e inconsapevole, resistente a tutti i danni, immune a veleno e malattia.",
        poisoned: "Ha svantaggio ai tiri per colpire e alle prove di caratteristica.",
        prone: "Striscia o si rialza spendendo movimento. Entro 1,5 m gli attacchi contro di lui hanno vantaggio, oltre 1,5 m hanno svantaggio; i suoi attacchi hanno svantaggio.",
        restrained: "La velocita diventa 0. Gli attacchi contro di lui hanno vantaggio; i suoi attacchi hanno svantaggio. Ha svantaggio ai TS Des.",
        stunned: "Incapacitato, non puo muoversi, parla a fatica, fallisce TS For e Des, gli attacchi contro di lui hanno vantaggio.",
        unconscious: "Incapacitato, non puo muoversi o parlare, e inconsapevole, lascia cio che impugna, cade prono, fallisce TS For e Des, gli attacchi contro di lui hanno vantaggio e i colpi entro 1,5 m sono critici."
      }
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
    characters: {
      title: "Personaggi",
      newCharacter: "Nuovo Personaggio",
      removeCharacter: "Elimina",
      empty: "Nessun personaggio salvato.",
      inventory: "Inventario",
      savedInSession: "Salvato nella sessione",
      chooseFolder: "Scegli Cartella Personaggi",
      folderReady: "Cartella pronta"
    },
    builder: {
      title: "Creatore Personaggio",
      stepBasic: "Base",
      stepAbilities: "Caratteristiche",
      stepReview: "Controllo e salvataggio",
      back: "Indietro",
      next: "Avanti",
      saveCharacter: "Salva Personaggio",
      close: "Chiudi",
      chooseFolder: "Scegli Cartella",
      folderReady: "Cartella collegata",
      name: "Nome",
      race: "Razza",
      subrace: "Sottorazza",
      className: "Classe",
      background: "Background",
      alignment: "Allineamento",
      level: "Livello",
      abilityScores: "Punteggi Abilita",
      review: "Riepilogo",
      notes: "Note"
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
