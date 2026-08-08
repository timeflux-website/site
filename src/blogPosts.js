const markdownFiles = import.meta.glob('../blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function filenameFromPath(path) {
  return path.split('/').pop();
}

function slugFromPath(path) {
  return filenameFromPath(path)
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function dateFromPath(path) {
  return filenameFromPath(path).match(/^(\d{4}-\d{2}-\d{2})-/)?.[1] || '';
}

function parseFrontmatter(markdown) {
  const normalizedMarkdown = markdown.replace(/\r\n/g, '\n');
  const match = normalizedMarkdown.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return { data: {}, body: normalizedMarkdown.trim() };
  }

  const data = match[1].split('\n').reduce((frontmatter, line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return frontmatter;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, '');

    return { ...frontmatter, [key]: value };
  }, {});

  return {
    data,
    body: normalizedMarkdown.slice(match[0].length).trim(),
  };
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

export const blogPosts = Object.entries(markdownFiles)
  .map(([path, markdown]) => {
    const { data, body } = parseFrontmatter(markdown);
    const slug = data.slug || slugFromPath(path);
    const date = data.date || dateFromPath(path);

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date,
      excerpt: data.description || firstParagraph(body),
      body,
    };
  })
  .sort((a, b) => {
    const dateCompare = new Date(b.date || 0) - new Date(a.date || 0);
    return dateCompare || a.title.localeCompare(b.title);
  });

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
