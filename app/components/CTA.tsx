"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 dark:from-indigo-700 dark:via-indigo-800 dark:to-purple-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 text-indigo-100 dark:text-indigo-200 max-w-2xl mx-auto leading-relaxed px-4">
            Let&apos;s create something amazing together. Transform your vision into a stunning digital reality.
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-indigo-700 dark:hover:bg-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold group shadow-lg"
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-indigo-600 dark:hover:bg-gray-100 dark:hover:text-indigo-700 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
            >
              View Portfolio
            </Button>
          </motion.div>

          <motion.div 
            className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 text-indigo-100 dark:text-indigo-200 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
              <div className="text-xs sm:text-sm mt-1">Projects Delivered</div>
            </div>
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-white">98%</div>
              <div className="text-xs sm:text-sm mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center min-w-[100px]">
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-xs sm:text-sm mt-1">Support Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
