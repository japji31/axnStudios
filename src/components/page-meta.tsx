import { useEffect } from 'react';
import seo from '@/seo.json';

export type PageKey = keyof typeof seo.pages | 'notFound';

/** Canonical URL for a route; the home page keeps its trailing slash. */
export function pageUrl(path: string): string {
  return path === '/' ? `${seo.url}/` : `${seo.url}${path}`;
}

function setTag(selector: string, create: () => HTMLElement, attr: 'content' | 'href', value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: 'name' | 'property', name: string) => () => {
  const el = document.createElement('meta');
  el.setAttribute(key, name);
  return el;
};

/**
 * Keeps <title> and the description / Open Graph / Twitter / canonical tags in
 * sync with the current route. The same values are baked into static HTML at
 * build time by scripts/prerender.mjs so crawlers that don't run JS (Slack,
 * WhatsApp, LinkedIn) see them too — both read src/seo.json.
 */
export function PageMeta({ page }: { page: PageKey }) {
  useEffect(() => {
    const isNotFound = page === 'notFound';
    const { title, description } = isNotFound ? seo.notFound : seo.pages[page];

    document.title = title;
    setTag('meta[name="description"]', meta('name', 'description'), 'content', description);
    setTag('meta[name="robots"]', meta('name', 'robots'), 'content', isNotFound ? 'noindex' : 'index, follow');
    setTag('meta[property="og:title"]', meta('property', 'og:title'), 'content', title);
    setTag('meta[property="og:description"]', meta('property', 'og:description'), 'content', description);
    setTag('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', title);
    setTag('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', description);

    if (isNotFound) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    } else {
      const url = pageUrl(page);
      setTag(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement('link');
          el.setAttribute('rel', 'canonical');
          return el;
        },
        'href',
        url,
      );
      setTag('meta[property="og:url"]', meta('property', 'og:url'), 'content', url);
    }
  }, [page]);
  return null;
}
