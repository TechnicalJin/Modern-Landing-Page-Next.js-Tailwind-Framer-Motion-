/**
 * Accessibility Helper Utilities
 * Collection of functions to improve web accessibility
 */

/**
 * Generate unique ID for accessibility attributes
 */
export const generateId = (prefix = 'a11y'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if an element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  return focusableSelectors.some((selector) => element.matches(selector));
};

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (
  container: HTMLElement | Document = document
): HTMLElement[] => {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
};

/**
 * Move focus to first focusable element in container
 */
export const focusFirst = (container: HTMLElement): void => {
  const focusables = getFocusableElements(container);
  focusables[0]?.focus();
};

/**
 * Move focus to last focusable element in container
 */
export const focusLast = (container: HTMLElement): void => {
  const focusables = getFocusableElements(container);
  focusables[focusables.length - 1]?.focus();
};

/**
 * Check color contrast ratio (WCAG 2.1 compliance)
 * Returns true if contrast ratio meets WCAG AA standard (4.5:1)
 */
export const checkContrastRatio = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): { ratio: number; passes: boolean } => {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const threshold = level === 'AAA' ? 7 : 4.5;

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= threshold,
  };
};

/**
 * Create ARIA live region for announcements
 */
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const liveRegionId = 'aria-live-region';
  let liveRegion = document.getElementById(liveRegionId);

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = liveRegionId;
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  // Clear previous message
  liveRegion.textContent = '';

  // Announce new message after a brief delay
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 100);

  // Clear message after it's been announced
  setTimeout(() => {
    liveRegion!.textContent = '';
  }, 1000);
};

/**
 * Create visually hidden text for screen readers
 */
export const createScreenReaderText = (text: string): string => {
  return `<span class="sr-only">${text}</span>`;
};

/**
 * Generate ARIA label from text
 * Removes special characters and cleans up text
 */
export const generateAriaLabel = (text: string): string => {
  return text
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark mode
 */
export const prefersDarkMode = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Check if user prefers high contrast
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Trap focus within an element (for modals/dialogs)
 */
export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(element);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Restore focus to previously focused element
 */
export const createFocusRestorer = (): {
  save: () => void;
  restore: () => void;
} => {
  let previouslyFocused: HTMLElement | null = null;

  return {
    save: () => {
      previouslyFocused = document.activeElement as HTMLElement;
    },
    restore: () => {
      previouslyFocused?.focus();
    },
  };
};

/**
 * Check if element is visible in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scroll element into view if not visible
 */
export const scrollIntoViewIfNeeded = (element: HTMLElement): void => {
  if (!isInViewport(element)) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

/**
 * Get accessible name for an element
 */
export const getAccessibleName = (element: HTMLElement): string => {
  // Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const ariaLabelledby = element.getAttribute('aria-labelledby');
  if (ariaLabelledby) {
    const labelElement = document.getElementById(ariaLabelledby);
    if (labelElement) return labelElement.textContent || '';
  }

  // Check title attribute
  const title = element.getAttribute('title');
  if (title) return title;

  // Check text content
  return element.textContent || '';
};

/**
 * Create accessible description
 */
export const setAccessibleDescription = (
  element: HTMLElement,
  description: string
): void => {
  const descId = generateId('desc');
  const descElement = document.createElement('div');
  descElement.id = descId;
  descElement.className = 'sr-only';
  descElement.textContent = description;

  element.setAttribute('aria-describedby', descId);
  element.appendChild(descElement);
};

/**
 * Validate ARIA attributes
 */
export const validateAriaAttributes = (element: HTMLElement): string[] => {
  const errors: string[] = [];
  const role = element.getAttribute('role');

  // Check if aria-label is used with non-interactive elements
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && !isFocusable(element) && !role) {
    errors.push('aria-label used on non-interactive element without role');
  }

  // Check if aria-labelledby points to existing element
  const ariaLabelledby = element.getAttribute('aria-labelledby');
  if (ariaLabelledby && !document.getElementById(ariaLabelledby)) {
    errors.push(`aria-labelledby references non-existent id: ${ariaLabelledby}`);
  }

  // Check if aria-describedby points to existing element
  const ariaDescribedby = element.getAttribute('aria-describedby');
  if (ariaDescribedby && !document.getElementById(ariaDescribedby)) {
    errors.push(`aria-describedby references non-existent id: ${ariaDescribedby}`);
  }

  return errors;
};

/**
 * Keyboard navigation helper
 */
export const handleArrowNavigation = (
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'vertical'
): number => {
  const isVertical = orientation === 'vertical';
  const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
  const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

  let newIndex = currentIndex;

  if (event.key === nextKey) {
    newIndex = (currentIndex + 1) % items.length;
  } else if (event.key === prevKey) {
    newIndex = (currentIndex - 1 + items.length) % items.length;
  } else if (event.key === 'Home') {
    newIndex = 0;
  } else if (event.key === 'End') {
    newIndex = items.length - 1;
  } else {
    return currentIndex;
  }

  event.preventDefault();
  items[newIndex]?.focus();
  return newIndex;
};

/**
 * Check if element has accessible name
 */
export const hasAccessibleName = (element: HTMLElement): boolean => {
  return getAccessibleName(element).trim().length > 0;
};

/**
 * Common WCAG color contrast ratios
 */
export const WCAG_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
  AAA_NORMAL: 7.0,
  AAA_LARGE: 4.5,
} as const;

/**
 * Tailwind CSS colors with WCAG compliant combinations
 */
export const ACCESSIBLE_COLOR_PAIRS = {
  light: {
    text: '#1f2937', // gray-800
    background: '#ffffff',
    primary: '#2563eb', // blue-600
    secondary: '#7c3aed', // violet-600
    success: '#16a34a', // green-600
    warning: '#ca8a04', // yellow-600
    error: '#dc2626', // red-600
  },
  dark: {
    text: '#f9fafb', // gray-50
    background: '#111827', // gray-900
    primary: '#60a5fa', // blue-400
    secondary: '#a78bfa', // violet-400
    success: '#4ade80', // green-400
    warning: '#fbbf24', // yellow-400
    error: '#f87171', // red-400
  },
} as const;

export default {
  generateId,
  isFocusable,
  getFocusableElements,
  focusFirst,
  focusLast,
  checkContrastRatio,
  announce,
  generateAriaLabel,
  prefersReducedMotion,
  prefersDarkMode,
  prefersHighContrast,
  trapFocus,
  createFocusRestorer,
  isInViewport,
  scrollIntoViewIfNeeded,
  getAccessibleName,
  setAccessibleDescription,
  validateAriaAttributes,
  handleArrowNavigation,
  hasAccessibleName,
  WCAG_RATIOS,
  ACCESSIBLE_COLOR_PAIRS,
};
