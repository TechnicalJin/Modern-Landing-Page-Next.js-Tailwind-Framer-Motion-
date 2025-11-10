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
    <section id="features" className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver exceptional web experiences with cutting-edge technology and best practices
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-md group">
                    <CardHeader>
                      <motion.div 
                        className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color}`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                      <CardTitle className="text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">
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
