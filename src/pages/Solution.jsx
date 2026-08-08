import PageHero from '../components/PageHero.jsx';

const solutionAreas = [
  {
    title: 'Case management',
    text: 'Maintain case details, clients, contacts, responsible users, statuses, jurisdictions, tags, notes, and document links in a consistent record.',
    meta: 'Create, search, update, import, and report on cases.',
  },
  {
    title: 'Time tracking and work logging',
    text: 'Record time against cases using timers or manual units, with narratives, notes, dates, and invoiced status retained alongside the entry.',
    meta: 'Capture work in the way that best fits the moment.',
  },
  {
    title: 'Billing, fees, and invoicing',
    text: 'Manage hourly and client-specific rates, fixed fees, currencies, VAT, invoice PDFs, credit notes, payments, and bulk invoicing.',
    meta: 'Carry recorded work and fees through to invoicing.',
  },
  {
    title: 'Tasks, planning, and workflow',
    text: 'Coordinate assignments, statuses, due dates, completion dates, notes, planner order, and configurable follow-up rules.',
    meta: 'Use personal and team views to see what needs attention.',
  },
  {
    title: 'Reporting, dashboard, and audit',
    text: 'Review cases, time, tasks, fees, and invoices through dashboards, search, filters, exports, billing views, task forecasts, and audit access.',
    meta: 'Use operational records to support oversight and reporting.',
  },
  {
    title: 'Assistant and connected access',
    text: 'Use guided assistant actions for search, help, task creation, and time recording, alongside SSO, API access, and CSV/XML data exchange.',
    meta: 'Extend access to data and common actions where appropriate.',
  },
];

function Solution() {
  return (
    <>
      <PageHero eyebrow="Solution" title="The tools behind a connected legal workflow.">
        TIMEFLUX brings case management, work planning, time recording,
        billing, and operational reporting together without separating them
        into disconnected processes.
      </PageHero>
      <section className="section">
        <div className="section-inner solution-list">
          {solutionAreas.map((area, index) => (
            <article className="solution-row" key={area.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{area.title}</h2>
                <p>{area.text}</p>
                <strong>{area.meta}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Solution;
