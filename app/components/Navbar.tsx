"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed w-full z-50 px-8 py-4 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className={`text-2xl font-bold transition-colors duration-300 ${
          scrolled ? "text-indigo-600" : "text-indigo-600"
        }`}>
          TechBrand
        </h1>
        
        <ul className={`hidden md:flex gap-8 font-medium transition-colors duration-300 ${
          scrolled ? "text-gray-700" : "text-gray-600"
        }`}>
          <li>
            <a href="#home" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </li>
        </ul>

        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
