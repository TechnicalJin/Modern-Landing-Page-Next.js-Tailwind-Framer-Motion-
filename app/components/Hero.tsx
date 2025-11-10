"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 pt-24 max-w-7xl mx-auto"
    >
      <div className="max-w-xl mb-10 md:mb-0">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight"
        >
          Elevate Your Business with Modern Web Design
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-600 mb-8 leading-relaxed"
        >
          Build fast, responsive, and beautiful websites that convert visitors into customers. 
          Experience the power of modern web technologies.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex gap-4"
        >
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg group">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg border-2 hover:border-indigo-600 hover:text-indigo-600">
            Learn More
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-lg">
          {/* Placeholder for hero image - using a gradient box */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 shadow-2xl flex items-center justify-center">
            <div className="text-white text-center p-8">
              <svg 
                className="w-32 h-32 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <p className="text-xl font-semibold">Modern Design</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-200 rounded-full blur-2xl opacity-60"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-60"></div>
        </div>
      </motion.div>
    </section>
  );
}
