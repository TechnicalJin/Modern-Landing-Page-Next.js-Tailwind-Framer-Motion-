/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { 
  fadeInUp, 
  cardHover, 
  viewportAnimationOptimized,
  getResponsiveVariant,
  fadeInUpMobile,
  reducedMotionFadeIn,
  cardHoverMobile
} from '@/utils/animationVariants';
import { useAnimationConfig } from '@/hooks/useReducedMotion';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    image: "SJ",
    rating: 5,
    text: "TechVista transformed our online presence completely. The website is blazing fast and our conversion rate increased by 150%!",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Michael Chen",
    role: "Founder, Digital Solutions",
    image: "MC",
    rating: 5,
    text: "Outstanding work! The team delivered exactly what we needed, on time and within budget. Highly recommended for any business.",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthCo",
    image: "ER",
    rating: 5,
    text: "The attention to detail and modern design exceeded our expectations. Our users love the new interface and so do we!",
    color: "from-green-500 to-emerald-500"
  }
];

export default function TestimonialsSection() {
  const animationConfig = useAnimationConfig();
  
  const titleVariant = getResponsiveVariant(
    animationConfig.shouldSimplify,
    !animationConfig.shouldAnimate,
    fadeInUp,
    fadeInUpMobile,
    reducedMotionFadeIn
  );

  const cardVariant = animationConfig.shouldSimplify ? cardHoverMobile : cardHover(-8);

  return (
    <section id="testimonials" className="py-24 px-4 bg-slate-900 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={titleVariant}
          {...viewportAnimationOptimized}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Loved by <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            See what our clients say about working with us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileInView="animate"
              variants={titleVariant}
              {...viewportAnimationOptimized}
              transition={{ delay: (i * 0.1) * animationConfig.durationMultiplier }}
              {...cardVariant}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all relative"
              style={{ willChange: 'transform, opacity' }}
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-700 opacity-50" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-xl font-bold`}>
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
