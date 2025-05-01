"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="py-6 px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group">
          <motion.h1
            className="text-2xl font-semibold flex items-center tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Campaign<span className="text-cyber-blue font-bold">AI</span>
            <span className="ml-2 h-2 w-2 rounded-full bg-cyber-blue animate-pulse"></span>
          </motion.h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10">
          {["Workflow", "Features", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-text-primary hover:text-cyber-blue text-sm font-medium transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-cyber-blue hover:text-cyber-blue/80 font-medium hidden md:inline-block transition-colors"
          >
            Log in
          </Link>
          <Link href="/get-started">
            <motion.button
              className="bg-cyber-blue hover:bg-cyber-blue/90 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-text-primary focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
