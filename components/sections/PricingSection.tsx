"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { 
  fadeInUp, 
  cardHover, 
  listItemAnimation, 
  buttonHover, 
  viewportAnimationOptimized,
  getResponsiveVariant,
  fadeInUpMobile,
  reducedMotionFadeIn,
  buttonHoverMobile,
  cardHoverMobile
} from '@/utils/animationVariants';
import { useAnimationConfig } from '@/hooks/useReducedMotion';

const pricingPlans = [
  {
    name: "Starter",
    price: "$999",
    description: "Perfect for small businesses",
    features: [
      "Single page website",
      "Responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 month support",
      "Free hosting setup"
    ],
    highlighted: false,
    gradient: "from-slate-600 to-slate-700"
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Most popular for growing businesses",
    features: [
      "Up to 5 pages",
      "Advanced animations",
      "Premium SEO optimization",
      "Blog integration",
      "E-commerce ready",
      "Analytics dashboard",
      "3 months premium support",
      "Free SSL certificate"
    ],
    highlighted: true,
    gradient: "from-blue-600 to-cyan-500",
    badge: "MOST POPULAR"
  },
  {
    name: "Enterprise",
    price: "$4,999",
    description: "For large-scale projects",
    features: [
      "Unlimited pages",
      "Custom animations & interactions",
      "Advanced SEO & Analytics",
      "Full CMS integration",
      "Complete e-commerce solution",
      "API integrations",
      "6 months priority support",
      "Dedicated account manager",
      "Monthly performance reports"
    ],
    highlighted: false,
    gradient: "from-purple-600 to-pink-600"
  }
];

export default function PricingSection() {
  const animationConfig = useAnimationConfig();
  
  // Get responsive variants
  const titleVariant = getResponsiveVariant(
    animationConfig.shouldSimplify,
    !animationConfig.shouldAnimate,
    fadeInUp,
    fadeInUpMobile,
    reducedMotionFadeIn
  );

  const hoverVariant = animationConfig.shouldSimplify ? buttonHoverMobile : buttonHover;
  const getCardVariant = (highlighted: boolean) => 
    animationConfig.shouldSimplify 
      ? cardHoverMobile 
      : cardHover(highlighted ? -16 : -12);

  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements - only on desktop with animations */}
      {animationConfig.enableScrollAnimations && (
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={titleVariant}
          {...viewportAnimationOptimized}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileInView="animate"
              variants={titleVariant}
              {...viewportAnimationOptimized}
              transition={{ delay: (i * 0.1) * animationConfig.durationMultiplier }}
              {...getCardVariant(plan.highlighted)}
              style={{ willChange: 'transform, opacity' }}
              className={`relative ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full shadow-lg">
                  ⭐ {plan.badge}
                </div>
              )}
              
              <div className={`h-full bg-white dark:bg-slate-800 rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'border-2 border-blue-500 dark:border-cyan-500 shadow-2xl shadow-blue-500/20' 
                  : 'border border-slate-200 dark:border-slate-700 shadow-lg'
              } transition-all`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-600 dark:text-slate-400">/ project</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial="initial"
                      whileInView="animate"
                      variants={listItemAnimation}
                      {...viewportAnimationOptimized}
                      transition={{ delay: (0.05 * idx) * animationConfig.durationMultiplier }}
                      className="flex items-start gap-3"
                    >
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  {...hoverVariant}
                  className={`w-full py-4 rounded-xl font-medium transition-all ${
                    plan.highlighted
                      ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          variants={titleVariant}
          {...viewportAnimationOptimized}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400">
            Need a custom solution?{" "}
            <a href="#contact" className="text-blue-600 dark:text-cyan-400 font-semibold hover:underline">
              Contact us
            </a>{" "}
            for a personalized quote
          </p>
        </motion.div>
      </div>
    </section>
  );
}
