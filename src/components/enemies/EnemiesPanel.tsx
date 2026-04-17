import type { Enemy } from "../../types/entity";
import type { UiText } from "../../i18n/uiText";

interface EnemiesPanelProps {
  uiText: UiText;
  enemies: Enemy[];
  onAddEnemy: (name: string) => void;
  onUpdateEnemy: (id: string, patch: Partial<Enemy>) => void;
}

export function EnemiesPanel({
  uiText,
  enemies,
  onAddEnemy,
  onUpdateEnemy
}: EnemiesPanelProps) {
  return (
    <div className="panel enemies-panel">
      <div className="panel-header">
        <h2>{uiText.enemies.title}</h2>
        <button
          className="btn"
          type="button"
          onClick={() => onAddEnemy(`${uiText.enemies.defaultNamePrefix} ${enemies.length + 1}`)}
        >
          {uiText.enemies.add}
        </button>
      </div>

      <div className="stack">
        {enemies.map((enemy) => (
          <article key={enemy.id} className="card entity-card">
            <input
              className="input title-input"
              value={enemy.name}
              onChange={(event) => onUpdateEnemy(enemy.id, { name: event.target.value })}
              aria-label={uiText.enemies.nameAriaLabel}
            />

            <div className="grid-2">
              <label>
                {uiText.enemies.initiative}
                <input
                  className="input"
                  type="number"
                  value={enemy.initiative}
                  onChange={(event) =>
                    onUpdateEnemy(enemy.id, { initiative: Number(event.target.value) || 0 })
                  }
                />
              </label>
              <label>
                {uiText.enemies.armorClass}
                <input
                  className="input"
                  type="number"
                  value={enemy.armorClass}
                  onChange={(event) =>
                    onUpdateEnemy(enemy.id, { armorClass: Number(event.target.value) || 0 })
                  }
                />
              </label>
            </div>

            <div className="grid-2">
              <label>
                {uiText.enemies.hpCurrent}
                <input
                  className="input"
                  type="number"
                  value={enemy.hpCurrent}
                  onChange={(event) =>
                    onUpdateEnemy(enemy.id, { hpCurrent: Number(event.target.value) || 0 })
                  }
                />
              </label>
              <label>
                {uiText.enemies.hpMax}
                <input
                  className="input"
                  type="number"
                  value={enemy.hpMax}
                  onChange={(event) =>
                    onUpdateEnemy(enemy.id, { hpMax: Number(event.target.value) || 0 })
                  }
                />
              </label>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={enemy.isDefeated}
                onChange={(event) =>
                  onUpdateEnemy(enemy.id, { isDefeated: event.target.checked })
                }
              />
              {uiText.enemies.defeated}
            </label>

            <label>
              {uiText.enemies.notes}
              <input
                className="input"
                value={enemy.notes}
                placeholder={uiText.enemies.notesPlaceholder}
                onChange={(event) => onUpdateEnemy(enemy.id, { notes: event.target.value })}
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}