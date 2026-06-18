import { ArrowRight, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function ContactPanel() {
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
    <section className="contact-band" data-reveal>
      <div>
        <span className="eyebrow">Contact</span>
        <h2>For partnerships, collaborations, and inquiries.</h2>
        <p>
          Use the direct company email for technical, strategic, investor,
          medical, automotive, and collaboration conversations.
        </p>
      </div>
      <div className="contact-actions">
        <a className="primary-button" href={`mailto:${site.email}`}>
          <Mail size={18} />
          {site.email}
        </a>
        <button className="secondary-button" type="button" onClick={copyEmail}>
          <Copy size={17} />
          {copied ? "Copied" : "Copy"}
        </button>
        <Link className="secondary-button" to="/contact">
          Contact page
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
