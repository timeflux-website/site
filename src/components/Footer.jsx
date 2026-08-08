import { Link } from 'react-router-dom';
import { navLinks } from '../App.jsx';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" to="/">
            <img src="/logo.png" alt="" />
          </Link>
          <p>
            Connected case work, time recording, billing, and reporting for
            legal teams.
          </p>
        </div>

        <div className="footer-column">
          <h2>Navigate</h2>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h2>Company</h2>
          <span>TIMEFLUX LIMITED</span>
          <span>Lytchett House, 13 Freeland Park, Wareham Road, Poole, Dorset, BH16 6FA</span>
          <a href="mailto:hello@timeflux.co.uk">hello@timeflux.co.uk</a>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright {new Date().getFullYear()} TIMEFLUX. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
