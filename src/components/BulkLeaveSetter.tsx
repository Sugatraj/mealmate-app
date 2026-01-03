"use client";

import { useState } from 'react';
import { LEAVE_CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarDays, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface BulkLeaveSetterProps {
  onSetLeave: (startDate: Date, endDate: Date, category: string) => Promise<void>;
  syncing?: boolean;
}

export function BulkLeaveSetter({ onSetLeave, syncing = false }: BulkLeaveSetterProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [category, setCategory] = useState('noTiffin');

  const handleSubmit = async () => {
    if (!dateRange?.from || !dateRange?.to) return;
    await onSetLeave(dateRange.from, dateRange.to, category);
    setDateRange(undefined);
  };

  const isValid = dateRange?.from && dateRange?.to;

  return (
    <Card className="border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Bulk Leave Setter
        </CardTitle>
        <CardDescription className="text-amber-100">
          Mark multiple days as leave at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd MMM yyyy')} -{' '}
                      {format(dateRange.to, 'dd MMM yyyy')}
                    </>
                  ) : (
                    format(dateRange.from, 'dd MMM yyyy')
                  )
                ) : (
                  <span className="text-gray-500">Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Leave Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>
            <SelectContent>
              {LEAVE_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid || syncing}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          {syncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CalendarDays className="mr-2 h-4 w-4" />
          )}
          Set Leave for{' '}
          {dateRange?.from && dateRange?.to
            ? `${Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} days`
            : 'Selected Days'}
        </Button>
      </CardContent>
    </Card>
  );
}
