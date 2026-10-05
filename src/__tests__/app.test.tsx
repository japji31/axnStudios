import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '@/App';
import { ErrorBoundary } from '@/components/error-boundary';
import { pageUrl } from '@/components/page-meta';
import seo from '@/seo.json';

function renderAt(path: string) {
  window.history.replaceState({}, '', path);
  return render(<App />);
}

const head = (selector: string) => document.head.querySelector(selector);

describe.each(['/', '/about', '/contact'] as const)('route %s', (path) => {
  it('renders exactly one h1 inside the shell', () => {
    renderAt(path);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('banner')).toHaveLength(1);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  it('sets title, description and canonical from seo.json', () => {
    renderAt(path);
    expect(document.title).toBe(seo.pages[path].title);
    expect(head('meta[name="description"]')).toHaveAttribute('content', seo.pages[path].description);
    expect(head('meta[property="og:title"]')).toHaveAttribute('content', seo.pages[path].title);
    expect(head('link[rel="canonical"]')).toHaveAttribute('href', pageUrl(path));
    expect(head('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  });

  it('gives every image alt text, and external links rel=noopener', () => {
    const { container } = renderAt(path);
    for (const img of container.querySelectorAll('img')) expect(img).toHaveAttribute('alt');
    for (const link of container.querySelectorAll('a[target="_blank"]')) {
      expect(link.getAttribute('rel') ?? '').toContain('noopener');
    }
  });

  it('never embeds third-party pages in an iframe', () => {
    // Shopify/Vercel send frame-ancestors headers: embeds render blank (see CLAUDE.md).
    const { container } = renderAt(path);
    expect(container.querySelector('iframe')).toBeNull();
  });
});

describe('unknown route', () => {
  it('shows the branded 404 and tells crawlers not to index it', () => {
    renderAt('/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
    expect(document.title).toBe(seo.notFound.title);
    expect(head('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    expect(head('link[rel="canonical"]')).toBeNull();
  });

  it('links back home', () => {
    renderAt('/does-not-exist');
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });
});

describe('navigation', () => {
  it('moves between pages and restores indexable meta after a 404', () => {
    renderAt('/does-not-exist');
    fireEvent.click(screen.getByRole('link', { name: /back to home/i }));
    expect(document.title).toBe(seo.pages['/'].title);
    expect(head('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    expect(head('link[rel="canonical"]')).toHaveAttribute('href', pageUrl('/'));

    fireEvent.click(screen.getAllByRole('link', { name: 'About' })[0]);
    expect(document.title).toBe(seo.pages['/about'].title);
  });
});

describe('contact calls to action', () => {
  it('"Let’s Talk" opens a mailto link', () => {
    renderAt('/');
    const cta = screen.getAllByRole('link', { name: /let.s talk/i })[0];
    expect(cta.getAttribute('href')).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});

describe('ErrorBoundary', () => {
  it('contains a crashing child instead of blanking the page', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const Boom = () => {
      throw new Error('boom');
    };
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});
