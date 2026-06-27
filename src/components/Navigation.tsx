import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { navItems, site } from "../data/site";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="nav-shell" data-open={isOpen}>
      <Link to="/" className="brand-lockup" aria-label={`${site.name} home`}>
        <BrandMark />
        <span>
          <strong>{site.shortName}</strong>
          <small>CUSTOM FPGA CHIPSETS</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.href} to={item.href}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <ThemeToggle />

      <a className="nav-contact" href={`mailto:${site.email}`}>
        Contact
      </a>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="mobile-nav-panel">
        {navItems.map((item) => (
          <NavLink key={item.href} to={item.href}>
            {item.label}
          </NavLink>
        ))}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </header>
  );
}
