import type { Locale, UiText } from "../../i18n/uiText";

interface TopBarProps {
  locale: Locale;
  uiText: UiText;
  sessionName: string;
  onLocaleChange: (value: Locale) => void;
  onSessionNameChange: (value: string) => void;
  onResetRound: () => void;
}

export function TopBar({
  locale,
  uiText,
  sessionName,
  onLocaleChange,
  onSessionNameChange,
  onResetRound
}: TopBarProps) {
  return (
    <header className="top-bar panel">
      <div className="top-bar-left">
        <h1>{uiText.topBar.title}</h1>
        <input
          className="input"
          value={sessionName}
          onChange={(event) => onSessionNameChange(event.target.value)}
          aria-label={uiText.topBar.sessionAriaLabel}
        />
      </div>

      <div className="top-bar-actions">
        <label className="inline-label" htmlFor="language-switch">
          {uiText.topBar.languageLabel}
        </label>
        <select
          id="language-switch"
          className="input language-select"
          value={locale}
          onChange={(event) => onLocaleChange(event.target.value as Locale)}
        >
          <option value="en">EN</option>
          <option value="it">IT</option>
        </select>
        <button className="btn btn-secondary" type="button" onClick={onResetRound}>
          {uiText.topBar.resetRound}
        </button>
        <button className="btn" type="button">
          {uiText.topBar.newCombat}
        </button>
      </div>
    </header>
  );
}