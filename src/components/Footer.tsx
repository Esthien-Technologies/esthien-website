import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { navItems, site } from "../data/site";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand" data-reveal>
          <BrandMark />
          <div>
            <strong>{site.name}</strong>
            <p>FPGA-based intelligence chipsets for medical and automotive systems.</p>
          </div>
        </div>

        <div className="footer-column" data-reveal>
          <span>Navigation</span>
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-column" data-reveal>
          <span>Contact</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>Partnerships, collaborations, and technical inquiries.</p>
        </div>

        <div className="footer-column" data-reveal>
          <span>Social</span>
          {site.socialLinks.length > 0 ? (
            site.socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
                <ArrowUpRight size={14} />
              </a>
            ))
          ) : (
            <p>Official channels reserved for launch.</p>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>{site.domain}</span>
      </div>
    </footer>
  );
}
