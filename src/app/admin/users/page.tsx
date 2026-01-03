"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { AppLayout } from '@/components/AppLayout';
import { RoleGate } from '@/components/RoleGate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Users, Search, CheckCircle, XCircle, Shield, User } from 'lucide-react';
import { formatDate } from '@/lib/types';
import { toast } from 'sonner';

function AdminUsersContent() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { users, loading: usersLoading, toggleUserApproval, updateUserRole } = useUserRole(isAdmin);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (!authLoading && user && !isAdmin) {
      router.push('/dashboard');
    }
  }, [authLoading, user, isAdmin, router]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.displayName?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'approved' && u.isApproved) ||
      (filterStatus === 'pending' && !u.isApproved);

    return matchesSearch && matchesFilter;
  });

  const handleToggleApproval = async (userId: string, currentStatus: boolean) => {
    try {
      await toggleUserApproval(userId, !currentStatus);
      toast.success(currentStatus ? 'User access revoked' : 'User approved successfully');
    } catch {
      toast.error('Failed to update user status');
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      await updateUserRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
    } catch {
      toast.error('Failed to update user role');
    }
  };

  if (authLoading || usersLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-amber-800 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <RoleGate adminOnly fallback={<div>Access denied</div>}>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          </div>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span>All Users ({users.length})</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((u) => (
                        <TableRow key={u.uid}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                {u.role === 'admin' ? (
                                  <Shield className="h-5 w-5 text-amber-600" />
                                ) : (
                                  <User className="h-5 w-5 text-amber-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{u.displayName || 'No name'}</p>
                                <p className="text-sm text-gray-500">{u.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={u.role}
                              onValueChange={(value) =>
                                handleRoleChange(u.uid, value as 'admin' | 'user')
                              }
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {u.isApproved ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Approved
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                <XCircle className="mr-1 h-3 w-3" />
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {u.createdAt instanceof Date
                              ? formatDate(u.createdAt)
                              : 'Unknown'}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant={u.isApproved ? 'outline' : 'default'}
                                  size="sm"
                                  className={
                                    u.isApproved
                                      ? 'text-red-600 hover:text-red-700'
                                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                                  }
                                >
                                  {u.isApproved ? 'Revoke' : 'Approve'}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    {u.isApproved ? 'Revoke Access?' : 'Approve User?'}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {u.isApproved
                                      ? `This will revoke access for ${u.displayName || u.email}. They won't be able to use the app until re-approved.`
                                      : `This will approve ${u.displayName || u.email} and grant them access to the app.`}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleToggleApproval(u.uid, u.isApproved)}
                                    className={
                                      u.isApproved
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-gradient-to-r from-amber-500 to-orange-500'
                                    }
                                  >
                                    {u.isApproved ? 'Revoke Access' : 'Approve User'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </RoleGate>
  );
}

export default function AdminUsersPage() {
  return <AdminUsersContent />;
}
