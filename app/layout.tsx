import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StructuredData } from "@/components/StructuredData";
import { SkipToContent } from "@/components/SkipToContent";

// Primary font with optimized loading for LCP
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Ensures text remains visible during font loading (FOUT strategy)
  preload: true, // Preload for hero section text
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true, // Minimizes layout shift during font loading
  weight: ["400", "500", "600", "700", "800"], // Specify weights to reduce font file size
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload critical fonts
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: "TechBrand - Modern Landing Page | Next.js + Tailwind + Framer Motion",
  description: "Build fast, responsive, and beautiful websites that convert visitors into customers. Modern web design with Next.js, TailwindCSS, and Framer Motion.",
  keywords: [
    "web design",
    "landing page",
    "next.js",
    "tailwindcss",
    "framer motion",
    "responsive design",
    "modern website",
    "web development",
    "SEO optimization",
    "fast website"
  ],
  authors: [{ name: "TechBrand", url: "https://techbrand.com" }],
  creator: "TechBrand",
  publisher: "TechBrand",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://techbrand.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TechBrand - Modern Landing Page",
    description: "Build fast, responsive, and beautiful websites that convert visitors into customers.",
    url: "https://techbrand.vercel.app",
    siteName: "TechBrand",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechBrand - Modern Web Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBrand - Modern Landing Page",
    description: "Build fast, responsive, and beautiful websites that convert visitors into customers.",
    creator: "@techbrand",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical Resource Hints for LCP Optimization */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts for faster LCP */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Viewport and theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1E40AF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F172A" media="(prefers-color-scheme: dark)" />
        
        {/* Inline Critical CSS for Above-the-Fold Content (Reduces LCP) */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical styles for hero section - prevents CLS */
            body { margin: 0; padding: 0; min-height: 100vh; }
            .hero-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
            
            /* Navbar fixed height to prevent CLS */
            nav { height: 64px; position: fixed; top: 0; width: 100%; z-index: 40; }
            
            /* Reserve space for images to prevent CLS */
            img[data-hero] { aspect-ratio: 16/9; object-fit: cover; }
            
            /* Prevent flash of unstyled content */
            html { font-family: system-ui, -apple-system, sans-serif; }
            
            /* Critical animation performance */
            * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            
            /* Loading state to prevent FOUC */
            .loading { opacity: 0; }
            .loaded { opacity: 1; transition: opacity 0.3s ease-in; }
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-gray-950 transition-colors loaded`}
      >
        {/* Skip to main content for accessibility */}
        <SkipToContent targetId="main-content" />
        
        {/* Structured Data for SEO */}
        <StructuredData type="organization" />
        <StructuredData type="website" />
        
        <ToastProvider position="top-right" maxToasts={5}>
          <ProgressBar 
            position="top" 
            height={3} 
            color="linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)"
            smooth={true}
          />
          {children}
        </ToastProvider>
        
        {/* Defer non-critical analytics scripts for better FID */}
        <Script
          id="analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Analytics script placeholder
              // Replace with your actual analytics (Google Analytics, Plausible, etc.)
              console.log('Analytics loaded lazily for better FID');
            `
          }}
        />
        
        {/* Web Vitals reporting for monitoring */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              if ('PerformanceObserver' in window) {
                // Track LCP
                const lcpObserver = new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                
                // Track FID
                const fidObserver = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                
                // Track CLS
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                      console.log('CLS:', clsValue);
                    }
                  });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
