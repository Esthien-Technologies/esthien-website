import { useMemo, useState } from "react";
import { useCases } from "../data/site";

export default function ProjectFocus() {
  const [activeKey, setActiveKey] = useState(useCases[0]?.key ?? "");
  const active = useMemo(
    () => useCases.find((item) => item.key === activeKey) ?? useCases[0],
    [activeKey],
  );

  if (!active) {
    return null;
  }

  const ActiveIcon = active.icon;

  return (
    <div className="focus-console" data-reveal>
      <div className="focus-tabs" role="tablist" aria-label="Project focus areas">
        {useCases.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active.key;

          return (
            <button
              className="focus-tab"
              data-active={isActive}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`focus-panel-${item.key}`}
              id={`focus-tab-${item.key}`}
              key={item.key}
              onClick={() => setActiveKey(item.key)}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <article
        className="focus-panel"
        role="tabpanel"
        id={`focus-panel-${active.key}`}
        aria-labelledby={`focus-tab-${active.key}`}
      >
        <div className="focus-panel-top">
          <span>
            <ActiveIcon size={20} />
          </span>
          <small>{active.label}</small>
        </div>
        <h3>{active.title}</h3>
        <p>{active.body}</p>
        <ul>
          {active.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
