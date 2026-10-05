// Post-build step: turns dist/public/index.html into real per-route static HTML
// (so crawlers that don't run JS get the right title / description / Open Graph
// tags) plus 404.html, sitemap.xml and robots.txt. Single source of truth:
// src/seo.json. Fails the build loudly if a template tag is missing.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist', 'public');
const seo = JSON.parse(readFileSync(join(process.cwd(), 'src', 'seo.json'), 'utf8'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pageUrl = (path) => (path === '/' ? `${seo.url}/` : `${seo.url}${path}`);

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: template tag not found: ${label}`);
  return html.replace(pattern, replacement);
}

function render({ title, description, url, robots }) {
  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, 'title');
  html = replaceTag(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${esc(description)}" />`,
    'description',
  );
  html = replaceTag(html, /<meta\s+name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`, 'robots');
  html = replaceTag(
    html,
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(title)}" />`,
    'og:title',
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(description)}" />`,
    'og:description',
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    'twitter:title',
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    'twitter:description',
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"[^>]*>/,
    `<meta property="og:image" content="${seo.url}${seo.image}" />`,
    'og:image',
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"[^>]*>/,
    `<meta name="twitter:image" content="${seo.url}${seo.image}" />`,
    'twitter:image',
  );
  if (url) {
    html = replaceTag(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`, 'canonical');
    html = replaceTag(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  } else {
    // Error pages must not advertise a canonical URL.
    html = replaceTag(html, /\s*<link\s+rel="canonical"[^>]*>/, '', 'canonical');
    html = replaceTag(html, /\s*<meta\s+property="og:url"[^>]*>/, '', 'og:url');
  }
  return html;
}

const routes = Object.entries(seo.pages);
for (const [path, page] of routes) {
  const html = render({ ...page, url: pageUrl(path), robots: 'index, follow' });
  // Vercel `cleanUrls` serves /about from about.html.
  writeFileSync(join(dist, path === '/' ? 'index.html' : `${path.slice(1)}.html`), html);
}
writeFileSync(join(dist, '404.html'), render({ ...seo.notFound, url: null, robots: 'noindex' }));

const today = new Date().toISOString().slice(0, 10);
const urls = routes.map(([path]) => `  <url><loc>${pageUrl(path)}</loc><lastmod>${today}</lastmod></url>`).join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${seo.url}/sitemap.xml\n`);

console.log(`prerender: wrote ${routes.length} pages, 404.html, sitemap.xml, robots.txt`);
