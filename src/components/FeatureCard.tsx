"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  tag?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
  tag,
}) => (
  <motion.div
    className="bg-dark-secondary rounded-xl p-6 border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all duration-300 shadow-sm relative group overflow-hidden h-full flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    whileHover={{
      y: -5,
      transition: { duration: 0.2 },
    }}
  >
    {/* Hover gradient effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Subtle corner glow on hover */}
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-blue/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Tag */}
    {tag && (
      <div className="absolute top-4 right-4 bg-cyber-blue/10 text-cyber-blue text-xs px-2 py-1 rounded-full font-medium">
        {tag}
      </div>
    )}

    {/* Content */}
    <div className="relative z-10 flex-grow">
      <motion.div
        className="text-cyber-blue mb-4 inline-block"
        whileHover={{
          rotate: [0, -10, 10, -5, 0],
          transition: { duration: 0.5 },
        }}
      >
        <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-cyber-blue/5 group-hover:bg-cyber-blue/10 transition-colors duration-300">
          {icon}
        </div>
      </motion.div>

      <h3 className="text-xl font-medium mb-3 text-text-primary group-hover:text-cyber-blue transition-colors duration-300">
        {title}
      </h3>

      <div className="w-10 h-0.5 bg-cyber-blue/20 mb-3 transition-all duration-300 group-hover:w-16 group-hover:bg-cyber-blue/30"></div>

      <p className="text-text-secondary mb-4">{description}</p>
    </div>

    {/* Learn more link */}
    <motion.div
      className="relative z-10 mt-2"
      initial={{ opacity: 0.8 }}
      whileHover={{ opacity: 1 }}
    >
      <a
        href="#"
        className="text-cyber-blue text-sm font-medium flex items-center"
      >
        Learn more
        <svg
          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </motion.div>
  </motion.div>
);
