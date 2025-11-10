"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Smartphone, Search, Shield, Rocket, Code } from "lucide-react";

export default function Features() {
  const features = [
    { 
      title: "Lightning Fast", 
      desc: "Optimized Next.js apps with high Lighthouse score and blazing-fast performance.",
      icon: Zap,
      color: "text-yellow-500"
    },
    { 
      title: "Responsive Design", 
      desc: "Looks great on all devices with TailwindCSS mobile-first approach.",
      icon: Smartphone,
      color: "text-blue-500"
    },
    { 
      title: "SEO Optimized", 
      desc: "Built with semantic tags and best practices for search engine visibility.",
      icon: Search,
      color: "text-green-500"
    },
    { 
      title: "Secure & Reliable", 
      desc: "Industry-standard security practices and reliable hosting infrastructure.",
      icon: Shield,
      color: "text-purple-500"
    },
    { 
      title: "Fast Deployment", 
      desc: "Deploy to production in minutes with Vercel's seamless integration.",
      icon: Rocket,
      color: "text-red-500"
    },
    { 
      title: "Clean Code", 
      desc: "Maintainable, well-documented TypeScript code following best practices.",
      icon: Code,
      color: "text-indigo-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="features" className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver exceptional web experiences with cutting-edge technology and best practices
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
