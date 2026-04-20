import type { Enemy } from "../../types/entity";
import type { Locale, UiText } from "../../i18n/uiText";
import type { MonsterTemplate } from "../../data/monsterPool";
import { localizeMonsterText } from "../../data/monsterPool";
import { useMemo, useState } from "react";

interface EnemiesPanelProps {
  locale: Locale;
  uiText: UiText;
  enemies: Enemy[];
  monsterPool: MonsterTemplate[];
  onAddEnemyFromTemplate: (templateId: string) => void;
  onUpdateEnemy: (id: string, patch: Partial<Enemy>) => void;
}

export function EnemiesPanel({
  locale,
  uiText,
  enemies,
  monsterPool,
  onAddEnemyFromTemplate,
  onUpdateEnemy
}: EnemiesPanelProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(monsterPool[0]?.id ?? "");
  const selectedTemplate = useMemo(
    () => monsterPool.find((item) => item.id === selectedTemplateId),
    [monsterPool, selectedTemplateId]
  );

  return (
    <div className="panel enemies-panel">
      <div className="panel-header">
        <h2>{uiText.enemies.title}</h2>
      </div>

      <div className="card review-card">
        <label>
          {uiText.enemies.monsterPool}
          <select
            className="input"
            value={selectedTemplateId}
            onChange={(event) => setSelectedTemplateId(event.target.value)}
          >
            {monsterPool.map((monster) => (
              <option key={monster.id} value={monster.id}>
                {monster.name[locale]} ({uiText.enemies.challengeRating} {monster.challengeRating})
              </option>
            ))}
          </select>
        </label>

        {selectedTemplate && (
          <div className="compact-list">
            <span>
              <strong>{uiText.enemies.armorClass}:</strong> {selectedTemplate.armorClass}
            </span>
            <span>
              <strong>{uiText.enemies.hpMax}:</strong> {selectedTemplate.hpMax}
            </span>
            <span>
              <strong>{uiText.enemies.speed}:</strong> {localizeMonsterText(selectedTemplate.speed, locale)}
            </span>
          </div>
        )}

        <button
          className="btn"
          type="button"
          disabled={!selectedTemplateId}
          onClick={() => onAddEnemyFromTemplate(selectedTemplateId)}
        >
          {uiText.enemies.addFromPool}
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

            <div className="character-row">
              <span className="pill">{uiText.enemies.challengeRating} {enemy.challengeRating ?? "-"}</span>
              <span className="pill">{uiText.enemies.speed}: {enemy.speed ?? "-"}</span>
            </div>

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
              <textarea
                className="input"
                rows={3}
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