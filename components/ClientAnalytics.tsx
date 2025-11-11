'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/webVitals';
import { initAnalytics } from '@/lib/analytics';

/**
 * Client-side analytics initialization component
 * Handles Web Vitals tracking and Google Analytics integration
 */
export function ClientAnalytics() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals();
    
    // Initialize Google Analytics (only in production)
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      initAnalytics();
    }
  }, []);

  // This component doesn't render anything
  return null;
}
