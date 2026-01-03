"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DayLog, getDateKey, PricingConfig } from '@/lib/types';

export function useLogs(userId: string | undefined, pricing: PricingConfig) {
  const [logs, setLogs] = useState<Record<string, DayLog>>({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const calculateTotalCost = useCallback((log: Partial<DayLog>): number => {
    let total = 0;

    if (log.fullTiffin) total += pricing.fullTiffin;
    if (log.halfTiffin) total += pricing.halfTiffin;
    if (log.extraTiffin) total += pricing.extraTiffin;
    if (log.onlyChapati) total += pricing.chapati;
    if (log.extraChapatiQty) total += pricing.extraChapati * log.extraChapatiQty;
    if (log.onlyRice) total += pricing.rice;
    if (log.onlySabzi) total += pricing.sabzi;
    if (log.curd) total += pricing.curd;
    if (log.sweet) total += pricing.sweet;
    if (log.breakfastOnly) total += pricing.breakfast;
    if (log.dinnerOnly) total += pricing.dinner;

    if (log.customItems) {
      log.customItems.forEach((item) => {
        total += item.price;
      });
    }

    return total;
  }, [pricing]);

  const fetchLogs = useCallback(async (startDate?: Date, endDate?: Date) => {
    if (!userId) return;
    setLoading(true);

    try {
      const logsRef = collection(db, 'users', userId, 'logs');
      let q;

      if (startDate && endDate) {
        q = query(
          logsRef,
          where('date', '>=', getDateKey(startDate)),
          where('date', '<=', getDateKey(endDate)),
          orderBy('date', 'desc')
        );
      } else {
        q = query(logsRef, orderBy('date', 'desc'));
      }

      const snapshot = await getDocs(q);
      const logsData: Record<string, DayLog> = {};

      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data() as DayLog;
        logsData[data.date] = data;
      });

      setLogs(logsData);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const saveLog = useCallback(async (date: Date, logData: Partial<DayLog>) => {
    if (!userId) return;
    setSyncing(true);

    try {
      const dateKey = getDateKey(date);
      const totalCost = calculateTotalCost(logData);

      const fullLog: DayLog = {
        date: dateKey,
        fullTiffin: logData.fullTiffin || false,
        halfTiffin: logData.halfTiffin || false,
        extraTiffin: logData.extraTiffin || false,
        noTiffin: logData.noTiffin || false,
        onlyChapati: logData.onlyChapati || false,
        extraChapatiQty: logData.extraChapatiQty || 0,
        onlyRice: logData.onlyRice || false,
        onlySabzi: logData.onlySabzi || false,
        curd: logData.curd || false,
        sweet: logData.sweet || false,
        breakfastOnly: logData.breakfastOnly || false,
        dinnerOnly: logData.dinnerOnly || false,
        customItems: logData.customItems || [],
        notes: logData.notes || '',
        category: logData.category || 'mess',
        totalCost,
        createdAt: logData.createdAt || new Date(),
        updatedAt: new Date(),
      };

      const docRef = doc(db, 'users', userId, 'logs', dateKey);
      await setDoc(docRef, fullLog);

      setLogs((prev) => ({ ...prev, [dateKey]: fullLog }));
    } catch (error) {
      console.error('Error saving log:', error);
      throw error;
    } finally {
      setSyncing(false);
    }
  }, [userId, calculateTotalCost]);

  const deleteLog = useCallback(async (date: Date) => {
    if (!userId) return;
    setSyncing(true);

    try {
      const dateKey = getDateKey(date);
      const docRef = doc(db, 'users', userId, 'logs', dateKey);
      await deleteDoc(docRef);

      setLogs((prev) => {
        const updated = { ...prev };
        delete updated[dateKey];
        return updated;
      });
    } catch (error) {
      console.error('Error deleting log:', error);
      throw error;
    } finally {
      setSyncing(false);
    }
  }, [userId]);

  const getLog = useCallback(async (date: Date): Promise<DayLog | null> => {
    if (!userId) return null;

    const dateKey = getDateKey(date);
    if (logs[dateKey]) return logs[dateKey];

    try {
      const docRef = doc(db, 'users', userId, 'logs', dateKey);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as DayLog;
      }
      return null;
    } catch (error) {
      console.error('Error getting log:', error);
      return null;
    }
  }, [userId, logs]);

  const setBulkLeave = useCallback(async (
    startDate: Date,
    endDate: Date,
    category: string
  ) => {
    if (!userId) return;
    setSyncing(true);

    try {
      const batch = writeBatch(db);
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateKey = getDateKey(currentDate);
        const docRef = doc(db, 'users', userId, 'logs', dateKey);

        const leaveLog: DayLog = {
          date: dateKey,
          fullTiffin: false,
          halfTiffin: false,
          extraTiffin: false,
          noTiffin: true,
          onlyChapati: false,
          extraChapatiQty: 0,
          onlyRice: false,
          onlySabzi: false,
          curd: false,
          sweet: false,
          breakfastOnly: false,
          dinnerOnly: false,
          customItems: [],
          notes: `Leave: ${category}`,
          category,
          totalCost: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        batch.set(docRef, leaveLog);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      await batch.commit();
      await fetchLogs();
    } catch (error) {
      console.error('Error setting bulk leave:', error);
      throw error;
    } finally {
      setSyncing(false);
    }
  }, [userId, fetchLogs]);

  const getMonthlySummary = useCallback((month: number, year: number) => {
    const monthLogs = Object.values(logs).filter((log) => {
      const logDate = new Date(log.date);
      return logDate.getMonth() === month && logDate.getFullYear() === year;
    });

    const totalCost = monthLogs.reduce((sum, log) => sum + log.totalCost, 0);
    const daysLogged = monthLogs.length;
    const categoryBreakdown: Record<string, number> = {};

    monthLogs.forEach((log) => {
      const category = log.category || 'mess';
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + log.totalCost;
    });

    return {
      totalCost,
      daysLogged,
      categoryBreakdown,
      logs: monthLogs,
    };
  }, [logs]);

  const getWeeklySummary = useCallback((startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const weekLogs = Object.values(logs).filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startOfWeek && logDate <= endOfWeek;
    });

    const totalCost = weekLogs.reduce((sum, log) => sum + log.totalCost, 0);

    return {
      totalCost,
      daysLogged: weekLogs.length,
      logs: weekLogs,
    };
  }, [logs]);

  useEffect(() => {
    if (userId) {
      fetchLogs();
    }
  }, [userId, fetchLogs]);

  return {
    logs,
    loading,
    syncing,
    saveLog,
    deleteLog,
    getLog,
    fetchLogs,
    setBulkLeave,
    getMonthlySummary,
    getWeeklySummary,
    calculateTotalCost,
  };
}
