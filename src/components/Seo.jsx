import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getBlogPost } from '../blogPosts.js';
import { pageSeo, siteName, siteUrl } from '../seo.js';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function removeMeta(attribute, key) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

function truncateDescription(text, maxLength = 160) {
  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength - 3).trimEnd();
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : shortened.length)}...`;
}

function Seo() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
    const blogSlug = normalizedPath.match(/^\/blog\/([^/]+)$/)?.[1];
    const post = blogSlug ? getBlogPost(decodeURIComponent(blogSlug)) : null;
    const fallback = {
      title: 'Page not found | TIMEFLUX',
      description: 'The requested TIMEFLUX page could not be found.',
    };
    const metadata = post
      ? {
          title: `${post.title} | TIMEFLUX`,
          description: truncateDescription(post.excerpt),
        }
      : pageSeo[normalizedPath] || fallback;
    const pageNumber = normalizedPath === '/blog' ? Number(new URLSearchParams(search).get('page')) : 0;
    const title = pageNumber > 1 ? `TIMEFLUX Blog - Page ${pageNumber}` : metadata.title;
    const canonicalPath = normalizedPath === '/' ? '' : normalizedPath;
    const canonicalUrl = `${siteUrl}${canonicalPath}${pageNumber > 1 ? `?page=${pageNumber}` : ''}`;
    const imageUrl = `${siteUrl}/og.png`;

    document.title = title;
    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', pageSeo[normalizedPath] || post ? 'index, follow' : 'noindex, follow');
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:type', post ? 'article' : 'website');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:alt', 'TIMEFLUX - Manage legal work from case to invoice.');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', metadata.description);
    setMeta('name', 'twitter:image', imageUrl);

    if (post?.date) {
      setMeta('property', 'article:published_time', post.date);
    } else {
      removeMeta('property', 'article:published_time');
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const structuredData = post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: metadata.description,
          datePublished: post.date || undefined,
          mainEntityOfPage: canonicalUrl,
          image: imageUrl,
          author: { '@type': 'Organization', name: siteName, url: siteUrl },
          publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
        }
      : normalizedPath === '/'
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              url: siteUrl,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TIMEFLUX LIMITED',
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              email: 'hello@timeflux.co.uk',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Lytchett House, 13 Freeland Park, Wareham Road',
                addressLocality: 'Poole',
                addressRegion: 'Dorset',
                postalCode: 'BH16 6FA',
                addressCountry: 'GB',
              },
            },
          ]
        : {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description: metadata.description,
            url: canonicalUrl,
          };

    let jsonLd = document.getElementById('timeflux-structured-data');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'timeflux-structured-data';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
  }, [pathname, search]);

  return null;
}

export default Seo;
