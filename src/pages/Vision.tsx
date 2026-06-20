import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { futureLanes, thesisChain } from "../data/site";

const philosophy = [
  "The next class of intelligent systems will be judged by how reliably they operate in the physical world, not by how impressive they appear in isolation.",
  "That requires more than models. It requires sensors, FPGA fabric, edge inference, timing, control, power, and failure behavior to move together.",
  "A machine earns trust when it responds on time. In physical systems, a late decision can become indistinguishable from a wrong one.",
  "Esthien Labs' first technical direction is chipset architecture for medical assistive systems and automotive sensing, where motion and safety depend on deterministic hardware.",
];

export default function Vision() {
  return (
    <>
      <PageHero
        eyebrow="Vision"
        title="Bringing intelligence into the hardware loop."
        body="The company vision is broad enough to last and specific enough to guide work: build FPGA-based intelligence that improves human capability and safety in the physical world."
      />

      <section className="section">
        <div className="section-inner vision-layout">
          <div className="vision-panel" data-reveal>
            <span>01</span>
            <h2>Embodied intelligence is a chipset problem too.</h2>
          </div>
          <div className="copy-stack">
            {philosophy.map((item) => (
              <p key={item} data-reveal>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Philosophy"
            title="Capability before spectacle."
            body="The work is framed around systems that can earn trust through technical clarity, real-world constraints, and durable engineering."
          />
          <div className="matrix-grid" data-reveal>
            <div>
              <span>Input</span>
              <strong>Physical signals</strong>
              <p>Radar, biosignals, context, machine state, environment.</p>
            </div>
            <div>
              <span>Reasoning</span>
              <strong>FPGA edge intelligence</strong>
              <p>Parallel logic and models shaped by latency, power, and reliability.</p>
            </div>
            <div>
              <span>Output</span>
              <strong>Controlled motion</strong>
              <p>Precise response through hardware, control loops, and fallback paths.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Chain"
            title="A simple loop that can carry decades of work."
            body="The founding thesis reduces cleanly to a loop. Everything else is engineering discipline."
          />
          <div className="thesis-chain">
            {thesisChain.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="thesis-step" key={item.label} data-reveal>
                  <div className="step-index">{String(index + 1).padStart(2, "0")}</div>
                  <Icon size={24} />
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner future-band" data-reveal>
          <div>
            <span className="eyebrow">Long Horizon</span>
            <h2>Future work can specialize. The center stays constant.</h2>
            <p>
              The identity is built to support multiple directions without
              losing the thesis: FPGA-based embodied intelligence that improves
              capability, safety, and physical agency.
            </p>
          </div>
          <ul>
            {futureLanes.map((lane) => (
              <li key={lane}>{lane}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
