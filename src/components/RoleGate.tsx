"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleGateProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'user')[];
  adminOnly?: boolean;
  fallback?: ReactNode;
}

export function RoleGate({
  children,
  allowedRoles,
  adminOnly = false,
  fallback = null,
}: RoleGateProps) {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (!userProfile) return fallback;

  if (adminOnly && userProfile.role !== 'admin') {
    return fallback;
  }

  if (allowedRoles && !allowedRoles.includes(userProfile.role)) {
    return fallback;
  }

  return <>{children}</>;
}
