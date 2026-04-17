import { SOUND_RESOURCES } from "../../data/soundboard";

export function SoundboardPanel() {
  return (
    <div className="panel soundboard-panel">
      <div className="panel-header">
        <h2>Soundboard</h2>
        <span className="muted">Layout ready</span>
      </div>

      <div className="soundboard-grid">
        {SOUND_RESOURCES.map((resource) => (
          <button key={resource.id} className="sound-btn" type="button" title={resource.audioPath}>
            <span>{resource.label}</span>
            <small>{resource.category}</small>
          </button>
        ))}
      </div>

      <p className="muted">
        Audio files path source: <code>src/data/soundboard.ts</code> and static files under
        <code>public/audio</code>.
      </p>
    </div>
  );
}