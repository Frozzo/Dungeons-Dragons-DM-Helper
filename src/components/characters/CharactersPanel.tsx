import { useState } from "react";
import { BACKGROUNDS, CLASSES, RACES, getLocalizedLabel } from "../../data/characterOptions";
import type { UiText, Locale } from "../../i18n/uiText";
import type { Character, CharacterWizardDraft } from "../../types/character";
import { CharacterBuilder } from "./CharacterBuilder";

interface CharactersPanelProps {
  uiText: UiText;
  locale: Locale;
  characters: Character[];
  hasCharacterFolder: boolean;
  onChooseCharacterFolder: () => Promise<void>;
  onLoadCharacter: () => Promise<void>;
  onSaveCharacter: (draft: CharacterWizardDraft) => Promise<string>;
  onRemoveCharacter: (characterId: string) => void;
}

export function CharactersPanel({
  uiText,
  locale,
  characters,
  hasCharacterFolder,
  onChooseCharacterFolder,
  onLoadCharacter,
  onSaveCharacter,
  onRemoveCharacter
}: CharactersPanelProps) {
  const [builderOpen, setBuilderOpen] = useState(false);

  return (
    <div className="panel characters-panel">
      <div className="panel-header">
        <h2>{uiText.characters.title}</h2>
        <button className="btn" type="button" onClick={() => setBuilderOpen(true)}>
          {uiText.characters.newCharacter}
        </button>
      </div>

      <div className="character-toolbar">
        <button className="btn btn-secondary" type="button" onClick={onChooseCharacterFolder}>
          {uiText.characters.chooseFolder}
        </button>
        <button className="btn btn-secondary" type="button" onClick={onLoadCharacter}>
          {uiText.characters.loadCharacter}
        </button>
        <span className="muted">
          {hasCharacterFolder ? uiText.characters.folderReady : uiText.characters.chooseFolder}
        </span>
      </div>

      {builderOpen ? (
        <div className="builder-fullscreen-overlay" role="dialog" aria-modal="true" aria-label={uiText.builder.title}>
          <div className="builder-fullscreen-panel">
            <CharacterBuilder
              uiText={uiText}
              locale={locale}
              hasCharacterFolder={hasCharacterFolder}
              onChooseCharacterFolder={onChooseCharacterFolder}
              onClose={() => setBuilderOpen(false)}
              onSave={onSaveCharacter}
            />
          </div>
        </div>
      ) : null}

      <div className="stack">
        {characters.length === 0 ? (
          <p className="muted">{uiText.characters.empty}</p>
        ) : (
          characters.map((character) => (
            <article key={character.id} className="card entity-card">
              <div className="character-row">
                <strong>{character.name}</strong>
                <div className="character-row">
                  <span className="pill">Lv {character.level}</span>
                  <button className="btn btn-secondary btn-small" type="button" onClick={() => onRemoveCharacter(character.id)}>
                    {uiText.characters.removeCharacter}
                  </button>
                </div>
              </div>
              <div className="muted">
                {getLocalizedLabel(RACES.find((item) => item.id === character.raceId)?.label ?? { en: character.raceId, it: character.raceId }, locale)}
                {character.subraceId
                  ? ` · ${getLocalizedLabel(
                      RACES.find((item) => item.id === character.raceId)?.subraces?.find((subrace) => subrace.id === character.subraceId)?.label ?? {
                        en: character.subraceId,
                        it: character.subraceId
                      },
                      locale
                    )}`
                  : ""}
                · {getLocalizedLabel(CLASSES.find((item) => item.id === character.classId)?.label ?? { en: character.classId, it: character.classId }, locale)} · {getLocalizedLabel(BACKGROUNDS.find((item) => item.id === character.backgroundId)?.label ?? { en: character.backgroundId, it: character.backgroundId }, locale)}
              </div>
              <div className="character-summary-grid">
                <span>STR {character.abilityScores.str}</span>
                <span>DEX {character.abilityScores.dex}</span>
                <span>CON {character.abilityScores.con}</span>
                <span>INT {character.abilityScores.int}</span>
                <span>WIS {character.abilityScores.wis}</span>
                <span>CHA {character.abilityScores.cha}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}