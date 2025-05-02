"use client";

import React, { useState } from "react";
import { Hero } from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Content Section */}
      <section className="py-20 bg-dark-space relative">
        <div className="container relative z-10">
          {/* Testimonials section */}
          <Testimonials />
        </div>
      </section>
    </div>
  );
}
