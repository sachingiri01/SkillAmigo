"use client";

import { MessageCircle, Instagram, Youtube, Linkedin, Twitter, Phone, Mail } from "lucide-react";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const navigation = [
  {
    title: "Platform",
    links: [
      { name: "Find Skills", href: "#" },
      { name: "Offer Skills", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Success Stories", href: "#" },
      { name: "Leaderboard", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Events", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Safety Guidelines", href: "#" },
      { name: "Report Issue", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/skillamigo" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/skillamigo" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/skillamigo" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/skillamigo" },
];

export const NewsletterFooter = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <section className="bg-jet-stream-975 py-12 sm:py-16 md:py-24 border-t border-jet-stream-400/20">
      <div className="container mx-auto max-w-6xl px-5 md:px-6">
        {/* Logo and platform information section */}
        <div className="mb-10 flex flex-col items-start justify-between gap-10 border-b border-jet-stream-400/20 pb-10 sm:mb-16 sm:pb-12 md:flex-row">
          <div className="w-full max-w-full sm:max-w-sm">
            <a href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold font-display text-white">
                SkillAmigo
              </h2>
            </a>
            <p className="mb-8 text-base text-gray-300 font-body">
              India's premier hyperlocal skill-sharing platform connecting neighbors for learning, earning, and growing together. Build skills, earn credits, and strengthen communities.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-jet-stream-400" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-jet-stream-400" />
                <span className="text-sm">hello@skillamigo.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="w-full border-t border-jet-stream-400/20 pt-8 sm:border-t-0 sm:pt-0">
            <nav className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-2 md:w-auto md:grid-cols-4">
              {navigation.map((section) => (
                <div key={section.title} className="min-w-[140px]">
                  <h2 className="mb-4 text-lg font-semibold font-display text-white">
                    {section.title}
                  </h2>
                  <ul className="space-y-3.5">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block py-1 text-gray-300 font-body transition-all duration-200 hover:text-white hover:glow-sm active:text-saffron"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="order-1 mb-6 flex w-full items-center justify-center gap-6 sm:justify-start md:order-2 md:mb-0 md:w-auto">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={`Visit our ${link.name} page`}
                className="rounded-sm p-3 text-gray-300 transition-all duration-200 hover:bg-jet-stream-400/10 hover:text-white hover:glow-sm active:bg-jet-stream-400/20"
                rel="noopener noreferrer"
                target="_blank"
              >
                <link.icon className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>

          {/* Copyright and Legal Links */}
          <div className="order-2 flex flex-col items-center gap-4 text-center text-sm text-gray-300 sm:text-left md:order-1 md:items-start">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/terms"
                className="text-gray-300 transition-all duration-200 hover:text-white hover:glow-sm underline underline-offset-4"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-gray-300 transition-all duration-200 hover:text-white hover:glow-sm underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <a
                href="/refund"
                className="text-gray-300 transition-all duration-200 hover:text-white hover:glow-sm underline underline-offset-4"
              >
                Refund Policy
              </a>
            </div>
            <p className="font-body">
              © {new Date().getFullYear()} SkillAmigo. All rights reserved. Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <button
        onClick={() => setIsHelpOpen(!isHelpOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-saffron text-jet-stream-500 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:glow-md focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 focus:ring-offset-jet-stream-975"
        aria-label="Open help chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Help Chat Tooltip */}
      {isHelpOpen && (
        <div className="fixed bottom-20 right-6 z-40 rounded-sm bg-jet-stream-975 border border-jet-stream-400/20 p-4 shadow-xl max-w-xs">
          <p className="text-sm text-white font-body mb-2">
            Need help? We're here for you!
          </p>
          <p className="text-xs text-gray-300 font-body">
            Chat with <span className="text-orange-400 hover:underline"><Link href="/ai-agent">Ai-agent</Link></span> or browse our FAQs section for quick answers.
          </p>
        </div>
      )}
    </section>
  );
};