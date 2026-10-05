import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import seo from '@/seo.json';

const root = process.cwd();
const read = (file: string) => readFileSync(resolve(root, file), 'utf8');
const indexHtml = read('index.html');
const vercel = JSON.parse(read('vercel.json'));

const metaContent = (html: string, attr: string, name: string) =>
  html.match(new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]*)"`))?.[1];

describe('seo.json', () => {
  const pages = Object.values(seo.pages);

  it('has unique titles and descriptions short enough for search results', () => {
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
    for (const { description } of [...pages, seo.notFound]) expect(description.length).toBeLessThanOrEqual(160);
  });

  it('points at an og image that exists', () => {
    expect(existsSync(resolve(root, 'public', seo.image.slice(1)))).toBe(true);
  });
});

describe('index.html', () => {
  it('static head matches seo.json for the home page', () => {
    const home = seo.pages['/'];
    expect(indexHtml).toContain(`<title>${home.title}</title>`);
    expect(metaContent(indexHtml, 'name', 'description')).toBe(home.description);
    expect(metaContent(indexHtml, 'property', 'og:title')).toBe(home.title);
    expect(metaContent(indexHtml, 'property', 'og:description')).toBe(home.description);
    expect(metaContent(indexHtml, 'property', 'og:url')).toBe(`${seo.url}/`);
    expect(metaContent(indexHtml, 'property', 'og:image')).toBe(`${seo.url}${seo.image}`);
    expect(metaContent(indexHtml, 'name', 'twitter:image')).toBe(`${seo.url}${seo.image}`);
    expect(indexHtml).toContain(`<link rel="canonical" href="${seo.url}/" />`);
  });

  it('has valid JSON-LD and no inline executable script (CSP script-src is "self")', () => {
    const scripts = [...indexHtml.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
    for (const [, attrs, body] of scripts) {
      if (attrs.includes('application/ld+json')) expect(() => JSON.parse(body)).not.toThrow();
      else expect(attrs).toContain('src=');
    }
  });

  it('references only icons that exist in public/', () => {
    for (const [, href] of indexHtml.matchAll(/<link\s+rel="(?:icon|apple-touch-icon)"[^>]*?href="([^"]+)"/g)) {
      expect(existsSync(resolve(root, 'public', href.slice(1))), href).toBe(true);
    }
  });
});

describe('vercel.json', () => {
  const headers: Record<string, string> = Object.fromEntries(
    vercel.headers
      .find((rule: { source: string }) => rule.source === '/(.*)')
      .headers.map((h: { key: string; value: string }) => [h.key, h.value]),
  );
  const csp = headers['Content-Security-Policy'];
  const directive = (name: string) =>
    csp
      .split(';')
      .find((d) => d.trim().startsWith(`${name} `))
      ?.trim() ?? '';

  it('sets baseline security headers on every route', () => {
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Referrer-Policy']).toBeTruthy();
    expect(headers['Permissions-Policy']).toBeTruthy();
  });

  it('uses a restrictive CSP', () => {
    expect(directive('default-src')).toBe("default-src 'self'");
    expect(directive('script-src')).toBe("script-src 'self'");
    expect(directive('frame-ancestors')).toBe("frame-ancestors 'none'");
    expect(directive('object-src')).toBe("object-src 'none'");
    expect(csp).not.toContain('unsafe-eval');
    expect(directive('style-src')).not.toContain('unsafe-inline');
  });

  it('has no catch-all rewrite, so unknown URLs return a real 404', () => {
    expect(vercel.rewrites ?? []).toEqual([]);
    expect(vercel.cleanUrls).toBe(true);
  });
});

describe('scripts/prerender.mjs', () => {
  function build(template: string) {
    const dir = mkdtempSync(join(tmpdir(), 'prerender-'));
    mkdirSync(join(dir, 'dist', 'public'), { recursive: true });
    mkdirSync(join(dir, 'src'));
    writeFileSync(join(dir, 'dist', 'public', 'index.html'), template);
    cpSync(resolve(root, 'src', 'seo.json'), join(dir, 'src', 'seo.json'));
    const run = () => execFileSync('node', [resolve(root, 'scripts', 'prerender.mjs')], { cwd: dir, stdio: 'pipe' });
    return { dir, run, file: (name: string) => readFileSync(join(dir, 'dist', 'public', name), 'utf8') };
  }

  it('writes per-route pages, a noindex 404, sitemap and robots', () => {
    const out = build(indexHtml);
    out.run();

    const about = out.file('about.html');
    expect(about).toContain(`<title>${seo.pages['/about'].title}</title>`);
    expect(about).toContain(`<link rel="canonical" href="${seo.url}/about" />`);
    expect(out.file('contact.html')).toContain(`href="${seo.url}/contact"`);

    const notFound = out.file('404.html');
    expect(notFound).toContain('<meta name="robots" content="noindex" />');
    expect(notFound).not.toContain('rel="canonical"');

    const sitemap = out.file('sitemap.xml');
    for (const path of Object.keys(seo.pages))
      expect(sitemap).toContain(`<loc>${path === '/' ? `${seo.url}/` : seo.url + path}</loc>`);
    expect(out.file('robots.txt')).toContain(`Sitemap: ${seo.url}/sitemap.xml`);
  });

  it('fails the build when a template tag is missing instead of shipping bad meta', () => {
    const out = build(indexHtml.replace(/<meta\s+property="og:title"[^>]*>/, ''));
    expect(out.run).toThrow(/og:title/);
  });
});
