export type AbilityKey = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface AbilityModifiers {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  raceId: string;
  subraceId?: string;
  classId: string;
  subclassId?: string;
  subclassName?: string;
  backgroundId: string;
  alignmentId: string;
  level: number;
  size: string;
  speed: number;
  armorClass: number;
  hpCurrent: number;
  hpMax: number;
  hitDie: string;
  proficiencyBonus: number;
  armorSlot: string;
  hasShield: boolean;
  primaryWeapon: string;
  secondaryWeapon: string;
  inventoryNotes: string;
  abilityScores: AbilityScores;
  abilityModifiers: AbilityModifiers;
  savingThrows: string[];
  classSkillChoices: string[];
  backgroundSkills: string[];
  skillProficiencies: string[];
  tools: string[];
  languages: string[];
  customLanguages: string[];
  raceTraits: string[];
  classTraits: string[];
  subclassTraits: string[];
  backgroundFeature: string;
  cantrips: string[];
  spells: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterWizardDraft {
  name: string;
  raceId: string;
  subraceId: string;
  classId: string;
  subclassId: string;
  backgroundId: string;
  alignmentId: string;
  level: number;
  classSkillChoices: string[];
  customLanguages: string[];
  selectedCantrips: string[];
  selectedSpells: string[];
  armorSlot: string;
  hasShield: boolean;
  primaryWeapon: string;
  secondaryWeapon: string;
  inventoryNotes: string;
  abilityScores: AbilityScores;
  notes: string;
}

export interface SessionSnapshot {
  version: 1;
  savedAt: string;
  state: import("./combat").AppState;
}

export interface CharacterSnapshot {
  version: 1;
  savedAt: string;
  character: Character;
}
