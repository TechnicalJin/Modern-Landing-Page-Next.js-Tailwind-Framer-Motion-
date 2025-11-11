import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">TechBrand</h3>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 mb-4 max-w-md">
              Building modern, fast, and beautiful web experiences with cutting-edge technology.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#home" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-800 pt-6 sm:pt-8 mt-6 sm:mt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">
            © {currentYear} TechBrand. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-3 md:mt-0">
            Built with Next.js, TailwindCSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
