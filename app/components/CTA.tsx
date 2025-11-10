"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="py-20 px-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s create something amazing together. Transform your vision into a stunning digital reality.
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold group shadow-lg"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-6 text-lg font-semibold"
            >
              View Portfolio
            </Button>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-8 text-indigo-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
