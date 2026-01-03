"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, DollarSign, PieChart } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: 'trending' | 'calendar' | 'dollar' | 'pie';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const iconMap = {
  trending: TrendingUp,
  calendar: Calendar,
  dollar: DollarSign,
  pie: PieChart,
};

export function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: SummaryCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="border-amber-100 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="rounded-full bg-amber-100 p-2">
          <Icon className="h-4 w-4 text-amber-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div
            className={`flex items-center text-xs mt-2 ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp
              className={`h-3 w-3 mr-1 ${
                !trend.isPositive && 'rotate-180'
              }`}
            />
            {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}
