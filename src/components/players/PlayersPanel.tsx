import { CONDITIONS } from "../../data/conditions";
import type { Player } from "../../types/entity";

interface PlayersPanelProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onUpdatePlayer: (id: string, patch: Partial<Player>) => void;
}

export function PlayersPanel({
  players,
  onAddPlayer,
  onUpdatePlayer
}: PlayersPanelProps) {
  return (
    <div className="panel players-panel">
      <div className="panel-header">
        <h2>Players</h2>
        <button className="btn" type="button" onClick={() => onAddPlayer(`Player ${players.length + 1}`)}>
          + Add
        </button>
      </div>

      <div className="stack">
        {players.map((player) => (
          <article key={player.id} className="card entity-card">
            <input
              className="input title-input"
              value={player.name}
              onChange={(event) => onUpdatePlayer(player.id, { name: event.target.value })}
              aria-label="Player name"
            />

            <div className="grid-2">
              <label>
                Initiative
                <input
                  className="input"
                  type="number"
                  value={player.initiative}
                  onChange={(event) =>
                    onUpdatePlayer(player.id, { initiative: Number(event.target.value) || 0 })
                  }
                />
              </label>

              <label>
                Last Roll
                <input
                  className="input"
                  value={player.lastRoll}
                  placeholder="es. 17"
                  onChange={(event) => onUpdatePlayer(player.id, { lastRoll: event.target.value })}
                />
              </label>
            </div>

            <div className="grid-2">
              <label>
                HP Current
                <input
                  className="input"
                  type="number"
                  value={player.hpCurrent}
                  onChange={(event) =>
                    onUpdatePlayer(player.id, { hpCurrent: Number(event.target.value) || 0 })
                  }
                />
              </label>
              <label>
                HP Max
                <input
                  className="input"
                  type="number"
                  value={player.hpMax}
                  onChange={(event) =>
                    onUpdatePlayer(player.id, { hpMax: Number(event.target.value) || 0 })
                  }
                />
              </label>
            </div>

            <div className="grid-2">
              <label>
                Condition
                <select
                  className="input"
                  value={player.condition}
                  onChange={(event) => onUpdatePlayer(player.id, { condition: event.target.value })}
                >
                  <option value="">None</option>
                  {CONDITIONS.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Health State
                <input
                  className="input"
                  value={player.healthState}
                  readOnly
                />
              </label>
            </div>

            <label>
              Notes
              <input
                className="input"
                value={player.notes}
                placeholder="es. concentrazione su Bless"
                onChange={(event) => onUpdatePlayer(player.id, { notes: event.target.value })}
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}