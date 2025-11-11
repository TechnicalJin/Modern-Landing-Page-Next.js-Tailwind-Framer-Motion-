"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed w-full z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 ${
        scrolled ? "bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
          scrolled ? "text-indigo-600 dark:text-indigo-400" : "text-indigo-600 dark:text-indigo-400"
        }`}>
          TechBrand
        </h1>
        
        <ul className={`hidden md:flex gap-6 lg:gap-8 font-medium text-sm lg:text-base transition-colors duration-300 ${
          scrolled ? "text-gray-700 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"
        }`}>
          <li>
            <a href="#home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <Button className="hidden md:block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 lg:px-6 py-2 text-sm lg:text-base">
            Get Started
          </Button>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
