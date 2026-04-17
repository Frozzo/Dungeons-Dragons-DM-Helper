import type { InitiativeEntry } from "../../types/entity";
import type { UiText } from "../../i18n/uiText";

interface CombatBoardProps {
  uiText: UiText;
  round: number;
  turnIndex: number;
  order: InitiativeEntry[];
  onNextTurn: () => void;
  onPrevTurn: () => void;
  onEndRound: () => void;
}

export function CombatBoard({
  uiText,
  round,
  turnIndex,
  order,
  onNextTurn,
  onPrevTurn,
  onEndRound
}: CombatBoardProps) {
  const activeId = order[turnIndex]?.id;

  return (
    <div className="panel combat-board">
      <div className="panel-header">
        <h2>{uiText.combat.title}</h2>
        <div className="pill">{uiText.combat.round} {round}</div>
      </div>

      <div className="action-row">
        <button className="btn btn-secondary" type="button" onClick={onPrevTurn}>
          {uiText.combat.prev}
        </button>
        <button className="btn" type="button" onClick={onNextTurn}>
          {uiText.combat.nextTurn}
        </button>
        <button className="btn btn-secondary" type="button" onClick={onEndRound}>
          {uiText.combat.endRound}
        </button>
      </div>

      <div className="initiative-list">
        {order.length === 0 && <p className="muted">{uiText.combat.noCombatants}</p>}

        {order.map((entry, index) => (
          <div
            key={entry.id}
            className={`initiative-row ${entry.id === activeId ? "initiative-row-active" : ""}`}
          >
            <span className="initiative-index">{index + 1}</span>
            <span className="initiative-name">{entry.name}</span>
            <span className={`tag ${entry.side === "player" ? "tag-player" : "tag-enemy"}`}>
              {entry.side === "player" ? uiText.combat.playerSide : uiText.combat.enemySide}
            </span>
            <span className="initiative-score">{entry.initiative}</span>
          </div>
        ))}
      </div>
    </div>
  );
}