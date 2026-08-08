import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageSeo, siteName, siteUrl } from '../src/seo.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(projectRoot, 'dist');
const blogDirectory = path.join(projectRoot, 'blog');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, body: normalized.trim() };
  }

  const data = Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => {
        const separator = line.indexOf(':');
        if (separator === -1) return null;
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim().replace(/^["']|["']$/g, ''),
        ];
      })
      .filter(Boolean),
  );

  return { data, body: normalized.slice(match[0].length).trim() };
}

function firstParagraph(markdown) {
  return (
    markdown
      .split(/\n\s*\n/)
      .find((block) => !block.trim().startsWith('#') && block.trim().length > 0)
      ?.replace(/\s+/g, ' ')
      .trim() || ''
  );
}

function truncate(text, maxLength = 160) {
  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength - 3).trimEnd();
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : shortened.length)}...`;
}

function createSeoMarkup({ title, description, url, type = 'website', date, schemaTitle }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeUrl = escapeHtml(url);
  const imageUrl = `${siteUrl}/og.png`;
  const structuredData = type === 'article'
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: schemaTitle || title,
        description,
        datePublished: date || undefined,
        mainEntityOfPage: url,
        image: imageUrl,
        author: { '@type': 'Organization', name: siteName, url: siteUrl },
        publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
      }
    : url === siteUrl
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
        description,
        url,
      };

  return `<!-- SEO_START -->
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${safeUrl}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:alt" content="TIMEFLUX - Manage legal work from case to invoice." />
    ${date ? `<meta property="article:published_time" content="${escapeHtml(date)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <script id="timeflux-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>
    <!-- SEO_END -->`;
}

function renderHtml(template, metadata) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    )
    .replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, createSeoMarkup(metadata));
}

async function writeRoute(template, route, metadata) {
  const directory = route === '/' ? distDirectory : path.join(distDirectory, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), renderHtml(template, metadata));
}

const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const blogFiles = (await readdir(blogDirectory)).filter((file) => file.endsWith('.md'));
const blogPosts = await Promise.all(
  blogFiles.map(async (file) => {
    const markdown = await readFile(path.join(blogDirectory, file), 'utf8');
    const { data, body } = parseFrontmatter(markdown);
    const filenameDate = file.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1] || '';
    const slug = data.slug || file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return {
      slug,
      title: data.title || slug.replaceAll('-', ' '),
      date: data.date || filenameDate,
      description: truncate(data.description || firstParagraph(body)),
    };
  }),
);

for (const [route, metadata] of Object.entries(pageSeo)) {
  await writeRoute(template, route, {
    ...metadata,
    url: `${siteUrl}${route === '/' ? '' : route}`,
  });
}

for (const post of blogPosts) {
  const route = `/blog/${post.slug}`;
  await writeRoute(template, route, {
    title: `${post.title} | TIMEFLUX`,
    description: post.description,
    url: `${siteUrl}${route}`,
    type: 'article',
    date: post.date,
    schemaTitle: post.title,
  });
}

const sitemapRoutes = [
  ...Object.keys(pageSeo),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map((route) => {
    const post = blogPosts.find((item) => route === `/blog/${item.slug}`);
    return `  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>${post?.date ? `
    <lastmod>${post.date}</lastmod>` : ''}
  </url>`;
  })
  .join('\n')}
</urlset>
`;
await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap);

const notFoundMetadata = {
  title: 'Page not found | TIMEFLUX',
  description: 'The requested TIMEFLUX page could not be found.',
  url: siteUrl,
};
const notFoundHtml = renderHtml(template, notFoundMetadata).replace(
  '<meta name="robots" content="index, follow" />',
  '<meta name="robots" content="noindex, follow" />',
);
await writeFile(path.join(distDirectory, '404.html'), notFoundHtml);

const outputStats = await stat(path.join(distDirectory, 'sitemap.xml'));
console.log(`Generated ${sitemapRoutes.length} route pages and sitemap.xml (${outputStats.size} bytes).`);
