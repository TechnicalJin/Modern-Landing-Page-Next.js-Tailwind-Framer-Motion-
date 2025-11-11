/* eslint-disable react-hooks/purity */
/**
 * useDebounce Hook
 * 
 * Debounces a value to reduce expensive operations and improve FID.
 * Useful for search inputs, form validation, and real-time filtering.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value
 */

"use client";

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay expires
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useThrottle Hook
 * 
 * Throttles a value to limit how often it can change.
 * Better for scroll events and continuous updates.
 * 
 * @param value - The value to throttle
 * @param interval - Minimum interval in milliseconds (default: 100ms)
 * @returns Throttled value
 */
export function useThrottle<T>(value: T, interval: number = 100): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdate;

    if (timeSinceLastUpdate >= interval) {
      setThrottledValue(value);
      setLastUpdate(now);
    } else {
      const timeoutId = setTimeout(() => {
        setThrottledValue(value);
        setLastUpdate(Date.now());
      }, interval - timeSinceLastUpdate);

      return () => clearTimeout(timeoutId);
    }
  }, [value, interval, lastUpdate]);

  return throttledValue;
}

/**
 * useDebouncedCallback Hook
 * 
 * Returns a debounced version of a callback function.
 * Useful for event handlers like onChange, onInput, etc.
 * 
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced callback function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };
}

/**
 * useIdleCallback Hook
 * 
 * Executes a callback during browser idle time using requestIdleCallback.
 * Improves FID by deferring non-critical work.
 * 
 * @param callback - The function to execute during idle time
 * @param deps - Dependency array
 */
export function useIdleCallback(
  callback: () => void,
  deps: React.DependencyList = []
): void {
  useEffect(() => {
    // Check if requestIdleCallback is supported
    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(callback, { timeout: 2000 });
      
      return () => {
        cancelIdleCallback(idleCallbackId);
      };
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timeoutId = setTimeout(callback, 1);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
