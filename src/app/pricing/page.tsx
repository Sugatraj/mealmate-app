"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePricing } from '@/hooks/usePricing';
import { AppLayout } from '@/components/AppLayout';
import { PricingEditor } from '@/components/PricingEditor';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { PricingConfig } from '@/lib/types';

function PricingPageContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { pricing, loading: pricingLoading, saving, updatePricing, resetToDefaults } = usePricing(user?.uid);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  const handleSave = async (newPricing: Partial<PricingConfig>) => {
    try {
      await updatePricing(newPricing);
      toast.success('Pricing saved successfully!');
    } catch {
      toast.error('Failed to save pricing');
    }
  };

  const handleReset = async () => {
    try {
      await resetToDefaults();
      toast.success('Pricing reset to defaults');
    } catch {
      toast.error('Failed to reset pricing');
    }
  };

  if (authLoading || pricingLoading) {
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
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Pricing</h1>
        </div>

        <p className="text-gray-600">
          Customize the prices for each food item. These prices will be used to calculate
          your daily and monthly expenses.
        </p>

        <PricingEditor
          pricing={pricing}
          onSave={handleSave}
          onReset={handleReset}
          saving={saving}
        />
      </div>
    </AppLayout>
  );
}

export default function PricingPage() {
  return <PricingPageContent />;
}
