/**
 * Reusable Framer Motion animation variants
 * Optimized for performance and consistency
 */

import { Variants } from 'framer-motion';

// Fade in from bottom
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
    },
  },
};

// Fade in from right
export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Scale up fade in
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger children animation
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger children with custom delay
export const staggerContainerCustom = (staggerDelay: number = 0.1, childDelay: number = 0): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childDelay,
    },
  },
});

// Slide in from top
export const slideInTop: Variants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Hover scale effect
export const hoverScale = {
  initial: { scale: 1 },
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
};

// Button hover effect with arrow
export const buttonHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
};

// Floating animation
export const floatingAnimation = (duration: number = 4, yOffset: number = 20) => ({
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
});

// Floating with rotation
export const floatingWithRotation = (
  duration: number = 4, 
  yOffset: number = 15, 
  rotation: number = 5
) => ({
  animate: {
    y: [0, -yOffset, 0],
    rotate: [0, rotation, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
});

// Progress bar animation
export const progressBar = (width: string = '95%', duration: number = 1.5, delay: number = 0.5) => ({
  initial: { width: 0 },
  animate: { 
    width,
    transition: { 
      duration, 
      delay,
      ease: 'easeOut' as const,
    }
  },
});

// Viewport animation trigger (for scroll-based animations)
export const viewportAnimation = {
  viewport: { 
    once: true,
    margin: '-50px' // Trigger slightly before element is visible
  },
};

// Card hover effect
export const cardHover = (yOffset: number = -8) => ({
  whileHover: { 
    y: yOffset,
    transition: { duration: 0.2, ease: 'easeOut' as const }
  },
});

// Menu animation
export const menuAnimation: Variants = {
  initial: { 
    opacity: 0,
    x: '100%'
  },
  animate: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// Backdrop animation
export const backdropAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  },
};

// Scroll indicator animation
export const scrollIndicator = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// Stats counter animation
export const statsAnimation: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.5 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// List item animation
export const listItemAnimation: Variants = {
  initial: { 
    opacity: 0, 
    x: -10 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
    }
  },
};
