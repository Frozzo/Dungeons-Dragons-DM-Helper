interface TopBarProps {
  sessionName: string;
  onSessionNameChange: (value: string) => void;
  onResetRound: () => void;
}

export function TopBar({
  sessionName,
  onSessionNameChange,
  onResetRound
}: TopBarProps) {
  return (
    <header className="top-bar panel">
      <div className="top-bar-left">
        <h1>DM Screen</h1>
        <input
          className="input"
          value={sessionName}
          onChange={(event) => onSessionNameChange(event.target.value)}
          aria-label="Session name"
        />
      </div>

      <div className="top-bar-actions">
        <button className="btn btn-secondary" type="button" onClick={onResetRound}>
          Reset Round
        </button>
        <button className="btn" type="button">
          New Combat
        </button>
      </div>
    </header>
  );
}