import { useMemo, useState } from "react";
import {
  ALIGNMENTS,
  BACKGROUNDS,
  CLASSES,
  RACES,
  getLocalizedLabel
} from "../../data/characterOptions";
import { CLASS_TOOLKITS, localizeToolkitEntries } from "../../data/classToolkit";
import {
  ABILITY_LABELS,
  ABILITY_ORDER,
  getCharacterSummary,
  buildCharacterFromDraft,
  calculatePointBuySpent,
  clampPointBuyScore,
  getSpellSelectionRules,
  getSpellOptionsForClass,
  getSubclassesForClass,
  getClassSkillChoiceCount,
  getSkillLabel,
  localizeTerm,
  resolveBackgroundSkillIds,
  resolveClassSkillOptionIds
} from "../../logic/character";
import { formatSpellSummary, getSpellInfo } from "../../data/spellLibrary";
import type { Locale, UiText } from "../../i18n/uiText";
import type { AbilityKey, CharacterWizardDraft } from "../../types/character";

interface CharacterBuilderProps {
  uiText: UiText;
  locale: Locale;
  hasCharacterFolder: boolean;
  onChooseCharacterFolder: () => Promise<void>;
  onClose: () => void;
  onSave: (draft: CharacterWizardDraft) => Promise<string>;
}

const defaultDraft = (): CharacterWizardDraft => ({
  name: "",
  raceId: RACES[0]?.id ?? "human",
  subraceId: RACES[0]?.subraces?.[0]?.id ?? "",
  classId: CLASSES[0]?.id ?? "fighter",
  subclassId: "",
  backgroundId: BACKGROUNDS[0]?.id ?? "acolyte",
  alignmentId: ALIGNMENTS[0]?.id ?? "lawfulGood",
  level: 1,
  classSkillChoices: [],
  customLanguages: [],
  selectedCantrips: [],
  selectedSpells: [],
  armorSlot: "none",
  hasShield: false,
  primaryWeapon: "",
  secondaryWeapon: "",
  inventoryNotes: "",
  abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  notes: ""
});

export function CharacterBuilder({
  uiText,
  locale,
  hasCharacterFolder,
  onChooseCharacterFolder,
  onClose,
  onSave
}: CharacterBuilderProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CharacterWizardDraft>(defaultDraft);
  const [customLanguageInput, setCustomLanguageInput] = useState("");
  const [savedPathMessage, setSavedPathMessage] = useState("");

  const race = useMemo(() => RACES.find((item) => item.id === draft.raceId), [draft.raceId]);
  const subrace = useMemo(() => race?.subraces?.find((item) => item.id === draft.subraceId), [race, draft.subraceId]);
  const classOption = useMemo(() => CLASSES.find((item) => item.id === draft.classId), [draft.classId]);
  const subclassOptions = useMemo(() => getSubclassesForClass(draft.classId), [draft.classId]);
  const selectedSubclass = useMemo(() => subclassOptions.find((item) => item.id === draft.subclassId), [subclassOptions, draft.subclassId]);
  const spellOptions = useMemo(() => getSpellOptionsForClass(draft.classId), [draft.classId]);
  const background = useMemo(() => BACKGROUNDS.find((item) => item.id === draft.backgroundId), [draft.backgroundId]);

  const previewCharacter = useMemo(() => buildCharacterFromDraft(draft, locale), [draft, locale]);
  const spellRules = useMemo(() => getSpellSelectionRules(draft.classId, draft.level, previewCharacter.abilityModifiers, locale), [draft.classId, draft.level, previewCharacter.abilityModifiers, locale]);
  const characterSummary = useMemo(() => getCharacterSummary(previewCharacter, locale), [previewCharacter, locale]);
  const availableClassSkillIds = useMemo(() => resolveClassSkillOptionIds(draft.classId), [draft.classId]);
  const backgroundSkillIds = useMemo(() => resolveBackgroundSkillIds(draft.backgroundId), [draft.backgroundId]);
  const classSkillChoiceCount = useMemo(() => getClassSkillChoiceCount(draft.classId), [draft.classId]);
  const pointBuySpent = useMemo(() => calculatePointBuySpent(draft.abilityScores), [draft.abilityScores]);
  const pointBuyRemaining = 27 - pointBuySpent;
  const classToolkit = useMemo(() => CLASS_TOOLKITS[draft.classId] ?? CLASS_TOOLKITS.fighter, [draft.classId]);

  const ui = {
    speed: locale === "it" ? "Velocita" : "Speed",
    size: locale === "it" ? "Taglia" : "Size",
    hitDie: locale === "it" ? "Dado Vita" : "Hit Die",
    proficiencyBonus: locale === "it" ? "Bonus Competenza" : "Proficiency Bonus",
    savingThrows: locale === "it" ? "Tiri Salvezza" : "Saving Throws",
    skills: locale === "it" ? "Abilita" : "Skills",
    languages: locale === "it" ? "Lingue" : "Languages",
    raceTraits: locale === "it" ? "Tratti Razza" : "Race Traits",
    classTraits: locale === "it" ? "Tratti Classe" : "Class Traits",
    subclass: locale === "it" ? "Sottoclasse" : "Subclass",
    subclassTraits: locale === "it" ? "Tratti Sottoclasse" : "Subclass Traits",
    raceInfo: locale === "it" ? "Cosa ti da la razza" : "What the race grants",
    subraceInfo: locale === "it" ? "Cosa cambia con la sottorazza" : "What the subrace changes",
    classInfo: locale === "it" ? "Cosa ti da la classe" : "What the class grants",
    subclassInfo: locale === "it" ? "Cosa cambia con la sottoclasse" : "What the subclass changes",
    backgroundInfo: locale === "it" ? "Cosa ti da il background" : "What the background grants",
    backgroundFeature: locale === "it" ? "Privilegio del background" : "Background Feature",
    classSkillPick: locale === "it" ? "Competenze di classe (abilita)" : "Class skill proficiencies",
    backgroundSkillFixed: locale === "it" ? "Competenze del background" : "Background proficiencies",
    classSkillSelected: locale === "it" ? "Competenze classe selezionate" : "Selected class proficiencies",
    tools: locale === "it" ? "Strumenti" : "Tools",
    armorClass: locale === "it" ? "Classe Armatura" : "Armor Class",
    armorSlot: locale === "it" ? "Tipo Armatura" : "Armor Type",
    shield: locale === "it" ? "Scudo" : "Shield",
    primaryWeapon: locale === "it" ? "Arma Primaria" : "Primary Weapon",
    secondaryWeapon: locale === "it" ? "Arma Secondaria" : "Secondary Weapon",
    inventory: locale === "it" ? "Inventario" : "Inventory",
    pointBuy: locale === "it" ? "Point Buy 27" : "Point Buy 27",
    pointBuyHint:
      locale === "it"
        ? "Regola 5e: ogni caratteristica base deve restare tra 8 e 15 in creazione."
        : "5e rule: each base ability must stay between 8 and 15 at creation.",
    pointBudget:
      locale === "it"
        ? `Punti usati: ${pointBuySpent}/27 (${pointBuyRemaining} rimanenti)`
        : `Points spent: ${pointBuySpent}/27 (${pointBuyRemaining} remaining)`,
    chooseFolderWarning:
      locale === "it"
        ? "Prima di salvare, scegli una cartella: il personaggio verra scritto in characters/<nome>.json"
        : "Before saving, choose a folder: the character will be written to characters/<name>.json",
    savePath: locale === "it" ? "Percorso salvataggio" : "Save path",
    actions: locale === "it" ? "Azioni" : "Actions",
    bonusActions: locale === "it" ? "Azioni Bonus" : "Bonus Actions",
    reactions: locale === "it" ? "Reazioni" : "Reactions",
    cantrips: locale === "it" ? "Trucchetti" : "Cantrips",
    spells: locale === "it" ? "Incantesimi" : "Spells",
    hpCurrent: locale === "it" ? "PF Correnti" : "HP Current",
    hpMax: locale === "it" ? "PF Massimi" : "HP Max",
    officialSpellRules: locale === "it" ? "Regole ufficiali" : "Official rules",
    summaryTitle: locale === "it" ? "Cosa sa fare davvero" : "What the character can actually do",
    defenses: locale === "it" ? "Difese" : "Defenses",
    skillsBreakdown: locale === "it" ? "Abilita e tiri" : "Skills and saves",
    spellsBreakdown: locale === "it" ? "Magie con dettagli" : "Spells with details"
  };

  const armorLabel = (value: string): string => {
    if (value === "light") return locale === "it" ? "Armatura leggera" : "Light armor";
    if (value === "medium") return locale === "it" ? "Armatura media" : "Medium armor";
    if (value === "heavy") return locale === "it" ? "Armatura pesante" : "Heavy armor";
    return locale === "it" ? "Nessuna / difesa naturale" : "None / natural defense";
  };

  const handleScoreChange = (key: AbilityKey, value: number) => {
    setDraft((current) => ({
      ...current,
      abilityScores: {
        ...current.abilityScores,
        [key]: clampPointBuyScore(value)
      }
    }));
  };

  const toggleClassSkill = (skillId: string) => {
    setDraft((current) => {
      const selected = new Set(current.classSkillChoices);
      if (selected.has(skillId)) {
        selected.delete(skillId);
      } else if (selected.size < classSkillChoiceCount) {
        selected.add(skillId);
      }
      return {
        ...current,
        classSkillChoices: [...selected]
      };
    });
  };

  const toggleSpellSelection = (key: "selectedCantrips" | "selectedSpells", value: string) => {
    setDraft((current) => {
      const currentList = current[key];
      const maxAllowed = key === "selectedCantrips" ? spellRules.cantripsMax : spellRules.spellsMax;
      return {
        ...current,
        [key]: currentList.includes(value)
          ? currentList.filter((entry) => entry !== value)
          : maxAllowed > 0 && currentList.length < maxAllowed
            ? [...currentList, value]
            : currentList
      };
    });
  };

  const syncCustomLanguages = () => {
    const values = customLanguageInput
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    setDraft((current) => ({ ...current, customLanguages: values }));
  };

  const canContinue =
    step === 0
      ? draft.name.trim().length > 0 && draft.classSkillChoices.length === classSkillChoiceCount && draft.selectedCantrips.length <= spellRules.cantripsMax && draft.selectedSpells.length <= spellRules.spellsMax
      : step === 1
        ? pointBuySpent <= 27
        : true;

  return (
    <section className="card character-builder">
      <div className="panel-header">
        <h3>{uiText.builder.title}</h3>
        <button className="btn btn-secondary btn-small" type="button" onClick={onClose}>
          {uiText.builder.close}
        </button>
      </div>

      <div className="wizard-steps">
        <span className={step === 0 ? "tag tag-player" : "tag tag-neutral"}>{uiText.builder.stepBasic}</span>
        <span className={step === 1 ? "tag tag-player" : "tag tag-neutral"}>{uiText.builder.stepAbilities}</span>
        <span className={step === 2 ? "tag tag-player" : "tag tag-neutral"}>{uiText.builder.stepReview}</span>
      </div>

      {step === 0 && (
        <div className="stack">
          <label>
            {uiText.builder.name}
            <input className="input" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
          </label>

          <div className="grid-2">
            <label>
              {uiText.builder.race}
              <select className="input" value={draft.raceId} onChange={(event) => {
                const nextRace = RACES.find((item) => item.id === event.target.value);
                setDraft((current) => ({
                  ...current,
                  raceId: event.target.value,
                  subraceId: nextRace?.subraces?.[0]?.id ?? ""
                }));
              }}>
                {RACES.map((item) => (
                  <option key={item.id} value={item.id}>{getLocalizedLabel(item.label, locale)}</option>
                ))}
              </select>
            </label>

            <label>
              {uiText.builder.subrace}
              <select className="input" value={draft.subraceId} onChange={(event) => setDraft({ ...draft, subraceId: event.target.value })}>
                <option value="">-</option>
                {race?.subraces?.map((item) => (
                  <option key={item.id} value={item.id}>{getLocalizedLabel(item.label, locale)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid-2">
            <label>
              {uiText.builder.className}
              <select
                className="input"
                value={draft.classId}
                onChange={(event) => {
                  const nextClassId = event.target.value;
                  const firstSubclass = getSubclassesForClass(nextClassId)[0]?.id ?? "";
                  setDraft({
                    ...draft,
                    classId: nextClassId,
                    subclassId: firstSubclass,
                    classSkillChoices: [],
                    selectedCantrips: [],
                    selectedSpells: []
                  });
                }}
              >
                {CLASSES.map((item) => (
                  <option key={item.id} value={item.id}>{getLocalizedLabel(item.label, locale)}</option>
                ))}
              </select>
            </label>

            <label>
              {ui.subclass}
              <select className="input" value={draft.subclassId} onChange={(event) => setDraft({ ...draft, subclassId: event.target.value })}>
                <option value="">-</option>
                {subclassOptions.map((item) => (
                  <option key={item.id} value={item.id}>{getLocalizedLabel(item.label, locale)}</option>
                ))}
              </select>
            </label>

            <label>
              {uiText.builder.background}
              <select className="input" value={draft.backgroundId} onChange={(event) => setDraft({ ...draft, backgroundId: event.target.value })}>
                {BACKGROUNDS.map((item) => (
                  <option key={item.id} value={item.id}>{getLocalizedLabel(item.label, locale)}</option>
                ))}
              </select>
            </label>
          </div>

          {(spellRules.cantripsMax > 0 || spellRules.spellsMax > 0) ? (
            <div className="card review-card">
              <strong>{locale === "it" ? "Selezione magie" : "Spell Selection"}</strong>
              <p className="muted">{ui.officialSpellRules}: {spellRules.note}</p>

              {spellOptions.cantrips.length > 0 && (
                <>
                  <p className="muted">{ui.cantrips} {spellRules.cantripsMax > 0 ? `(${draft.selectedCantrips.length}/${spellRules.cantripsMax})` : ""}</p>
                  <div className="tag-wrap">
                    {spellOptions.cantrips.map((name) => (
                      <div key={name} className="stack" style={{ minWidth: "220px" }}>
                        <button
                          type="button"
                          className={`btn btn-secondary btn-small ${draft.selectedCantrips.includes(name) ? "skill-chip-selected" : ""}`}
                          onClick={() => toggleSpellSelection("selectedCantrips", name)}
                        >
                          {name}
                        </button>
                        <span className="muted">{formatSpellSummary(name, locale)}</span>
                        <span className="muted">{getSpellInfo(name)?.effect ?? ""}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {spellOptions.spells.length > 0 && (
                <>
                  <p className="muted">{ui.spells} {spellRules.spellsMax > 0 ? `(${draft.selectedSpells.length}/${spellRules.spellsMax})` : ""}</p>
                  <div className="tag-wrap">
                    {spellOptions.spells.map((name) => (
                      <div key={name} className="stack" style={{ minWidth: "220px" }}>
                        <button
                          type="button"
                          className={`btn btn-secondary btn-small ${draft.selectedSpells.includes(name) ? "skill-chip-selected" : ""}`}
                          onClick={() => toggleSpellSelection("selectedSpells", name)}
                        >
                          {name}
                        </button>
                        <span className="muted">{formatSpellSummary(name, locale)}</span>
                        <span className="muted">{getSpellInfo(name)?.effect ?? ""}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="card review-card">
              <strong>{locale === "it" ? "Selezione magie" : "Spell Selection"}</strong>
              <p className="muted">{spellRules.note}</p>
            </div>
          )}

          <div className="grid-2">
            <label>
              {uiText.builder.alignment}
              <select className="input" value={draft.alignmentId} onChange={(event) => setDraft({ ...draft, alignmentId: event.target.value })}>
                {ALIGNMENTS.map((item) => (
                  <option key={item.id} value={item.id}>{getLocalizedLabel(item.label, locale)}</option>
                ))}
              </select>
            </label>

            <label>
              {uiText.builder.level}
              <input className="input" type="number" min={1} max={20} value={draft.level} onChange={(event) => setDraft({ ...draft, level: Number(event.target.value) || 1 })} />
            </label>
          </div>

          <div className="card review-card">
            <strong>{ui.classSkillPick}</strong>
            <p className="muted">
              {locale === "it"
                ? `Scegli ${classSkillChoiceCount} competenze dalla lista classe.`
                : `Choose ${classSkillChoiceCount} proficiencies from your class list.`}
            </p>
            <div className="tag-wrap">
              {availableClassSkillIds.map((skillId) => {
                const selected = draft.classSkillChoices.includes(skillId);
                return (
                  <button
                    key={skillId}
                    type="button"
                    className={`btn btn-secondary btn-small ${selected ? "skill-chip-selected" : ""}`}
                    onClick={() => toggleClassSkill(skillId)}
                  >
                    {getSkillLabel(skillId, locale)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card review-card">
            <strong>{ui.raceInfo}</strong>
            <p className="muted">
              {race?.speed ? `${ui.speed}: ${race.speed} · ` : ""}
              {race?.size[locale] ? `${ui.size}: ${race.size[locale]} · ` : ""}
              {ui.raceTraits}: {(race?.traits ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}
            </p>
            <p className="muted">{locale === "it" ? "Lingue di partenza" : "Starting languages"}: {(race?.languages ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
          </div>

          {subrace && (
            <div className="card review-card">
              <strong>{ui.subraceInfo}</strong>
              <p className="muted">{getLocalizedLabel(subrace.label, locale)}</p>
              <p className="muted">{ui.subclassTraits}: {(subrace.traits ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
              <p className="muted">
                {locale === "it" ? "Altre sottorazze" : "Other subraces"}: {(race?.subraces ?? [])
                  .filter((item) => item.id !== subrace.id)
                  .map((item) => `${getLocalizedLabel(item.label, locale)} (${item.traits.map((trait) => localizeTerm(trait, locale)).join(", ")})`)
                  .join(" | ") || "-"}
              </p>
            </div>
          )}

          <div className="card review-card">
            <strong>{ui.classInfo}</strong>
            <p className="muted">
              {classOption ? `${ui.hitDie}: ${classOption.hitDie} · ${ui.savingThrows}: ${classOption.savingThrows.map((item) => localizeTerm(item, locale)).join(", ")}` : ""}
            </p>
            <p className="muted">{ui.classTraits}: {(classOption?.traits ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
          </div>

          {selectedSubclass && (
            <div className="card review-card">
              <strong>{ui.subclassInfo}</strong>
              <p className="muted">{getLocalizedLabel(selectedSubclass.label, locale)}</p>
              <p className="muted">{ui.subclassTraits}: {(selectedSubclass.traits ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
              <p className="muted">
                {locale === "it" ? "Altre sottoclassi" : "Other subclasses"}: {subclassOptions
                  .filter((item) => item.id !== selectedSubclass.id)
                  .map((item) => `${getLocalizedLabel(item.label, locale)} (${item.traits.map((trait) => localizeTerm(trait, locale)).join(", ")})`)
                  .join(" | ") || "-"}
              </p>
            </div>
          )}

          <div className="card review-card">
            <strong>{ui.backgroundInfo}</strong>
            <p className="muted">{background?.feature[locale] ?? "-"}</p>
            <p className="muted">{locale === "it" ? "Competenze" : "Skills"}: {(background?.skills ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
            <p className="muted">{ui.tools}: {(background?.tools ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
            <p className="muted">{ui.languages}: {(background?.languages ?? []).map((item) => localizeTerm(item, locale)).join(", ") || "-"}</p>
          </div>

          <div className="card review-card">
            <strong>{ui.backgroundSkillFixed}</strong>
            <p className="muted">{background?.feature[locale]}</p>
            <div className="tag-wrap">
              {backgroundSkillIds.map((skillId) => (
                <span key={skillId} className="tag tag-neutral">{getSkillLabel(skillId, locale)}</span>
              ))}
            </div>
          </div>

          <label>
            {locale === "it" ? "Lingue Extra (se richieste), separate da virgola" : "Extra Languages (if required), comma separated"}
            <input
              className="input"
              value={customLanguageInput}
              onChange={(event) => setCustomLanguageInput(event.target.value)}
              onBlur={syncCustomLanguages}
              placeholder={locale === "it" ? "es. Nanico, Goblin" : "e.g. Dwarvish, Goblin"}
            />
          </label>

          <div className="card review-card">
            <strong>{locale === "it" ? "Aiuto DM rapido" : "Quick DM Help"}</strong>
            <p className="muted">{ui.speed}: {race?.speed ?? 30} · {ui.size}: {race?.size[locale] ?? "-"} · {ui.hitDie}: {classOption?.hitDie ?? "d8"}</p>
            <p className="muted">{ui.savingThrows}: {(classOption?.savingThrows ?? []).map((item) => localizeTerm(item, locale)).join(", ")}</p>
            <p className="muted">{ui.backgroundFeature}: {background?.feature[locale] ?? "-"}</p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="stack">
          <h4 className="section-title">{ui.pointBuy}</h4>
          <p className="muted">{ui.pointBuyHint}</p>
          <p className={`muted ${pointBuyRemaining < 0 ? "warning-text" : ""}`}>{ui.pointBudget}</p>
          <div className="grid-2">
            {ABILITY_ORDER.map((ability) => (
              <label key={ability}>
                {ABILITY_LABELS[ability][locale]}
                <input
                  className="input"
                  type="number"
                  min={8}
                  max={15}
                  value={draft.abilityScores[ability]}
                  onChange={(event) => handleScoreChange(ability, Number(event.target.value) || 10)}
                />
              </label>
            ))}
          </div>

          <div className="grid-2">
            <label>
              {ui.armorSlot}
              <select className="input" value={draft.armorSlot} onChange={(event) => setDraft({ ...draft, armorSlot: event.target.value })}>
                <option value="none">{locale === "it" ? "Nessuna / Difesa naturale" : "None / Natural defense"}</option>
                <option value="light">{locale === "it" ? "Armatura leggera" : "Light armor"}</option>
                <option value="medium">{locale === "it" ? "Armatura media" : "Medium armor"}</option>
                <option value="heavy">{locale === "it" ? "Armatura pesante" : "Heavy armor"}</option>
              </select>
            </label>

            <label className="checkbox-row">
              <input type="checkbox" checked={draft.hasShield} onChange={(event) => setDraft({ ...draft, hasShield: event.target.checked })} />
              {ui.shield}
            </label>
          </div>

          <div className="grid-2">
            <label>
              {ui.primaryWeapon}
              <input className="input" value={draft.primaryWeapon} onChange={(event) => setDraft({ ...draft, primaryWeapon: event.target.value })} />
            </label>
            <label>
              {ui.secondaryWeapon}
              <input className="input" value={draft.secondaryWeapon} onChange={(event) => setDraft({ ...draft, secondaryWeapon: event.target.value })} />
            </label>
          </div>

          <label>
            {ui.inventory}
            <textarea className="input character-notes" rows={3} value={draft.inventoryNotes} onChange={(event) => setDraft({ ...draft, inventoryNotes: event.target.value })} />
          </label>

          <label>
            {uiText.builder.notes}
            <textarea className="input character-notes" rows={4} value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="stack">
          <h4 className="section-title">{uiText.builder.review}</h4>
          <div className="card review-card">
            <div className="character-row"><strong>{previewCharacter.name || "-"}</strong><span className="pill">Lv {previewCharacter.level}</span></div>
            <p className="muted">{getLocalizedLabel(race?.label ?? { en: "", it: "" }, locale)}{subrace ? ` · ${getLocalizedLabel(subrace.label, locale)}` : ""}</p>
            <p className="muted">{getLocalizedLabel(classOption?.label ?? { en: "", it: "" }, locale)} · {getLocalizedLabel(background?.label ?? { en: "", it: "" }, locale)}</p>
            <h5 className="section-title">{ui.summaryTitle}</h5>
            <div className="card review-card">
              <strong>{ui.skillsBreakdown}</strong>
              <div className="character-summary-grid">
                {characterSummary.abilityScores.map((entry) => (
                  <span key={entry.ability}>{entry.label} {entry.score} ({entry.modifier >= 0 ? "+" : ""}{entry.modifier})</span>
                ))}
              </div>
              <ul className="compact-list">
                <li><strong>{ui.savingThrows}:</strong> {characterSummary.savingThrows.map((item) => `${item.label} ${item.total >= 0 ? "+" : ""}${item.total}${item.proficient ? ` (${locale === "it" ? "competente" : "proficient"})` : ""}`).join(", ")}</li>
                <li><strong>{ui.skills}:</strong> {characterSummary.skillChecks.map((item) => `${item.label} ${item.total >= 0 ? "+" : ""}${item.total}${item.proficient ? ` (${locale === "it" ? "competente" : "proficient"})` : ""}`).join(", ")}</li>
              </ul>
            </div>

            <div className="card review-card">
              <strong>{ui.defenses}</strong>
              <ul className="compact-list">
                <li><strong>{locale === "it" ? "Resistenze" : "Resistances"}:</strong> {characterSummary.resistances.join(" | ") || "-"}</li>
                <li><strong>{locale === "it" ? "Immunita" : "Immunities"}:</strong> {characterSummary.immunities.join(" | ") || "-"}</li>
                <li><strong>{locale === "it" ? "Vulnerabilita" : "Vulnerabilities"}:</strong> {characterSummary.vulnerabilities.join(" | ") || "-"}</li>
                <li><strong>{locale === "it" ? "Vantaggi" : "Advantages"}:</strong> {characterSummary.advantageNotes.join(" | ") || "-"}</li>
                <li><strong>{locale === "it" ? "Svantaggi" : "Disadvantages"}:</strong> {characterSummary.disadvantageNotes.join(" | ") || "-"}</li>
              </ul>
            </div>

            <div className="card review-card">
              <strong>{ui.spellsBreakdown}</strong>
              <ul className="compact-list">
                {characterSummary.spellNotes.map((spell) => (
                  <li key={`${spell.kind}-${spell.name}`}>
                    <strong>{spell.name}:</strong> {spell.detail} — {spell.effect}
                  </li>
                ))}
              </ul>
            </div>

            <div className="character-summary-grid">
              {ABILITY_ORDER.map((ability) => (
                <span key={ability}>
                  {ABILITY_LABELS[ability][locale]} {draft.abilityScores[ability]} ({previewCharacter.abilityModifiers[ability] >= 0 ? "+" : ""}{previewCharacter.abilityModifiers[ability]})
                </span>
              ))}
            </div>
            <ul className="compact-list">
              <li><strong>{ui.speed}:</strong> {previewCharacter.speed}</li>
              <li><strong>{ui.size}:</strong> {previewCharacter.size}</li>
              <li><strong>{ui.armorClass}:</strong> {previewCharacter.armorClass}</li>
              <li><strong>{ui.hpCurrent}:</strong> {previewCharacter.hpCurrent}</li>
              <li><strong>{ui.hpMax}:</strong> {previewCharacter.hpMax}</li>
              <li><strong>{ui.hitDie}:</strong> {previewCharacter.hitDie}</li>
              <li><strong>{ui.proficiencyBonus}:</strong> +{previewCharacter.proficiencyBonus}</li>
              <li><strong>{ui.subclass}:</strong> {previewCharacter.subclassName ?? "-"}</li>
              <li><strong>{ui.savingThrows}:</strong> {previewCharacter.savingThrows.join(", ")}</li>
              <li><strong>{ui.classSkillSelected}:</strong> {previewCharacter.classSkillChoices.join(", ") || "-"}</li>
              <li><strong>{ui.backgroundSkillFixed}:</strong> {previewCharacter.backgroundSkills.join(", ") || "-"}</li>
              <li><strong>{ui.skills}:</strong> {previewCharacter.skillProficiencies.join(", ")}</li>
              <li><strong>{ui.tools}:</strong> {previewCharacter.tools.join(", ") || "-"}</li>
              <li><strong>{ui.primaryWeapon}:</strong> {previewCharacter.primaryWeapon || "-"}</li>
              <li><strong>{ui.secondaryWeapon}:</strong> {previewCharacter.secondaryWeapon || "-"}</li>
              <li><strong>{ui.armorSlot}:</strong> {armorLabel(previewCharacter.armorSlot)}</li>
              <li><strong>{ui.cantrips}:</strong> {previewCharacter.cantrips.join(", ") || "-"}</li>
              <li><strong>{ui.spells}:</strong> {previewCharacter.spells.join(", ") || "-"}</li>
              <li><strong>{ui.inventory}:</strong> {previewCharacter.inventoryNotes || "-"}</li>
              <li><strong>{ui.languages}:</strong> {previewCharacter.languages.join(", ")}</li>
              <li><strong>{ui.raceTraits}:</strong> {previewCharacter.raceTraits.join(", ")}</li>
              <li><strong>{ui.classTraits}:</strong> {previewCharacter.classTraits.join(", ")}</li>
              <li><strong>{ui.subclassTraits}:</strong> {previewCharacter.subclassTraits.join(", ") || "-"}</li>
              <li><strong>{ui.backgroundFeature}:</strong> {previewCharacter.backgroundFeature}</li>
            </ul>

            <div className="card review-card">
              <strong>{locale === "it" ? "Toolkit Classe (DM)" : "Class Toolkit (DM)"}</strong>
              <ul className="compact-list">
                <li><strong>{ui.actions}:</strong> {localizeToolkitEntries(classToolkit.actions, locale).map((entry) => `${entry.title} - ${entry.description}`).join(" | ")}</li>
                <li><strong>{ui.bonusActions}:</strong> {localizeToolkitEntries(classToolkit.bonusActions, locale).map((entry) => `${entry.title} - ${entry.description}`).join(" | ")}</li>
                <li><strong>{ui.reactions}:</strong> {localizeToolkitEntries(classToolkit.reactions, locale).map((entry) => `${entry.title} - ${entry.description}`).join(" | ")}</li>
                <li><strong>{ui.cantrips}:</strong> {localizeToolkitEntries(classToolkit.cantrips, locale).map((entry) => `${entry.title} - ${entry.description}`).join(" | ") || "-"}</li>
                <li><strong>{ui.spells}:</strong> {localizeToolkitEntries(classToolkit.spells, locale).map((entry) => `${entry.title} - ${entry.description}`).join(" | ") || "-"}</li>
              </ul>
            </div>
          </div>

          {!hasCharacterFolder && <p className="warning-text">{ui.chooseFolderWarning}</p>}
          {savedPathMessage && <p className="muted"><strong>{ui.savePath}:</strong> {savedPathMessage}</p>}
          <div className="stack">
            <button className="btn btn-secondary" type="button" onClick={onChooseCharacterFolder}>
              {uiText.characters.chooseFolder}
            </button>
          </div>
        </div>
      )}

      <div className="wizard-actions">
        <button className="btn btn-secondary" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
          {uiText.builder.back}
        </button>
        {step < 2 ? (
          <button className="btn" type="button" disabled={!canContinue} onClick={() => setStep((value) => Math.min(2, value + 1))}>
            {uiText.builder.next}
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            disabled={!draft.name.trim() || pointBuySpent > 27 || draft.classSkillChoices.length !== classSkillChoiceCount}
            onClick={async () => {
              const path = await onSave(draft);
              setSavedPathMessage(path);
            }}
          >
            {uiText.builder.saveCharacter}
          </button>
        )}
      </div>
    </section>
  );
}