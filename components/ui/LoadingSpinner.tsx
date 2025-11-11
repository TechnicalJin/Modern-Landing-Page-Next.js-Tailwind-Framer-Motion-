'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type SpinnerVariant = 'spinner' | 'dots' | 'pulse' | 'ring' | 'bars';
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  className?: string;
  label?: string;
}

const sizeMap: Record<SpinnerSize, { width: number; height: number; text: string }> = {
  sm: { width: 16, height: 16, text: 'text-xs' },
  md: { width: 32, height: 32, text: 'text-sm' },
  lg: { width: 48, height: 48, text: 'text-base' },
  xl: { width: 64, height: 64, text: 'text-lg' },
};

/**
 * Spinning circle loader
 */
const SpinnerLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <motion.div
    className="relative"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <div
      className="absolute inset-0 rounded-full border-4"
      style={{
        borderColor: `${color}20`,
        borderTopColor: color,
      }}
    />
  </motion.div>
);

/**
 * Three dots loader
 */
const DotsLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const dotSize = size / 4;
  const gap = size / 8;

  return (
    <div className="flex items-center justify-center" style={{ gap }}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -dotSize, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Pulsing circle loader
 */
const PulseLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <div className="relative" style={{ width: size, height: size }}>
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: color,
        }}
        initial={{ opacity: 0.8, scale: 0.8 }}
        animate={{
          opacity: [0.8, 0.2, 0.8],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.4,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

/**
 * Ring loader with gradient
 */
const RingLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <motion.div
    className="relative"
    style={{ width: size, height: size }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: `conic-gradient(from 0deg, transparent 0%, ${color} 100%)`,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
    <div
      className="absolute rounded-full bg-white dark:bg-gray-900"
      style={{
        inset: size / 6,
      }}
    />
  </motion.div>
);

/**
 * Bars loader
 */
const BarsLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const barWidth = size / 8;
  const barGap = size / 12;
  const barCount = 5;

  return (
    <div
      className="flex items-end justify-center"
      style={{ height: size, gap: barGap }}
    >
      {Array.from({ length: barCount }).map((_, index) => (
        <motion.div
          key={index}
          className="rounded-sm"
          style={{
            width: barWidth,
            backgroundColor: color,
          }}
          animate={{
            height: [size * 0.3, size * 0.8, size * 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * LoadingSpinner Component
 * Displays various animated loading indicators
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = 'spinner',
  size = 'md',
  color = '#3b82f6', // blue-500
  className = '',
  label,
}) => {
  const { width, height, text } = sizeMap[size];

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader size={width} color={color} />;
      case 'pulse':
        return <PulseLoader size={width} color={color} />;
      case 'ring':
        return <RingLoader size={width} color={color} />;
      case 'bars':
        return <BarsLoader size={width} color={color} />;
      case 'spinner':
      default:
        return <SpinnerLoader size={width} color={color} />;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label || 'Loading...'}
    >
      {renderLoader()}
      {label && (
        <p className={`font-medium text-gray-600 dark:text-gray-400 ${text}`}>
          {label}
        </p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Inline spinner for buttons
 */
export const ButtonSpinner: React.FC<{ color?: string; size?: number }> = ({
  color = '#ffffff',
  size = 16,
}) => (
  <motion.div
    className="inline-block"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 0.8,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <div
      className="rounded-full border-2"
      style={{
        width: size,
        height: size,
        borderColor: `${color}40`,
        borderTopColor: color,
      }}
    />
  </motion.div>
);

/**
 * Full screen loading overlay
 */
export const LoadingOverlay: React.FC<{
  variant?: SpinnerVariant;
  message?: string;
  backdrop?: boolean;
}> = ({ variant = 'spinner', message = 'Loading...', backdrop = true }) => (
  <motion.div
    className={`fixed inset-0 z-50 flex items-center justify-center ${
      backdrop ? 'bg-black/50 backdrop-blur-sm' : ''
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <LoadingSpinner variant={variant} size="lg" label={message} />
    </motion.div>
  </motion.div>
);

/**
 * Skeleton loader for content placeholders
 */
export const SkeletonLine: React.FC<{
  width?: string;
  height?: string;
  className?: string;
}> = ({ width = '100%', height = '16px', className = '' }) => (
  <motion.div
    className={`rounded bg-gray-200 dark:bg-gray-700 ${className}`}
    style={{ width, height }}
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export default LoadingSpinner;
