import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
