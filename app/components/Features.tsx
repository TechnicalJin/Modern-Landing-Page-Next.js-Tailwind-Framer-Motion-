"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Smartphone, Search, Shield, Rocket, Code } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./animations/AnimationComponents";
import MotionWrapper from "./animations/MotionWrapper";

export default function Features() {
  const features = [
    { 
      title: "Lightning Fast", 
      desc: "Optimized Next.js apps with high Lighthouse score and blazing-fast performance.",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    { 
      title: "Responsive Design", 
      desc: "Looks great on all devices with TailwindCSS mobile-first approach.",
      icon: Smartphone,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    { 
      title: "SEO Optimized", 
      desc: "Built with semantic tags and best practices for search engine visibility.",
      icon: Search,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    { 
      title: "Secure & Reliable", 
      desc: "Industry-standard security practices and reliable hosting infrastructure.",
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    { 
      title: "Fast Deployment", 
      desc: "Deploy to production in minutes with Vercel's seamless integration.",
      icon: Rocket,
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    { 
      title: "Clean Code", 
      desc: "Maintainable, well-documented TypeScript code following best practices.",
      icon: Code,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    },
  ];
  
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose Us?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            We deliver exceptional web experiences with cutting-edge technology and best practices
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3 }
                  }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-md group dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <motion.div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${feature.bgColor} dark:bg-opacity-20 flex items-center justify-center mb-4 ${feature.color}`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors dark:text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
