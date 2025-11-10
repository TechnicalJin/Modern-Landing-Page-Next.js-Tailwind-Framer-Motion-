"use client";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
}

export default function MotionWrapper({ 
  children, 
  delay = 0,
  duration = 0.6,
  y = 40,
  x = 0,
  className = ""
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
