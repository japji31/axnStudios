import { type PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import type { Testimonial } from '@/testimonials';

const GAP = 20;

/**
 * Horizontal review carousel. Text only: no client photos, logos or star
 * ratings. Renders nothing when there is nothing to show.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ atStart: el.scrollLeft <= 4, atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, items.length]);

  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  if (items.length === 0) return null;

  const step = () => {
    const card = track.current?.querySelector<HTMLElement>('.testimonial-card');
    return (card?.offsetWidth ?? 320) + GAP;
  };

  // Mouse drag-to-scroll. Touch already scrolls natively, so it is left alone.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !track.current) return;
    drag.current = { active: true, moved: false, startX: event.clientX, startScroll: track.current.scrollLeft };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!drag.current.active || !el) return;
    const distance = event.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(distance) < 5) return;
    if (!drag.current.moved) {
      drag.current.moved = true;
      el.classList.add('is-dragging');
      el.setPointerCapture?.(event.pointerId);
    }
    el.scrollLeft = drag.current.startScroll - distance;
  };
  const endDrag = () => {
    const el = track.current;
    if (!drag.current.active || !el) return;
    const wasDragged = drag.current.moved;
    drag.current.active = false;
    el.classList.remove('is-dragging');
    if (wasDragged) el.scrollTo?.({ left: Math.round(el.scrollLeft / step()) * step(), behavior: 'smooth' });
  };

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="section testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container-wide">
        <Reveal className="testimonials-head">
          <div>
            <span className="eyebrow">Our reviews</span>
            <h2 className="display" id="testimonials-title">
              What our <span>clients</span> say
            </h2>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-button"
              aria-label="Previous review"
              onClick={() => scroll(-1)}
              disabled={edge.atStart}
              data-testid="button-testimonials-prev"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              className="carousel-button"
              aria-label="Next review"
              onClick={() => scroll(1)}
              disabled={edge.atEnd}
              data-testid="button-testimonials-next"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
        {items.some((t) => t.source_status === 'demo_content') && (
          <p className="testimonials-preview-note">
            Preview with demo content (development only) — hidden on the live site until real, approved reviews are
            added.
          </p>
        )}
        <div
          className="testimonial-track"
          ref={track}
          onScroll={measure}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseDown={(event) => event.preventDefault()}
          tabIndex={0}
          role="region"
          aria-label="Client reviews"
        >
          {items.map((t) => {
            const isDemo = t.source_status === 'demo_content';
            const detail = [t.client.role, t.client.company].filter(Boolean).join(', ');
            return (
              <figure className="testimonial-card" key={t.id} data-testid={`testimonial-${t.id}`}>
                <div>
                  <span className="testimonial-mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote className="testimonial-quote">{t.quote}</blockquote>
                </div>
                <figcaption className="testimonial-by">
                  {isDemo ? (
                    <>
                      <strong>{t.service}</strong>
                      <span>{t.project_type}</span>
                    </>
                  ) : (
                    <>
                      <strong>{t.client.name}</strong>
                      {detail && <span>{detail}</span>}
                      <span>{t.project_type}</span>
                    </>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
