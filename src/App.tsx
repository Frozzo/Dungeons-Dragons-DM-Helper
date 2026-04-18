import { useMemo, useReducer, useRef, useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { PlayersPanel } from "./components/players/PlayersPanel";
import { CombatBoard } from "./components/combat/CombatBoard";
import { EnemiesPanel } from "./components/enemies/EnemiesPanel";
import { QuickRulesPanel } from "./components/rules/QuickRulesPanel";
import { SoundboardPanel } from "./components/soundboard/SoundboardPanel";
import { appReducer, initialState } from "./state/appStore";
import { sortInitiative } from "./logic/initiative";
import { UI_TEXT } from "./i18n/uiText";
import { CharactersPanel } from "./components/characters/CharactersPanel";
import { buildCharacterFromDraft, createPlayerFromCharacter, levelUpCharacter } from "./logic/character";
import { makeCharacterSnapshot, makeSessionSnapshot, openJsonFile, saveJsonToFile } from "./logic/filePersistence";
import type { SessionSnapshot } from "./types/character";
import type { CharacterWizardDraft } from "./types/character";
import type { Player } from "./types/entity";

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [hasCharacterFolder, setHasCharacterFolder] = useState(false);
  const characterFolderRef = useRef<FileSystemDirectoryHandle | null>(null);
  const uiText = UI_TEXT[state.locale];

  const initiativeOrder = useMemo(
    () => sortInitiative(state.players, state.enemies),
    [state.players, state.enemies]
  );

  const ensureCharacterFolder = async () => {
    if (characterFolderRef.current) {
      return characterFolderRef.current;
    }

    const picker = (window as Window & typeof globalThis & {
      showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    }).showDirectoryPicker;

    if (!picker) {
      throw new Error("Directory picker is not supported in this browser.");
    }

    const handle = await picker();
    characterFolderRef.current = handle;
    setHasCharacterFolder(true);
    return handle;
  };

  const handleChooseCharacterFolder = async () => {
    await ensureCharacterFolder();
  };

  const handleSaveSession = async () => {
    await saveJsonToFile(makeSessionSnapshot(state), {
      suggestedName: `${state.sessionName.replace(/[^a-z0-9-_]+/gi, "_") || "dm-session"}.json`,
      types: [{ description: "D&D DM Helper Session", accept: { "application/json": [".json"] } }]
    });
  };

  const handleLoadSession = async () => {
    const snapshot = await openJsonFile<SessionSnapshot>({
      types: [{ description: "D&D DM Helper Session", accept: { "application/json": [".json"] } }]
    });

    if (snapshot?.state) {
      dispatch({ type: "session/replaceState", payload: snapshot.state });
    }
  };

  const handleSaveCharacter = async (draft: CharacterWizardDraft) => {
    const character = buildCharacterFromDraft(draft, state.locale);
    dispatch({ type: "characters/add", payload: { character } });
    dispatch({ type: "players/addFromCharacter", payload: { player: createPlayerFromCharacter(character) } });

    const folder = await ensureCharacterFolder();
    const charactersDirectory = await folder.getDirectoryHandle("characters", { create: true });
    const safeName = character.name.trim().replace(/[^a-z0-9-_]+/gi, "_") || character.id;
    const fileHandle = await charactersDirectory.getFileHandle(`${safeName}.json`, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(makeCharacterSnapshot(character), null, 2));
    await writable.close();

    return `${folder.name}/characters/${safeName}.json`;
  };

  const handleUpdatePlayer = (id: string, patch: Partial<Player>) => {
    const linkedPlayer = state.players.find((player) => player.id === id);
    dispatch({ type: "players/update", payload: { id, patch } });

    if (linkedPlayer?.characterId) {
      const characterPatch: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (key === "name" || key === "hpCurrent" || key === "hpMax" || key === "notes" || key === "armorClass" || key === "primaryWeapon" || key === "secondaryWeapon" || key === "inventoryNotes" || key === "armorSlot" || key === "hasShield") {
          characterPatch[key] = value;
        }
      }
      if (Object.keys(characterPatch).length > 0) {
        dispatch({ type: "characters/update", payload: { characterId: linkedPlayer.characterId, patch: characterPatch as never } });
      }
    }
  };

  const handleLevelUpPlayer = (playerId: string) => {
    const player = state.players.find((entry) => entry.id === playerId);
    const linkedCharacter = state.characters.find((entry) => entry.id === player?.characterId);

    if (!player || !linkedCharacter) {
      return;
    }

    const result = levelUpCharacter(linkedCharacter, state.locale);
    dispatch({ type: "characters/update", payload: { characterId: linkedCharacter.id, patch: result.character } });
    dispatch({
      type: "players/update",
      payload: {
        id: player.id,
        patch: {
          name: result.character.name,
          armorClass: result.character.armorClass,
          hpCurrent: result.character.hpCurrent,
          hpMax: result.character.hpMax,
          primaryWeapon: result.character.primaryWeapon,
          secondaryWeapon: result.character.secondaryWeapon,
          armorSlot: result.character.armorSlot,
          hasShield: result.character.hasShield,
          inventoryNotes: result.character.inventoryNotes,
          notes: result.character.notes
        }
      }
    });
  };

  return (
    <div className="app-shell">
      <TopBar
        locale={state.locale}
        uiText={uiText}
        sessionName={state.sessionName}
        onLocaleChange={(value) =>
          dispatch({ type: "session/setLocale", payload: value })
        }
        onSessionNameChange={(value) =>
          dispatch({ type: "session/setName", payload: value })
        }
        onResetRound={() => dispatch({ type: "combat/resetRound" })}
        onSaveSession={handleSaveSession}
        onLoadSession={handleLoadSession}
      />

      <main className="desktop-grid">
        <section className="panel-column panel-column-left">
          <PlayersPanel
            uiText={uiText}
            locale={state.locale}
            players={state.players}
            characters={state.characters}
            onUpdatePlayer={handleUpdatePlayer}
            onLevelUpPlayer={handleLevelUpPlayer}
          />

          <CharactersPanel
            uiText={uiText}
            locale={state.locale}
            characters={state.characters}
            hasCharacterFolder={hasCharacterFolder}
            onChooseCharacterFolder={handleChooseCharacterFolder}
            onSaveCharacter={handleSaveCharacter}
            onRemoveCharacter={(characterId) => dispatch({ type: "characters/remove", payload: { characterId } })}
          />
        </section>

        <section className="panel-column panel-column-center">
          <CombatBoard
            uiText={uiText}
            round={state.round}
            turnIndex={state.turnIndex}
            order={initiativeOrder}
            onNextTurn={() => dispatch({ type: "combat/nextTurn", payload: initiativeOrder.length })}
            onPrevTurn={() => dispatch({ type: "combat/prevTurn", payload: initiativeOrder.length })}
            onEndRound={() => dispatch({ type: "combat/endRound" })}
          />
          <QuickRulesPanel uiText={uiText} />
        </section>

        <section className="panel-column panel-column-right">
          <EnemiesPanel
            uiText={uiText}
            enemies={state.enemies}
            onAddEnemy={(name) =>
              dispatch({ type: "enemies/add", payload: { name } })
            }
            onUpdateEnemy={(id, patch) =>
              dispatch({ type: "enemies/update", payload: { id, patch } })
            }
          />
          <SoundboardPanel uiText={uiText} />
        </section>
      </main>
    </div>
  );
}