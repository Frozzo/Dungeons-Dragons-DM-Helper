import type { AbilityKey } from "../types/character";

export type ProgressionEntry = {
  level: number;
  traits: string[];
};

export type SpellProgression = {
  level: number;
  cantrips: number;
  spells: number;
};

const CLASS_PROGRESSIONS: Record<string, ProgressionEntry[]> = {
  barbarian: [
    { level: 1, traits: ["Rage", "Unarmored Defense"] },
    { level: 2, traits: ["Reckless Attack", "Danger Sense"] },
    { level: 3, traits: ["Primal Path"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Extra Attack", "Fast Movement"] }
  ],
  bard: [
    { level: 1, traits: ["Bardic Inspiration", "Spellcasting"] },
    { level: 2, traits: ["Jack of All Trades", "Song of Rest"] },
    { level: 3, traits: ["Expertise", "College"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Font of Inspiration"] }
  ],
  cleric: [
    { level: 1, traits: ["Spellcasting", "Divine Domain"] },
    { level: 2, traits: ["Channel Divinity", "Turn Undead"] },
    { level: 3, traits: ["2nd-Level Spells"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Destroy Undead (CR 1/2)", "3rd-Level Spells"] }
  ],
  druid: [
    { level: 1, traits: ["Druidic", "Spellcasting"] },
    { level: 2, traits: ["Wild Shape", "Druid Circle"] },
    { level: 3, traits: ["2nd-Level Spells"] },
    { level: 4, traits: ["Ability Score Improvement", "Wild Shape Improvement"] },
    { level: 5, traits: ["3rd-Level Spells"] }
  ],
  fighter: [
    { level: 1, traits: ["Fighting Style", "Second Wind"] },
    { level: 2, traits: ["Action Surge"] },
    { level: 3, traits: ["Martial Archetype"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Extra Attack"] }
  ],
  monk: [
    { level: 1, traits: ["Martial Arts", "Unarmored Defense"] },
    { level: 2, traits: ["Ki", "Unarmored Movement"] },
    { level: 3, traits: ["Monastic Tradition", "Deflect Missiles"] },
    { level: 4, traits: ["Slow Fall", "Ability Score Improvement"] },
    { level: 5, traits: ["Extra Attack", "Stunning Strike"] }
  ],
  paladin: [
    { level: 1, traits: ["Divine Sense", "Lay on Hands"] },
    { level: 2, traits: ["Spellcasting", "Divine Smite", "Fighting Style"] },
    { level: 3, traits: ["Divine Health", "Sacred Oath"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Extra Attack"] }
  ],
  ranger: [
    { level: 1, traits: ["Favored Enemy", "Natural Explorer"] },
    { level: 2, traits: ["Spellcasting", "Fighting Style"] },
    { level: 3, traits: ["Ranger Archetype", "Primeval Awareness"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Extra Attack"] }
  ],
  rogue: [
    { level: 1, traits: ["Expertise", "Sneak Attack", "Thieves' Cant"] },
    { level: 2, traits: ["Cunning Action"] },
    { level: 3, traits: ["Roguish Archetype"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["Uncanny Dodge"] }
  ],
  sorcerer: [
    { level: 1, traits: ["Spellcasting", "Sorcerous Origin"] },
    { level: 2, traits: ["Font of Magic"] },
    { level: 3, traits: ["Metamagic"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["3rd-Level Spell Slots"] }
  ],
  warlock: [
    { level: 1, traits: ["Otherworldly Patron", "Pact Magic"] },
    { level: 2, traits: ["Eldritch Invocations"] },
    { level: 3, traits: ["Pact Boon"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["3rd-Level Pact Magic"] }
  ],
  wizard: [
    { level: 1, traits: ["Spellcasting", "Arcane Recovery"] },
    { level: 2, traits: ["Arcane Tradition"] },
    { level: 3, traits: ["2nd-Level Spells"] },
    { level: 4, traits: ["Ability Score Improvement"] },
    { level: 5, traits: ["3rd-Level Spells"] }
  ]
};

const SUBCLASS_PROGRESSIONS: Record<string, ProgressionEntry[]> = {
  berserker: [
    { level: 3, traits: ["Frenzy"] }
  ],
  "totem-warrior": [
    { level: 3, traits: ["Spirit Seeker", "Totem Spirit"] }
  ],
  "college-lore": [
    { level: 3, traits: ["Bonus Proficiencies", "Cutting Words"] }
  ],
  "college-valor": [
    { level: 3, traits: ["Bonus Proficiencies", "Combat Inspiration"] }
  ],
  "life-domain": [
    { level: 1, traits: ["Disciple of Life"] },
    { level: 2, traits: ["Channel Divinity: Preserve Life"] }
  ],
  "light-domain": [
    { level: 1, traits: ["Warding Flare"] },
    { level: 2, traits: ["Channel Divinity: Radiance of the Dawn"] }
  ],
  "moon-circle": [
    { level: 2, traits: ["Combat Wild Shape", "Circle Forms"] }
  ],
  "land-circle": [
    { level: 2, traits: ["Bonus Cantrip", "Natural Recovery"] }
  ],
  champion: [
    { level: 3, traits: ["Improved Critical"] }
  ],
  "battle-master": [
    { level: 3, traits: ["Combat Superiority", "Student of War"] }
  ],
  "open-hand": [
    { level: 3, traits: ["Open Hand Technique"] }
  ],
  shadow: [
    { level: 3, traits: ["Shadow Arts"] }
  ],
  devotion: [
    { level: 3, traits: ["Sacred Weapon", "Turn the Unholy"] }
  ],
  vengeance: [
    { level: 3, traits: ["Abjure Enemy", "Vow of Enmity"] }
  ],
  hunter: [
    { level: 3, traits: ["Hunter's Prey"] }
  ],
  "beast-master": [
    { level: 3, traits: ["Ranger's Companion"] }
  ],
  thief: [
    { level: 3, traits: ["Fast Hands", "Second-Story Work"] }
  ],
  assassin: [
    { level: 3, traits: ["Assassinate", "Infiltration Expertise"] }
  ],
  draconic: [
    { level: 1, traits: ["Dragon Ancestor", "Draconic Resilience"] }
  ],
  "wild-magic": [
    { level: 1, traits: ["Wild Magic Surge", "Tides of Chaos"] }
  ],
  fiend: [
    { level: 1, traits: ["Dark One's Blessing"] }
  ],
  "great-old-one": [
    { level: 1, traits: ["Awakened Mind"] }
  ],
  evocation: [
    { level: 2, traits: ["Sculpt Spells"] }
  ],
  illusion: [
    { level: 2, traits: ["Improved Minor Illusion"] }
  ]
};

export const LEVELUP_SPELL_PROGRESSIONS: Record<string, SpellProgression[]> = {
  bard: [
    { level: 1, cantrips: 2, spells: 4 },
    { level: 2, cantrips: 2, spells: 5 },
    { level: 3, cantrips: 2, spells: 6 },
    { level: 4, cantrips: 3, spells: 7 },
    { level: 5, cantrips: 3, spells: 8 }
  ],
  cleric: [
    { level: 1, cantrips: 3, spells: 1 },
    { level: 2, cantrips: 3, spells: 3 },
    { level: 3, cantrips: 3, spells: 4 },
    { level: 4, cantrips: 4, spells: 6 },
    { level: 5, cantrips: 4, spells: 7 }
  ],
  druid: [
    { level: 1, cantrips: 2, spells: 1 },
    { level: 2, cantrips: 2, spells: 3 },
    { level: 3, cantrips: 2, spells: 4 },
    { level: 4, cantrips: 3, spells: 6 },
    { level: 5, cantrips: 3, spells: 7 }
  ],
  paladin: [
    { level: 1, cantrips: 0, spells: 0 },
    { level: 2, cantrips: 0, spells: 2 },
    { level: 3, cantrips: 0, spells: 3 },
    { level: 4, cantrips: 0, spells: 3 },
    { level: 5, cantrips: 0, spells: 4 }
  ],
  ranger: [
    { level: 1, cantrips: 0, spells: 0 },
    { level: 2, cantrips: 0, spells: 2 },
    { level: 3, cantrips: 0, spells: 3 },
    { level: 4, cantrips: 0, spells: 3 },
    { level: 5, cantrips: 0, spells: 4 }
  ],
  sorcerer: [
    { level: 1, cantrips: 4, spells: 2 },
    { level: 2, cantrips: 4, spells: 3 },
    { level: 3, cantrips: 4, spells: 4 },
    { level: 4, cantrips: 5, spells: 5 },
    { level: 5, cantrips: 5, spells: 6 }
  ],
  warlock: [
    { level: 1, cantrips: 2, spells: 2 },
    { level: 2, cantrips: 2, spells: 3 },
    { level: 3, cantrips: 2, spells: 4 },
    { level: 4, cantrips: 3, spells: 5 },
    { level: 5, cantrips: 3, spells: 6 }
  ],
  wizard: [
    { level: 1, cantrips: 3, spells: 6 },
    { level: 2, cantrips: 3, spells: 8 },
    { level: 3, cantrips: 3, spells: 10 },
    { level: 4, cantrips: 4, spells: 12 },
    { level: 5, cantrips: 4, spells: 14 }
  ]
};

export function getProgressionTraits(entries: ProgressionEntry[], level: number): string[] {
  return entries
    .filter((entry) => level >= entry.level)
    .flatMap((entry) => entry.traits);
}

export function getClassTraitsForLevel(classId: string, level: number): string[] {
  return getProgressionTraits(CLASS_PROGRESSIONS[classId] ?? [], level);
}

export function getSubclassTraitsForLevel(subclassId: string | undefined, level: number): string[] {
  if (!subclassId) return [];
  return getProgressionTraits(SUBCLASS_PROGRESSIONS[subclassId] ?? [], level);
}

export function getSpellProgression(classId: string, level: number): SpellProgression {
  const entries = LEVELUP_SPELL_PROGRESSIONS[classId] ?? [];
  const last = [...entries].reverse().find((entry) => level >= entry.level);
  return last ?? { level, cantrips: 0, spells: 0 };
}

export function getClassCantripCount(classId: string, level: number): number {
  return getSpellProgression(classId, level).cantrips;
}

export function getClassSpellCount(classId: string, level: number): number {
  return getSpellProgression(classId, level).spells;
}

export function getAbilityScoreIncreaseLevel(level: number): boolean {
  return level === 4;
}

export function getLevelFeatureSummary(classId: string, level: number): string[] {
  const current = CLASS_PROGRESSIONS[classId] ?? [];
  return current.filter((entry) => entry.level === level).flatMap((entry) => entry.traits);
}

export function getLevelUpAbilityMod(ability: AbilityKey): AbilityKey {
  return ability;
}
