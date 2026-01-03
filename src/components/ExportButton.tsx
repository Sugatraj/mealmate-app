"use client";

import { DayLog, formatDate } from '@/lib/types';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';

interface ExportButtonProps {
  logs: DayLog[];
  month?: number;
  year?: number;
  userName?: string;
}

export function ExportButton({ logs, month, year, userName }: ExportButtonProps) {
  const handleExportCSV = () => {
    const data = logs.map((log) => ({
      Date: log.date,
      'Full Tiffin': log.fullTiffin ? 'Yes' : 'No',
      'Half Tiffin': log.halfTiffin ? 'Yes' : 'No',
      'Extra Tiffin': log.extraTiffin ? 'Yes' : 'No',
      'No Tiffin': log.noTiffin ? 'Yes' : 'No',
      'Only Chapati': log.onlyChapati ? 'Yes' : 'No',
      'Extra Chapati': log.extraChapatiQty,
      'Only Rice': log.onlyRice ? 'Yes' : 'No',
      'Only Sabzi': log.onlySabzi ? 'Yes' : 'No',
      Curd: log.curd ? 'Yes' : 'No',
      Sweet: log.sweet ? 'Yes' : 'No',
      'Breakfast Only': log.breakfastOnly ? 'Yes' : 'No',
      'Dinner Only': log.dinnerOnly ? 'Yes' : 'No',
      'Custom Items': log.customItems.map((i) => `${i.name}: ₹${i.price}`).join(', '),
      Category: log.category,
      Notes: log.notes,
      'Total Cost': `₹${log.totalCost}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Meal Logs');

    const monthName = month !== undefined
      ? new Date(year || new Date().getFullYear(), month).toLocaleString('default', { month: 'long' })
      : 'All';
    const fileName = `MealMate_${userName || 'User'}_${monthName}_${year || new Date().getFullYear()}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  const handleExportAsCSV = () => {
    const headers = [
      'Date', 'Full Tiffin', 'Half Tiffin', 'Extra Tiffin', 'No Tiffin',
      'Only Chapati', 'Extra Chapati', 'Only Rice', 'Only Sabzi', 'Curd',
      'Sweet', 'Breakfast Only', 'Dinner Only', 'Custom Items', 'Category',
      'Notes', 'Total Cost'
    ];

    const rows = logs.map((log) => [
      log.date,
      log.fullTiffin ? 'Yes' : 'No',
      log.halfTiffin ? 'Yes' : 'No',
      log.extraTiffin ? 'Yes' : 'No',
      log.noTiffin ? 'Yes' : 'No',
      log.onlyChapati ? 'Yes' : 'No',
      log.extraChapatiQty.toString(),
      log.onlyRice ? 'Yes' : 'No',
      log.onlySabzi ? 'Yes' : 'No',
      log.curd ? 'Yes' : 'No',
      log.sweet ? 'Yes' : 'No',
      log.breakfastOnly ? 'Yes' : 'No',
      log.dinnerOnly ? 'Yes' : 'No',
      log.customItems.map((i) => `${i.name}: ₹${i.price}`).join('; '),
      log.category,
      log.notes.replace(/,/g, ';'),
      log.totalCost.toString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const monthName = month !== undefined
      ? new Date(year || new Date().getFullYear(), month).toLocaleString('default', { month: 'long' })
      : 'All';
    const fileName = `MealMate_${userName || 'User'}_${monthName}_${year || new Date().getFullYear()}.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (logs.length === 0) {
    return (
      <Button variant="outline" disabled>
        <Download className="mr-2 h-4 w-4" />
        No data to export
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleExportAsCSV}>
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
      <Button
        onClick={handleExportCSV}
        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Export Excel
      </Button>
    </div>
  );
}
