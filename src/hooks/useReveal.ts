/**
 * useReveal — scroll-reveal hook
 *
 * Returns a ref. When the element enters the viewport the hook adds
 * class "revealed", triggering the CSS transition defined in index.css.
 *
 * Fires once then disconnects → element stays visible on scroll-back.
 *
 * Fallbacks:
 *   - No IntersectionObserver  → .revealed added immediately on mount
 *   - prefers-reduced-motion   → CSS makes everything visible instantly
 *   - element already revealed → observer is skipped (handles HMR)
 */
import { useEffect, useRef } from 'react';

interface RevealOptions {
  /**
   * Fraction of element that must be visible before firing.
   * Default 0.1 — fires when 10% is visible.
   */
  threshold?: number;
  /**
   * CSS transition-delay string, e.g. "0.15s".
   * Applied directly to the element style so each ref can have its own stagger.
   */
  delay?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const { threshold = 0.1, delay } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply stagger delay before observer fires
    if (delay) el.style.transitionDelay = delay;

    // Fallback: no IntersectionObserver support
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('revealed');
      return;
    }

    // Already visible (e.g. Vite HMR re-mount)
    if (el.classList.contains('revealed')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      {
        threshold,
        // Negative bottom margin: reveal fires when the element is 80px
        // inside the viewport from the bottom — i.e. as it scrolls INTO view,
        // not after it has already scrolled past center.
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally once on mount

  return ref;
}
