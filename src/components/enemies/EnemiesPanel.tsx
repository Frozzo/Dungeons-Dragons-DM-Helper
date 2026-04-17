import type { Enemy } from "../../types/entity";

interface EnemiesPanelProps {
  enemies: Enemy[];
  onAddEnemy: (name: string) => void;
  onUpdateEnemy: (id: string, patch: Partial<Enemy>) => void;
}

export function EnemiesPanel({
  enemies,
  onAddEnemy,
  onUpdateEnemy
}: EnemiesPanelProps) {
  return (
    <div className="panel enemies-panel">
      <div className="panel-header">
        <h2>Enemies</h2>
        <button className="btn" type="button" onClick={() => onAddEnemy(`Enemy ${enemies.length + 1}`)}>
          + Add
        </button>
      </div>

      <div className="stack">
        {enemies.map((enemy) => (
          <article key={enemy.id} className="card entity-card">
            <input
              className="input title-input"
              value={enemy.name}
              onChange={(event) => onUpdateEnemy(enemy.id, { name: event.target.value })}
              aria-label="Enemy name"
            />

            <div className="grid-2">
              <label>
                Initiative
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
                Armor Class
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
                HP Current
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
                HP Max
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
              Defeated
            </label>

            <label>
              Notes
              <input
                className="input"
                value={enemy.notes}
                placeholder="Template/manual config soon"
                onChange={(event) => onUpdateEnemy(enemy.id, { notes: event.target.value })}
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}