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

  return (
    <section className="py-20 bg-dark-space relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-medium mb-4 text-text-primary">
            What Our Users Say
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-lg">
            Real experiences from businesses using our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`bg-dark-secondary rounded-xl shadow-sm border border-gray-200 overflow-hidden 
                ${testimonial.size === "wide" ? "md:col-span-2" : ""} 
                ${testimonial.size === "tall" ? "row-span-2" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 30px rgba(37, 65, 178, 0.1)",
                borderColor: "rgba(37, 65, 178, 0.3)",
              }}
            >
              <div className="p-6 h-full flex flex-col">
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
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-100 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">
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

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="#"
            className="flex items-center text-cyber-blue hover:text-accent-dark transition-colors duration-300"
          >
            <span className="mr-2">Read more success stories</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
