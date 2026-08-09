import { Link } from 'react-router-dom';
import HeroWorkflow from '../components/HeroWorkflow.jsx';

const capabilities = [
  {
    title: 'Capture work as it happens',
    text: 'Record time against cases using timers or manual entries, with clear narratives and supporting notes.',
  },
  {
    title: 'Keep case work coordinated',
    text: 'Bring case details, clients, tasks, responsibilities, deadlines, and follow-up workflows into one place.',
  },
  {
    title: 'Move from work to billing',
    text: 'Connect recorded time and fees with rates, invoice generation, credit notes, payments, and bulk invoicing.',
  },
  {
    title: 'See the operational picture',
    text: 'Review dashboards and reports across cases, time, tasks, fees, and invoices, with filters and data exports.',
  },
  {
    title: 'Connect and extend',
    text: 'Support data imports and exports, API access, SSO, and an artificial intelligence assistant for guided actions within the legal workflow.',
  },
];

const outcomes = [
  'Keep case, client, task, time, fee, and invoice records connected.',
  'See upcoming work across personal and team planning views.',
  'Turn recorded time and fees into individual or bulk invoices.',
  'Configure case, task, fee, and contact workflows around the firm.',
  'Search, filter, and export operational data when it is needed.',
];

function Home() {
  return (
    <>
      <section className="hero section">
        <div className="section-inner hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Legal operations, connected</p>
            <h1>Manage legal work from case to invoice.</h1>
            <p>
              TIMEFLUX brings cases, clients, tasks, time recording, fees,
              invoicing, planning, and reporting into one focused workspace.
            </p>
            <div className="button-row">
              <Link className="button primary" to="/contact">
                Contact TIMEFLUX
              </Link>
              <Link className="button secondary" to="/solution">
                Explore Solution
              </Link>
            </div>
          </div>

          <HeroWorkflow />
        </div>
      </section>

      <section className="section capabilities-section">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Core capabilities</p>
            <h2>One workflow for the work behind legal delivery.</h2>
          </div>
          <div className="card-grid">
            {capabilities.map((capability) => (
              <article className="feature-card" key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section outcome-band">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Operational outcomes</p>
            <h2>Keep the work connected from first task to final invoice.</h2>
          </div>
          <ul className="outcome-list">
            {outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section final-cta">
        <div className="section-inner narrow">
          <p className="eyebrow">Start the conversation</p>
          <h2>See whether TIMEFLUX fits the way your firm works.</h2>
          <Link className="button primary" to="/contact">
            Contact TIMEFLUX
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
