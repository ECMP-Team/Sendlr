import "../styles/globals.css";
import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "CampaignAI | Email Campaign Platform",
  description: "AI-powered email campaign platform for personalized outreach",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-dark-space ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-geist-sans text-text-primary">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
