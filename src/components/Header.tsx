"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Utensils, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-100/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Link href="/" className="flex items-center gap-2 group">
              <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              <span className="hidden sm:inline text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">Back to Home</span>
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              MealMate
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/how-it-works" className={pathname === "/how-it-works" ? "text-sm font-bold text-amber-600" : "hidden md:block text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"}>How it Works</Link>
          <Link href="/faq" className={pathname === "/faq" ? "text-sm font-bold text-amber-600" : "hidden md:block text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"}>FAQ</Link>
          {user ? (
            <Link href="/dashboard">
              <Button className="rounded-full bg-slate-900 px-6 font-semibold text-white hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-200 transition-all">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="text-slate-600 hover:text-amber-600">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full bg-slate-900 px-6 font-semibold text-white hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-200 transition-all">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
