"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Utensils, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Settings,
  PieChart,
  UserPlus,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Create Your Account",
      description: "Sign up with your email and set up your profile. Your account will be pending until an admin approves it to ensure the security of our community.",
      icon: UserPlus,
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "2. Configure Your Pricing",
      description: "Go to settings and set your custom prices for Full Tiffins, Half Meals, and Snacks. This allows MealMate to calculate your exact expenses automatically.",
      icon: Settings,
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "3. Log Your Daily Meals",
      description: "Simply tap the '+' button on your dashboard to log what you ate. You can log for today, yesterday, or even bulk log for past dates if you've been on vacation.",
      icon: Calendar,
      color: "bg-green-500",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "4. Track & Export Data",
      description: "View your monthly summaries, analyze spending patterns with charts, and export your data to CSV whenever you need a physical record for your mess provider.",
      icon: PieChart,
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
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

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6"
            >
              How <span className="text-amber-500">MealMate</span> Works
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              Everything you need to know about managing your meal subscriptions and tracking expenses with ease.
            </motion.p>
          </div>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
              >
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-slate-200`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{step.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {step.description}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Easy to use interface</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Instant synchronization</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 w-full"
                >
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 rounded-[40px] bg-slate-900 p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to start tracking?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Join MealMate today and experience the easiest way to manage your food budget and meal logs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 rounded-full bg-amber-500 hover:bg-amber-600 px-10 text-lg font-bold">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="ghost" className="h-14 rounded-full border border-slate-700 text-white hover:bg-slate-800 px-10 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MealMate. Simplifying meal management for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
