"use client";

import { useState } from 'react';
import { PricingConfig, DEFAULT_PRICING } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, RotateCcw, Loader2 } from 'lucide-react';

interface PricingEditorProps {
  pricing: PricingConfig;
  onSave: (pricing: Partial<PricingConfig>) => Promise<void>;
  onReset: () => Promise<void>;
  saving?: boolean;
}

const pricingLabels: Record<keyof PricingConfig, string> = {
  fullTiffin: 'Full Tiffin',
  halfTiffin: 'Half Tiffin',
  extraTiffin: 'Extra Tiffin',
  chapati: 'Chapati (Single)',
  extraChapati: 'Extra Chapati (Each)',
  rice: 'Rice',
  sabzi: 'Sabzi',
  curd: 'Curd',
  sweet: 'Sweet',
  breakfast: 'Breakfast Only',
  dinner: 'Dinner Only',
};

export function PricingEditor({
  pricing,
  onSave,
  onReset,
  saving = false,
}: PricingEditorProps) {
  const [localPricing, setLocalPricing] = useState<PricingConfig>(pricing);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePriceChange = (key: keyof PricingConfig, value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalPricing((prev) => ({ ...prev, [key]: numValue }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    await onSave(localPricing);
    setHasChanges(false);
  };

  const handleReset = async () => {
    await onReset();
    setLocalPricing(DEFAULT_PRICING);
    setHasChanges(false);
  };

  return (
    <Card className="border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
        <CardTitle>Pricing Configuration</CardTitle>
        <CardDescription className="text-amber-100">
          Set your custom prices for each item
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(pricingLabels) as (keyof PricingConfig)[]).map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm font-medium">
                {pricingLabels[key]}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <Input
                  id={key}
                  type="number"
                  min={0}
                  step={0.5}
                  value={localPricing[key]}
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={saving}
            className="order-2 sm:order-1"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="order-1 sm:order-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Prices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
