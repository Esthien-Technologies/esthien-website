import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ContactPanel from "../components/ContactPanel";
import IntelligenceField from "../components/IntelligenceField";
import ProjectFocus from "../components/ProjectFocus";
import SectionHeading from "../components/SectionHeading";
import SignalDiagram from "../components/SignalDiagram";
import {
  capabilities,
  chipsetReasons,
  doctrine,
  futureLanes,
  heroMetrics,
  identitySignals,
  site,
  thesisChain,
} from "../data/site";

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <IntelligenceField />
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="section-inner hero-inner">
          <div className="hero-copy">
            <span className="eyebrow" data-reveal>
              Esthien Labs / Physical Intelligence
            </span>
            <h1 data-reveal>{site.shortName}</h1>
            <p className="hero-thesis" data-reveal>
              {site.thesis}
            </p>
            <p className="hero-supporting" data-reveal>
              {site.supporting}
            </p>
            <div className="hero-actions" data-reveal>
              <Link className="primary-button" to="/capabilities">
                Capabilities
                <ArrowRight size={18} />
              </Link>
              <a className="secondary-button" href={`mailto:${site.email}`}>
                <Mail size={18} />
                {site.email}
              </a>
            </div>
          </div>
          <div className="hero-figure" data-reveal data-parallax>
            <span className="figure-corner figure-corner--tl" />
            <span className="figure-corner figure-corner--tr" />
            <span className="figure-corner figure-corner--bl" />
            <span className="figure-corner figure-corner--br" />
            <span className="figure-label figure-label--top">Fig. 01 / Routing fabric</span>
            <span className="figure-label figure-label--bottom">432 nodes / sense to act</span>
          </div>
        </div>
        <div className="hero-metrics" data-reveal>
          {heroMetrics.map((metric) => (
            <div className="hero-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-inner split-layout">
          <SectionHeading
            eyebrow="Company"
            title="Chipsets for intelligence that has to touch the world."
            body="ESTHIEN LABS is a deep-tech company focused on FPGA-based chipset architectures, deterministic control, and edge intelligence for medical and automotive physical systems."
          />
          <div className="statement-panel" data-reveal>
            <p>
              Intelligence becomes meaningful when it can sense the world,
              decide under constraint, and act without losing time between
              signal, silicon, and motion.
            </p>
            <div data-rail className="horizontal-rail" />
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner split-layout split-layout--wide">
          <SectionHeading
            eyebrow="Project"
            title="A focused chipset company with two physical-world lanes."
            body="The archive points to a clear technical center: start with FPGA concepts, build the nervous system of machines, and apply it first where timing, safety, and human capability matter."
          />
          <ProjectFocus />
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Thesis"
            title="Understand. Decide. Act."
            body="This chain is the spine of the company: perception is not enough, reasoning is not enough, and motion without intelligence is not enough."
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
        <div className="section-inner">
          <SectionHeading
            eyebrow="Core Areas"
            title="The stack is the product."
            body="The technical center is specific: FPGA fabric, edge inference, sensor fusion, safety control, and hardware architecture that can live inside medical and vehicle systems."
          />
          <div className="capability-grid">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article className="capability-card" key={item.title} data-reveal>
                  <div className="capability-card-top">
                    <Icon size={22} />
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

      <section className="section">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Why Chipsets"
            title="Physical intelligence needs hardware close to the signal."
            body="Cloud AI can be powerful, but bionic arms, radar stacks, and safety controllers need bounded response on the device itself."
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
        <div className="section-inner doctrine-layout">
          <SectionHeading
            eyebrow="Doctrine"
            title="Aspirational, but not theatrical."
            body="The archive is clear about the tone: build toward a long-lived institution, speak precisely, and let the technology earn the story."
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
        <div className="section-inner split-layout split-layout--wide">
          <SectionHeading
            eyebrow="Architecture"
            title="Layered systems, not isolated demos."
            body="The identity is built around strata: sensing, inference, control, hardware, and integration moving as one system."
          />
          <SignalDiagram />
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Identity"
            title="A visual system shaped by conduit, strata, and restraint."
            body="The public identity keeps the technical logic visible through controlled channels, layered structure, and disciplined typography."
          />
          <div className="identity-grid">
            {identitySignals.map((item) => {
              const Icon = item.icon;
              return (
                <article className="identity-card" key={item.title} data-reveal>
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
        <div className="section-inner future-band" data-reveal>
          <div>
            <span className="eyebrow">Future Room</span>
            <h2>Built to expand without changing the center.</h2>
            <p>
              ESTHIEN LABS can grow into specialized programs while the public brand
              remains simple: intelligence for physical systems, measured by
              human capability and real-world reliability.
            </p>
          </div>
          <ul>
            {futureLanes.map((lane) => (
              <li key={lane}>{lane}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="section-inner">
        <ContactPanel />
      </div>
    </>
  );
}
