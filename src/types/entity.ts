export type HealthState = "ok" | "wounded" | "critical" | "down";

export interface Player {
  id: string;
  characterId?: string;
  name: string;
  classLabel?: string;
  subclassLabel?: string;
  armorClass: number;
  armorSlot?: string;
  hasShield?: boolean;
  primaryWeapon?: string;
  secondaryWeapon?: string;
  inventoryNotes?: string;
  initiative: number;
  hpCurrent: number;
  hpMax: number;
  lastRoll: string;
  notes: string;
  condition: string;
  healthState: HealthState;
}

export interface Enemy {
  id: string;
  sourceId?: string;
  name: string;
  challengeRating?: string;
  speed?: string;
  armorClass: number;
  hpCurrent: number;
  hpMax: number;
  initiative: number;
  isDefeated: boolean;
  notes: string;
}

export interface InitiativeEntry {
  id: string;
  name: string;
  initiative: number;
  side: "player" | "enemy";
}