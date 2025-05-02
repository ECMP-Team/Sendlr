"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  const plans = [
    {
      name: "Starter",
      description:
        "Perfect for individuals and small teams just getting started.",
      priceMonthly: 29,
      priceAnnual: 243,
      features: [
        "Up to 5,000 emails per month",
        "3 email campaign templates",
        "Basic AI content generation",
        "Email analytics dashboard",
        "Email delivery optimization",
      ],
      highlight: false,
      cta: "Get Started",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with advanced needs.",
      priceMonthly: 79,
      priceAnnual: 663,
      features: [
        "Up to 50,000 emails per month",
        "Unlimited email templates",
        "Advanced AI content generation",
        "Comprehensive analytics",
        "A/B testing capabilities",
        "Advanced segmentation",
        "Dedicated support",
      ],
      highlight: true,
      cta: "Try Professional",
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring custom solutions.",
      priceMonthly: 199,
      priceAnnual: 1672,
      features: [
        "Unlimited emails",
        "Custom AI model training",
        "Enterprise-grade security",
        "Priority 24/7 support",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced workflow automation",
        "Multi-user collaboration",
      ],
      highlight: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="py-24 bg-dark-secondary relative">
      <style jsx global>{`
        .shadow-inner-sm {
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      <div className="m-8 relative z-10">
        <div className="rounded-3xl shadow-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyber-blue/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyber-blue/5 rounded-full filter blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10 py-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue text-sm font-medium mb-4">
                Simple Pricing
              </span>
              <h2
                className="text-text-primary font-medium mb-6 text-3xl sm:text-4xl md:text-5xl"
                style={{
                  lineHeight: "1.2",
                  letterSpacing: "-1.5px",
                }}
              >
                Choose Your <br />
                <span className="text-cyber-blue relative inline-block">
                  Perfect Plan
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
              <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
                No hidden fees. Cancel anytime. All plans include core features.
              </p>

              {/* Billing toggle */}
              <div className="flex justify-center items-center mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 inline-flex items-center border border-cyber-blue/10 shadow-lg shadow-cyber-blue/5 relative">
                  {/* Sliding background */}
                  <motion.div
                    className="absolute rounded-full bg-cyber-blue shadow-sm shadow-black/40 z-0"
                    animate={{
                      x: billingCycle === "monthly" ? 4 : 114,
                      width: billingCycle === "monthly" ? 110 : 160,
                    }}
                    initial={false}
                    style={{ top: "6px", bottom: "6px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  <div className="flex">
                    <button
                      className={`w-[110px] text-center py-2.5 rounded-full text-sm font-medium transition-colors duration-300 relative z-10 ${
                        billingCycle === "monthly"
                          ? "text-white"
                          : "text-text-secondary"
                      }`}
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Monthly
                    </button>
                    <button
                      className={`w-[170px] text-center py-2.5 rounded-full text-sm font-medium transition-colors duration-300 relative z-10 ${
                        billingCycle === "annual"
                          ? "text-white"
                          : "text-text-secondary"
                      }`}
                      onClick={() => setBillingCycle("annual")}
                    >
                      Annual{" "}
                      <span className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full bg-white/20">
                        Save 30%
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden group ${
                    plan.highlight
                      ? "md:transform md:-translate-y-4 md:scale-[1.05] md:hover:scale-[1.07]"
                      : "hover:-translate-y-1"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={plan.highlight ? { y: -5 } : { y: -5 }}
                >
                  {plan.highlight && (
                    <div className="absolute top-3 right-3 bg-white text-accent-dark text-xs px-3 py-1 rounded-full z-20">
                      Most Popular
                    </div>
                  )}

                  <div
                    className={`h-full ${
                      !plan.highlight ? "bg-dark-secondary/80" : ""
                    } border rounded-3xl relative z-10 overflow-hidden ${
                      plan.highlight
                        ? "border-cyber-blue/30 shadow-xl shadow-cyber-blue/20 transition-all duration-500"
                        : "border-cyber-blue/10 group-hover:border-cyber-blue/30 transition-all duration-300"
                    }`}
                  >
                    {plan.highlight && (
                      <>
                        {/* Gradient background for Pro card */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2541B2]/30 to-white z-0"></div>

                        {/* Grid pattern overlay */}
                        <div
                          className="absolute inset-0 z-0 opacity-30"
                          style={{
                            backgroundSize: "15px 15px",
                            backgroundImage:
                              "linear-gradient(to right, rgba(255, 255, 255, 0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px)",
                          }}
                        ></div>

                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-cyber-blue/10 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 z-0"></div>
                      </>
                    )}

                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                    <div className="p-8 h-full flex flex-col relative z-10">
                      <div className="mb-6">
                        <h3 className="text-text-primary text-2xl font-medium mb-2 group-hover:text-cyber-blue transition-colors duration-300">
                          {plan.name}
                        </h3>
                        <p className="text-text-secondary text-sm mb-5">
                          {plan.description}
                        </p>
                        <div className="flex items-end mb-1">
                          <span className="text-cyber-blue text-5xl font-bold">
                            $
                            {billingCycle === "monthly"
                              ? plan.priceMonthly
                              : plan.priceAnnual}
                          </span>
                          <span className="text-text-secondary ml-2 pb-2">
                            /{billingCycle === "monthly" ? "mo" : "yr"}
                          </span>
                        </div>

                        {billingCycle === "annual" && (
                          <div className="text-cyber-blue text-sm font-medium mb-6">
                            Save 30%
                          </div>
                        )}
                        {billingCycle === "monthly" && (
                          <div className="mb-6"></div>
                        )}
                      </div>

                      <div className="mb-8 flex-grow">
                        <div className="w-12 h-0.5 bg-cyber-blue/20 mb-5 transition-all duration-300 group-hover:w-16 group-hover:bg-cyber-blue/30"></div>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="w-5 h-5 text-cyber-blue mt-0.5 mr-3 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-text-secondary text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <motion.a
                          href="#signup"
                          className={`block text-center py-3 px-6 rounded-xl transition-all duration-300 ${
                            plan.highlight
                              ? "text-white hover:shadow-lg hover:shadow-cyber-blue/20 relative overflow-hidden"
                              : "bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {plan.highlight && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-[#1768AC] z-0"></div>
                          )}
                          <span className="relative z-10">{plan.cta}</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <motion.div
                className="bg-dark-secondary/80 border border-cyber-blue/10 rounded-2xl p-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-text-primary text-xl font-medium mb-3">
                  Need a custom solution?
                </h3>
                <p className="text-text-secondary mb-4">
                  For larger teams with specific requirements, we offer tailored
                  solutions to meet your unique needs.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center px-5 py-2 bg-transparent text-cyber-blue hover:text-cyber-blue/80 transition-colors"
                >
                  <span>Contact our sales team</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
