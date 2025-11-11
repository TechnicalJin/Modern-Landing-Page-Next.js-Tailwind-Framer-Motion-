/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ProgressBarProps {
  /** Position of the progress bar */
  position?: 'top' | 'bottom';
  /** Height of the progress bar in pixels */
  height?: number;
  /** Color of the progress bar */
  color?: string;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Smooth animation */
  smooth?: boolean;
  /** Z-index value */
  zIndex?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProgressBar Component
 * Displays a scroll progress indicator that shows how far the user has scrolled
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  position = 'top',
  height = 3,
  color = 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
  showPercentage = false,
  smooth = true,
  zIndex = 50,
  className = '',
}) => {
  const { scrollYProgress } = useScroll();
  
  // Always call useSpring, but choose which value to use
  const springValue = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const scaleX = smooth ? springValue : scrollYProgress;

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!showPercentage) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress, showPercentage]);

  const barStyle: React.CSSProperties = {
    height: `${height}px`,
    background: color,
    zIndex,
  };

  const positionClasses = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <>
      <motion.div
        className={`fixed left-0 right-0 origin-left ${positionClasses} ${className}`}
        style={{ ...barStyle, scaleX }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label="Page scroll progress"
      />
      {showPercentage && (
        <motion.div
          className="fixed right-4 top-4 z-50 rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow-lg dark:bg-gray-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: percentage > 5 ? 1 : 0, scale: percentage > 5 ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {percentage}%
          </span>
        </motion.div>
      )}
    </>
  );
};

/**
 * Circular Progress Indicator
 */
export const CircularProgress: React.FC<{
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  className?: string;
}> = ({
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  className = '',
}) => {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  const circumference = (size - strokeWidth) * Math.PI;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Reading Progress Bar (for blog posts)
 */
export const ReadingProgress: React.FC<{
  target?: React.RefObject<HTMLElement>;
  color?: string;
  height?: number;
}> = ({ target, color = '#3b82f6', height = 4 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (target?.current) {
        const element = target.current;
        const rect = element.getBoundingClientRect();
        const elementHeight = element.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        const scrolled = Math.max(0, -rect.top);
        const maxScroll = elementHeight - viewportHeight;
        const percentage = Math.min(100, (scrolled / maxScroll) * 100);
        
        setProgress(percentage);
      } else {
        // Fallback to window scroll
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [target]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <motion.div
        className="h-1 origin-left"
        style={{
          backgroundColor: color,
          height: `${height}px`,
          width: `${progress}%`,
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

/**
 * Step Progress Indicator (for multi-step forms)
 */
export const StepProgress: React.FC<{
  steps: string[];
  currentStep: number;
  completedColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}> = ({
  steps,
  currentStep,
  completedColor = '#10b981',
  activeColor = '#3b82f6',
  inactiveColor = '#d1d5db',
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const stepNumber = index + 1;

          let color = inactiveColor;
          if (isCompleted) color = completedColor;
          if (isActive) color = activeColor;

          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: color,
                  }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-bold text-white">{stepNumber}</span>
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="relative flex-1 px-2">
                  <div
                    className="h-1 rounded"
                    style={{ backgroundColor: inactiveColor }}
                  />
                  <motion.div
                    className="absolute left-2 top-0 h-1 rounded"
                    style={{ backgroundColor: completedColor }}
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
