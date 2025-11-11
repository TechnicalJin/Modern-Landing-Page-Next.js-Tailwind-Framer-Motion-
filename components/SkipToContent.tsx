'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkipToContentProps {
  /** Target element ID to skip to */
  targetId?: string;
  /** Custom text for the skip link */
  text?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkipToContent Component
 * Provides keyboard navigation shortcut to main content
 * Essential for accessibility - allows keyboard/screen reader users to bypass navigation
 * WCAG 2.1 Level A requirement
 */
export const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = 'main-content',
  text = 'Skip to main content',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    
    if (target) {
      // Set focus to the target
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
      
      // Smooth scroll to target
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Remove tabindex after focus to maintain semantic HTML
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  };

  return (
    <AnimatePresence>
      {isFocused && (
        <motion.a
          href={`#${targetId}`}
          onClick={handleSkip}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            fixed top-4 left-4 z-[9999]
            px-6 py-3 
            bg-blue-600 text-white 
            rounded-lg shadow-2xl
            font-semibold text-sm
            focus:outline-none focus:ring-4 focus:ring-blue-300
            transform transition-all duration-200
            ${className}
          `}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          aria-label={text}
        >
          {text}
        </motion.a>
      )}
    </AnimatePresence>
  );
};

/**
 * InvisibleSkipLink Component
 * Hidden skip link that only appears on keyboard focus
 * Traditional implementation (always in DOM, visually hidden until focused)
 */
export const InvisibleSkipLink: React.FC<{
  targetId?: string;
  text?: string;
}> = ({ targetId = 'main-content', text = 'Skip to main content' }) => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        target.removeAttribute('tabindex');
      }, 100);
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      className="
        sr-only
        focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
        focus:px-6 focus:py-3
        focus:bg-blue-600 focus:text-white
        focus:rounded-lg focus:shadow-2xl
        focus:font-semibold focus:text-sm
        focus:outline-none focus:ring-4 focus:ring-blue-300
      "
      aria-label={text}
    >
      {text}
    </a>
  );
};

/**
 * MultipleSkipLinks Component
 * Provides multiple skip link options (main, navigation, footer, etc.)
 */
export const MultipleSkipLinks: React.FC = () => {
  const [focusedLink, setFocusedLink] = useState<string | null>(null);

  const skipLinks = [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'hero', label: 'Skip to hero section' },
    { id: 'features', label: 'Skip to features' },
    { id: 'contact', label: 'Skip to contact form' },
  ];

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        target.removeAttribute('tabindex');
      }, 100);
    }
  };

  return (
    <nav
      aria-label="Skip navigation links"
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-4 focus-within:left-4 focus-within:z-[9999]"
    >
      <ul className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl border-2 border-blue-500">
        {skipLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={(e) => handleSkip(e, link.id)}
              onFocus={() => setFocusedLink(link.id)}
              onBlur={() => setFocusedLink(null)}
              className={`
                block px-4 py-2 rounded
                font-medium text-sm
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-300
                ${
                  focusedLink === link.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                }
              `}
              aria-label={link.label}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * SkipToContentButton Component
 * Visible "Back to top" style skip button
 */
export const SkipToContentButton: React.FC<{
  targetId?: string;
  icon?: React.ReactNode;
  text?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({
  targetId = 'main-content',
  icon,
  text = 'Skip',
  position = 'bottom-right',
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const handleSkip = () => {
    const target = document.getElementById(targetId);
    
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        target.removeAttribute('tabindex');
      }, 100);
    }
  };

  return (
    <motion.button
      onClick={handleSkip}
      className={`
        fixed ${positionClasses[position]} z-50
        px-4 py-2
        bg-blue-600 hover:bg-blue-700
        text-white font-medium text-sm
        rounded-lg shadow-lg
        focus:outline-none focus:ring-4 focus:ring-blue-300
        transition-colors
        flex items-center gap-2
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`${text} to ${targetId.replace('-', ' ')}`}
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
};

export default SkipToContent;
