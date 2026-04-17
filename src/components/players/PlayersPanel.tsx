import { CONDITION_KEYS } from "../../data/conditions";
import type { UiText } from "../../i18n/uiText";
import type { Player } from "../../types/entity";

interface PlayersPanelProps {
  uiText: UiText;
  players: Player[];
  onAddPlayer: (name: string) => void;
  onUpdatePlayer: (id: string, patch: Partial<Player>) => void;
}

export function PlayersPanel({
  uiText,
  players,
  onAddPlayer,
  onUpdatePlayer
}: PlayersPanelProps) {
  return (
    <div className="panel players-panel">
      <div className="panel-header">
        <h2>{uiText.players.title}</h2>
        <button
          className="btn"
          type="button"
          onClick={() => onAddPlayer(`${uiText.players.defaultNamePrefix} ${players.length + 1}`)}
        >
          {uiText.players.add}
        </button>
      </div>

      <div className="stack">
        {players.map((player) => (
          <article key={player.id} className="card entity-card">
            <input
              className="input title-input"
              value={player.name}
              onChange={(event) => onUpdatePlayer(player.id, { name: event.target.value })}
              aria-label={uiText.players.nameAriaLabel}
            />

            <div className="grid-2">
              <label>
                {uiText.players.initiative}
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
                {uiText.players.lastRoll}
                <input
                  className="input"
                  value={player.lastRoll}
                  placeholder={uiText.players.lastRollPlaceholder}
                  onChange={(event) => onUpdatePlayer(player.id, { lastRoll: event.target.value })}
                />
              </label>
            </div>

            <div className="grid-2">
              <label>
                {uiText.players.hpCurrent}
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
                {uiText.players.hpMax}
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
                {uiText.players.condition}
                <select
                  className="input"
                  value={player.condition}
                  onChange={(event) => onUpdatePlayer(player.id, { condition: event.target.value })}
                >
                  <option value="">{uiText.players.none}</option>
                  {CONDITION_KEYS.map((conditionKey) => (
                    <option key={conditionKey} value={conditionKey}>
                      {uiText.conditions[conditionKey]}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                {uiText.players.healthState}
                <input
                  className="input"
                  value={uiText.healthStates[player.healthState]}
                  readOnly
                />
              </label>
            </div>

            <label>
              {uiText.players.notes}
              <input
                className="input"
                value={player.notes}
                placeholder={uiText.players.notesPlaceholder}
                onChange={(event) => onUpdatePlayer(player.id, { notes: event.target.value })}
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}