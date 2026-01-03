"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { AppLayout } from '@/components/AppLayout';
import { RoleGate } from '@/components/RoleGate';
import { SummaryCard } from '@/components/SummaryCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Bell, UserCheck, UserX, Clock } from 'lucide-react';
import { formatDate } from '@/lib/types';

interface Notification {
  id: string;
  type: string;
  email?: string;
  displayName?: string;
  createdAt: { toDate: () => Date } | Date;
  read: boolean;
}

function AdminDashboardContent() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { users, loading: usersLoading, notifications } = useUserRole(isAdmin);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (!authLoading && user && !isAdmin) {
      router.push('/dashboard');
    }
  }, [authLoading, user, isAdmin, router]);

  const pendingUsers = users.filter((u) => !u.isApproved);
  const approvedUsers = users.filter((u) => u.isApproved);
  const unreadNotifications = (notifications as Notification[]).filter((n) => !n.read);

  if (authLoading || usersLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-amber-800 font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <RoleGate adminOnly fallback={<div>Access denied</div>}>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              title="Total Users"
              value={users.length}
              subtitle="Registered accounts"
              icon="calendar"
            />
            <SummaryCard
              title="Pending Approval"
              value={pendingUsers.length}
              subtitle="Awaiting review"
              icon="trending"
            />
            <SummaryCard
              title="Active Users"
              value={approvedUsers.length}
              subtitle="Approved accounts"
              icon="dollar"
            />
            <SummaryCard
              title="Notifications"
              value={unreadNotifications.length}
              subtitle="Unread alerts"
              icon="pie"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingUsers.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No pending approvals
                  </p>
                ) : (
                  <div className="space-y-3">
                    {pendingUsers.map((user) => (
                      <div
                        key={user.uid}
                        className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200"
                      >
                        <div>
                          <p className="font-medium">{user.displayName || 'No name'}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {pendingUsers.length > 0 && (
                  <button
                    onClick={() => router.push('/admin/users')}
                    className="mt-4 text-sm text-amber-600 hover:text-amber-700 underline"
                  >
                    Manage all users →
                  </button>
                )}
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-600" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(notifications as Notification[]).length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No notifications
                  </p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {(notifications as Notification[]).slice(0, 10).map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-lg border ${
                          notif.read
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-amber-50 border-amber-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {notif.type === 'new_signup' ? (
                            <UserCheck className="h-4 w-4 text-green-600 mt-0.5" />
                          ) : (
                            <UserX className="h-4 w-4 text-amber-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {notif.type === 'new_signup'
                                ? 'New user signup'
                                : 'Password reset request'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {notif.email || notif.displayName}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notif.createdAt && typeof notif.createdAt === 'object' && 'toDate' in notif.createdAt
                                ? formatDate(notif.createdAt.toDate())
                                : formatDate(new Date(notif.createdAt as Date))}
                            </p>
                          </div>
                          {!notif.read && (
                            <span className="h-2 w-2 rounded-full bg-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    </RoleGate>
  );
}

export default function AdminPage() {
  return <AdminDashboardContent />;
}
