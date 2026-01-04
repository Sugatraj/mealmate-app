"use client";

import Link from "next/link";
import { Utensils } from "lucide-react";

export function Footer() {
  return (
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
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Link href="/about" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">About Us</Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">How it Works</Link>
            <Link href="/faq" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors">Contact</Link>
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
  );
}
