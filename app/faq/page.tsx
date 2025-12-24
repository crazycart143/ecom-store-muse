"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 1-2 business days. Standard shipping typically takes 3-7 business days depending on your location."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy for all unworn items in their original packaging. Returns are free for all domestic orders."
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order ships, you will receive an email with a tracking number and a link to monitor your delivery."
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship to over 50 countries worldwide. International shipping rates and delivery times vary by region."
  },
  {
    q: "Are the products ethically made?",
    a: "All Muse products are crafted in certified factories that prioritize fair labor practices and sustainable material sourcing."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center text-secondary">FAQ</h1>
      <p className="text-gray-500 text-lg text-center mb-16">Frequently Asked Questions</p>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-secondary">{faq.q}</span>
              <span className={`transform transition-transform text-accent ${openIndex === i ? 'rotate-45' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
              </span>
            </button>
            {openIndex === i && (
              <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50 animate-in slide-in-from-top-2">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
