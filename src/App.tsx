import { useMemo, useReducer } from "react";
import { TopBar } from "./components/layout/TopBar";
import { PlayersPanel } from "./components/players/PlayersPanel";
import { CombatBoard } from "./components/combat/CombatBoard";
import { EnemiesPanel } from "./components/enemies/EnemiesPanel";
import { QuickRulesPanel } from "./components/rules/QuickRulesPanel";
import { SoundboardPanel } from "./components/soundboard/SoundboardPanel";
import { appReducer, initialState } from "./state/appStore";
import { sortInitiative } from "./logic/initiative";

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const initiativeOrder = useMemo(
    () => sortInitiative(state.players, state.enemies),
    [state.players, state.enemies]
  );

  return (
    <div className="app-shell">
      <TopBar
        sessionName={state.sessionName}
        onSessionNameChange={(value) =>
          dispatch({ type: "session/setName", payload: value })
        }
        onResetRound={() => dispatch({ type: "combat/resetRound" })}
      />

      <main className="desktop-grid">
        <section className="panel-column panel-column-left">
          <PlayersPanel
            players={state.players}
            onAddPlayer={(name) =>
              dispatch({ type: "players/add", payload: { name } })
            }
            onUpdatePlayer={(id, patch) =>
              dispatch({ type: "players/update", payload: { id, patch } })
            }
          />
        </section>

        <section className="panel-column panel-column-center">
          <CombatBoard
            round={state.round}
            turnIndex={state.turnIndex}
            order={initiativeOrder}
            onNextTurn={() => dispatch({ type: "combat/nextTurn", payload: initiativeOrder.length })}
            onPrevTurn={() => dispatch({ type: "combat/prevTurn", payload: initiativeOrder.length })}
            onEndRound={() => dispatch({ type: "combat/endRound" })}
          />
          <QuickRulesPanel />
        </section>

        <section className="panel-column panel-column-right">
          <EnemiesPanel
            enemies={state.enemies}
            onAddEnemy={(name) =>
              dispatch({ type: "enemies/add", payload: { name } })
            }
            onUpdateEnemy={(id, patch) =>
              dispatch({ type: "enemies/update", payload: { id, patch } })
            }
          />
          <SoundboardPanel />
        </section>
      </main>
    </div>
  );
}