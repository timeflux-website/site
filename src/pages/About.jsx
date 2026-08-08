import PageHero from '../components/PageHero.jsx';

const principles = [
  {
    title: 'Connected by design',
    text: 'Cases, tasks, time, fees, invoices, and reports remain part of the same operational workflow.',
  },
  {
    title: 'Configured around the firm',
    text: 'Case types, statuses, tags, tasks, fees, contacts, and follow-up rules can reflect the way a firm works.',
  },
  {
    title: 'Relevant access by role',
    text: 'Role-based access supports fee earners, paralegals, firm administrators, billing users, and client portal users.',
  },
];

const audiences = [
  'Lawyers and fee earners managing cases, tasks, and time records.',
  'Paralegals supporting assigned case work.',
  'Firm administrators overseeing reporting, audit, and configuration.',
  'Billing users managing rates, fees, VAT, currencies, and invoices.',
  'Client portal users working within a limited, client-specific view.',
];

function About() {
  return (
    <>
      <PageHero eyebrow="About TIMEFLUX" title="Built around how legal work is managed.">
        TIMEFLUX connects the operational records behind legal delivery, from
        cases and tasks to time, billing, planning, and reporting.
      </PageHero>

      <section className="section">
        <div className="section-inner split content-split">
          <div>
            <p className="eyebrow">Product focus</p>
            <h2>A practical workspace for legal operations.</h2>
          </div>
          <p>
            Legal work depends on information moving cleanly between people and
            processes. TIMEFLUX keeps the core records of that work together so
            teams can manage activity, billing, and oversight in context.
          </p>
        </div>
      </section>

      <section className="section subtle-section">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Product principles</p>
            <h2>Clear structure for connected legal work.</h2>
          </div>
          <div className="card-grid three">
            {principles.map((principle) => (
              <article className="feature-card" key={principle.title}>
                <h2>{principle.title}</h2>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner split content-split">
          <div>
            <p className="eyebrow">Who it supports</p>
            <h2>Supporting the roles involved in legal delivery.</h2>
          </div>
          <ul className="outcome-list">
            {audiences.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default About;
