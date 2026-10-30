import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProofMarquee } from "@/components/landing/SocialProofMarquee";
import { ProblemVsSolution } from "@/components/landing/ProblemVsSolution";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { UseCases } from "@/components/landing/UseCases";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#171e19] text-black font-body selection:bg-[#ffe17c] selection:text-black">
      {/* 1. Fixed Neo-Brutalist Header */}
      <Header />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Social Proof Marquee */}
      <SocialProofMarquee />

      {/* 4. Problem vs Solution */}
      <ProblemVsSolution />

      {/* 5. Feature Grid */}
      <FeatureGrid />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Use Case Personas */}
      <UseCases />

      {/* 8. Final CTA and 4-Column Footer */}
      <Footer />
    </div>
  );
}
