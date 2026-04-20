import type { Enemy, Player } from "./entity";
import type { Locale } from "../i18n/uiText";
import type { Character } from "./character";

export interface AppState {
  locale: Locale;
  sessionName: string;
  round: number;
  turnIndex: number;
  players: Player[];
  enemies: Enemy[];
  characters: Character[];
}

export type AppAction =
  | { type: "session/setLocale"; payload: Locale }
  | { type: "session/setName"; payload: string }
  | { type: "session/replaceState"; payload: AppState }
  | { type: "combat/resetRound" }
  | { type: "combat/endRound" }
  | { type: "combat/nextTurn"; payload: number }
  | { type: "combat/prevTurn"; payload: number }
  | { type: "players/addFromCharacter"; payload: { player: Player } }
  | {
      type: "players/update";
      payload: { id: string; patch: Partial<Player> };
    }
  | { type: "enemies/add"; payload: { enemy: Omit<Enemy, "id"> } }
  | {
      type: "enemies/update";
      payload: { id: string; patch: Partial<Enemy> };
    }
  | {
      type: "characters/add";
      payload: { character: import("./character").Character };
    }
  | {
      type: "characters/update";
      payload: { characterId: string; patch: Partial<import("./character").Character> };
    }
  | {
      type: "characters/remove";
      payload: { characterId: string };
    };