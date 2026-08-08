import PageHero from '../components/PageHero.jsx';

const plans = [
  {
    label: 'Intro plan',
    title: 'Start with a 3-month introduction',
    price: '\u00a3300',
    note: 'per user for 3 months',
    text: 'Try TIMEFLUX for \u00a3300 per user, equivalent to \u00a3100 per month, with full access to the platform from day one.',
    points: ['Full platform access', '3-month introduction', 'No limited feature tier'],
  },
  {
    label: 'Annual plan',
    title: 'Continue with an annual licence',
    price: '\u00a31,100',
    note: 'per user annually',
    text: 'After the introductory period, continue with a 12-month licence at \u00a31,100 per user.',
    points: ['Annual licence', 'Full feature access', 'Simple per-user pricing'],
  },
  {
    label: 'Demo',
    title: 'See TIMEFLUX before you start',
    price: 'Demo',
    note: 'before starting',
    text: 'Explore TIMEFLUX in action before starting the intro plan.',
    points: ['See the workflow', 'Ask product questions', 'Understand fit first'],
  },
];

function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Straightforward per-user pricing.">
        Start with a three-month introduction, then move to an annual licence
        if TIMEFLUX is right for your firm. Both plans include full product
        access.
      </PageHero>

      <section className="section">
        <div className="section-inner pricing-grid">
          {plans.map((plan) => (
            <article className={`pricing-card ${plan.label === 'Annual plan' ? 'highlight' : ''}`} key={plan.title}>
              <p className="eyebrow">{plan.label}</p>
              <h2>{plan.title}</h2>
              <div className="price">{plan.price}</div>
              <p className="pricing-note">{plan.note}</p>
              <p>{plan.text}</p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section outcome-band">
        <div className="section-inner split">
          <div>
            <p className="eyebrow">Pricing approach</p>
            <h2>Start with three months. Continue when it fits.</h2>
          </div>
          <p>
            The introductory period is {'\u00a3300'} per user. An annual licence
            is {'\u00a31,100'} per user after that, with the option to see the
            product in a demo before starting.
          </p>
        </div>
      </section>
    </>
  );
}

export default Pricing;
