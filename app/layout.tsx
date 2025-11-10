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
  keywords: ["web design", "landing page", "next.js", "tailwindcss", "framer motion", "responsive design"],
  authors: [{ name: "TechBrand" }],
  openGraph: {
    title: "TechBrand - Modern Landing Page",
    description: "Build fast, responsive, and beautiful websites that convert visitors into customers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
