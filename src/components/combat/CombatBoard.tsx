import type { InitiativeEntry } from "../../types/entity";

interface CombatBoardProps {
  round: number;
  turnIndex: number;
  order: InitiativeEntry[];
  onNextTurn: () => void;
  onPrevTurn: () => void;
  onEndRound: () => void;
}

export function CombatBoard({
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
        <h2>Combat</h2>
        <div className="pill">Round {round}</div>
      </div>

      <div className="action-row">
        <button className="btn btn-secondary" type="button" onClick={onPrevTurn}>
          Prev
        </button>
        <button className="btn" type="button" onClick={onNextTurn}>
          Next Turn
        </button>
        <button className="btn btn-secondary" type="button" onClick={onEndRound}>
          End Round
        </button>
      </div>

      <div className="initiative-list">
        {order.length === 0 && <p className="muted">No combatants yet.</p>}

        {order.map((entry, index) => (
          <div
            key={entry.id}
            className={`initiative-row ${entry.id === activeId ? "initiative-row-active" : ""}`}
          >
            <span className="initiative-index">{index + 1}</span>
            <span className="initiative-name">{entry.name}</span>
            <span className={`tag ${entry.side === "player" ? "tag-player" : "tag-enemy"}`}>
              {entry.side}
            </span>
            <span className="initiative-score">{entry.initiative}</span>
          </div>
        ))}
      </div>
    </div>
  );
}