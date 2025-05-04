"use client";

import React from "react";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  return (
    <div className="bg-dark-secondary shadow-[0px_-2px_0px_0px_rgba(0,0,0,0.03)_inset,0px_2px_0px_0px_rgba(0,0,0,0.03)_inset] dark:bg-[#16182D]">
      <div className="container flex flex-col items-center py-20 md:pt-34 md:pb-46">
        <motion.div
          className="flex flex-col items-center gap-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            How It Works
          </span>
          <h2
            className="text-white font-medium mb-6 text-3xl sm:text-4xl md:text-5xl"
            style={{
              lineHeight: "1.2",
              letterSpacing: "-1.5px",
            }}
          >
            Streamlined{" "}
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
          <p className="text-white text-lg max-w-2xl mx-auto">
            CampaignAI transforms your outreach with intelligent automation. Our
            platform handles everything from content creation to delivery
            timing, helping you connect with leads more effectively.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 h-[370px] w-[1008px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(251deg,_#2541B2_32.71%,_#06BEE1_67.76%)] opacity-30 dark:opacity-20 blur-[144px]"></div>
          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[206px] w-[199px] bg-cyber-blue blur-[118px]"></div>

          <div className="relative flex flex-col items-center">
            <svg
              width="2"
              className="overflow-visible [mask-image:linear-gradient(to_bottom,#0000,#000)] h-10 md:h-[79px]"
            >
              <line
                className="stroke-cyber-blue/30 dark:stroke-white/15"
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                strokeWidth="2"
                strokeDasharray="0.5 5.5"
                strokeLinecap="round"
              ></line>
            </svg>

            <div className="z-1 -mb-5 rounded-full px-4 py-3 bg-dark-space shadow-[0px_4px_6px_-6px_rgba(23,28,55,0.80),0px_0px_0px_1px_rgba(23,28,55,0.08)] dark:bg-white/80 dark:ring dark:ring-white/25 transition-transform hover:scale-105 duration-300">
              <h1 className="text-xl font-semibold flex items-center tracking-tight">
                Campaign<span className="text-cyber-blue font-bold">AI</span>
                <span className="ml-2 h-2 w-2 rounded-full bg-cyber-blue animate-pulse"></span>
              </h1>
            </div>

            <div className="relative w-full">
              <div className="relative z-0 h-14 w-full md:h-[143px]">
                <div className="hidden md:block h-full w-[calc((100%-2*16px)/3+16px)] absolute top-0 right-1/2">
                  <svg className="h-full w-full overflow-visible">
                    <path
                      className="stroke-cyber-blue/30 dark:stroke-white/15"
                      d="M 273.0625 0 A 72 72 0 0 1 201.0625 72 H 72 A 72 72 0 0 0 0 143"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="0.5 5.5"
                    ></path>
                  </svg>
                </div>

                <div className="hidden md:block h-full w-[calc((100%-2*16px)/3+16px)] absolute top-0 left-1/2">
                  <svg className="h-full w-full overflow-visible">
                    <path
                      className="stroke-cyber-blue/30 dark:stroke-white/15"
                      d="M 0 0 A 72 72 0 0 0 72 72 H 201.0625 A 72 72 0 0 1 273.0625 143"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="0.5 5.5"
                    ></path>
                  </svg>
                </div>

                <svg className="absolute left-1/2 h-full w-0.5 -translate-x-1/2">
                  <line
                    className="stroke-cyber-blue/30 dark:stroke-white/15"
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="143"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="0.5 5.5"
                    fill="none"
                  ></line>
                </svg>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl mx-auto px-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 rounded-xl p-5 border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all duration-300 shadow-sm relative group overflow-hidden h-full flex flex-col"
                >
                  <motion.div
                    className="text-white mb-3 inline-block"
                    whileHover={{
                      rotate: [0, -10, 10, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-medium mb-2 text-white group-hover:text-cyber-blue transition-colors duration-300">
                    Content Generation
                  </h3>

                  <div className="w-8 h-0.5 bg-cyber-blue/20 mb-2 transition-all duration-300 group-hover:w-12 group-hover:bg-cyber-blue/30"></div>

                  <p className="text-white/80 text-sm">
                    Our AI creates personalized email content that resonates
                    with your audience, optimizing for engagement and
                    conversions.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 rounded-xl p-5 border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all duration-300 shadow-sm relative group overflow-hidden h-full flex flex-col"
                >
                  <motion.div
                    className="text-white mb-3 inline-block"
                    whileHover={{
                      rotate: [0, -10, 10, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-medium mb-2 text-white group-hover:text-cyber-blue transition-colors duration-300">
                    Smart Scheduling
                  </h3>

                  <div className="w-8 h-0.5 bg-cyber-blue/20 mb-2 transition-all duration-300 group-hover:w-12 group-hover:bg-cyber-blue/30"></div>

                  <p className="text-white/80 text-sm">
                    Automated delivery at optimal times for each recipient,
                    based on predictive analytics and engagement patterns.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 rounded-xl p-5 border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all duration-300 shadow-sm relative group overflow-hidden h-full flex flex-col"
                >
                  <motion.div
                    className="text-white mb-3 inline-block"
                    whileHover={{
                      rotate: [0, -10, 10, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-medium mb-2 text-white group-hover:text-cyber-blue transition-colors duration-300">
                    Performance Analytics
                  </h3>

                  <div className="w-8 h-0.5 bg-cyber-blue/20 mb-2 transition-all duration-300 group-hover:w-12 group-hover:bg-cyber-blue/30"></div>

                  <p className="text-white/80 text-sm">
                    Real-time metrics and detailed insights to track campaign
                    performance and continually improve your email marketing
                    results.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
