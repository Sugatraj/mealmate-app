"use client";

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePricing } from '@/hooks/usePricing';
import { useLogs } from '@/hooks/useLogs';
import { AppLayout } from '@/components/AppLayout';
import { ApprovalGate } from '@/components/ApprovalGate';
import { SummaryCard } from '@/components/SummaryCard';
import { DayEntry } from '@/components/DayEntry';
import { BulkLeaveSetter } from '@/components/BulkLeaveSetter';
import { DayLog, formatDate, CATEGORIES } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const CHART_COLORS = ['#f59e0b', '#fb923c', '#fbbf24', '#f97316', '#fcd34d'];

function DashboardContent() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const { pricing, loading: pricingLoading } = usePricing(user?.uid);
  const { logs, loading: logsLoading, saveLog, syncing, setBulkLeave, getMonthlySummary } = useLogs(user?.uid, pricing);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  const today = new Date();
  const todayKey = today.toISOString().split('T')[0];
  const todayLog = logs[todayKey];

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthlySummary = useMemo(() => getMonthlySummary(currentMonth, currentYear), [getMonthlySummary, currentMonth, currentYear]);

  const categoryChartData = useMemo(() => {
    return Object.entries(monthlySummary.categoryBreakdown).map(([key, value]) => ({
      name: CATEGORIES.find((c) => c.value === key)?.label || key,
      value,
    }));
  }, [monthlySummary.categoryBreakdown]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const estimatedMonthly = useMemo(() => {
    if (monthlySummary.daysLogged === 0) return 0;
    const avgPerDay = monthlySummary.totalCost / monthlySummary.daysLogged;
    return Math.round(avgPerDay * daysInMonth);
  }, [monthlySummary, daysInMonth]);

  const handleSaveLog = async (logData: Partial<DayLog>) => {
    try {
      await saveLog(today, logData);
      toast.success('Entry saved successfully!');
    } catch {
      toast.error('Failed to save entry');
    }
  };

  const handleSkipToday = async () => {
    try {
      await saveLog(today, { noTiffin: true });
      toast.success('Marked as skipped');
    } catch {
      toast.error('Failed to skip');
    }
  };

  const handleBulkLeave = async (startDate: Date, endDate: Date, category: string) => {
    try {
      await setBulkLeave(startDate, endDate, category);
      toast.success('Bulk leave set successfully!');
    } catch {
      toast.error('Failed to set bulk leave');
    }
  };

  if (authLoading || pricingLoading || logsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-amber-800 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {userProfile?.displayName || 'User'}!
            </h1>
            <p className="text-gray-600">{formatDate(today)}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
            <Calendar className="h-4 w-4" />
            <span>{currentMonth + 1}/{currentYear}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Monthly Spent"
            value={`₹${monthlySummary.totalCost}`}
            subtitle={`${monthlySummary.daysLogged} days logged`}
            icon="dollar"
          />
          <SummaryCard
            title="Estimated Monthly"
            value={`₹${estimatedMonthly}`}
            subtitle="Based on average"
            icon="trending"
          />
          <SummaryCard
            title="Days Logged"
            value={monthlySummary.daysLogged}
            subtitle={`of ${daysInMonth} days`}
            icon="calendar"
          />
          <SummaryCard
            title="Avg. Per Day"
            value={`₹${monthlySummary.daysLogged > 0 ? Math.round(monthlySummary.totalCost / monthlySummary.daysLogged) : 0}`}
            subtitle="This month"
            icon="pie"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DayEntry
              date={today}
              existingLog={todayLog}
              pricing={pricing}
              onSave={handleSaveLog}
              onSkip={handleSkipToday}
              syncing={syncing}
            />
          </div>

          <div className="space-y-6">
            {categoryChartData.length > 0 && (
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                    Spending by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `₹${value}`}
                        >
                          {categoryChartData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            <BulkLeaveSetter onSetLeave={handleBulkLeave} syncing={syncing} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
