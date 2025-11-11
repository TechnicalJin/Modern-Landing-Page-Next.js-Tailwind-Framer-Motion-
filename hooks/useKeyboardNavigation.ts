'use client';

import { useEffect, useCallback, useRef } from 'react';

export type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  description?: string;
  preventDefault?: boolean;
};

/**
 * useKeyboardNavigation Hook
 * Handles keyboard shortcuts and navigation patterns
 * Improves accessibility and power-user experience
 */
export const useKeyboardNavigation = (
  shortcuts: KeyboardShortcut[],
  enabled = true
) => {
  const shortcutsRef = useRef(shortcuts);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      shortcutsRef.current.forEach((shortcut) => {
        const {
          key,
          ctrlKey = false,
          shiftKey = false,
          altKey = false,
          metaKey = false,
          callback,
          preventDefault = true,
        } = shortcut;

        // Check if the key combination matches
        const isMatch =
          event.key.toLowerCase() === key.toLowerCase() &&
          event.ctrlKey === ctrlKey &&
          event.shiftKey === shiftKey &&
          event.altKey === altKey &&
          event.metaKey === metaKey;

        if (isMatch) {
          if (preventDefault) {
            event.preventDefault();
          }
          callback(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
};

/**
 * useFocusTrap Hook
 * Traps focus within a modal or dialog
 * Essential for accessible modal dialogs
 */
export const useFocusTrap = (
  containerRef: React.RefObject<HTMLElement>,
  active = true
) => {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Focus first element when trap activates
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, active]);
};

/**
 * useArrowKeyNavigation Hook
 * Navigate through a list using arrow keys
 * Great for dropdown menus, select boxes, and lists
 */
export const useArrowKeyNavigation = (
  itemsCount: number,
  onSelect?: (index: number) => void,
  orientation: 'horizontal' | 'vertical' = 'vertical'
) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
      const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

      if (event.key === nextKey) {
        event.preventDefault();
        const newIndex = (activeIndex + 1) % itemsCount;
        setActiveIndex(newIndex);
      } else if (event.key === prevKey) {
        event.preventDefault();
        const newIndex = (activeIndex - 1 + itemsCount) % itemsCount;
        setActiveIndex(newIndex);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect?.(activeIndex);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(itemsCount - 1);
      }
    },
    [activeIndex, itemsCount, onSelect, orientation]
  );

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
  };
};

/**
 * useEscapeKey Hook
 * Trigger callback when Escape key is pressed
 * Common pattern for closing modals/dialogs
 */
export const useEscapeKey = (callback: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [callback, enabled]);
};

/**
 * useTabNavigation Hook
 * Custom tab navigation behavior
 */
export const useTabNavigation = (
  elements: React.RefObject<HTMLElement>[],
  circular = true
) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const focusElement = useCallback((index: number) => {
    const element = elements[index]?.current;
    if (element) {
      element.focus();
      setCurrentIndex(index);
    }
  }, [elements]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();

        if (event.shiftKey) {
          // Go backward
          const newIndex = currentIndex - 1;
          if (newIndex >= 0) {
            focusElement(newIndex);
          } else if (circular) {
            focusElement(elements.length - 1);
          }
        } else {
          // Go forward
          const newIndex = currentIndex + 1;
          if (newIndex < elements.length) {
            focusElement(newIndex);
          } else if (circular) {
            focusElement(0);
          }
        }
      }
    },
    [currentIndex, elements.length, focusElement, circular]
  );

  return {
    currentIndex,
    focusElement,
    handleKeyDown,
  };
};

/**
 * useKeyPress Hook
 * Detect when a specific key is pressed
 */
export const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

/**
 * useAccessibleKeyboardShortcuts Hook
 * Provides common keyboard shortcuts for accessibility
 */
export const useAccessibleKeyboardShortcuts = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const skipToMain = useCallback(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    const menuButton = document.querySelector('[aria-label*="menu"]') as HTMLElement;
    menuButton?.click();
  }, []);

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'Home',
      callback: scrollToTop,
      description: 'Scroll to top of page',
    },
    {
      key: 'End',
      callback: scrollToBottom,
      description: 'Scroll to bottom of page',
    },
    {
      key: 'm',
      altKey: true,
      callback: skipToMain,
      description: 'Skip to main content (Alt+M)',
    },
    {
      key: 'n',
      altKey: true,
      callback: toggleMenu,
      description: 'Toggle navigation menu (Alt+N)',
    },
  ];

  useKeyboardNavigation(shortcuts);

  return {
    shortcuts,
    scrollToTop,
    scrollToBottom,
    skipToMain,
    toggleMenu,
  };
};

/**
 * React import for useState in hooks
 */
import React from 'react';

export default useKeyboardNavigation;
