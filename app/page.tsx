import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollProgress from "./components/animations/ScrollProgress";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
      <BackToTop />
    </div>
  );
}

