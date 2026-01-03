"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ApprovalGate } from '@/components/ApprovalGate';
import {
  Home,
  Calendar,
  Settings,
  DollarSign,
  FileDown,
  Users,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Utensils,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

const userNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/log', label: 'Log Entry', icon: Calendar },
  { href: '/pricing', label: 'My Pricing', icon: DollarSign },
  { href: '/export', label: 'Export', icon: FileDown },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const adminNavItems = [
  { href: '/admin', label: 'Admin Panel', icon: Shield },
  { href: '/admin/users', label: 'Manage Users', icon: Users },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { userProfile, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = isAdmin ? [...userNavItems, ...adminNavItems] : userNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="sticky top-0 z-50 border-b border-amber-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-2">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              MealMate
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    pathname === item.href &&
                      'bg-gradient-to-r from-amber-500 to-orange-500'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{userProfile?.displayName || userProfile?.email}</span>
              {isAdmin && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                  Admin
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-amber-200 bg-white md:hidden">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      pathname === item.href &&
                        'bg-gradient-to-r from-amber-500 to-orange-500'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <ApprovalGate>
          {children}
        </ApprovalGate>
      </main>

      <footer className="border-t border-amber-200 bg-white/50 py-4 mt-auto">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          <p>MealMate &copy; {new Date().getFullYear()} - Track your meals</p>
        </div>
      </footer>
    </div>
  );
}
