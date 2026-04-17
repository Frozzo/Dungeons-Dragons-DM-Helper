import type { Enemy, InitiativeEntry, Player } from "../types/entity";

export function sortInitiative(
  players: Player[],
  enemies: Enemy[]
): InitiativeEntry[] {
  const entries: InitiativeEntry[] = [
    ...players.map((player) => ({
      id: player.id,
      name: player.name,
      initiative: player.initiative,
      side: "player" as const
    })),
    ...enemies.map((enemy) => ({
      id: enemy.id,
      name: enemy.name,
      initiative: enemy.initiative,
      side: "enemy" as const
    }))
  ];

  return entries.sort((a, b) => b.initiative - a.initiative);
}