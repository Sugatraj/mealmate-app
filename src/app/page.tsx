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

export default function LandingPage() {
  const router = useRouter();
  const { user, loading, isApproved, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && user && (isApproved || isAdmin)) {
      router.push("/dashboard");
    }
  }, [user, loading, router, isApproved, isAdmin]);

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
    <div className="bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0] 
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-amber-200/20 blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, -30, 0] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-orange-200/20 blur-[120px]" 
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
            
            {/* Floating Micro-icons */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[5%] text-amber-500/10"
            >
              <Utensils size={120} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] right-[5%] text-orange-500/10"
            >
              <PieChart size={150} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[40%] right-[15%] text-yellow-500/10"
            >
              <DollarSign size={80} />
            </motion.div>
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 mb-6 cursor-default transition-all hover:bg-amber-100"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Trusted by students & professionals worldwide
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
                  >
                    Master Your <br />
                    <motion.span 
                      animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-[length:200%_auto] bg-clip-text text-transparent"
                    >
                      Meal Expenses
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
                  >
                    Stop guessing your monthly mess bill. MealMate provides a simple, 
                    powerful way to log your daily tiffins and track every cent you spend on food.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                  >
                    {user ? (
                      <Link href="/dashboard">
                        <Button
                          size="lg"
                          className="h-14 rounded-full bg-slate-900 px-10 text-lg font-bold text-white hover:bg-amber-600 hover:scale-105 transition-all active:scale-95 group relative overflow-hidden"
                        >
                          <motion.span
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-white/10 skew-x-12"
                          />
                          Go to Dashboard
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </motion.span>
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/signup">
                          <Button
                            size="lg"
                            className="h-14 rounded-full bg-slate-900 px-10 text-lg font-bold text-white hover:bg-amber-600 hover:scale-105 transition-all active:scale-95 group relative overflow-hidden"
                          >
                            <motion.span
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 bg-white/10 skew-x-12"
                            />
                            Start Tracking Now
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </motion.span>
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="h-14 rounded-full px-10 text-lg border-slate-200 hover:bg-slate-50 transition-all group"
                          >
                            View Demo
                            <motion.span
                              whileHover={{ rotate: 15 }}
                              className="ml-2"
                            >
                              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            </motion.span>
                          </Button>
                        </Link>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </div>

              {/* Showcase UI Mockup */}
              <div className="flex-1 w-full max-w-2xl lg:max-w-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
                  className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-amber-200/50"
                >
                  {/* Mock Dashboard Top */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center"
                      >
                        <Settings className="h-5 w-5 text-slate-400" />
                      </motion.div>
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
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                    >
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Spent This Month</div>
                      <div className="text-2xl font-bold text-slate-900">$342.50</div>
                      <div className="mt-2 flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" /> 12% vs last month
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                    >
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Meals</div>
                      <div className="text-2xl font-bold text-slate-900">48</div>
                      <div className="mt-2 flex items-center text-xs text-amber-600 font-medium">
                        <PieChart className="h-3 w-3 mr-1" /> 82% tiffin rate
                      </div>
                    </motion.div>
                  </div>

                  {/* Mock Log Entry */}
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-slate-900 mb-2">Recent Logs</div>
                    {[
                      { label: "Full Tiffin", price: "$5.00", time: "Today, 1:30 PM", icon: Utensils, color: "text-blue-500" },
                      { label: "Evening Snacks", price: "$2.50", time: "Today, 5:45 PM", icon: Clock, color: "text-amber-500" },
                      { label: "Half Meal", price: "$3.00", time: "Yesterday, 8:00 PM", icon: CheckCircle2, color: "text-green-500" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (i * 0.1) }}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between rounded-lg border border-slate-100 p-3 bg-white hover:border-amber-200 transition-colors"
                      >
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
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Floating Action Button Mock */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-amber-500 shadow-lg shadow-amber-300 flex items-center justify-center text-white cursor-pointer hover:bg-amber-600 transition-colors"
                  >
                    <span className="text-2xl font-bold">+</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-base font-bold text-amber-600 uppercase tracking-widest mb-4">Features</h2>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6">Everything you need to manage meals</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Simple yet powerful features designed specifically for anyone who subscribes to a mess or tiffin service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative rounded-2xl border border-slate-100 bg-slate-50/30 p-8 hover:bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50 transition-all"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-xl ${feature.color} p-3 w-fit mb-6 text-white group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
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
        <section className="py-24 bg-slate-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-base font-bold text-amber-600 uppercase tracking-widest mb-4">Workflow</h2>
                  <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                    Log your day in <br />
                    <span className="text-amber-500 italic">less than 5 seconds</span>
                  </h3>
                </motion.div>
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <motion.div 
                      key={step.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-5 group"
                    >
                      <motion.div 
                        whileInView={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-amber-500 text-amber-600 font-bold shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors"
                      >
                        {index + 1}
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">{step.title}</h4>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                   <div className="bg-slate-900 aspect-video flex items-center justify-center p-8">
                      <div className="text-center">
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 5, repeat: Infinity }}
                          className="h-20 w-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6"
                        >
                           <TrendingUp className="h-10 w-10 text-amber-500" />
                        </motion.div>
                        <div className="text-white text-2xl font-bold mb-2">Real-time Analytics</div>
                        <div className="text-slate-400">See your spending trends update instantly as you log.</div>
                      </div>
                   </div>
                   <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-1 text-xs font-semibold text-white border border-white/20">
                     Live Preview
                   </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing/Value Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-[40px] bg-slate-900 py-16 px-8 md:px-16 relative overflow-hidden"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]" 
              />
              <motion.div 
                animate={{ 
                  scale: [1.5, 1, 1.5],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" 
              />
              
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl font-extrabold text-white mb-6"
                  >
                    Ready to take control of your meal expenses?
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-lg mb-8 leading-relaxed"
                  >
                    Join hundreds of users who use MealMate to manage their food budget. 
                    It&apos;s 100% free while in beta.
                  </motion.p>
                  <div className="flex flex-wrap gap-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-amber-500" />
                      <span>No Credit Card Required</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-amber-500" />
                      <span>Instant Setup</span>
                    </motion.div>
                  </div>
                </div>
                <div className="lg:w-1/3 w-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 30, rotate: 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="bg-white rounded-3xl p-8 shadow-xl"
                  >
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Beta Access</div>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-5xl font-extrabold text-slate-900">$0</span>
                      <span className="text-slate-500 font-medium">/ forever</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {["Unlimited Daily Logs", "Full Expense Tracking", "CSV Data Export", "Custom Pricing Table", "Mobile App (PWA)"].map((item, i) => (
                        <motion.li 
                          key={item} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + (i * 0.1) }}
                          className="flex items-center gap-3 text-slate-600 font-medium"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    {user ? (
                      <Link href="/dashboard">
                        <Button className="w-full h-14 rounded-2xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-all group">
                          Go to Dashboard
                          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/signup">
                        <Button className="w-full h-14 rounded-2xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-all group">
                          Get Started Free
                          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

