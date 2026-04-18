import type { AppAction, AppState } from "../types/combat";
import type { HealthState } from "../types/entity";

function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function calculateHealthState(current: number, max: number): HealthState {
  if (current <= 0) {
    return "down";
  }
  const ratio = max > 0 ? current / max : 0;
  if (ratio <= 0.25) {
    return "critical";
  }
  if (ratio <= 0.6) {
    return "wounded";
  }
  return "ok";
}

export const initialState: AppState = {
  locale: "en",
  sessionName: "DM Session",
  round: 1,
  turnIndex: 0,
  characters: [
  ],
  players: [],
  enemies: [
    {
      id: makeId("enemy"),
      name: "Enemy 1",
      armorClass: 12,
      hpCurrent: 15,
      hpMax: 15,
      initiative: 0,
      isDefeated: false,
      notes: ""
    }
  ]
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "session/setLocale":
      return {
        ...state,
        locale: action.payload
      };

    case "session/replaceState":
      return action.payload;

    case "session/setName":
      return {
        ...state,
        sessionName: action.payload
      };

    case "combat/resetRound":
      return {
        ...state,
        round: 1,
        turnIndex: 0
      };

    case "combat/endRound":
      return {
        ...state,
        round: state.round + 1,
        turnIndex: 0
      };

    case "combat/nextTurn": {
      if (action.payload <= 0) {
        return state;
      }
      return {
        ...state,
        turnIndex: (state.turnIndex + 1) % action.payload
      };
    }

    case "combat/prevTurn": {
      if (action.payload <= 0) {
        return state;
      }
      return {
        ...state,
        turnIndex: (state.turnIndex - 1 + action.payload) % action.payload
      };
    }

    case "players/addFromCharacter":
      return {
        ...state,
        players: [...state.players, action.payload.player]
      };

    case "players/update":
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id !== action.payload.id) {
            return player;
          }
          const next = { ...player, ...action.payload.patch };
          next.healthState = calculateHealthState(next.hpCurrent, next.hpMax);
          return next;
        })
      };

    case "enemies/add":
      return {
        ...state,
        enemies: [
          ...state.enemies,
          {
            id: makeId("enemy"),
            name: action.payload.name,
            armorClass: 12,
            hpCurrent: 10,
            hpMax: 10,
            initiative: 0,
            isDefeated: false,
            notes: ""
          }
        ]
      };

    case "enemies/update":
      return {
        ...state,
        enemies: state.enemies.map((enemy) => {
          if (enemy.id !== action.payload.id) {
            return enemy;
          }
          const next = { ...enemy, ...action.payload.patch };
          next.isDefeated = next.hpCurrent <= 0 || next.isDefeated;
          return next;
        })
      };

    case "characters/add":
      return {
        ...state,
        characters: [...state.characters, action.payload.character]
      };

    case "characters/update":
      return {
        ...state,
        characters: state.characters.map((character) =>
          character.id === action.payload.characterId
            ? { ...character, ...action.payload.patch, updatedAt: new Date().toISOString() }
            : character
        )
      };

    case "characters/remove":
      return {
        ...state,
        characters: state.characters.filter((character) => character.id !== action.payload.characterId),
        players: state.players.filter((player) => player.characterId !== action.payload.characterId)
      };

    default:
      return state;
  }
}