import { SOUND_RESOURCES } from "../../data/soundboard";
import type { UiText } from "../../i18n/uiText";

interface SoundboardPanelProps {
  uiText: UiText;
}

export function SoundboardPanel({ uiText }: SoundboardPanelProps) {
  return (
    <div className="panel soundboard-panel">
      <div className="panel-header">
        <h2>{uiText.soundboard.title}</h2>
        <span className="muted">{uiText.soundboard.layoutReady}</span>
      </div>

      <div className="soundboard-grid">
        {SOUND_RESOURCES.map((resource) => (
          <button key={resource.id} className="sound-btn" type="button" title={resource.audioPath}>
            <span>{resource.label}</span>
            <small>{uiText.soundboard.categories[resource.category]}</small>
          </button>
        ))}
      </div>

      <p className="muted">{uiText.soundboard.audioSourceText}</p>
    </div>
  );
}