import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navLinks } from '../App.jsx';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="TIMEFLUX home">
          <img src="/logo.png" alt="" className="brand-logo" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
