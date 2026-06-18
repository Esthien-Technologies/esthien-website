import PageHero from "../components/PageHero";
import ProjectFocus from "../components/ProjectFocus";
import SectionHeading from "../components/SectionHeading";
import SignalDiagram from "../components/SignalDiagram";
import { capabilities, chipsetReasons, doctrine, securityPosture, systemLayers } from "../data/site";

export default function Capabilities() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="A technical stack for FPGA-based intelligence in motion."
        body="The company works across chipset architecture, embodied intelligence, control systems, embedded hardware, medical assistive systems, and automotive sensing without reducing the work to one narrow product label."
      />

      <section className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Focus Areas"
            title="Each capability matters because it touches the hardware loop."
            body="Sensing without control is observation. Control without perception is blind. Hardware without timing is only material. Esthien is organized around the loop."
          />
          <div className="capability-grid capability-grid--large">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article className="capability-card capability-card--large" key={item.title} data-reveal>
                  <div className="capability-card-top">
                    <Icon size={24} />
                    <span>{item.signal}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner split-layout split-layout--wide">
          <SectionHeading
            eyebrow="Use Cases"
            title="Medical and automotive are different markets with the same timing problem."
            body="Bionic arms, prosthetic support, radar, and ADAS all need fast local interpretation of real-world signals. FPGA concepts are the bridge between flexible research hardware and future specialized chipsets."
          />
          <ProjectFocus />
        </div>
      </section>

      <section className="section">
        <div className="section-inner split-layout split-layout--wide">
          <SectionHeading
            eyebrow="System Layers"
            title="From signal to actuation."
            body="This structure can expand into deeper pages, case notes, publications, and project briefs as the company earns more public detail."
          />
          <SignalDiagram />
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner split-layout">
          <SectionHeading
            eyebrow="System Contract"
            title="Physical intelligence needs constraints, not slogans."
            body="The useful questions are concrete: what is sensed, what is decided, how fast it moves, how failure behaves, and what hardware carries the loop."
          />
          <div className="layer-list">
            {systemLayers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <article className="layer-row" key={layer.label} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={22} />
                  <div>
                    <h3>{layer.label}</h3>
                    <p>{layer.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Chipset Requirement"
            title="Why this work belongs close to the sensors."
            body="The project uses FPGA concepts because the hardest physical systems are constrained by time, privacy, fault behavior, and parallel I/O."
          />
          <div className="reason-grid">
            {chipsetReasons.map((item) => {
              const Icon = item.icon;
              return (
                <article className="reason-card" key={item.title} data-reveal>
                  <Icon size={22} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Security"
            title="Trust is designed into both infrastructure and hardware paths."
            body="The public site is hardened for launch, and the technical roadmap treats authenticated inputs, fault isolation, and predictable failure behavior as first-class requirements."
          />
          <div className="detail-grid">
            {securityPosture.map((item) => {
              const Icon = item.icon;
              return (
                <article className="detail-card" key={item.title} data-reveal>
                  <Icon size={22} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner doctrine-layout">
          <SectionHeading
            eyebrow="Engineering Posture"
            title="The site leaves room for depth without pretending it already exists."
            body="Future technical writing can attach to this structure naturally: FPGA notes, control explainers, research memos, hardware logs, safety cases, and partner-facing briefs."
          />
          <div className="doctrine-list">
            {doctrine.map((item) => {
              const Icon = item.icon;
              return (
                <article className="doctrine-item" key={item.title} data-reveal>
                  <Icon size={22} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
