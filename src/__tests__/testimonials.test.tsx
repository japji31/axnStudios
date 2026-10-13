import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '@/App';
import { Testimonials } from '@/components/testimonials';
import { isPublishable, testimonials, visibleTestimonials, type Testimonial } from '@/testimonials';

// Fixture used only to exercise the layout. It is not site content.
const verified: Testimonial = {
  id: 'fixture-verified',
  service: 'Web Development',
  quote: 'A fixture quote used only by the tests.',
  client: { name: 'Test Person', role: 'Owner', company: 'Test Company' },
  project_type: 'Business website',
  rating: null,
  source_status: 'verified',
  approval_status: 'approved',
  publishable: true,
};
const demo = testimonials.find((t) => t.source_status === 'demo_content') as Testimonial;

afterEach(() => vi.unstubAllEnvs());

describe('testimonial data', () => {
  it('has unique ids and a schema the site can rely on', () => {
    expect(new Set(testimonials.map((t) => t.id)).size).toBe(testimonials.length);
    for (const t of testimonials) {
      expect(['Web Development', 'Marketing Automation', 'AI Agents & Chatbots']).toContain(t.service);
      expect(t.rating).toBeNull();
    }
  });

  it('never marks demo content publishable or attributes it to anyone', () => {
    for (const t of testimonials.filter((x) => x.source_status === 'demo_content')) {
      expect(t.publishable).toBe(false);
      expect(t.approval_status).toBe('pending');
      expect(t.client).toEqual({ name: null, role: null, company: null });
    }
  });

  it('only allows publishable=true when the review is verified, approved and attributed', () => {
    for (const t of testimonials.filter((x) => x.publishable)) expect(isPublishable(t)).toBe(true);
  });

  it('keeps quotes at a readable length', () => {
    for (const t of testimonials.filter((x) => x.quote)) {
      const words = t.quote.trim().split(/\s+/).length;
      expect(words, t.id).toBeGreaterThanOrEqual(20);
      expect(words, t.id).toBeLessThanOrEqual(80);
    }
  });
});

describe('visibleTestimonials', () => {
  it('shows no demo content in production, whatever the data says', () => {
    const rigged = [{ ...demo, publishable: true }, verified];
    expect(visibleTestimonials(false, rigged)).toEqual([verified]);
    for (const t of visibleTestimonials(false)) expect(t.source_status).toBe('verified');
  });

  it('rejects unapproved or unattributed reviews even if flagged publishable', () => {
    const pending = { ...verified, id: 'p', approval_status: 'pending' as const };
    const anonymous = { ...verified, id: 'a', client: { name: null, role: null, company: null } };
    const unverified = { ...verified, id: 'u', source_status: 'needs_client_feedback' as const };
    expect(visibleTestimonials(false, [pending, anonymous, unverified])).toEqual([]);
  });

  it('adds demo cards only when asked (dev server)', () => {
    expect(visibleTestimonials(true).some((t) => t.source_status === 'demo_content')).toBe(true);
  });
});

describe('<Testimonials>', () => {
  it('renders nothing at all when there is nothing to show', () => {
    const { container } = render(<Testimonials items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows text only: quote and attribution, with no images, stars or ratings', () => {
    const { container } = render(<Testimonials items={[verified]} />);
    expect(screen.getByRole('heading', { level: 2, name: /what our clients say/i })).toBeInTheDocument();
    expect(screen.getByText(verified.quote)).toBeInTheDocument();
    expect(screen.getByText('Test Person')).toBeInTheDocument();
    expect(screen.getByText('Owner, Test Company')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
    expect(container.textContent).not.toMatch(/★|☆|stars?\b|rating/i);
    expect(container.querySelector('.testimonial-demo')).toBeNull();
  });

  it('paints no label on the cards, only a single dev-only preview note above them', () => {
    const { container } = render(<Testimonials items={[demo]} />);
    expect(container.querySelector('.testimonial-demo')).toBeNull();
    expect(screen.getByText(/preview with demo content \(development only\)/i)).toBeInTheDocument();
    expect(screen.getByText(demo.service)).toBeInTheDocument();
  });

  it('shows no preview note for real reviews', () => {
    render(<Testimonials items={[verified]} />);
    expect(screen.queryByText(/preview with demo content/i)).toBeNull();
  });

  it('can be dragged with the mouse', () => {
    const { container } = render(<Testimonials items={[verified, { ...verified, id: 'second' }]} />);
    const track = container.querySelector('.testimonial-track') as HTMLElement;
    track.scrollLeft = 0;
    fireEvent.pointerDown(track, { pointerType: 'mouse', button: 0, clientX: 400 });
    fireEvent.pointerMove(track, { pointerType: 'mouse', clientX: 250 });
    expect(track).toHaveClass('is-dragging');
    expect(track.scrollLeft).toBe(150);
    fireEvent.pointerUp(track, { pointerType: 'mouse', clientX: 250 });
    expect(track).not.toHaveClass('is-dragging');
  });

  it('ignores tiny movements so clicks are not mistaken for drags', () => {
    const { container } = render(<Testimonials items={[verified]} />);
    const track = container.querySelector('.testimonial-track') as HTMLElement;
    fireEvent.pointerDown(track, { pointerType: 'mouse', button: 0, clientX: 400 });
    fireEvent.pointerMove(track, { pointerType: 'mouse', clientX: 398 });
    expect(track).not.toHaveClass('is-dragging');
  });

  it('scrolls the track with the arrow buttons', () => {
    // jsdom has no layout, so describe a track wider than its viewport.
    const widths = { scrollWidth: 1200, clientWidth: 400 };
    for (const [prop, value] of Object.entries(widths)) {
      Object.defineProperty(HTMLElement.prototype, prop, { configurable: true, get: () => value });
    }
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy;
    try {
      render(<Testimonials items={[verified, { ...verified, id: 'second' }]} />);
      expect(screen.getByRole('button', { name: /previous review/i })).toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: /next review/i }));
      expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number) }));
    } finally {
      for (const prop of Object.keys(widths))
        delete (HTMLElement.prototype as unknown as Record<string, unknown>)[prop];
    }
  });

  it('disables both arrows when every card already fits', () => {
    render(<Testimonials items={[verified]} />);
    expect(screen.getByRole('button', { name: /next review/i })).toBeDisabled();
  });
});

describe('About page', () => {
  function renderAbout() {
    window.history.replaceState({}, '', '/about');
    return render(<App />);
  }

  it('does not show a reviews section in production while nothing is approved', () => {
    vi.stubEnv('DEV', false);
    const { container } = renderAbout();
    expect(container.querySelector('#testimonials')).toBeNull();
    expect(container.textContent).not.toMatch(/demo/i);
  });

  it('previews demo cards in development so the layout can be reviewed', () => {
    vi.stubEnv('DEV', true);
    const { container } = renderAbout();
    expect(container.querySelector('#testimonials')).not.toBeNull();
    expect(container.querySelectorAll('.testimonial-card').length).toBe(testimonials.length);
    expect(container.querySelector('.testimonial-demo')).toBeNull();
  });

  it('has nine cards to scroll through in the preview', () => {
    expect(testimonials).toHaveLength(9);
  });
});

describe('"More about us" on the home page', () => {
  it('routes to the reviews section on the About page and scrolls to it', () => {
    vi.stubEnv('DEV', true);
    window.history.replaceState({}, '', '/');
    const { container } = render(<App />);
    const link = screen.getByTestId('link-work-more');
    expect(link).toHaveAttribute('href', '/about#testimonials');
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/about');
    expect(window.location.hash).toBe('#testimonials');
    expect(container.querySelector('#testimonials')).not.toBeNull();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: 'start' }));
  });

  it('links to plain /about when there are no reviews to show (production today)', () => {
    vi.stubEnv('DEV', false);
    window.history.replaceState({}, '', '/');
    render(<App />);
    expect(screen.getByTestId('link-work-more')).toHaveAttribute('href', '/about');
  });

  it('returns to the top of the page after navigating without a hash', () => {
    window.history.replaceState({}, '', '/');
    render(<App />);
    fireEvent.click(screen.getAllByRole('link', { name: 'Contact' })[0]);
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });
});
