import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This page could not be found.">
        The address may have changed, or the page may no longer be available.
      </PageHero>
      <section className="section final-cta">
        <div className="section-inner narrow">
          <Link className="button primary" to="/">
            Return Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;

