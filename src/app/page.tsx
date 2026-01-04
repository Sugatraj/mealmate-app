"use client";

import { useEffect, useRef } from "react";
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
  ChevronRight,
  Zap,
  Star,
  Users
} from "lucide-react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue,
  Variants
} from "framer-motion";

// Advanced variants for consistent reveal animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    } 
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.33, 1, 0.68, 1] 
    } 
  },
};

export default function LandingPage() {
  const router = useRouter();
  const { user, loading, isApproved, isAdmin } = useAuth();
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // 3D Card mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      color: "bg-blue-500",
      glow: "group-hover:shadow-blue-200"
    },
    {
      icon: DollarSign,
      title: "Expense Tracking",
      description: "See exactly how much you're spending. Real-time cost calculation based on your custom pricing.",
      color: "bg-green-500",
      glow: "group-hover:shadow-green-200"
    },
    {
      icon: TrendingUp,
      title: "Monthly Analytics",
      description: "Beautiful charts showing your spending patterns by category and estimated vs actual costs.",
      color: "bg-purple-500",
      glow: "group-hover:shadow-purple-200"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Admin-verified accounts and offline support ensure your data is safe and always accessible.",
      color: "bg-orange-500",
      glow: "group-hover:shadow-orange-200"
    },
  ];

  return (
    <div className="bg-slate-50 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden py-24 sm:py-32">
          {/* Parallax Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div 
              style={{ y: y1, rotate: rotateParallax }}
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -right-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 blur-[120px]" 
            />
            <motion.div 
              style={{ y: y2 }}
              animate={{ 
                scale: [1.1, 1, 1.1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[10%] -left-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-yellow-200/20 to-amber-200/20 blur-[120px]" 
            />
            
            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay" />
            
            {/* Parallax Icons */}
            <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[8%] text-amber-500/10">
              <Utensils size={180} />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[5%] text-orange-500/10">
              <PieChart size={220} />
            </motion.div>
            <motion.div 
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 15, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[45%] right-[10%] text-yellow-500/10"
            >
              <DollarSign size={120} />
            </motion.div>
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/50 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-amber-700 mb-8 cursor-default"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-amber-500"
                    />
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      The #1 Meal Tracker for Students
                    </span>
                  </motion.div>

                  <div className="overflow-visible mb-8">
                    <motion.h1 
                      variants={textRevealVariants}
                      className="text-6xl sm:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] pb-2"
                    >
                      Master Your <br />
                      <motion.span 
                        animate={{ 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-[length:200%_auto] bg-clip-text text-transparent italic inline-block pb-2"
                      >
                        Meal Expenses
                      </motion.span>
                    </motion.h1>
                  </div>

                  <motion.p 
                    variants={itemVariants}
                    className="text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed font-medium"
                  >
                    Stop guessing your monthly mess bill. MealMate provides a simple, 
                    powerful way to log your daily tiffins and track every cent you spend on food.
                  </motion.p>

                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                  >
                    {user ? (
                      <Link href="/dashboard">
                        <Button
                          size="lg"
                          className="h-16 rounded-full bg-slate-900 px-10 text-xl font-bold text-white hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 transition-all active:scale-95 group relative overflow-hidden"
                        >
                          <motion.span
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-white/20 skew-x-12"
                          />
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/signup">
                          <Button
                            size="lg"
                            className="h-16 rounded-full bg-slate-900 px-10 text-xl font-bold text-white hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 transition-all active:scale-95 group relative overflow-hidden"
                          >
                            <motion.span
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.8 }}
                              className="absolute inset-0 bg-white/20 skew-x-12"
                            />
                            Start Tracking Free
                            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="h-16 rounded-full px-10 text-xl font-bold border-slate-200 hover:bg-white hover:border-amber-500 hover:text-amber-600 transition-all group shadow-sm"
                          >
                            Live Demo
                            <ChevronRight className="ml-2 h-6 w-6 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                          </Button>
                        </Link>
                      </>
                    )}
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="mt-12 flex items-center justify-center lg:justify-start gap-8"
                  >
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                          <img 
                            src={`https://i.pravatar.cc/100?u=${i}`} 
                            alt="User" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-slate-500">
                      <span className="font-bold text-slate-900 block">500+ Students</span>
                      tracking their expenses daily
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Showcase UI Mockup with 3D Interaction */}
              <div className="flex-1 w-full max-w-2xl lg:max-w-none perspective-1000">
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  initial={{ opacity: 0, x: 100, rotateY: -20 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="relative rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur-xl p-6 shadow-[0_32px_64px_-12px_rgba(251,191,36,0.15)] group"
                >
                  <div style={{ transform: "translateZ(50px)" }} className="relative">
                    {/* Mock Dashboard Top */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400"
                        >
                          <Settings className="h-6 w-6" />
                        </motion.div>
                        <div>
                          <div className="h-4 w-32 rounded-full bg-slate-200 mb-2" />
                          <div className="h-3 w-20 rounded-full bg-slate-100" />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-slate-300" />
                        </div>
                      </div>
                    </div>

                    {/* Mock Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-amber-200 hover:bg-white"
                      >
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Spent This Month</div>
                        <div className="text-3xl font-black text-slate-900">₹4,250</div>
                        <div className="mt-3 flex items-center text-xs text-green-600 font-bold bg-green-50 w-fit px-2 py-1 rounded-full">
                          <TrendingUp className="h-3 w-3 mr-1" /> +12%
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-amber-200 hover:bg-white"
                      >
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Meals</div>
                        <div className="text-3xl font-black text-slate-900">48</div>
                        <div className="mt-3 flex items-center text-xs text-amber-600 font-bold bg-amber-50 w-fit px-2 py-1 rounded-full">
                          <PieChart className="h-3 w-3 mr-1" /> 82%
                        </div>
                      </motion.div>
                    </div>

                    {/* Mock Log Entry */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-black text-slate-900">Recent Activity</div>
                        <div className="text-xs font-bold text-amber-600 hover:underline cursor-pointer">View all</div>
                      </div>
                      {[
                        { label: "Full Tiffin", price: "₹80", time: "Today, 1:30 PM", icon: Utensils, color: "text-blue-500", bg: "bg-blue-50" },
                        { label: "Evening Snacks", price: "₹45", time: "Today, 5:45 PM", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
                        { label: "Half Meal", price: "₹60", time: "Yesterday, 8:00 PM", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" }
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,1)" }}
                          className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 bg-slate-50/30 transition-all hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">{item.label}</div>
                              <div className="text-xs text-slate-400 font-medium">{item.time}</div>
                            </div>
                          </div>
                          <div className="text-sm font-black text-slate-900">{item.price}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating Elements (Out of box effect) */}
                  <motion.div 
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [15, 20, 15]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -left-10 h-24 w-24 rounded-3xl bg-white shadow-2xl flex flex-col items-center justify-center p-4 border border-slate-100"
                    style={{ transform: "translateZ(80px)" }}
                  >
                    <div className="text-amber-500 font-black text-xl mb-1">98%</div>
                    <div className="text-[10px] font-bold text-slate-400 text-center leading-tight uppercase">Accuracy Rate</div>
                  </motion.div>

                  <motion.div 
                    animate={{ 
                      y: [0, 15, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full bg-slate-900 shadow-2xl shadow-slate-900/40 flex items-center justify-center text-white cursor-pointer group/btn"
                    style={{ transform: "translateZ(100px)" }}
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl font-light"
                    >
                      +
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Hover Reveal */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-black uppercase tracking-widest mb-6 inline-block"
              >
                Features
              </motion.span>
              <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-8 tracking-tight">
                Everything you need to <br />
                <span className="text-amber-500 italic">manage meals</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                Simple yet powerful features designed specifically for anyone who subscribes to a mess or tiffin service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -15 }}
                  className="group relative rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-10 hover:bg-white transition-all duration-500 hover:border-amber-200 hover:shadow-[0_40px_80px_-15px_rgba(251,191,36,0.1)]"
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className={`rounded-3xl ${feature.color} p-5 w-fit mb-8 text-white shadow-xl ${feature.glow}`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </motion.div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                  
                  <div className="mt-8 pt-8 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-amber-600 font-bold text-sm gap-2">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-amber-50/50 via-transparent to-orange-50/50 pointer-events-none" />
        </section>

        {/* Dynamic Workflow Section */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
          {/* Background particles/elements */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.5, 0.1],
                  y: [Math.random() * 1000, Math.random() * 1000 - 500],
                  x: [Math.random() * 1000, Math.random() * 1000 - 500]
                }}
                transition={{ duration: Math.random() * 10 + 10, repeat: Infinity }}
                className="absolute h-1 w-1 bg-amber-500 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-sm mb-6 block">Workflow</span>
                  <h3 className="text-5xl sm:text-7xl font-black mb-10 leading-none tracking-tighter">
                    Log your day in <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 italic">5 seconds.</span>
                  </h3>
                </motion.div>
                
                <div className="space-y-10">
                  {[
                    { title: "Quick Sign Up", desc: "Start in seconds with Google or email auth." },
                    { title: "Smart Pricing", desc: "Customize costs for different meal types." },
                    { title: "One-Tap Log", desc: "Just hit the plus button and you're done." }
                  ].map((step, index) => (
                    <motion.div 
                      key={step.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="flex items-center gap-8 group cursor-default"
                    >
                      <div className="relative">
                        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                          {index + 1}
                        </div>
                        {index < 2 && (
                          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-white/10 to-transparent" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black mb-2 group-hover:text-amber-500 transition-colors">{step.title}</h4>
                        <p className="text-slate-400 font-medium">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, type: "spring" }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-slate-800 rounded-[2.5rem] p-12 aspect-square flex flex-col items-center justify-center text-center overflow-hidden border border-white/10">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <div className="h-32 w-32 rounded-full bg-amber-500/20 flex items-center justify-center mb-8 mx-auto">
                        <TrendingUp className="h-16 w-16 text-amber-500" />
                      </div>
                    </motion.div>
                    <h5 className="text-3xl font-black mb-4 relative z-10">Real-time Analytics</h5>
                    <p className="text-slate-400 text-lg max-w-xs mx-auto relative z-10">Watch your spending trends update instantly with every meal you log.</p>
                    
                    {/* Animated grid overlay inside the box */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="rounded-[3rem] bg-slate-900 py-24 px-8 md:px-24 relative overflow-hidden group shadow-2xl shadow-amber-900/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 pointer-events-none" />
              
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="lg:w-3/5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-5xl sm:text-7xl font-black text-white mb-8 tracking-tighter">
                      Take control of your <br />
                      <span className="text-amber-500 italic">meal budget</span>
                    </h3>
                    <p className="text-slate-400 text-xl mb-12 max-w-xl font-medium leading-relaxed">
                      Join hundreds of users who use MealMate to manage their food budget. 
                      Simple, fast, and completely free while in beta.
                    </p>
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-3 text-slate-200 font-bold">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-amber-500" />
                        </div>
                        No Credit Card
                      </div>
                      <div className="flex items-center gap-3 text-slate-200 font-bold">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-amber-500" />
                        </div>
                        Instant Setup
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="lg:w-2/5 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="bg-white rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <span className="px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-widest">Limited Beta</span>
                        <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
                      </div>
                      <div className="flex items-baseline gap-2 mb-10">
                        <span className="text-7xl font-black text-slate-900 tracking-tighter">₹0</span>
                        <span className="text-slate-400 font-bold text-xl">/ mo</span>
                      </div>
                      <ul className="space-y-5 mb-12">
                        {["Unlimited Daily Logs", "CSV Data Export", "Custom Pricing Table", "Mobile App Access"].map((item) => (
                          <li key={item} className="flex items-center gap-4 text-slate-600 font-bold">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      {user ? (
                        <Link href="/dashboard">
                          <Button className="w-full h-16 rounded-2xl bg-amber-500 text-white font-black text-xl hover:bg-amber-600 transition-all hover:shadow-xl hover:shadow-amber-500/20 group">
                            Dashboard
                            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/signup">
                          <Button className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-xl hover:bg-amber-600 transition-all hover:shadow-xl hover:shadow-amber-500/20 group">
                            Join Beta Free
                            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </Link>
                      )}
                    </div>
                    
                    {/* Background blob for the card */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 bg-amber-50 rounded-full blur-3xl pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-amber-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
