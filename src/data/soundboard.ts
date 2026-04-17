export interface SoundResource {
  id: string;
  label: string;
  category: "ambience" | "combat" | "sfx";
  audioPath: string;
}

// Replace audioPath files with your real assets under /public/audio.
export const SOUND_RESOURCES: SoundResource[] = [
  {
    id: "ambience-tavern",
    label: "Tavern Ambience",
    category: "ambience",
    audioPath: "/audio/tavern-ambience.mp3"
  },
  {
    id: "ambience-dungeon",
    label: "Dungeon Drip",
    category: "ambience",
    audioPath: "/audio/dungeon-drip.mp3"
  },
  {
    id: "combat-skirmish",
    label: "Combat Skirmish",
    category: "combat",
    audioPath: "/audio/combat-skirmish.mp3"
  },
  {
    id: "sfx-door",
    label: "Door Creak",
    category: "sfx",
    audioPath: "/audio/door-creak.mp3"
  },
  {
    id: "sfx-thunder",
    label: "Thunder",
    category: "sfx",
    audioPath: "/audio/thunder.mp3"
  }
];