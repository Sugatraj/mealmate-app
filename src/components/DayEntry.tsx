"use client";

import { useState, useMemo } from 'react';
import { DayLog, CustomItem, CATEGORIES, formatDate, PricingConfig } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save, SkipForward, Loader2 } from 'lucide-react';

interface DayEntryProps {
  date: Date;
  existingLog?: DayLog | null;
  pricing: PricingConfig;
  onSave: (log: Partial<DayLog>) => Promise<void>;
  onSkip?: () => Promise<void>;
  syncing?: boolean;
}

export function DayEntry({
  date,
  existingLog,
  pricing,
  onSave,
  onSkip,
  syncing = false,
}: DayEntryProps) {
  const [fullTiffin, setFullTiffin] = useState(existingLog?.fullTiffin ?? false);
  const [halfTiffin, setHalfTiffin] = useState(existingLog?.halfTiffin ?? false);
  const [extraTiffin, setExtraTiffin] = useState(existingLog?.extraTiffin ?? false);
  const [noTiffin, setNoTiffin] = useState(existingLog?.noTiffin ?? false);
  const [onlyChapati, setOnlyChapati] = useState(existingLog?.onlyChapati ?? false);
  const [extraChapatiQty, setExtraChapatiQty] = useState(existingLog?.extraChapatiQty ?? 0);
  const [onlyRice, setOnlyRice] = useState(existingLog?.onlyRice ?? false);
  const [onlySabzi, setOnlySabzi] = useState(existingLog?.onlySabzi ?? false);
  const [curd, setCurd] = useState(existingLog?.curd ?? false);
  const [sweet, setSweet] = useState(existingLog?.sweet ?? false);
  const [breakfastOnly, setBreakfastOnly] = useState(existingLog?.breakfastOnly ?? false);
  const [dinnerOnly, setDinnerOnly] = useState(existingLog?.dinnerOnly ?? false);
  const [customItems, setCustomItems] = useState<CustomItem[]>(existingLog?.customItems ?? []);
  const [notes, setNotes] = useState(existingLog?.notes ?? '');
  const [category, setCategory] = useState(existingLog?.category ?? 'mess');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const estimatedCost = useMemo(() => {
    let total = 0;
    if (fullTiffin) total += pricing.fullTiffin;
    if (halfTiffin) total += pricing.halfTiffin;
    if (extraTiffin) total += pricing.extraTiffin;
    if (onlyChapati) total += pricing.chapati;
    if (extraChapatiQty > 0) total += pricing.extraChapati * extraChapatiQty;
    if (onlyRice) total += pricing.rice;
    if (onlySabzi) total += pricing.sabzi;
    if (curd) total += pricing.curd;
    if (sweet) total += pricing.sweet;
    if (breakfastOnly) total += pricing.breakfast;
    if (dinnerOnly) total += pricing.dinner;
    customItems.forEach((item) => (total += item.price));
    return total;
  }, [
    fullTiffin, halfTiffin, extraTiffin, onlyChapati, extraChapatiQty,
    onlyRice, onlySabzi, curd, sweet, breakfastOnly, dinnerOnly,
    customItems, pricing
  ]);

  const isValid = useMemo(() => {
    if (noTiffin) return true;
    return fullTiffin || halfTiffin || extraTiffin || onlyChapati ||
      onlyRice || onlySabzi || curd || sweet || breakfastOnly ||
      dinnerOnly || customItems.length > 0 || extraChapatiQty > 0;
  }, [
    noTiffin, fullTiffin, halfTiffin, extraTiffin, onlyChapati,
    onlyRice, onlySabzi, curd, sweet, breakfastOnly, dinnerOnly,
    customItems, extraChapatiQty
  ]);

  const handleAddCustomItem = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    const newItem: CustomItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      price: parseFloat(newItemPrice),
    };
    setCustomItems([...customItems, newItem]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    await onSave({
      fullTiffin,
      halfTiffin,
      extraTiffin,
      noTiffin,
      onlyChapati,
      extraChapatiQty,
      onlyRice,
      onlySabzi,
      curd,
      sweet,
      breakfastOnly,
      dinnerOnly,
      customItems,
      notes,
      category,
    });
  };

  const handleSkip = async () => {
    setNoTiffin(true);
    setFullTiffin(false);
    setHalfTiffin(false);
    setExtraTiffin(false);
    setOnlyChapati(false);
    setExtraChapatiQty(0);
    setOnlyRice(false);
    setOnlySabzi(false);
    setCurd(false);
    setSweet(false);
    setBreakfastOnly(false);
    setDinnerOnly(false);
    setCustomItems([]);
    if (onSkip) await onSkip();
  };

  const handleNoTiffinChange = (checked: boolean) => {
    setNoTiffin(checked);
    if (checked) {
      setFullTiffin(false);
      setHalfTiffin(false);
      setExtraTiffin(false);
      setOnlyChapati(false);
      setExtraChapatiQty(0);
      setOnlyRice(false);
      setOnlySabzi(false);
      setCurd(false);
      setSweet(false);
      setBreakfastOnly(false);
      setDinnerOnly(false);
    }
  };

  return (
    <Card className="w-full border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span>{formatDate(date)}</span>
          <span className="text-2xl font-bold">₹{estimatedCost}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullTiffin"
              checked={fullTiffin}
              onCheckedChange={(c) => setFullTiffin(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="fullTiffin" className="flex items-center">
              Full Tiffin <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="halfTiffin"
              checked={halfTiffin}
              onCheckedChange={(c) => setHalfTiffin(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="halfTiffin">Half Tiffin</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="extraTiffin"
              checked={extraTiffin}
              onCheckedChange={(c) => setExtraTiffin(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="extraTiffin">Extra Tiffin</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="noTiffin"
              checked={noTiffin}
              onCheckedChange={handleNoTiffinChange}
            />
            <Label htmlFor="noTiffin">No Tiffin</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="onlyChapati"
              checked={onlyChapati}
              onCheckedChange={(c) => setOnlyChapati(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="onlyChapati">Only Chapati</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="onlyRice"
              checked={onlyRice}
              onCheckedChange={(c) => setOnlyRice(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="onlyRice">Only Rice</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="onlySabzi"
              checked={onlySabzi}
              onCheckedChange={(c) => setOnlySabzi(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="onlySabzi">Only Sabzi</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="curd"
              checked={curd}
              onCheckedChange={(c) => setCurd(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="curd">Curd</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sweet"
              checked={sweet}
              onCheckedChange={(c) => setSweet(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="sweet">Sweet</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="breakfastOnly"
              checked={breakfastOnly}
              onCheckedChange={(c) => setBreakfastOnly(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="breakfastOnly">Breakfast Only</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dinnerOnly"
              checked={dinnerOnly}
              onCheckedChange={(c) => setDinnerOnly(c === true)}
              disabled={noTiffin}
            />
            <Label htmlFor="dinnerOnly">Dinner Only</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="extraChapati">Extra Chapati Quantity</Label>
          <Input
            id="extraChapati"
            type="number"
            min={0}
            value={extraChapatiQty}
            onChange={(e) => setExtraChapatiQty(parseInt(e.target.value) || 0)}
            disabled={noTiffin}
            className="w-32"
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Custom Items</Label>
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 min-w-[120px]"
            />
            <Input
              placeholder="Price"
              type="number"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="w-24"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddCustomItem}
              disabled={!newItemName.trim() || !newItemPrice}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {customItems.length > 0 && (
            <div className="space-y-2 mt-2">
              {customItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-700">₹{item.price}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveCustomItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={syncing}
            className="order-2 sm:order-1"
          >
            <SkipForward className="mr-2 h-4 w-4" />
            Skip Today
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isValid || syncing}
            className="order-1 sm:order-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {syncing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
