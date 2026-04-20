import type { Locale } from "../i18n/uiText";
import type { Enemy } from "../types/entity";
import { convertFeetToMetersText } from "../logic/textFormatting";

interface LocalizedText {
  en: string;
  it: string;
}

export interface MonsterTemplate {
  id: string;
  name: LocalizedText;
  challengeRating: string;
  armorClass: number;
  hpMax: number;
  speed: string;
  traits: LocalizedText[];
  actions: LocalizedText[];
}

export const MONSTER_POOL: MonsterTemplate[] = [
  {
    id: "goblin",
    name: { en: "Goblin", it: "Goblin" },
    challengeRating: "1/4",
    armorClass: 15,
    hpMax: 7,
    speed: "30 ft",
    traits: [
      { en: "Nimble Escape: can Disengage or Hide as a bonus action.", it: "Fuga Agile: puo Disimpegnarsi o Nascondersi come azione bonus." }
    ],
    actions: [
      { en: "Scimitar: +4 to hit, 1d6 + 2 slashing.", it: "Scimitarra: +4 a colpire, 1d6 + 2 taglienti." },
      { en: "Shortbow: +4 to hit, range 80/320 ft, 1d6 + 2 piercing.", it: "Arco corto: +4 a colpire, gittata 80/320 ft, 1d6 + 2 perforanti." }
    ]
  },
  {
    id: "orc",
    name: { en: "Orc", it: "Orco" },
    challengeRating: "1/2",
    armorClass: 13,
    hpMax: 15,
    speed: "30 ft",
    traits: [
      { en: "Aggressive: moves up to its speed toward an enemy as a bonus action.", it: "Aggressivo: si muove fino alla sua velocita verso un nemico come azione bonus." }
    ],
    actions: [
      { en: "Greataxe: +5 to hit, 1d12 + 3 slashing.", it: "Ascia bipenne: +5 a colpire, 1d12 + 3 taglienti." },
      { en: "Javelin: +5 to hit, range 30/120 ft, 1d6 + 3 piercing.", it: "Giavellotto: +5 a colpire, gittata 30/120 ft, 1d6 + 3 perforanti." }
    ]
  },
  {
    id: "bandit",
    name: { en: "Bandit", it: "Bandito" },
    challengeRating: "1/8",
    armorClass: 12,
    hpMax: 11,
    speed: "30 ft",
    traits: [],
    actions: [
      { en: "Scimitar: +3 to hit, 1d6 + 1 slashing.", it: "Scimitarra: +3 a colpire, 1d6 + 1 taglienti." },
      { en: "Light crossbow: +3 to hit, range 80/320 ft, 1d8 + 1 piercing.", it: "Balestra leggera: +3 a colpire, gittata 80/320 ft, 1d8 + 1 perforanti." }
    ]
  },
  {
    id: "bandit-captain",
    name: { en: "Bandit Captain", it: "Capitano Bandito" },
    challengeRating: "2",
    armorClass: 15,
    hpMax: 65,
    speed: "30 ft",
    traits: [
      { en: "Multiattack: three melee attacks, or two dagger ranged attacks.", it: "Multiattacco: tre attacchi in mischia, oppure due attacchi a distanza con pugnale." }
    ],
    actions: [
      { en: "Scimitar: +5 to hit, 1d6 + 3 slashing.", it: "Scimitarra: +5 a colpire, 1d6 + 3 taglienti." },
      { en: "Dagger: +5 to hit, range 20/60 ft, 1d4 + 3 piercing.", it: "Pugnale: +5 a colpire, gittata 20/60 ft, 1d4 + 3 perforanti." }
    ]
  },
  {
    id: "wolf",
    name: { en: "Wolf", it: "Lupo" },
    challengeRating: "1/4",
    armorClass: 13,
    hpMax: 11,
    speed: "40 ft",
    traits: [
      { en: "Pack Tactics: has advantage if an ally is adjacent to the target.", it: "Tattiche del Branco: ha vantaggio se un alleato e adiacente al bersaglio." }
    ],
    actions: [
      { en: "Bite: +4 to hit, 2d4 + 2 piercing; STR save or prone.", it: "Morso: +4 a colpire, 2d4 + 2 perforanti; TS Forza o prono." }
    ]
  },
  {
    id: "dire-wolf",
    name: { en: "Dire Wolf", it: "Lupo Crudele" },
    challengeRating: "1",
    armorClass: 14,
    hpMax: 37,
    speed: "50 ft",
    traits: [
      { en: "Pack Tactics: has advantage if an ally is adjacent to the target.", it: "Tattiche del Branco: ha vantaggio se un alleato e adiacente al bersaglio." }
    ],
    actions: [
      { en: "Bite: +5 to hit, 2d6 + 3 piercing; STR save or prone.", it: "Morso: +5 a colpire, 2d6 + 3 perforanti; TS Forza o prono." }
    ]
  },
  {
    id: "skeleton",
    name: { en: "Skeleton", it: "Scheletro" },
    challengeRating: "1/4",
    armorClass: 13,
    hpMax: 13,
    speed: "30 ft",
    traits: [
      { en: "Damage Vulnerability: bludgeoning.", it: "Vulnerabilita ai danni: contundenti." },
      { en: "Damage Immunity: poison.", it: "Immunita ai danni: veleno." }
    ],
    actions: [
      { en: "Shortsword: +4 to hit, 1d6 + 2 piercing.", it: "Spada corta: +4 a colpire, 1d6 + 2 perforanti." },
      { en: "Shortbow: +4 to hit, range 80/320 ft, 1d6 + 2 piercing.", it: "Arco corto: +4 a colpire, gittata 80/320 ft, 1d6 + 2 perforanti." }
    ]
  },
  {
    id: "zombie",
    name: { en: "Zombie", it: "Zombie" },
    challengeRating: "1/4",
    armorClass: 8,
    hpMax: 22,
    speed: "20 ft",
    traits: [
      { en: "Undead Fortitude: may drop to 1 hp instead of 0.", it: "Tenacia dei Non Morti: puo restare a 1 PF invece di 0." }
    ],
    actions: [
      { en: "Slam: +3 to hit, 1d6 + 1 bludgeoning.", it: "Colpo: +3 a colpire, 1d6 + 1 contundenti." }
    ]
  },
  {
    id: "giant-spider",
    name: { en: "Giant Spider", it: "Ragno Gigante" },
    challengeRating: "1",
    armorClass: 14,
    hpMax: 26,
    speed: "30 ft, climb 30 ft",
    traits: [
      { en: "Spider Climb and Web Sense.", it: "Scalare Ragni e Senso della Tela." }
    ],
    actions: [
      { en: "Bite: +5 to hit, 1d8 + 3 piercing plus poison (CON save).", it: "Morso: +5 a colpire, 1d8 + 3 perforanti piu veleno (TS Costituzione)." },
      { en: "Web: ranged attack 30/60 ft, restrained on hit.", it: "Ragnatela: attacco a distanza 30/60 ft, intralciato se colpisce." }
    ]
  },
  {
    id: "ogre",
    name: { en: "Ogre", it: "Ogre" },
    challengeRating: "2",
    armorClass: 11,
    hpMax: 59,
    speed: "40 ft",
    traits: [],
    actions: [
      { en: "Greatclub: +6 to hit, 2d8 + 4 bludgeoning.", it: "Mazza pesante: +6 a colpire, 2d8 + 4 contundenti." },
      { en: "Javelin: +6 to hit, range 30/120 ft, 2d6 + 4 piercing.", it: "Giavellotto: +6 a colpire, gittata 30/120 ft, 2d6 + 4 perforanti." }
    ]
  },
  {
    id: "mimic",
    name: { en: "Mimic", it: "Mimic" },
    challengeRating: "2",
    armorClass: 12,
    hpMax: 58,
    speed: "15 ft",
    traits: [
      { en: "Shapechanger and Adhesive.", it: "Mutaforma e Adesivo." }
    ],
    actions: [
      { en: "Pseudopod: +5 to hit, 1d8 + 3 bludgeoning plus adhesive grapple.", it: "Pseudopodo: +5 a colpire, 1d8 + 3 contundenti piu presa adesiva." },
      { en: "Bite: +5 to hit, 1d8 + 3 piercing plus 1d8 acid.", it: "Morso: +5 a colpire, 1d8 + 3 perforanti piu 1d8 acido." }
    ]
  },
  {
    id: "ghoul",
    name: { en: "Ghoul", it: "Ghoul" },
    challengeRating: "1",
    armorClass: 12,
    hpMax: 22,
    speed: "30 ft",
    traits: [
      { en: "Turn Defiance.", it: "Resistenza allo Scacciare." }
    ],
    actions: [
      { en: "Bite: +2 to hit, 2d6 + 2 piercing.", it: "Morso: +2 a colpire, 2d6 + 2 perforanti." },
      { en: "Claws: +4 to hit, 2d4 + 2 slashing and possible paralysis.", it: "Artigli: +4 a colpire, 2d4 + 2 taglienti e possibile paralisi." }
    ]
  },
  {
    id: "troll",
    name: { en: "Troll", it: "Troll" },
    challengeRating: "5",
    armorClass: 15,
    hpMax: 84,
    speed: "30 ft",
    traits: [
      { en: "Regeneration 10 (stops with acid or fire damage).", it: "Rigenerazione 10 (si ferma con danni da acido o fuoco)." }
    ],
    actions: [
      { en: "Multiattack: one bite and two claws.", it: "Multiattacco: un morso e due artigli." },
      { en: "Bite: +7 to hit, 1d6 + 4 piercing.", it: "Morso: +7 a colpire, 1d6 + 4 perforanti." },
      { en: "Claw: +7 to hit, 2d6 + 4 slashing.", it: "Artiglio: +7 a colpire, 2d6 + 4 taglienti." }
    ]
  }
];

export function localizeMonsterText(text: string, locale: Locale): string {
  return locale === "it" ? convertFeetToMetersText(text) : text;
}

export function createEnemyFromTemplate(template: MonsterTemplate, locale: Locale): Omit<Enemy, "id"> {
  return {
    name: template.name[locale],
    armorClass: template.armorClass,
    hpCurrent: template.hpMax,
    hpMax: template.hpMax,
    initiative: 0,
    isDefeated: false,
    notes: [
      `${locale === "it" ? "GS" : "CR"}: ${template.challengeRating}`,
      `${locale === "it" ? "Velocita" : "Speed"}: ${localizeMonsterText(template.speed, locale)}`,
      ...(template.traits.length > 0
        ? [
            `${locale === "it" ? "Tratti" : "Traits"}: ${template.traits
              .map((item) => localizeMonsterText(item[locale], locale))
              .join(" | ")}`
          ]
        : []),
      `${locale === "it" ? "Azioni" : "Actions"}: ${template.actions
        .map((item) => localizeMonsterText(item[locale], locale))
        .join(" | ")}`
    ].join("\n"),
    challengeRating: template.challengeRating,
    speed: localizeMonsterText(template.speed, locale),
    sourceId: template.id
  };
}
