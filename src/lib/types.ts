export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user';
  isApproved: boolean;
  createdAt: Date;
  settings: UserSettings;
  pricing: PricingConfig;
}

export interface UserSettings {
  uiTheme: 'light' | 'dark' | 'system';
  reminderTime?: string;
  defaultCategory?: string;
}

export interface PricingConfig {
  fullTiffin: number;
  halfTiffin: number;
  extraTiffin: number;
  chapati: number;
  extraChapati: number;
  rice: number;
  sabzi: number;
  curd: number;
  sweet: number;
  breakfast: number;
  dinner: number;
}

export interface CustomItem {
  id: string;
  name: string;
  price: number;
}

export interface DayLog {
  date: string;
  fullTiffin: boolean;
  halfTiffin: boolean;
  extraTiffin: boolean;
  noTiffin: boolean;
  onlyChapati: boolean;
  extraChapatiQty: number;
  onlyRice: boolean;
  onlySabzi: boolean;
  curd: boolean;
  sweet: boolean;
  breakfastOnly: boolean;
  dinnerOnly: boolean;
  customItems: CustomItem[];
  notes: string;
  category: string;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export const DEFAULT_PRICING: PricingConfig = {
  fullTiffin: 80,
  halfTiffin: 50,
  extraTiffin: 80,
  chapati: 10,
  extraChapati: 10,
  rice: 20,
  sabzi: 25,
  curd: 15,
  sweet: 20,
  breakfast: 40,
  dinner: 50,
};

export const DEFAULT_SETTINGS: UserSettings = {
  uiTheme: 'system',
  reminderTime: '19:00',
  defaultCategory: 'mess',
};

export const CATEGORIES = [
  { value: 'mess', label: 'Mess' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'other', label: 'Other' },
];

export const LEAVE_CATEGORIES = [
  { value: 'noTiffin', label: 'No Tiffin' },
  { value: 'trip', label: 'Trip' },
  { value: 'fast', label: 'Fasting' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'other', label: 'Other' },
];

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}
