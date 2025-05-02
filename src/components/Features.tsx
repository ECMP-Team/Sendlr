"use client";

import React from "react";
import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
    <section className="py-24 bg-dark-space relative">
      <div className="m-8 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2
              className="text-text-primary font-medium mb-6 text-3xl sm:text-4xl md:text-5xl"
              style={{
                lineHeight: "1.2",
                letterSpacing: "-1.5px",
              }}
            >
              Powerful Features for Your <br />
              <span className="text-cyber-blue relative inline-block">
                Email Campaigns
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-cyber-blue/30"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q50,20 100,10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Our platform offers everything you need to create, manage, and
              track your email campaigns efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              index={0}
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
              title="AI-Powered Content Generation"
              description="Leverage advanced AI to create personalized email content that resonates with your audience and drives engagement."
            />
            <FeatureCard
              index={1}
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              }
              title="Comprehensive Analytics"
              description="Track your campaign performance with detailed metrics and insights to optimize your email marketing strategy."
            />
            <FeatureCard
              index={2}
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Automated Workflows"
              description="Set up automated email sequences that trigger based on user behavior, saving you time and improving efficiency."
            />
            <FeatureCard
              index={3}
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              title="Advanced Segmentation"
              description="Segment your audience based on behavior, demographics, and engagement to deliver highly targeted campaigns."
            />
            <FeatureCard
              index={4}
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Compliance & Security"
              description="Stay compliant with email regulations and protect your data with our robust security features and best practices."
            />
            <FeatureCard
              index={5}
              icon={
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              }
              title="Responsive Templates"
              description="Choose from a variety of professionally designed, mobile-responsive email templates for any campaign type."
            />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-radial from-cyber-blue/5 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-radial from-cyber-blue/5 to-transparent opacity-50"></div>
    </section>
  );
};
