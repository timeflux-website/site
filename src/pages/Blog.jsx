import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts } from '../blogPosts.js';
import PageHero from '../components/PageHero.jsx';

const postsPerPage = 10;

function Blog() {
  const [searchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get('page') || 1);
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / postsPerPage));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (currentPage - 1) * postsPerPage;
  const posts = blogPosts.slice(start, start + postsPerPage);

  return (
    <>
      <PageHero eyebrow="Blog" title="Ideas on legal operations and modern legal work.">
        Practical perspectives on legal operations, time recording, billing
        workflows, firm efficiency, and the technology shaping modern legal
        teams.
      </PageHero>

      <section className="section">
        <div className="section-inner blog-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article className="blog-card blog-list-card" key={post.slug}>
                <div>
                  <p className="eyebrow">{post.date || 'TIMEFLUX insight'}</p>
                  <h2>{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
                <Link className="text-link" to={`/blog/${post.slug}`}>
                  Read more
                </Link>
              </article>
            ))
          ) : (
            <article className="blog-card">
              <h2>Articles coming soon</h2>
              <p>New TIMEFLUX perspectives will appear here as markdown posts are added.</p>
            </article>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Blog pagination">
              <Link
                className={`button secondary ${currentPage === 1 ? 'disabled' : ''}`}
                to={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
                aria-disabled={currentPage === 1}
              >
                Previous
              </Link>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Link
                className={`button secondary ${currentPage === totalPages ? 'disabled' : ''}`}
                to={`/blog?page=${currentPage + 1}`}
                aria-disabled={currentPage === totalPages}
              >
                Next
              </Link>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

export default Blog;
