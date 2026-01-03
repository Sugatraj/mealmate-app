"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, ShieldAlert } from 'lucide-react';

interface ApprovalGateProps {
  children: ReactNode;
}

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/forgot-password'];

export function ApprovalGate({ children }: ApprovalGateProps) {
  const pathname = usePathname();
  const { userProfile, loading, isApproved, isAdmin, logout } = useAuth();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

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

  if (isAdmin || isApproved) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-amber-100">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-amber-100 p-4">
            <ShieldAlert className="h-12 w-12 text-amber-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Awaiting Admin Approval
          </h2>
          <p className="mb-6 text-gray-600">
            Your account is pending approval. You&apos;ll be notified once an admin
            approves your access.
          </p>
          <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-amber-700">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Status: Pending</span>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Registered as: <span className="font-medium">{userProfile?.email}</span>
          </p>
          <button
            onClick={logout}
            className="mt-6 text-sm text-amber-600 hover:text-amber-700 underline"
          >
            Sign out and try another account
          </button>
        </div>
      </div>
    </div>
  );
}
