"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Utensils, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Shield, 
  CheckCircle2,
  Clock,
  PieChart,
  Settings,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-amber-800 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Calendar,
      title: "Daily Logging",
      description: "Track your tiffin, meals, and snacks with just a few taps. Never miss a meal entry again.",
      color: "bg-blue-500"
    },
    {
      icon: DollarSign,
      title: "Expense Tracking",
      description: "See exactly how much you're spending. Real-time cost calculation based on your custom pricing.",
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Monthly Analytics",
      description: "Beautiful charts showing your spending patterns by category and estimated vs actual costs.",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Admin-verified accounts and offline support ensure your data is safe and always accessible.",
      color: "bg-orange-500"
    },
  ];

  const steps = [
    {
      title: "Sign Up",
      description: "Create your account and wait for admin approval to ensure a secure community.",
    },
    {
      title: "Set Your Pricing",
      description: "Configure how much you pay for full tiffins, half meals, or custom snacks.",
    },
    {
      title: "Log Daily",
      description: "Quickly mark what you ate today. Use bulk operations for vacations or leaves.",
    },
    {
      title: "Analyze & Export",
      description: "Review your monthly summaries and export data to CSV for your records.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-100/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              MealMate
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-slate-600 hover:text-amber-600">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full bg-slate-900 px-6 font-semibold text-white hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-200 transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-orange-200/20 blur-[120px]" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Trusted by 1,000+ Students & Professionals
                  </div>
                  <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                    Master Your <br />
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                      Meal Expenses
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                    Stop guessing your monthly mess bill. MealMate provides a simple, 
                    powerful way to log your daily tiffins and track every cent you spend on food.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link href="/signup">
                      <Button
                        size="lg"
                        className="h-14 rounded-full bg-slate-900 px-10 text-lg font-bold text-white hover:bg-amber-600 hover:scale-105 transition-all active:scale-95"
                      >
                        Start Tracking Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline" className="h-14 rounded-full px-10 text-lg border-slate-200 hover:bg-slate-50 transition-all">
                        View Demo
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Showcase UI Mockup */}
              <div className="flex-1 w-full max-w-2xl lg:max-w-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-amber-200/50"
                >
                  {/* Mock Dashboard Top */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="h-3 w-24 rounded-full bg-slate-200 mb-1" />
                        <div className="h-2 w-16 rounded-full bg-slate-100" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-slate-50" />
                    </div>
                  </div>

                  {/* Mock Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Spent This Month</div>
                      <div className="text-2xl font-bold text-slate-900">$342.50</div>
                      <div className="mt-2 flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" /> 12% vs last month
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Meals</div>
                      <div className="text-2xl font-bold text-slate-900">48</div>
                      <div className="mt-2 flex items-center text-xs text-amber-600 font-medium">
                        <PieChart className="h-3 w-3 mr-1" /> 82% tiffin rate
                      </div>
                    </div>
                  </div>

                  {/* Mock Log Entry */}
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-slate-900 mb-2">Recent Logs</div>
                    {[
                      { label: "Full Tiffin", price: "$5.00", time: "Today, 1:30 PM", icon: Utensils, color: "text-blue-500" },
                      { label: "Evening Snacks", price: "$2.50", time: "Today, 5:45 PM", icon: Clock, color: "text-amber-500" },
                      { label: "Half Meal", price: "$3.00", time: "Yesterday, 8:00 PM", icon: CheckCircle2, color: "text-green-500" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 bg-white hover:border-amber-200 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                            <div className="text-xs text-slate-400">{item.time}</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-slate-900">{item.price}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Action Button Mock */}
                  <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-amber-500 shadow-lg shadow-amber-300 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold">+</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-bold text-amber-600 uppercase tracking-widest mb-4">Features</h2>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">Everything you need to manage meals</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Simple yet powerful features designed specifically for anyone who subscribes to a mess or tiffin service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-slate-100 bg-slate-50/30 p-8 hover:bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50 transition-all"
                >
                  <div className={`rounded-xl ${feature.color} p-3 w-fit mb-6 text-white group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-base font-bold text-amber-600 uppercase tracking-widest mb-4">Workflow</h2>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                  Log your day in <br />
                  <span className="text-amber-500 italic">less than 5 seconds</span>
                </h3>
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <motion.div 
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-amber-500 text-amber-600 font-bold shadow-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                   <div className="bg-slate-900 aspect-video flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="h-20 w-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                           <TrendingUp className="h-10 w-10 text-amber-500" />
                        </div>
                        <div className="text-white text-2xl font-bold mb-2">Real-time Analytics</div>
                        <div className="text-slate-400">See your spending trends update instantly as you log.</div>
                      </div>
                   </div>
                   <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-1 text-xs font-semibold text-white border border-white/20">
                     Live Preview
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing/Value Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[40px] bg-slate-900 py-16 px-8 md:px-16 relative">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />
              
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Ready to take control of your meal expenses?</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Join hundreds of users who use MealMate to manage their food budget. 
                    It&apos;s 100% free while in beta.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-amber-500" />
                      <span>No Credit Card Required</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-amber-500" />
                      <span>Instant Setup</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3 w-full">
                  <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Beta Access</div>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-5xl font-extrabold text-slate-900">$0</span>
                      <span className="text-slate-500 font-medium">/ forever</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {["Unlimited Daily Logs", "Full Expense Tracking", "CSV Data Export", "Custom Pricing Table", "Mobile App (PWA)"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup">
                      <Button className="w-full h-14 rounded-2xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-all group">
                        Get Started Free
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                <Utensils className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                MealMate
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">Sign In</Link>
              <Link href="/signup" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">Sign Up</Link>
              <a href="#" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} MealMate. All rights reserved. 
            Designed for better food management.
          </div>
        </div>
      </footer>
    </div>
  );
}
