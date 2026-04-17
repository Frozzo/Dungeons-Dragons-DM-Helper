import { QUICK_RULES } from "../../data/quickRules";
import { CONDITIONS } from "../../data/conditions";

export function QuickRulesPanel() {
  return (
    <div className="panel quick-rules-panel">
      <div className="panel-header">
        <h2>Quick Rules</h2>
      </div>

      <div className="rule-grid">
        {QUICK_RULES.map((rule) => (
          <article key={rule.title} className="card rule-card">
            <h3>{rule.title}</h3>
            <p>{rule.text}</p>
          </article>
        ))}
      </div>

      <div className="conditions-wrap">
        <h3>Conditions</h3>
        <div className="tag-wrap">
          {CONDITIONS.map((condition) => (
            <span key={condition} className="tag tag-neutral">
              {condition}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}