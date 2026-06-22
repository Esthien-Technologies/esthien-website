import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { doctrine, identitySignals, principles, projectDetails, site } from "../data/site";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An institution for custom intelligence hardware."
        body="ESTHIEN LABS is being built around FPGA-based chipsets, custom silicon paths, edge AI, control systems, and the discipline required to make medical and automotive systems act with trust."
      />

      <section className="section">
        <div className="section-inner split-layout">
          <SectionHeading
            eyebrow="Position"
            title="The company is broader than its first chipset program."
            body="The name was chosen to hold a broader idea: perception, intellect, and physical response brought into one durable semiconductor identity."
          />
          <div className="copy-stack" data-reveal>
            <p>
              ESTHIEN LABS is focused on the systems layer where intelligence
              becomes physical: FPGA logic, sensor pipelines, embedded computation,
              real-time decision loops, hardware architecture, and the control logic
              that makes medical and automotive systems respond precisely.
            </p>
            <p>
              Esthien Labs is a coined institutional name shaped by the ideas of perception and
              intellect. It stays abstract on purpose, so the institution can
              grow across physical AI, embedded intelligence, medical systems,
              vehicle sensing, mobility, safety, and semiconductor work without being
              trapped by the first product category.
            </p>
            <p>
              The public website stays restrained because the company should
              earn complexity. It gives partners, investors, collaborators, and
              customers a clear point of contact without overstating products,
              traction, or scope.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Company Detail"
            title="A staged path from FPGA concepts to fabricated chipsets."
            body="The archive frames Esthien Labs as a company that can begin with reconfigurable hardware and grow toward specialized medical, automotive, embedded AI, and semiconductor programs."
          />
          <div className="detail-grid">
            {projectDetails.map((item) => {
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
        <div className="section-inner">
          <SectionHeading
            eyebrow="Operating Principles"
            title="A restrained foundation that can stand for years."
          />
          <div className="principle-grid">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article className="principle-card" key={item.title} data-reveal>
                  <Icon size={23} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner split-layout">
          <SectionHeading
            eyebrow="Identity"
            title="The name carries the institution, not a single product."
            body="The identity points to perception, intellect, controlled flow, and layered systems while staying broad enough for the company to grow."
          />
          <div className="identity-list">
            {identitySignals.map((item) => {
              const Icon = item.icon;
              return (
                <article className="identity-row" key={item.title} data-reveal>
                  <Icon size={20} />
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

      <section className="section section-muted">
        <div className="section-inner doctrine-layout">
          <SectionHeading
            eyebrow="Archive Signal"
            title="The internal logic is human, not decorative."
            body="The founding documents repeat one idea in different forms: intelligence only matters when it becomes reliable capability in the physical world."
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

      <section className="section">
        <div className="section-inner compact-statement" data-reveal>
          <span>{site.thesis}</span>
          <p>{site.supporting}</p>
        </div>
      </section>
    </>
  );
}
