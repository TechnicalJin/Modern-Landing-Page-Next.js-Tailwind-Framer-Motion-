"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Star, Zap, Shield, Rocket, 
  Code, Smartphone, Search, Mail, ChevronDown, Play, Users,
  Award, Globe, Moon, Sun, MessageCircle,
  ChevronRight, CheckCircle
} from 'lucide-react';

// Import optimized hooks
import { useAnimationConfig } from '@/hooks/useReducedMotion';
import { useActiveSection } from '@/hooks/useOptimizedScroll';

// Import skeleton loaders for CLS prevention
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Import animation utilities
import {
  fadeInUp,
  fadeInRight,
  scaleIn,
  floatingOptimized,
  progressBar,
  viewportAnimationOptimized,
  cardHover,
  menuAnimation,
  backdropAnimation,
  scrollIndicator,
  statsAnimation,
  buttonHover,
  getResponsiveVariant,
  fadeInUpMobile,
  fadeInRightMobile,
  buttonHoverMobile,
  cardHoverMobile,
  reducedMotionFadeIn,
} from '@/utils/animationVariants';

// Lazy load heavy sections for better initial page load with proper loading states
const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), {
  loading: () => (
    <div className="py-24 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <SkeletonLoader type="text" lines={2} className="max-w-2xl mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <SkeletonLoader type="card" height="400px" />
          <SkeletonLoader type="card" height="400px" />
          <SkeletonLoader type="card" height="400px" />
        </div>
      </div>
    </div>
  ),
  ssr: true, // Still render on server for SEO
});

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => (
    <div className="py-24 px-4 min-h-[400px] flex items-center justify-center bg-slate-900">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <SkeletonLoader type="text" lines={2} className="max-w-2xl mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <SkeletonLoader type="testimonial" />
          <SkeletonLoader type="testimonial" />
          <SkeletonLoader type="testimonial" />
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

const FooterSection = dynamic(() => import('@/components/sections/FooterSection'), {
  loading: () => <div className="py-12 bg-slate-900 min-h-[200px]" style={{ minHeight: '400px' }}></div>,
  ssr: true,
});

export default function EnhancedLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Optimized scroll handling with IntersectionObserver
  const activeSection = useActiveSection(['home', 'features', 'process', 'pricing', 'testimonials']);
  
  // Animation configuration based on user preferences
  const animationConfig = useAnimationConfig();
  
  // Scroll progress for header
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Get responsive animation variants
  const heroVariant = getResponsiveVariant(
    animationConfig.shouldSimplify,
    !animationConfig.shouldAnimate,
    fadeInUp,
    fadeInUpMobile,
    reducedMotionFadeIn
  );

  const featureVariant = getResponsiveVariant(
    animationConfig.shouldSimplify,
    !animationConfig.shouldAnimate,
    fadeInRight,
    fadeInRightMobile,
    reducedMotionFadeIn
  );

  const hoverVariant = animationConfig.shouldSimplify ? buttonHoverMobile : buttonHover;
  const cardVariant = animationConfig.shouldSimplify ? cardHoverMobile : cardHover();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50'}`}>
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Enhanced Navbar - Fixed height to prevent CLS */}
      <nav className="fixed w-full z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent whitespace-nowrap">
                TechVista
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Features', 'Process', 'Pricing', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              >
                Get Started
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              variants={backdropAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
            <motion.div
              variants={menuAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 z-40 p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-6 mt-16">
                {['Home', 'Features', 'Process', 'Pricing', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium">
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section - Optimized for LCP and CLS */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden hero-container">
        {/* Animated Background - Only render on desktop with animations enabled */}
        {animationConfig.enableScrollAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        )}

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div
            variants={heroVariant}
            initial="initial"
            animate="animate"
            style={{ willChange: animationConfig.shouldAnimate ? 'transform, opacity' : 'auto' }}
          >
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 * animationConfig.durationMultiplier }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-6"
              style={{ willChange: animationConfig.shouldAnimate ? 'transform, opacity' : 'auto' }}
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ✨ Trusted by 500+ Companies
              </span>
            </motion.div>

            {/* Hero heading - Critical for LCP */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" style={{ minHeight: '180px' }}>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent block">
                Transform Your
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent block">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed" style={{ minHeight: '56px' }}>
              Build lightning-fast, responsive websites that convert visitors into loyal customers. Experience the power of modern web technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8" style={{ minHeight: '56px' }}>
              <motion.button
                {...hoverVariant}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                {...hoverVariant}
                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-500 transition-all flex items-center justify-center gap-2 group"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={featureVariant}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 * animationConfig.durationMultiplier }}
            className="relative"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                {...(animationConfig.enableScrollAnimations ? floatingOptimized(4, 20) : {})}
                className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700"
                style={{ willChange: animationConfig.enableScrollAnimations ? 'transform' : 'auto' }}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Performance</div>
                        <div className="text-sm text-slate-500">Lightning Fast</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-500">98%</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Load Time</span>
                      <span className="font-semibold text-slate-900 dark:text-white">0.8s</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        {...progressBar('95%', 1.5, 0.5)}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {[
                      { icon: Users, label: 'Users', value: '10K+' },
                      { icon: Globe, label: 'Countries', value: '50+' },
                      { icon: Award, label: 'Awards', value: '15' }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        variants={statsAnimation}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="text-center"
                      >
                        <stat.icon className="w-6 h-6 mx-auto mb-1 text-blue-600 dark:text-cyan-400" />
                        <div className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements - Only on desktop with animations */}
              {animationConfig.enableScrollAnimations && (
                <>
                  <motion.div
                    {...floatingOptimized(3, 15)}
                    className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center"
                    style={{ willChange: 'transform' }}
                  >
                    <Star className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.div
                    {...floatingOptimized(4, 15)}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center"
                    style={{ willChange: 'transform' }}
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Only show with animations enabled */}
        {animationConfig.shouldAnimate && (
          <motion.div
            {...scrollIndicator}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        )}
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={heroVariant}
            initial="initial"
            whileInView="animate"
            {...viewportAnimationOptimized}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Powerful Features for
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to create stunning, high-performing websites
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Zap, 
                title: "Lightning Fast", 
                desc: "Optimized for speed with 99+ Lighthouse scores and sub-second load times",
                color: "from-yellow-500 to-orange-500",
                bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
              },
              { 
                icon: Smartphone, 
                title: "Fully Responsive", 
                desc: "Perfect experience across all devices with mobile-first design approach",
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-50 dark:bg-blue-900/20"
              },
              { 
                icon: Search, 
                title: "SEO Optimized", 
                desc: "Built-in SEO best practices to rank higher in search engines",
                color: "from-green-500 to-emerald-500",
                bgColor: "bg-green-50 dark:bg-green-900/20"
              },
              { 
                icon: Shield, 
                title: "Secure & Reliable", 
                desc: "Enterprise-grade security with 99.9% uptime guarantee",
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-50 dark:bg-purple-900/20"
              },
              { 
                icon: Rocket, 
                title: "Quick Deployment", 
                desc: "Deploy your website in minutes with automated CI/CD pipeline",
                color: "from-red-500 to-rose-500",
                bgColor: "bg-red-50 dark:bg-red-900/20"
              },
              { 
                icon: Code, 
                title: "Clean Code", 
                desc: "Well-documented, maintainable code following industry standards",
                color: "from-indigo-500 to-purple-500",
                bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={heroVariant}
                initial="initial"
                whileInView="animate"
                {...viewportAnimationOptimized}
                transition={{ delay: (i * 0.1) * animationConfig.durationMultiplier }}
                {...cardVariant}
                className="group"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="h-full bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-500 transition-all shadow-lg hover:shadow-2xl">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                  <button className="text-blue-600 dark:text-cyan-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-4 bg-slate-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Simple <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">4-Step Process</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From concept to launch, we make it effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We understand your vision and goals", icon: Search },
              { step: "02", title: "Design", desc: "Create stunning mockups and prototypes", icon: Smartphone },
              { step: "03", title: "Develop", desc: "Build with modern technologies", icon: Code },
              { step: "04", title: "Deploy", desc: "Launch your site to the world", icon: Rocket }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < 3 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30" />
                )}
                <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all group">
                  <div className="text-5xl font-bold text-slate-700 group-hover:text-slate-600 transition-colors mb-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lazy-loaded sections for better performance */}
      <PricingSection />
      
      <TestimonialsSection />

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "500+", label: "Projects Delivered", icon: Rocket },
              { value: "98%", label: "Client Satisfaction", icon: Award },
              { value: "50+", label: "Countries Served", icon: Globe },
              { value: "24/7", label: "Support Available", icon: MessageCircle }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4" />
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 dark:from-black dark:via-slate-900 dark:to-blue-950" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of successful companies who chose TechVista for their digital transformation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Mail className="w-5 h-5" />
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all"
              >
                Schedule a Call
              </motion.button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>No commitment required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lazy-loaded Footer */}
      <FooterSection />

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 1 : 0, scale: scrollYProgress.get() > 0.1 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center z-30"
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </div>
  );
}