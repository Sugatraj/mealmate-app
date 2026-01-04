"use client";

import Link from "next/link";
import { Utensils, ChevronLeft, Heart, Zap, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
  const values = [
    {
      title: "Simplicity First",
      description: "We believe that tracking your meals shouldn't be a chore. Our interface is designed to be lightning fast and intuitive.",
      icon: Zap,
      color: "text-amber-500"
    },
    {
      title: "Community Focused",
      description: "MealMate was built to solve a real problem for students and professionals living away from home.",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Data Integrity",
      description: "Your data is your own. We provide easy ways to export and manage your meal history securely.",
      icon: Shield,
      color: "text-green-500"
    }
  ];

  return (
    <div className="bg-white selection:bg-amber-100 selection:text-amber-900">
      <main className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-6"
            >
              <Heart className="h-8 w-8 text-amber-500 fill-amber-500" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Our Mission</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              MealMate was born out of a simple frustration: the difficulty of keeping track of monthly mess bills and meal logs. 
              We've built a tool that empowers you to manage your food expenses with zero friction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-amber-100/50 transition-all text-center"
              >
                <div className="flex justify-center mb-6">
                  <value.icon className={`h-10 w-10 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 p-12 rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="flex-1 z-10">
              <h2 className="text-3xl font-bold mb-6">Why we started</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                As students, we constantly found ourselves questioning our monthly mess bills. Paper logs were unreliable, and memory even more so. 
                We wanted a digital solution that was specifically tailored to the tiffin and mess culture.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                MealMate is the result of that vision—a platform where logging a meal takes seconds, and understanding your expenses takes none.
              </p>
            </div>
            <div className="flex-1 w-full z-10">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center p-8">
                <Utensils className="w-32 h-32 text-amber-500 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

