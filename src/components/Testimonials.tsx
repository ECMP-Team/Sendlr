"use client";

import React from "react";
import { motion } from "framer-motion";

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "CampaignAI helped us increase our email open rates by 37% and conversions by 24%. The AI-generated content is surprisingly personalized and effective.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechStart",
      avatar: "https://i.pravatar.cc/150?img=32",
      size: "wide",
    },
    {
      quote:
        "We've tried several email campaign tools, but none compare to the personalization capabilities of CampaignAI. It's been a game-changer for our outreach.",
      author: "Michael Chen",
      position: "Growth Lead",
      company: "Innovate Labs",
      avatar: "https://i.pravatar.cc/150?img=65",
      size: "tall",
    },
    {
      quote:
        "The lead management system is intuitive and powerful. Being able to segment our audience and send tailored messages has improved our customer relationships significantly.",
      author: "Alexa Rodriguez",
      position: "Customer Success Manager",
      company: "DataFlow",
      avatar: "https://i.pravatar.cc/150?img=47",
      size: "regular",
    },
    {
      quote:
        "Setup was incredibly simple. Within a day we had our first AI-powered campaign running with remarkably personalized content.",
      author: "David Kim",
      position: "Technical Lead",
      company: "Quantum Systems",
      avatar: "https://i.pravatar.cc/150?img=68",
      size: "regular",
    },
    {
      quote:
        "The analytics dashboard gives us insights we never had before. Now we can measure performance in real-time and optimize our campaigns instantly.",
      author: "Emma Thompson",
      position: "Data Analyst",
      company: "MetricMinds",
      avatar: "https://i.pravatar.cc/150?img=45",
      size: "regular",
    },
    {
      quote:
        "As a marketing agency handling multiple clients, CampaignAI has transformed our workflow. The platform lets us create personalized campaigns at scale, and the analytics provide clear ROI metrics we can present to our clients. This tool paid for itself within the first month.",
      author: "Jason Martinez",
      position: "Agency Director",
      company: "HyperGrowth Marketing",
      avatar: "https://i.pravatar.cc/150?img=12",
      size: "wide",
    },
  ];

  const gridPattern = {
    backgroundSize: "30px 30px",
    backgroundImage:
      "linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
    zIndex: 0,
  };

  return (
    <section className="py-24 bg-dark-space relative">
      <div className="m-8 relative z-10">
        <div className="bg-gradient-to-b from-[#1768AC]/5 via-[#1768AC]/10 to-[#1768AC]/25 rounded-3xl shadow-sm relative">
          {/* Grid pattern overlay */}
          <div style={gridPattern}></div>

          <div className="container mx-auto px-6 relative z-10 py-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue text-sm font-medium mb-4">
                Customer Success
              </span>
              <h2
                className="text-text-primary font-medium mb-6 text-3xl sm:text-4xl md:text-5xl"
                style={{
                  lineHeight: "1.2",
                  letterSpacing: "-1.5px",
                }}
              >
                What Our Users <br />
                <span className="text-cyber-blue relative inline-block">
                  Are Saying
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
                Real experiences from businesses using our platform to transform
                their email marketing
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`bg-dark-secondary rounded-xl border border-cyber-blue/10 hover:border-cyber-blue/30 shadow-sm overflow-hidden relative group
                    ${testimonial.size === "wide" ? "md:col-span-2" : ""} 
                    ${testimonial.size === "tall" ? "row-span-2" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Subtle corner glow on hover */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-blue/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="p-6 h-full flex flex-col relative z-10">
                    <div className="mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-cyber-blue text-lg">
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-text-primary flex-grow mb-6 text-[15px] leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-cyber-blue/10 flex-shrink-0 group-hover:border-cyber-blue/30 transition-colors duration-300">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary group-hover:text-cyber-blue transition-colors duration-300">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-radial from-cyber-blue/5 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-radial from-cyber-blue/5 to-transparent opacity-50"></div>
    </section>
  );
};
