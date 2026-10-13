import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom has no IntersectionObserver; <Reveal> uses it. Treat everything as visible.
class ImmediateIntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', ImmediateIntersectionObserver);

// jsdom has no layout, so scrolling APIs are no-ops.
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
Element.prototype.scrollIntoView = vi.fn();

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
  window.history.replaceState({}, '', '/');
});
