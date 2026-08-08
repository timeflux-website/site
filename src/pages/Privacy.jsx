import PageHero from '../components/PageHero.jsx';

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="A clear approach to your information.">
        A concise explanation of how information may be handled when you visit
        this website or contact TIMEFLUX.
      </PageHero>

      <section className="section">
        <div className="section-inner narrow privacy-content">
          <p>
            TIMEFLUX LIMITED does not use analytics, advertising trackers,
            contact forms, or non-essential cookies on this website.
          </p>
          <p>
            If you email us, we will use the information you provide to respond
            to your enquiry, discuss TIMEFLUX, and manage any resulting business
            relationship. We retain correspondence only for as long as
            reasonably necessary and do not sell your information or use it for
            unrelated marketing.
          </p>
          <p>
            This website is hosted by GitHub Pages, which may process basic
            technical information for security purposes.
          </p>
          <p>
            You may contact us to ask about, correct, or request deletion of
            information you have provided. You may also raise a privacy concern
            with the Information Commissioner&apos;s Office.
          </p>

          <div className="privacy-contact">
            <h2>Contact</h2>
            <p>
              <strong>TIMEFLUX LIMITED</strong>
              <br />
              Lytchett House, 13 Freeland Park, Wareham Road
              <br />
              Poole, Dorset, BH16 6FA
            </p>
            <a className="text-link" href="mailto:hello@timeflux.co.uk">
              hello@timeflux.co.uk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Privacy;

