"use client";

import Link from "next/link";
import { Utensils, ChevronLeft, Search, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "Is MealMate free to use?",
      answer: "Yes! MealMate is currently 100% free for all users while we are in beta. You can access all features including unlimited logs and data exports without any cost."
    },
    {
      question: "How do I set my own prices?",
      answer: "You can set your custom prices by navigating to the Settings page from your dashboard. There you can define rates for Full Tiffins, Half Meals, and Snacks."
    },
    {
      question: "What happens if I miss a day?",
      answer: "No worries! You can log meals for past dates at any time. When you click the '+' button, you can select the date for which you want to add a log."
    },
    {
      question: "How is my data secured?",
      answer: "We use Firebase for industry-standard authentication and database security. Additionally, every new account must be approved by an administrator to prevent unauthorized access."
    },
    {
      question: "Can I export my data?",
      answer: "Absolutely! You can export your entire meal history to a CSV file. This is perfect for sharing with your mess provider or keeping your own records in Excel."
    },
    {
      question: "Does MealMate work offline?",
      answer: "Yes, MealMate is a Progressive Web App (PWA). Once installed on your mobile device, it can work offline and sync your data when you're back online."
    }
  ];

  return (
    <div className="bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
      <main className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-slate-600">
              Find answers to the most common questions about using MealMate.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-white border border-slate-200 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h2>
            <p className="text-slate-600 mb-6">We're here to help you get the most out of MealMate.</p>
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:border-amber-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-slate-900 pr-8">{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
