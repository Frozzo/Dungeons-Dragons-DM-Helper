import { CONDITION_KEYS } from "../../data/conditions";
import type { UiText } from "../../i18n/uiText";

interface QuickRulesPanelProps {
  uiText: UiText;
}

export function QuickRulesPanel({ uiText }: QuickRulesPanelProps) {
  return (
    <div className="panel quick-rules-panel">
      <div className="panel-header">
        <h2>{uiText.quickRules.title}</h2>
      </div>

      <div className="rule-grid">
        {uiText.quickRules.rules.map((rule) => (
          <article key={rule.title} className="card rule-card">
            <h3>{rule.title}</h3>
            <p>{rule.text}</p>
          </article>
        ))}
      </div>

      <div className="conditions-wrap">
        <h3>{uiText.quickRules.conditionsTitle}</h3>
        <div className="tag-wrap">
          {CONDITION_KEYS.map((conditionKey) => (
            <span key={conditionKey} className="tag tag-neutral">
              {uiText.conditions[conditionKey]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}