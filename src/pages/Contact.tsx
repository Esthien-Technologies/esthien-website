import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { useState } from "react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { contactRoutes, site } from "../data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a direct company email."
        body="For partnerships, collaborations, investors, customers, medical assistive systems, automotive sensing, and technical conversations, use the official ESTHIEN TECHNOLOGIES contact point."
      />

      <section className="section">
        <div className="section-inner contact-layout">
          <div className="contact-card" data-reveal>
            <span className="eyebrow">Email</span>
            <h2>{site.email}</h2>
            <p>
              Send concise context, the organization or project involved, and
              the best way to continue the conversation.
            </p>
            <div className="contact-actions">
              <a className="primary-button" href={`mailto:${site.email}`}>
                <Mail size={18} />
                Email ESTHIEN
              </a>
              <button className="secondary-button" type="button" onClick={copyEmail}>
                <Copy size={17} />
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
          </div>

          <div className="contact-route-list">
            {contactRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <article className="contact-route" key={route.label} data-reveal>
                  <Icon size={20} />
                  <div>
                    <h3>{route.label}</h3>
                    <p>{route.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Social Channels"
            title="Official social profiles stay minimal."
            body="Instagram is available for the public identity layer. Other channels can be activated later without changing the site structure."
          />
          <div className="social-reserve" data-reveal>
            {site.socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  <span>
                    <Icon size={16} />
                    {item.label}
                  </span>
                  <ArrowUpRight size={15} />
                </a>
              );
            })}
            {["LinkedIn", "X", "YouTube"].map((label) => (
              <div key={label}>
                <span>{label}</span>
                <ArrowUpRight size={15} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
