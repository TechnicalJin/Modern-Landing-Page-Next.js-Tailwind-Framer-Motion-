/**
 * Reusable Framer Motion animation variants
 * Optimized for performance and consistency
 * Now with reduced motion and mobile support
 */

import { Variants } from 'framer-motion';

/**
 * Animation configuration types
 */
export interface AnimationConfig {
  shouldAnimate: boolean;
  shouldSimplify: boolean;
  durationMultiplier: number;
  distanceMultiplier: number;
}

/**
 * Creates optimized variants based on user preferences and device
 */
export function createOptimizedVariants(
  baseVariants: Variants,
  config?: Partial<AnimationConfig>
): Variants {
  const {
    shouldAnimate = true,
    shouldSimplify = false,
    durationMultiplier = 1,
    distanceMultiplier = 1,
  } = config || {};

  if (!shouldAnimate) {
    // Return instant transitions for reduced motion
    return {
      initial: baseVariants.animate || {},
      animate: baseVariants.animate || {},
    };
  }

  // Apply duration and distance multipliers for mobile
  const optimizedVariants = { ...baseVariants };
  
  if (shouldSimplify && optimizedVariants.animate) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animate = optimizedVariants.animate as any;
    if (animate.transition) {
      animate.transition = {
        ...animate.transition,
        duration: (animate.transition.duration || 0.6) * durationMultiplier,
      };
    }
    
    // Reduce movement distance on mobile
    if (animate.y && typeof animate.y === 'number') {
      animate.y = animate.y * distanceMultiplier;
    }
    if (animate.x && typeof animate.x === 'number') {
      animate.x = animate.x * distanceMultiplier;
    }
  }

  return optimizedVariants;
}

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

// ============================================
// OPTIMIZED VARIANTS FOR MOBILE & REDUCED MOTION
// ============================================

/**
 * Simplified fade in - minimal motion for accessibility
 */
export const fadeInSimple: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

/**
 * Reduced motion variants - respects user preferences
 */
export const reducedMotionFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.01 } // Near instant for reduced motion
  },
};

/**
 * Mobile-optimized fade in from bottom (shorter distance)
 */
export const fadeInUpMobile: Variants = {
  initial: {
    opacity: 0,
    y: 15, // Reduced from 30
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Faster on mobile
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Mobile-optimized fade in from right (shorter distance)
 */
export const fadeInRightMobile: Variants = {
  initial: {
    opacity: 0,
    x: 50, // Reduced from 100
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Optimized card hover for mobile - no transform to avoid reflows
 */
export const cardHoverMobile = {
  whileHover: { 
    opacity: 0.95,
    transition: { duration: 0.2 }
  },
};

/**
 * Optimized button hover for mobile
 */
export const buttonHoverMobile = {
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  },
};

/**
 * Performance-optimized floating animation
 * Uses will-change and transform for better GPU acceleration
 */
export const floatingOptimized = (duration: number = 4, yOffset: number = 15) => ({
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      repeatType: 'loop' as const,
    },
  },
  style: {
    willChange: 'transform', // Hint browser for GPU acceleration
  },
});

/**
 * No animation variant - for reduced motion preference
 */
export const noAnimation: Variants = {
  initial: {},
  animate: {},
};

/**
 * Helper function to get appropriate variant based on context
 */
export function getResponsiveVariant(
  isMobile: boolean,
  prefersReducedMotion: boolean,
  desktopVariant: Variants,
  mobileVariant?: Variants,
  reducedMotionVariant?: Variants
): Variants {
  if (prefersReducedMotion) {
    return reducedMotionVariant || noAnimation;
  }
  if (isMobile && mobileVariant) {
    return mobileVariant;
  }
  return desktopVariant;
}

/**
 * Viewport animation with performance optimization
 * Only triggers animation once when in view
 */
export const viewportAnimationOptimized = {
  viewport: { 
    once: true, // Animate only once
    margin: '-100px', // Trigger before element is visible
    amount: 0.3, // Trigger when 30% visible
  },
};
