/**
 * useOptimizedScroll Hook
 * 
 * Provides optimized scroll handling with IntersectionObserver and throttling.
 * Replaces heavy onScroll event listeners for better performance.
 * 
 * Features:
 * - IntersectionObserver for viewport detection
 * - Throttled scroll position tracking
 * - RequestAnimationFrame optimization
 * - Memory leak prevention
 */

"use client";

import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Hook to detect when an element is in viewport using IntersectionObserver
 * 
 * @param threshold - Percentage of element visibility (0-1)
 * @param rootMargin - Margin around viewport for early trigger
 * @returns [ref, isInView, hasBeenInView] - Reference to attach, current visibility, and if ever visible
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.1,
  rootMargin: string = '0px 0px -100px 0px'
): [RefObject<T | null>, boolean, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        // Once in view, remember it (for animations that should only run once)
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasBeenInView]);

  return [ref, isInView, hasBeenInView];
}

/**
 * Hook for throttled scroll position tracking
 * Uses requestAnimationFrame for optimal performance
 * 
 * @param throttleMs - Throttle delay in milliseconds
 * @returns scrollY - Current scroll position
 */
export function useScrollPosition(throttleMs: number = 100): number {
  const [scrollY, setScrollY] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return window.scrollY;
  });
  const rafId = useRef<number | undefined>(undefined);
  const lastUpdate = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Cancel any pending frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const now = Date.now();
        
        // Throttle updates
        if (now - lastUpdate.current >= throttleMs) {
          setScrollY(window.scrollY);
          lastUpdate.current = now;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [throttleMs]);

  return scrollY;
}

/**
 * Hook to detect scroll direction
 * 
 * @param threshold - Minimum scroll distance to trigger direction change
 * @returns 'up' | 'down' | null
 */
export function useScrollDirection(threshold: number = 10): 'up' | 'down' | null {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const difference = currentScrollY - lastScrollY.current;

        if (Math.abs(difference) > threshold) {
          setScrollDirection(difference > 0 ? 'down' : 'up');
          lastScrollY.current = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [threshold]);

  return scrollDirection;
}

/**
 * Hook for observing multiple sections and tracking active section
 * More efficient than multiple scroll event listeners
 * 
 * @param sectionIds - Array of section IDs to observe
 * @returns activeSection - Currently active section ID
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers = new Map<string, IntersectionObserver>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.5, // Section is active when 50% visible
          rootMargin: '-80px 0px -80px 0px', // Account for navbar
        }
      );

      observer.observe(element);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}

/**
 * Combined hook with all scroll optimizations
 * Use this for most common scroll-related needs
 */
export function useOptimizedScroll() {
  const scrollY = useScrollPosition(100);
  const scrollDirection = useScrollDirection(10);
  const isScrolled = scrollY > 50;

  return {
    scrollY,
    scrollDirection,
    isScrolled,
  };
}
