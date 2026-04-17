import type { Enemy, Player } from "./entity";
import type { Locale } from "../i18n/uiText";

export interface AppState {
  locale: Locale;
  sessionName: string;
  round: number;
  turnIndex: number;
  players: Player[];
  enemies: Enemy[];
}

export type AppAction =
  | { type: "session/setLocale"; payload: Locale }
  | { type: "session/setName"; payload: string }
  | { type: "combat/resetRound" }
  | { type: "combat/endRound" }
  | { type: "combat/nextTurn"; payload: number }
  | { type: "combat/prevTurn"; payload: number }
  | { type: "players/add"; payload: { name: string } }
  | {
      type: "players/update";
      payload: { id: string; patch: Partial<Player> };
    }
  | { type: "enemies/add"; payload: { name: string } }
  | {
      type: "enemies/update";
      payload: { id: string; patch: Partial<Enemy> };
    };