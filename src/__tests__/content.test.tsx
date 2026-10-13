import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '@/App';
import seo from '@/seo.json';

const root = process.cwd();
const appSource = readFileSync(resolve(root, 'src', 'App.tsx'), 'utf8');

function renderAt(path: string) {
  window.history.replaceState({}, '', path);
  return render(<App />);
}

describe.each(['/', '/about', '/contact'])('copy on %s', (path) => {
  it('spells the brand "AXN Studios" (the email address and URLs excepted)', () => {
    const { container } = renderAt(path);
    const text = (container.textContent ?? '').replace(/\S+@\S+/g, '');
    expect(text).not.toMatch(/axnstudios|axn studio\b|AxnStudios/i);
  });

  it('speaks as the company: no first-person singular, no personal names', () => {
    const { container } = renderAt(path);
    // Client quotes are the clients' own words, so they are exempt from the site-voice rule.
    for (const quotes of container.querySelectorAll('.testimonials')) quotes.remove();
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/\b(I|I’m|I’ll|I’ve|me|my|myself)\b/);
    expect(text).not.toMatch(/japji|soni/i);
  });
});

describe('copy', () => {
  it('uses US spelling', () => {
    const copy = appSource + JSON.stringify(seo);
    expect(copy).not.toMatch(/enquir|personalis|colour|optimis|organis|programme/i);
  });

  it('brands page titles consistently', () => {
    for (const { title } of [...Object.values(seo.pages), seo.notFound]) expect(title).toContain('AXN Studios');
  });

  it('never names an individual in copy or metadata', () => {
    const index = readFileSync(resolve(root, 'index.html'), 'utf8');
    for (const source of [appSource, JSON.stringify(seo), index]) expect(source).not.toMatch(/japji|soni/i);
  });

  it('introduces the studio on the About page', () => {
    renderAt('/about');
    expect(screen.getByText(/AXN Studios builds websites, apps, automations and AI features/)).toBeInTheDocument();
  });

  it('hero button matches the section it scrolls to', () => {
    const { container } = renderAt('/');
    const button = screen.getByRole('link', { name: /see selected work/i });
    expect(button).toHaveAttribute('href', '#work');
    expect(container.querySelector('#work')).not.toBeNull();
    expect(container.querySelector('#work .eyebrow')?.textContent).toMatch(/selected work/i);
  });

  it('gives enquiries a subject and tells people what to include', () => {
    renderAt('/contact');
    const cta = screen.getByTestId('link-contact-cta');
    const url = new URL(cta.getAttribute('href') ?? '');
    expect(url.protocol).toBe('mailto:');
    expect(url.searchParams.get('subject')).toBeTruthy();
    expect(url.searchParams.get('body')).toMatch(/budget/i);
    expect(screen.getByText(/rough budget and your deadline/i)).toBeInTheDocument();
  });
});

describe('projects', () => {
  it('only reference images that exist', () => {
    const paths = [...appSource.matchAll(/['"](\/images\/[^'"]+)['"]/g)].map((m) => m[1]);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) expect(existsSync(resolve(root, 'public', path.slice(1))), path).toBe(true);
  });

  it('show an honest status for the live project', () => {
    renderAt('/');
    expect(screen.getByText(/Web \/ E-commerce · Live/)).toBeInTheDocument();
    expect(screen.getByText(/AI Integration \/ Marketing · In development/)).toBeInTheDocument();
  });

  it('lazy-load below-the-fold project images', () => {
    const { container } = renderAt('/');
    const images = container.querySelectorAll('.project-media img');
    expect(images.length).toBeGreaterThan(0);
    for (const img of images) {
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('width');
      expect(img).toHaveAttribute('height');
    }
  });
});

describe('index.html', () => {
  it('does not block pinch-zoom', () => {
    expect(readFileSync(resolve(root, 'index.html'), 'utf8')).not.toMatch(/maximum-scale|user-scalable\s*=\s*no/);
  });
});

describe('services', () => {
  it('shows four services, each with an icon, a headline, a description and four bullet points', () => {
    const { container } = renderAt('/');
    const cards = container.querySelectorAll('.service-card');
    expect([...cards].map((card) => card.querySelector('h3')?.textContent)).toEqual([
      'Web Development',
      'App Development',
      'Marketing Automation',
      'AI Agents & Chatbots',
    ]);
    for (const card of cards) {
      expect(card.querySelector(':scope > svg')).toHaveAttribute('aria-hidden', 'true');
      expect(card.querySelector('.service-headline')?.textContent).toMatch(/\.$/);
      expect(card.querySelectorAll('.service-list li')).toHaveLength(4);
    }
  });
});
