import { useState } from "react";
import { CONDITION_KEYS } from "../../data/conditions";
import type { UiText } from "../../i18n/uiText";
import type { Locale } from "../../i18n/uiText";
import { getCharacterSummary, getOfficialProficiencyNote, getSpellcastingUsageProfile } from "../../logic/character";
import type { Character } from "../../types/character";
import type { Player } from "../../types/entity";

interface PlayersPanelProps {
  uiText: UiText;
  locale: Locale;
  players: Player[];
  characters: Character[];
  onUpdatePlayer: (id: string, patch: Partial<Player>) => void;
  onLevelUpPlayer: (id: string) => void;
}

export function PlayersPanel({
  uiText,
  locale,
  players,
  characters,
  onUpdatePlayer,
  onLevelUpPlayer
}: PlayersPanelProps) {
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});

  const toggleCollapsed = (playerId: string) => {
    setCollapsedCards((current) => ({ ...current, [playerId]: !current[playerId] }));
  };

  return (
    <div className="panel players-panel">
      <div className="panel-header">
        <h2>{uiText.players.title}</h2>
      </div>

      <div className="stack">
        {players.length === 0 && <p className="muted">{uiText.players.noPlayersHint}</p>}
        {players.map((player) => {
          const linkedCharacter = characters.find((character) => character.id === player.characterId);
          const summary = linkedCharacter ? getCharacterSummary(linkedCharacter, locale) : null;
          const spellUsage = linkedCharacter ? getSpellcastingUsageProfile(linkedCharacter.classId, linkedCharacter.level, locale) : null;
          const cantripNotes = summary?.spellNotes.filter((spell) => spell.kind === "cantrip") ?? [];
          const spellNotes = summary?.spellNotes.filter((spell) => spell.kind === "spell") ?? [];
          const isCollapsed = collapsedCards[player.id] ?? false;

          return (
            <article key={player.id} className="card entity-card">
              <div className="grid-2">
                <strong>{player.name || uiText.players.defaultNamePrefix}</strong>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.4rem", alignItems: "center" }}>
                  <span className="muted">{locale === "it" ? "Livello" : "Level"}: {linkedCharacter?.level ?? "-"}</span>
                  <button className="btn btn-secondary btn-small" type="button" onClick={() => toggleCollapsed(player.id)}>
                    {isCollapsed ? (locale === "it" ? "Espandi" : "Expand") : (locale === "it" ? "Comprimi" : "Collapse")}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <>
                  <label>
                    {uiText.players.nameAriaLabel}
                    <input
                      className="input title-input"
                      value={player.name}
                      onChange={(event) => onUpdatePlayer(player.id, { name: event.target.value })}
                      aria-label={uiText.players.nameAriaLabel}
                    />
                  </label>

                  <div className="grid-2">
                    <label>
                      {uiText.players.classAndSubclass}
                      <input className="input" value={`${player.classLabel ?? "-"}${player.subclassLabel ? ` / ${player.subclassLabel}` : ""}`} readOnly />
                    </label>

                    <label>
                      {uiText.players.armorClass}
                      <input className="input" type="number" value={player.armorClass} onChange={(event) => onUpdatePlayer(player.id, { armorClass: Number(event.target.value) || 0 })} />
                    </label>
                  </div>

                  <div className="grid-2">
                    <label>
                      {uiText.players.primaryWeapon}
                      <input className="input" value={player.primaryWeapon ?? ""} onChange={(event) => onUpdatePlayer(player.id, { primaryWeapon: event.target.value })} />
                    </label>

                    <label>
                      {uiText.players.secondaryWeapon}
                      <input className="input" value={player.secondaryWeapon ?? ""} onChange={(event) => onUpdatePlayer(player.id, { secondaryWeapon: event.target.value })} />
                    </label>
                  </div>

                  <div className="grid-2">
                    <label>
                      {uiText.players.hpCurrent}
                      <input
                        className="input"
                        type="number"
                        value={player.hpCurrent}
                        onChange={(event) => onUpdatePlayer(player.id, { hpCurrent: Number(event.target.value) || 0 })}
                      />
                    </label>

                    <label>
                      {uiText.players.hpMax}
                      <input
                        className="input"
                        type="number"
                        value={player.hpMax}
                        onChange={(event) => onUpdatePlayer(player.id, { hpMax: Number(event.target.value) || 0 })}
                      />
                    </label>
                  </div>

                  <label>
                    {uiText.characters.inventory}
                    <textarea
                      className="input character-notes"
                      rows={3}
                      value={player.inventoryNotes ?? ""}
                      onChange={(event) => onUpdatePlayer(player.id, { inventoryNotes: event.target.value })}
                    />
                  </label>

                  <div className="grid-2">
                    <label>
                      {uiText.players.initiative}
                      <input
                        className="input"
                        type="number"
                        value={player.initiative}
                        onChange={(event) =>
                          onUpdatePlayer(player.id, { initiative: Number(event.target.value) || 0 })
                        }
                      />
                    </label>

                    <label>
                      {uiText.players.lastRoll}
                      <input
                        className="input"
                        value={player.lastRoll}
                        placeholder={uiText.players.lastRollPlaceholder}
                        onChange={(event) => onUpdatePlayer(player.id, { lastRoll: event.target.value })}
                      />
                    </label>
                  </div>

                  <div className="grid-2">
                    <label>
                      {uiText.players.condition}
                      <select
                        className="input"
                        value={player.condition}
                        onChange={(event) => onUpdatePlayer(player.id, { condition: event.target.value })}
                      >
                        <option value="">{uiText.players.none}</option>
                        {CONDITION_KEYS.map((conditionKey) => (
                          <option key={conditionKey} value={conditionKey}>
                            {uiText.conditions[conditionKey]}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      {uiText.players.healthState}
                      <input
                        className="input"
                        value={uiText.healthStates[player.healthState]}
                        readOnly
                      />
                    </label>
                  </div>

                  <label>
                    {uiText.players.notes}
                    <textarea
                      className="input character-notes"
                      rows={5}
                      value={player.notes}
                      placeholder={uiText.players.notesPlaceholder}
                      onChange={(event) => onUpdatePlayer(player.id, { notes: event.target.value })}
                    />
                  </label>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={Boolean(player.hasShield)}
                      onChange={(event) => onUpdatePlayer(player.id, { hasShield: event.target.checked })}
                    />
                    {uiText.players.shield ?? "Shield"}
                  </label>

                  <div className="grid-2">
                    <span className="muted">{locale === "it" ? "Progressione DM (max 5)" : "DM progression (max 5)"}</span>
                    <button
                      className="btn btn-secondary btn-small"
                      type="button"
                      disabled={!(linkedCharacter && linkedCharacter.level < 5)}
                      onClick={() => onLevelUpPlayer(player.id)}
                    >
                      {locale === "it" ? "Livella" : "Level Up"}
                    </button>
                  </div>

                  {summary && (
                    <div className="card review-card">
                      <strong>{locale === "it" ? "Riassunto rapido" : "Quick summary"}</strong>
                      <ul className="compact-list">
                        <li><strong>{locale === "it" ? "In pratica" : "In practice"}:</strong> {player.classLabel ?? "-"}{player.subclassLabel ? ` / ${player.subclassLabel}` : ""} · {(linkedCharacter?.armorClass ?? player.armorClass)} CA · {(linkedCharacter?.hpCurrent ?? player.hpCurrent)}/{(linkedCharacter?.hpMax ?? player.hpMax)} PF</li>
                        <li><strong>{locale === "it" ? "Competenza" : "Proficiency"}:</strong> {getOfficialProficiencyNote(linkedCharacter?.level ?? 1, locale)}</li>
                        <li><strong>{locale === "it" ? "Tiri salvezza" : "Saving throws"}:</strong> {summary.savingThrows.map((item) => `${item.label} ${item.total >= 0 ? "+" : ""}${item.total}${item.proficient ? ` (${locale === "it" ? "competente" : "proficient"})` : ""}`).join(", ")}</li>
                        <li><strong>{locale === "it" ? "Abilita" : "Skills"}:</strong> {summary.skillChecks.map((item) => `${item.label} ${item.total >= 0 ? "+" : ""}${item.total}${item.proficient ? ` (${locale === "it" ? "competente" : "proficient"})` : ""}`).join(", ")}</li>
                        <li><strong>{locale === "it" ? "Resistenze" : "Resistances"}:</strong> {summary.resistances.join(" | ") || "-"}</li>
                        <li><strong>{locale === "it" ? "Immunita" : "Immunities"}:</strong> {summary.immunities.join(" | ") || "-"}</li>
                        <li><strong>{locale === "it" ? "Vantaggi" : "Advantages"}:</strong> {summary.advantageNotes.join(" | ") || "-"}</li>
                        <li><strong>{locale === "it" ? "Svantaggi" : "Disadvantages"}:</strong> {summary.disadvantageNotes.join(" | ") || "-"}</li>
                        <li><strong>{locale === "it" ? "Trucchetti" : "Cantrips"}:</strong> {spellUsage ? `${locale === "it" ? "Uso" : "Usage"}: ${spellUsage.cantripUsage}` : "-"}</li>
                        <li>{cantripNotes.map((spell) => `${spell.name} — ${spell.effect}`).join(" | ") || "-"}</li>
                        <li><strong>{locale === "it" ? "Incantesimi" : "Spells"}:</strong> {spellUsage ? `${spellUsage.spellUsage}; ${locale === "it" ? "Slot" : "Slots"}: ${spellUsage.slotSummary}; ${locale === "it" ? "Recupero" : "Recovery"}: ${spellUsage.recovery}` : "-"}</li>
                        <li>{spellNotes.map((spell) => `${spell.name} — ${spell.effect}`).join(" | ") || "-"}</li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}