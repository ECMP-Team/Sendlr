"use client";

import React from "react";
import { Hero } from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { HowItWorks } from "../components/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing />
    </div>
  );
}
