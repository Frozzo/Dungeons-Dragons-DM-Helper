import type { Locale } from "../i18n/uiText";

export interface ToolkitEntry {
  title: { en: string; it: string };
  description: { en: string; it: string };
}

export interface ClassToolkit {
  actions: ToolkitEntry[];
  bonusActions: ToolkitEntry[];
  reactions: ToolkitEntry[];
  cantrips: ToolkitEntry[];
  spells: ToolkitEntry[];
}

const SHARED: Pick<ClassToolkit, "actions" | "bonusActions" | "reactions"> = {
  actions: [
    {
      title: { en: "Attack", it: "Attacco" },
      description: { en: "Make one weapon attack or use a class feature that replaces it.", it: "Effettua un attacco con arma o usa una capacita di classe che lo sostituisce." }
    },
    {
      title: { en: "Dash / Disengage / Dodge", it: "Scatto / Disimpegno / Schivata" },
      description: { en: "Core tactical actions for movement and survivability.", it: "Azioni tattiche base per movimento e sopravvivenza." }
    }
  ],
  bonusActions: [
    {
      title: { en: "Only if granted", it: "Solo se concessa" },
      description: { en: "You can use one bonus action only when a class feature, spell, or ability allows it.", it: "Puoi usare una sola azione bonus solo se una capacita, un incantesimo o un tratto lo permette." }
    }
  ],
  reactions: [
    {
      title: { en: "Opportunity Attack", it: "Attacco di Opportunita" },
      description: { en: "When a creature leaves your melee reach, you can use your reaction to make one melee attack.", it: "Quando una creatura esce dalla tua portata in mischia, puoi usare la tua reazione per un attacco in mischia." }
    }
  ]
};

const CASTER_COMMON: Pick<ClassToolkit, "cantrips" | "spells"> = {
  cantrips: [
    {
      title: { en: "Class Cantrip", it: "Trucchetto di Classe" },
      description: { en: "At-will spell effects with no spell slot cost.", it: "Effetti magici a volonta senza consumo di slot." }
    }
  ],
  spells: [
    {
      title: { en: "Level 1 Spell", it: "Incantesimo di 1° livello" },
      description: { en: "Consumes a spell slot. Useful for control, healing, or burst damage.", it: "Consuma uno slot incantesimo. Utile per controllo, cura o danno esplosivo." }
    }
  ]
};

const MARTIAL_COMMON: Pick<ClassToolkit, "cantrips" | "spells"> = {
  cantrips: [],
  spells: []
};

export const CLASS_TOOLKITS: Record<string, ClassToolkit> = {
  barbarian: {
    ...SHARED,
    bonusActions: [
      ...SHARED.bonusActions,
      { title: { en: "Rage", it: "Ira" }, description: { en: "Enter rage to gain damage bonus and resistances.", it: "Entra in ira per ottenere bonus danni e resistenze." } }
    ],
    ...MARTIAL_COMMON
  },
  bard: {
    ...SHARED,
    bonusActions: [
      ...SHARED.bonusActions,
      { title: { en: "Bardic Inspiration", it: "Ispirazione Bardica" }, description: { en: "Grant a die to an ally for checks, attacks, or saves.", it: "Concedi un dado a un alleato per prove, attacchi o tiri salvezza." } }
    ],
    ...CASTER_COMMON
  },
  cleric: { ...SHARED, ...CASTER_COMMON },
  druid: { ...SHARED, ...CASTER_COMMON },
  fighter: {
    ...SHARED,
    bonusActions: [
      ...SHARED.bonusActions,
      { title: { en: "Second Wind", it: "Secondo Soffio" }, description: { en: "Recover HP as a bonus action.", it: "Recupera PF come azione bonus." } }
    ],
    ...MARTIAL_COMMON
  },
  monk: {
    ...SHARED,
    bonusActions: [
      ...SHARED.bonusActions,
      { title: { en: "Martial Arts Strike", it: "Colpo Arti Marziali" }, description: { en: "Make an extra unarmed strike when eligible.", it: "Effettua un colpo senz'armi extra quando possibile." } }
    ],
    ...MARTIAL_COMMON
  },
  paladin: { ...SHARED, ...CASTER_COMMON },
  ranger: { ...SHARED, ...CASTER_COMMON },
  rogue: {
    ...SHARED,
    bonusActions: [
      ...SHARED.bonusActions,
      { title: { en: "Cunning Action", it: "Azione Scaltra" }, description: { en: "Dash, Disengage, or Hide as bonus action.", it: "Scatto, Disimpegno o Nascondersi come azione bonus." } }
    ],
    ...MARTIAL_COMMON
  },
  sorcerer: { ...SHARED, ...CASTER_COMMON },
  warlock: { ...SHARED, ...CASTER_COMMON },
  wizard: { ...SHARED, ...CASTER_COMMON }
};

export function localizeToolkitEntries(entries: ToolkitEntry[], locale: Locale): Array<{ title: string; description: string }> {
  return entries.map((entry) => ({
    title: entry.title[locale],
    description: entry.description[locale]
  }));
}
