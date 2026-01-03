"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePricing } from '@/hooks/usePricing';
import { useLogs } from '@/hooks/useLogs';
import { AppLayout } from '@/components/AppLayout';
import { ExportButton } from '@/components/ExportButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileDown, Calendar } from 'lucide-react';
import { formatDate, CATEGORIES } from '@/lib/types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function ExportPageContent() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const { pricing, loading: pricingLoading } = usePricing(user?.uid);
  const { logs, loading: logsLoading, fetchLogs } = useLogs(user?.uid, pricing);

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user && selectedMonth && selectedYear) {
      const month = parseInt(selectedMonth);
      const year = parseInt(selectedYear);
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      fetchLogs(startDate, endDate);
    }
  }, [user, selectedMonth, selectedYear, fetchLogs]);

  const filteredLogs = useMemo(() => {
    const month = parseInt(selectedMonth);
    const year = parseInt(selectedYear);
    return Object.values(logs)
      .filter((log) => {
        const logDate = new Date(log.date);
        return logDate.getMonth() === month && logDate.getFullYear() === year;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [logs, selectedMonth, selectedYear]);

  const totalCost = useMemo(() => {
    return filteredLogs.reduce((sum, log) => sum + log.totalCost, 0);
  }, [filteredLogs]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  }, []);

  if (authLoading || pricingLoading || logsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-amber-800 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <FileDown className="h-6 w-6 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">Export Data</h1>
        </div>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span>Select Period</span>
              </div>
              <ExportButton
                logs={filteredLogs}
                month={parseInt(selectedMonth)}
                year={parseInt(selectedYear)}
                userName={userProfile?.displayName}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="space-y-2">
                <Label>Month</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 flex justify-between items-center">
                <span className="font-medium">
                  {MONTHS[parseInt(selectedMonth)]} {selectedYear}
                </span>
                <span className="text-xl font-bold">Total: ₹{totalCost}</span>
              </div>

              {filteredLogs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No entries found for this period
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.date}>
                          <TableCell className="font-medium">
                            {formatDate(new Date(log.date))}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {log.noTiffin && (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                  No Tiffin
                                </span>
                              )}
                              {log.fullTiffin && (
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                                  Full
                                </span>
                              )}
                              {log.halfTiffin && (
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                                  Half
                                </span>
                              )}
                              {log.extraTiffin && (
                                <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                                  Extra
                                </span>
                              )}
                              {log.curd && (
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                  Curd
                                </span>
                              )}
                              {log.sweet && (
                                <span className="inline-flex items-center rounded-full bg-pink-100 px-2 py-0.5 text-xs text-pink-700">
                                  Sweet
                                </span>
                              )}
                              {log.customItems.length > 0 && (
                                <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                                  +{log.customItems.length} custom
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {CATEGORIES.find((c) => c.value === log.category)?.label || log.category}
                          </TableCell>
                          <TableCell className="text-right font-medium text-amber-700">
                            ₹{log.totalCost}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

export default function ExportPage() {
  return <ExportPageContent />;
}
