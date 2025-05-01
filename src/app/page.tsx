"use client";

import React, { useState } from "react";
import { FileDropzone } from "../components/FileDropzone";
import { AIPreviewPanel } from "../components/AIPreviewPanel";
import { Hero } from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import { VisitorStats } from "../components/VisitorStats";
import { motion } from "framer-motion";
import axios from "axios";

interface Lead {
  name: string;
  email: string;
  company: string;
  domain?: string;
  notes?: string;
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [emailContent, setEmailContent] = useState<{
    subject?: string;
    text?: string;
    html?: string;
  }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [sendingStatus, setSendingStatus] = useState<{
    isSending: boolean;
    success: number;
    failed: number;
    message?: string;
  }>({
    isSending: false,
    success: 0,
    failed: 0,
  });

  const handleFileProcessed = (data: Lead[]) => {
    setLeads(data);
    if (data.length > 0) {
      setSelectedLead(data[0]);
      generateEmailContent(data[0]);
    }
  };

  const generateEmailContent = async (lead: Lead) => {
    setIsGenerating(true);
    try {
      // Call the API to generate email content using AI
      const response = await axios.post("/api/generate-email", lead);
      setEmailContent(response.data);
    } catch (error) {
      console.error("Error generating email content:", error);
      // Set fallback content
      setEmailContent({
        subject: `Special offer for ${lead.company}`,
        text: `Hello ${lead.name},\n\nWe would like to offer you our email campaign management services.\n\nBest regards,\nECMP Team`,
        html: `<p>Hello ${lead.name},</p><p>We would like to offer you our email campaign management services.</p><p>Best regards,<br>ECMP Team</p>`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateClick = () => {
    if (selectedLead) {
      generateEmailContent(selectedLead);
    }
  };

  const handleEditContent = (content: {
    subject?: string;
    text?: string;
    html?: string;
  }) => {
    setEmailContent(content);
  };

  const sendEmail = async () => {
    if (!selectedLead || !emailContent.subject) return;

    setSendingStatus({ isSending: true, success: 0, failed: 0 });
    try {
      const response = await axios.post("/api/send-email", {
        recipient: selectedLead.email,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      });

      setSendingStatus({
        isSending: false,
        success: 1,
        failed: 0,
        message: `Email sent successfully to ${selectedLead.email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSendingStatus({
        isSending: false,
        success: 0,
        failed: 1,
        message: `Failed to send email to ${selectedLead.email}`,
      });
    }
  };

  const sendBulkEmails = async () => {
    if (leads.length === 0 || !emailContent.subject) return;

    setSendingStatus({
      isSending: true,
      success: 0,
      failed: 0,
      message: "Preparing to send bulk emails...",
    });

    try {
      // Prepare email data for each lead
      const emailList = leads.map((lead) => {
        // Replace placeholders in template with actual values
        const personalizedSubject = emailContent.subject?.replace(
          /{{(\w+)}}/g,
          (_, key) => lead[key as keyof Lead] || ""
        );

        const personalizedText = emailContent.text?.replace(
          /{{(\w+)}}/g,
          (_, key) => lead[key as keyof Lead] || ""
        );

        const personalizedHtml = emailContent.html?.replace(
          /{{(\w+)}}/g,
          (_, key) => lead[key as keyof Lead] || ""
        );

        return {
          recipient: lead.email,
          subject: personalizedSubject,
          text: personalizedText,
          html: personalizedHtml,
        };
      });

      // Send the bulk emails
      const response = await axios.post("/api/send-bulk-emails", { emailList });

      setSendingStatus({
        isSending: false,
        success: response.data.successful || 0,
        failed: response.data.failed || 0,
        message: `Sent ${response.data.successful || 0} emails, ${
          response.data.failed || 0
        } failed`,
      });
    } catch (error) {
      console.error("Error sending bulk emails:", error);
      setSendingStatus({
        isSending: false,
        success: 0,
        failed: leads.length,
        message: "Failed to send bulk emails. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Email Campaign Generator Section */}
      <section className="py-20 bg-dark-space relative">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">
              <span className="text-cyber-blue">
                AI Email Campaign Generator
              </span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Upload your lead data and let our AI craft personalized emails for
              your campaign
            </p>
          </div>

          <div className="split-panel-grid mb-24">
            <div className="left-panel bg-dark-space border-2 border-dashed border-gray-300 apple-radius">
              <h3 className="text-xl font-medium mb-6 text-cyber-blue">
                Lead Data
              </h3>
              <FileDropzone
                onFileProcess={handleFileProcessed}
                isGenerating={isGenerating}
              />
            </div>
            <div className="right-panel bg-dark-space border-2 border-dashed border-gray-300 apple-radius">
              <h3 className="text-xl font-medium mb-6 text-cyber-blue flex justify-between items-center">
                <span>Generated Email</span>
                {selectedLead && (
                  <button
                    onClick={handleRegenerateClick}
                    className="text-sm flex items-center gap-1 text-text-secondary hover:text-cyber-blue"
                    disabled={isGenerating}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        isGenerating ? "animate-spin" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    {isGenerating ? "Regenerating..." : "Regenerate"}
                  </button>
                )}
              </h3>
              <AIPreviewPanel
                selectedLead={selectedLead}
                isGenerating={isGenerating}
                emailContent={emailContent}
                onSendEmail={sendEmail}
                onSendBulkEmails={sendBulkEmails}
                sendingStatus={sendingStatus}
                onEditContent={handleEditContent}
                totalLeads={leads.length}
              />
            </div>
          </div>

          {/* Testimonials section */}
          <Testimonials />

          {/* Stats section */}
          <VisitorStats />
        </div>
      </section>
    </div>
  );
}
