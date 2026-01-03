"use client";

import { useState, useEffect, useCallback } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PricingConfig, DEFAULT_PRICING } from '@/lib/types';

export function usePricing(userId: string | undefined) {
  const [pricing, setPricing] = useState<PricingConfig>(DEFAULT_PRICING);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPricing = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.pricing) {
          setPricing({ ...DEFAULT_PRICING, ...userData.pricing });
        }
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updatePricing = useCallback(async (newPricing: Partial<PricingConfig>) => {
    if (!userId) return;
    setSaving(true);

    try {
      const updatedPricing = { ...pricing, ...newPricing };
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { pricing: updatedPricing });
      setPricing(updatedPricing);
    } catch (error) {
      console.error('Error updating pricing:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }, [userId, pricing]);

  const resetToDefaults = useCallback(async () => {
    if (!userId) return;
    setSaving(true);

    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { pricing: DEFAULT_PRICING });
      setPricing(DEFAULT_PRICING);
    } catch (error) {
      console.error('Error resetting pricing:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchPricing();
    }
  }, [userId, fetchPricing]);

  return {
    pricing,
    loading,
    saving,
    updatePricing,
    resetToDefaults,
    fetchPricing,
  };
}
