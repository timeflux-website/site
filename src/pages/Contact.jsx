import PageHero from '../components/PageHero.jsx';

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us about TIMEFLUX.">
        Ask a product question, discuss how TIMEFLUX could fit your firm, or
        arrange to see the platform before starting.
      </PageHero>
      <section className="section">
        <div className="section-inner contact-panel">
          <div>
            <p className="eyebrow">Email</p>
            <h2>Start with an email.</h2>
            <p>
              Email us with product questions, demo requests, pricing queries,
              or general enquiries.
            </p>
          </div>
          <a className="button primary" href="mailto:hello@timeflux.co.uk">
            hello@timeflux.co.uk
          </a>
        </div>
      </section>
    </>
  );
}

export default Contact;
