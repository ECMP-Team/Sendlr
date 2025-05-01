"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";

export const Hero = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(40); // Initial rotation - fully laid back

  useEffect(() => {
    const handleScroll = () => {
      if (!videoContainerRef.current) return;

      // Get the position of the video container relative to the viewport
      const rect = videoContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far the element is through the viewport (0 to 1)
      const scrollProgress = 1 - rect.top / viewportHeight;

      // Clamp the value between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Calculate rotation - from 40 degrees to 0 degrees
      const newRotation = 40 * (1 - clampedProgress);

      // Update rotation state
      setRotation(newRotation);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial calculation
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-0 pb-24 bg-dark-space relative overflow-hidden">
      <div
        className="bg-gradient-to-b from-[#1768AC]/5 via-[#1768AC]/10 to-[#1768AC]/20 m-10 rounded-3xl shadow-sm relative"
        style={{ minHeight: "950px" }}
      >
        <Navbar />

        <div className="container relative z-[5] pt-12 pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue text-sm font-medium mb-4">
                Introducing CampaignAI
              </span>

              <h1
                className="text-text-primary font-medium mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-[68px]"
                style={{
                  lineHeight: "1.1",
                  letterSpacing: "-3.4px",
                }}
              >
                <span>Craft Perfect Emails</span>
                <span className="block text-cyber-blue">
                  In{" "}
                  <span className="relative inline-block">
                    Seconds
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
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-text-primary font-medium">
                Stop spending hours
              </span>{" "}
              on email outreach. Our AI crafts personalized, high-converting
              emails that capture attention and drive results—all from your
              existing lead data.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="#upload"
                className="px-4 py-2 bg-cyber-blue text-white font-medium rounded-lg shadow-neon hover-glow text-sm"
              >
                Start Now
              </a>
              <a
                href="#learn-more"
                className="px-4 py-2 border border-gray-300 text-text-primary rounded-lg hover:border-cyber-blue/50 transition-colors duration-300 text-sm font-medium"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto px-4 md:px-6"
        style={{ marginTop: "-30%" }}
      >
        <div
          className="perspective-container"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              ref={videoContainerRef}
              className="w-full max-w-6xl rounded-2xl overflow-hidden relative transform-container"
              style={{
                boxShadow: `
                  0 0 20px rgba(37, 65, 178, 0.3),
                  0 0 40px rgba(37, 65, 178, 0.2),
                  0 0 60px rgba(37, 65, 178, 0.1),
                  inset 0 0 30px rgba(37, 65, 178, 0.2)
                `,
                transform: `perspective(1000px) rotateX(${rotation}deg)`,
                transformOrigin: "center",
                transition: "transform 0.1s ease-out",
              }}
            >
              <video
                className="w-full aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-table-editor.webm"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <h3 className="text-cyber-blue text-3xl font-medium mb-1">
                100%
              </h3>
              <p className="text-text-secondary text-sm">Automated</p>
            </div>
            <div>
              <h3 className="text-cyber-blue text-3xl font-medium mb-1">3x</h3>
              <p className="text-text-secondary text-sm">Faster Outreach</p>
            </div>
            <div>
              <h3 className="text-cyber-blue text-3xl font-medium mb-1">
                +40%
              </h3>
              <p className="text-text-secondary text-sm">Response Rate</p>
            </div>
            <div>
              <h3 className="text-cyber-blue text-3xl font-medium mb-1">
                24/7
              </h3>
              <p className="text-text-secondary text-sm">AI Assistance</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-text-secondary text-lg mb-3 max-w-4xl mx-auto">
            Join <span className="text-text-primary font-medium">3,155</span>{" "}
            startup founders
          </div>
          <div className="flex justify-center">
            <div className="flex -space-x-3">
              {[
                { initials: "JD", color: "#4F46E5" },
                { initials: "TR", color: "#0EA5E9" },
                { initials: "MK", color: "#10B981" },
                { initials: "AH", color: "#6366F1" },
                { initials: "SL", color: "#EC4899" },
                { initials: "BP", color: "#F59E0B" },
                { initials: "RN", color: "#EF4444" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border border-dark-space flex items-center justify-center text-xs font-medium"
                  style={{
                    zIndex: 5 - i,
                    background: avatar.color,
                    color: "white",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
