/**
 * SkeletonLoader Component
 * 
 * Prevents Cumulative Layout Shift (CLS) by reserving space for content.
 * Provides visual feedback while content is loading.
 * 
 * Usage:
 * <SkeletonLoader type="card" />
 * <SkeletonLoader type="text" lines={3} />
 * <SkeletonLoader type="avatar" size={48} />
 */

"use client";

import React from 'react';

interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'avatar' | 'image' | 'button' | 'testimonial';
  lines?: number;
  size?: number;
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonLoader({
  type = 'text',
  lines = 1,
  size = 40,
  width,
  height,
  className = '',
}: SkeletonLoaderProps) {
  // Base skeleton class with animation
  const baseClass = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded';

  switch (type) {
    case 'avatar':
      return (
        <div
          className={`${baseClass} rounded-full ${className}`}
          style={{ width: size, height: size }}
          role="status"
          aria-label="Loading avatar"
        >
          <span className="sr-only">Loading...</span>
        </div>
      );

    case 'image':
      return (
        <div
          className={`${baseClass} ${className}`}
          style={{ width: width || '100%', height: height || '200px' }}
          role="status"
          aria-label="Loading image"
        >
          <span className="sr-only">Loading...</span>
        </div>
      );

    case 'button':
      return (
        <div
          className={`${baseClass} ${className}`}
          style={{ width: width || '120px', height: height || '40px' }}
          role="status"
          aria-label="Loading button"
        >
          <span className="sr-only">Loading...</span>
        </div>
      );

    case 'card':
      return (
        <div
          className={`${baseClass} p-6 ${className}`}
          style={{ width: width || '100%', height: height || '300px' }}
          role="status"
          aria-label="Loading card"
        >
          <div className="space-y-4">
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      );

    case 'testimonial':
      return (
        <div
          className={`bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 ${className}`}
          style={{ width: width || '100%', minHeight: height || '280px' }}
          role="status"
          aria-label="Loading testimonial"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar skeleton */}
            <div className={`${baseClass} rounded-full`} style={{ width: 64, height: 64 }}></div>
            <div className="flex-1 space-y-2">
              <div className={`${baseClass} h-4 w-32`}></div>
              <div className={`${baseClass} h-3 w-48`}></div>
            </div>
          </div>
          
          {/* Rating skeleton */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`${baseClass} w-5 h-5`}></div>
            ))}
          </div>
          
          {/* Text skeleton */}
          <div className="space-y-3">
            <div className={`${baseClass} h-3 w-full`}></div>
            <div className={`${baseClass} h-3 w-full`}></div>
            <div className={`${baseClass} h-3 w-3/4`}></div>
          </div>
          
          <span className="sr-only">Loading testimonial...</span>
        </div>
      );

    case 'text':
    default:
      return (
        <div className={`space-y-2 ${className}`} role="status" aria-label="Loading text">
          {[...Array(lines)].map((_, i) => (
            <div
              key={i}
              className={`${baseClass} h-4`}
              style={{
                width: i === lines - 1 ? '80%' : '100%',
              }}
            ></div>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      );
  }
}

/**
 * Skeleton variants for common patterns
 */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return <SkeletonLoader type="card" className={className} />;
}

export function TestimonialSkeleton({ className = '' }: { className?: string }) {
  return <SkeletonLoader type="testimonial" className={className} />;
}

export function AvatarSkeleton({ size = 40, className = '' }: { size?: number; className?: string }) {
  return <SkeletonLoader type="avatar" size={size} className={className} />;
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return <SkeletonLoader type="text" lines={lines} className={className} />;
}
