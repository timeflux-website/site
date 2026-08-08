import { Link, Navigate, useParams } from 'react-router-dom';
import { getBlogPost } from '../blogPosts.js';

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function renderMarkdown(markdown) {
  const blocks = markdown.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();

    if (trimmed.startsWith('## ')) {
      return <h2 key={index}>{renderInline(trimmed.slice(3))}</h2>;
    }

    if (trimmed.startsWith('# ')) {
      return <h2 key={index}>{renderInline(trimmed.slice(2))}</h2>;
    }

    if (/^[-•] /.test(trimmed)) {
      return (
        <ul key={index}>
          {trimmed.split('\n').map((item) => (
            <li key={item}>{renderInline(item.replace(/^[-•] /, ''))}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{renderInline(trimmed)}</p>;
  });
}

function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="section article-page">
      <div className="section-inner narrow">
        <Link className="text-link back-link" to="/blog">
          Back to Blog
        </Link>
        <p className="eyebrow">{post.date || 'TIMEFLUX insight'}</p>
        <h1>{post.title}</h1>
        <div className="article-body">{renderMarkdown(post.body)}</div>
      </div>
    </article>
  );
}

export default BlogPost;
