"use client";

import Link from "next/link";
import { Utensils, ChevronLeft, Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">MealMate</span>
          </div>
          <div className="w-24 md:block hidden"></div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. 
              Our team usually responds within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Us</h3>
                    <p className="text-sm text-slate-500">support@mealmate.app</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Live Chat</h3>
                    <p className="text-sm text-slate-500">Available Mon-Fri, 9am-6pm</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Office</h3>
                    <p className="text-sm text-slate-500">123 Tech Avenue, Digital City</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl"></div>
                <h3 className="text-xl font-bold mb-4">Join our community</h3>
                <p className="text-slate-400 mb-6">Follow us on social media for updates and meal planning tips.</p>
                <div className="flex gap-4">
                  {/* Social icons placeholder */}
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">TW</div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">IG</div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">FB</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-8 md:p-12 rounded-[40px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Subject</label>
                    <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Feature Request</option>
                      <option>Billing Question</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">Message</label>
                    <textarea 
                      rows={6} 
                      placeholder="How can we help you?" 
                      className="w-full p-6 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <Button size="lg" className="w-full md:w-auto h-14 px-10 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg transition-all group">
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MealMate. We love hearing from our users.
          </p>
        </div>
      </footer>
    </div>
  );
}
