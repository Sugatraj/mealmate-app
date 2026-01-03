"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils, ArrowRight, TrendingUp, Calendar, DollarSign, Shield } from "lucide-react";
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
      description: "Track your tiffin, meals, and snacks with just a few taps",
    },
    {
      icon: DollarSign,
      title: "Expense Tracking",
      description: "See exactly how much you're spending on food each month",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Beautiful charts showing your spending patterns by category",
    },
    {
      icon: Shield,
      title: "Offline Ready",
      description: "Works offline and syncs when you're back online",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-2">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              MealMate
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M15%200C6.716%200%200%206.716%200%2015c0%208.284%206.716%2015%2015%2015%208.284%200%2015-6.716%2015-15%200-8.284-6.716-15-15-15zm0%205c5.523%200%2010%204.477%2010%2010s-4.477%2010-10%2010S5%2020.523%205%2015%209.477%205%2015%205z%22%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="mx-auto max-w-6xl px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700 mb-6">
                <Utensils className="h-4 w-4" />
                <span className="text-sm font-medium">Your meal expense companion</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Track Your{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Tiffin & Meals
                </span>
                <br />
                Effortlessly
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                MealMate helps you log daily food consumption, track expenses,
                and understand your spending patterns. Perfect for mess or tiffin subscribers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-6 text-lg"
                  >
                    Start Tracking Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white/50">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to manage meals
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Simple yet powerful features to help you stay on top of your food expenses
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow"
                >
                  <div className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to take control of your meal expenses?
              </h2>
              <p className="text-amber-100 max-w-xl mx-auto mb-8">
                Join MealMate today and start tracking your food consumption.
                It&apos;s free to get started!
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-6 text-lg"
                >
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-amber-200 bg-white/50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 p-1.5">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">MealMate</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MealMate. Track your meals, control your expenses.
          </p>
        </div>
      </footer>
    </div>
  );
}
