"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePricing } from '@/hooks/usePricing';
import { useLogs } from '@/hooks/useLogs';
import { AppLayout } from '@/components/AppLayout';
import { DayEntry } from '@/components/DayEntry';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DayLog, formatDate, getDateKey } from '@/lib/types';
import { CalendarIcon, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

function LogPageContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { pricing, loading: pricingLoading } = usePricing(user?.uid);
  const { logs, loading: logsLoading, saveLog, syncing, getLog } = useLogs(user?.uid, pricing);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedLog, setSelectedLog] = useState<DayLog | null>(null);
  const [loadingLog, setLoadingLog] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchLog = async () => {
      setLoadingLog(true);
      const log = await getLog(selectedDate);
      setSelectedLog(log);
      setLoadingLog(false);
    };
    if (user) {
      fetchLog();
    }
  }, [selectedDate, user, getLog]);

  const loggedDates = useMemo(() => {
    return Object.keys(logs).map((dateStr) => new Date(dateStr));
  }, [logs]);

  const handleSaveLog = async (logData: Partial<DayLog>) => {
    try {
      await saveLog(selectedDate, logData);
      const updatedLog = await getLog(selectedDate);
      setSelectedLog(updatedLog);
      toast.success('Entry saved successfully!');
    } catch {
      toast.error('Failed to save entry');
    }
  };

  const handleSkip = async () => {
    try {
      await saveLog(selectedDate, { noTiffin: true });
      const updatedLog = await getLog(selectedDate);
      setSelectedLog(updatedLog);
      toast.success('Marked as skipped');
    } catch {
      toast.error('Failed to skip');
    }
  };

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
          <CalendarIcon className="h-6 w-6 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">Log Entry</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border border-amber-200"
                  modifiers={{
                    logged: loggedDates,
                  }}
                  modifiersStyles={{
                    logged: {
                      backgroundColor: '#fef3c7',
                      borderRadius: '50%',
                    },
                  }}
                />
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-200" />
                    <span>Logged</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>Selected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Recent Logs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                {Object.values(logs)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 7)
                  .map((log) => (
                    <button
                      key={log.date}
                      onClick={() => setSelectedDate(new Date(log.date))}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 transition-colors text-left"
                    >
                      <span className="text-sm font-medium">{formatDate(new Date(log.date))}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-700 font-medium">₹{log.totalCost}</span>
                        {log.noTiffin ? (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                {Object.keys(logs).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No logs yet. Start by adding today&apos;s entry!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {loadingLog ? (
              <Card className="border-amber-200">
                <CardContent className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
                </CardContent>
              </Card>
            ) : (
              <DayEntry
                date={selectedDate}
                existingLog={selectedLog}
                pricing={pricing}
                onSave={handleSaveLog}
                onSkip={handleSkip}
                syncing={syncing}
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function LogPage() {
  return <LogPageContent />;
}
