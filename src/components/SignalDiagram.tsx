import { systemLayers } from "../data/site";

export default function SignalDiagram() {
  return (
    <div className="signal-diagram" data-reveal>
      {systemLayers.map((layer, index) => {
        const Icon = layer.icon;
        return (
          <div className="signal-node" style={{ "--index": index } as React.CSSProperties} key={layer.label}>
            <div className="signal-icon">
              <Icon size={20} />
            </div>
            <div>
              <strong>{layer.label}</strong>
              <p>{layer.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
