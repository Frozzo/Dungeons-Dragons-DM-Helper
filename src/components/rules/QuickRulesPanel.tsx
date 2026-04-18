import { useState } from "react";
import type { ReactNode } from "react";
import { CONDITION_KEYS } from "../../data/conditions";
import type { UiText } from "../../i18n/uiText";

interface QuickRulesPanelProps {
  uiText: UiText;
}

export function QuickRulesPanel({ uiText }: QuickRulesPanelProps) {
  const [conditionsExpanded, setConditionsExpanded] = useState(false);

  const renderHighlightedText = (text: string, highlights: string[]) => {
    const parts: ReactNode[] = [text];

    [...highlights].sort((a, b) => b.length - a.length).forEach((phrase) => {
      const nextParts: ReactNode[] = [];
      const pattern = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g");

      parts.forEach((part) => {
        if (typeof part !== "string") {
          nextParts.push(part);
          return;
        }

        const segments = part.split(pattern);
        segments.forEach((segment, index) => {
          if (index % 2 === 1) {
            nextParts.push(<strong key={`${phrase}-${index}-${segment}`}>{segment}</strong>);
          } else if (segment) {
            nextParts.push(segment);
          }
        });
      });

      parts.splice(0, parts.length, ...nextParts);
    });

    return parts;
  };

  return (
    <div className="panel quick-rules-panel">
      <div className="panel-header">
        <h2>{uiText.quickRules.title}</h2>
      </div>

      <h3 className="section-title">{uiText.quickRules.coreRulesTitle}</h3>
      <div className="rule-grid">
        {uiText.quickRules.rules.map((rule) => (
          <article key={rule.title} className="card rule-card">
            <h3>{rule.title}</h3>
            <p>{renderHighlightedText(rule.text, rule.highlights)}</p>
          </article>
        ))}
      </div>

      <div className="conditions-wrap">
        <div className="section-header-row">
          <h3>{uiText.quickRules.conditionsTitle}</h3>
          <button
            className="btn btn-secondary btn-small"
            type="button"
            onClick={() => setConditionsExpanded((value) => !value)}
          >
            {conditionsExpanded ? uiText.quickRules.hideConditionDetails : uiText.quickRules.showConditionDetails}
          </button>
        </div>
        <div className="tag-wrap">
          {CONDITION_KEYS.map((conditionKey) => (
            <span key={conditionKey} className="tag tag-neutral">
              {uiText.conditions[conditionKey]}
            </span>
          ))}
        </div>

        {conditionsExpanded && (
          <div className="conditions-accordion">
            <h3>{uiText.quickRules.conditionDetailsTitle}</h3>
            <div className="condition-details-grid">
              {CONDITION_KEYS.map((conditionKey) => (
                <article key={`${conditionKey}-details`} className="card rule-card">
                  <h3>{uiText.conditions[conditionKey]}</h3>
                  <p>{uiText.quickRules.conditionDetails[conditionKey]}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}