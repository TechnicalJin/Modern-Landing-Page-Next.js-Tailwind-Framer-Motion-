/**
 * useReducedMotion Hook
 * 
 * Detects user's motion preferences and provides accessibility support.
 * Respects prefers-reduced-motion media query for users with vestibular disorders.
 * 
 * @returns {boolean} - True if user prefers reduced motion
 */

"use client";

import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Lazy initialization - only runs once
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window === 'undefined') return;

    // Check for prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener (supports both old and new API)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * useIsMobile Hook
 * 
 * Detects if the device is mobile for simplified animations.
 * 
 * @returns {boolean} - True if device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    // Lazy initialization
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Listen for resize events (debounced)
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
}

/**
 * Animation configuration helper
 * Returns optimized animation settings based on user preferences and device
 */
export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return {
    // Disable animations if user prefers reduced motion
    shouldAnimate: !prefersReducedMotion,
    
    // Simplify animations on mobile
    shouldSimplify: isMobile || prefersReducedMotion,
    
    // Duration multiplier
    durationMultiplier: prefersReducedMotion ? 0 : isMobile ? 0.7 : 1,
    
    // Disable complex scroll animations on mobile
    enableScrollAnimations: !isMobile && !prefersReducedMotion,
    
    // Reduce animation distance on mobile
    distanceMultiplier: isMobile ? 0.5 : 1,
  };
}
