"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import MotionWrapper from "./animations/MotionWrapper";
import { StaggerContainer, StaggerItem } from "./animations/AnimationComponents";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$999",
      description: "Perfect for small businesses and startups",
      features: [
        "Single page website",
        "Responsive design",
        "Basic SEO optimization",
        "Contact form",
        "1 month support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$2,499",
      description: "Ideal for growing businesses",
      features: [
        "Up to 5 pages",
        "Advanced animations",
        "Premium SEO optimization",
        "Blog integration",
        "E-commerce ready",
        "3 months support",
        "Performance optimization",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$4,999",
      description: "For large-scale projects",
      features: [
        "Unlimited pages",
        "Custom animations",
        "Advanced SEO & Analytics",
        "CMS integration",
        "Full e-commerce",
        "6 months support",
        "Priority support",
        "Custom integrations",
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your project. All plans include modern design and fast performance.
          </p>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ 
                  y: plan.highlighted ? -16 : -12,
                  scale: plan.highlighted ? 1.02 : 1,
                  transition: { duration: 0.3 }
                }}
                className="h-full"
              >
                <Card 
                  className={`h-full flex flex-col relative overflow-hidden ${
                    plan.highlighted 
                      ? "border-2 border-indigo-600 shadow-2xl" 
                      : "border shadow-md hover:shadow-xl"
                  } transition-all duration-300`}
                >
                  {plan.highlighted && (
                    <>
                      <motion.div 
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                        ⭐ MOST POPULAR
                      </div>
                    </>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {plan.description}
                    </CardDescription>
                    <motion.div 
                      className="mt-4"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/ project</span>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <motion.span
                            className="inline-block"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * i, type: "spring" }}
                          >
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          </motion.span>
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className={`w-full ${
                          plan.highlighted
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            : "bg-gray-900 hover:bg-gray-800"
                        }`}
                      >
                        Get Started
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <MotionWrapper delay={0.4} className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom solution?{" "}
            <a href="#contact" className="text-indigo-600 font-semibold hover:underline">
              Contact us
            </a>{" "}
            for a personalized quote.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}
