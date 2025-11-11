/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Web Vitals Tracking
 * Monitors and reports Core Web Vitals metrics
 */

import type { Metric } from 'web-vitals';

/**
 * Web Vitals thresholds (Google's recommended values)
 * Note: FID has been deprecated in favor of INP (Interaction to Next Paint)
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay (deprecated, use INP)
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint (replaces FID)
} as const;

/**
 * Determine metric rating based on thresholds
 */
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS];
  
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Send Web Vitals to analytics
 */
function sendToAnalytics(metric: Metric) {
  const { name, value, id, rating } = metric;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const metricRating = getMetricRating(name, value);
    const emoji = metricRating === 'good' ? '✅' : metricRating === 'needs-improvement' ? '⚠️' : '❌';
    
    console.log(`${emoji} ${name}:`, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      unit: name === 'CLS' ? 'score' : 'ms',
      rating: metricRating,
      id,
    });
  }

  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', {
      name: 'web-vitals',
      data: {
        metric: name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        rating,
        id,
      },
    });
  }

  // Send to custom endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      metric: name,
      value,
      rating,
      id,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    // Use sendBeacon if available for better reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body);
    } else {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error);
    }
  }
}

/**
 * Report all Web Vitals
 */
export function reportWebVitals(metric: Metric) {
  sendToAnalytics(metric);
}

/**
 * Initialize Web Vitals tracking
 * Call this in your layout or _app file
 */
export async function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    // Note: FID is deprecated in web-vitals v4, replaced by INP
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');

    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
  } catch (error) {
    console.error('Failed to load web-vitals:', error);
  }
}

/**
 * Get current Web Vitals (for debugging)
 */
export async function getCurrentWebVitals() {
  if (typeof window === 'undefined') return null;

  try {
    // Note: FID is deprecated in web-vitals v4, replaced by INP
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
    
    const metrics: Record<string, number> = {};

    const recordMetric = (metric: Metric) => {
      metrics[metric.name] = metric.value;
    };

    onCLS(recordMetric);
    onFCP(recordMetric);
    onLCP(recordMetric);
    onTTFB(recordMetric);
    onINP(recordMetric);

    return metrics;
  } catch (error) {
    console.error('Failed to get web vitals:', error);
    return null;
  }
}

/**
 * Create a Web Vitals report summary
 */
export function createWebVitalsReport(metrics: Record<string, number>) {
  const report: Array<{
    metric: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    threshold: { good: number; needsImprovement: number };
  }> = [];

  Object.entries(metrics).forEach(([name, value]) => {
    const threshold = WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS];
    
    if (threshold) {
      report.push({
        metric: name,
        value,
        rating: getMetricRating(name, value),
        threshold,
      });
    }
  });

  return report;
}

export default reportWebVitals;
