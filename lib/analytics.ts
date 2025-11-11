/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Analytics Integration
 * Vercel Analytics + Google Analytics 4
 */

/**
 * Google Analytics 4 Configuration
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics 4
 */
export function initGoogleAnalytics() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
}

/**
 * Track page view in Google Analytics
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  if ((window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

/**
 * Track custom event in Google Analytics
 */
export function trackEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  if ((window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent('button_click', 'engagement', `${buttonName}${location ? ` - ${location}` : ''}`);
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'forms',
    formName
  );
}

/**
 * Track navigation
 */
export function trackNavigation(from: string, to: string) {
  trackEvent('navigation', 'user_flow', `${from} -> ${to}`);
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', 'engagement', `${depth}%`, depth);
}

/**
 * Track outbound link click
 */
export function trackOutboundLink(url: string) {
  trackEvent('outbound_click', 'engagement', url);
}

/**
 * Track error
 */
export function trackError(error: Error, context?: string) {
  trackEvent('error', 'exceptions', `${context ? context + ': ' : ''}${error.message}`);
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Analytics Error:', { error, context });
  }
}

/**
 * Track user timing (performance)
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  if ((window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: variable,
      value: Math.round(value),
      event_category: category,
      event_label: label,
    });
  }
}

/**
 * Initialize scroll depth tracking
 */
export function initScrollTracking() {
  if (typeof window === 'undefined') return;

  const milestones = [25, 50, 75, 100];
  const reached = new Set<number>();

  const checkScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    milestones.forEach((milestone) => {
      if (scrollPercentage >= milestone && !reached.has(milestone)) {
        reached.add(milestone);
        trackScrollDepth(milestone);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Initialize performance tracking
 */
export function initPerformanceTracking() {
  if (typeof window === 'undefined') return;

  // Track page load time
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

      trackTiming('performance', 'page_load', pageLoadTime, window.location.pathname);
      trackTiming('performance', 'dom_ready', domReadyTime, window.location.pathname);
    }, 0);
  });
}

/**
 * Track user engagement time
 */
export function initEngagementTracking() {
  if (typeof window === 'undefined') return;

  let startTime = Date.now();
  let isActive = true;

  const trackEngagement = () => {
    const engagementTime = Date.now() - startTime;
    trackTiming('engagement', 'time_on_page', engagementTime, window.location.pathname);
  };

  // Track when user leaves
  window.addEventListener('beforeunload', trackEngagement);

  // Track when user becomes inactive
  let inactiveTimeout: NodeJS.Timeout;
  
  const resetInactiveTimer = () => {
    clearTimeout(inactiveTimeout);
    
    if (!isActive) {
      startTime = Date.now();
      isActive = true;
    }
    
    inactiveTimeout = setTimeout(() => {
      trackEngagement();
      isActive = false;
    }, 30000); // 30 seconds of inactivity
  };

  ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactiveTimer, { passive: true });
  });

  resetInactiveTimer();

  return () => {
    clearTimeout(inactiveTimeout);
    window.removeEventListener('beforeunload', trackEngagement);
  };
}

/**
 * Initialize all analytics
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics
  initGoogleAnalytics();

  // Initialize tracking
  initScrollTracking();
  initPerformanceTracking();
  initEngagementTracking();

  // Log initialization in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics initialized');
  }
}

export default {
  init: initAnalytics,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackFormSubmit,
  trackNavigation,
  trackScrollDepth,
  trackOutboundLink,
  trackError,
  trackTiming,
};
