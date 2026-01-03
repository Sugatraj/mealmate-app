"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, Palette, Save, Loader2 } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

function SettingsPageContent() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();

  const [theme, setTheme] = useState(userProfile?.settings?.uiTheme || 'system');
  const [reminderTime, setReminderTime] = useState(userProfile?.settings?.reminderTime || '19:00');
  const [defaultCategory, setDefaultCategory] = useState(userProfile?.settings?.defaultCategory || 'mess');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (userProfile?.settings) {
      setTheme(userProfile.settings.uiTheme || 'system');
      setReminderTime(userProfile.settings.reminderTime || '19:00');
      setDefaultCategory(userProfile.settings.defaultCategory || 'mess');
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        settings: {
          uiTheme: theme,
          reminderTime,
          defaultCategory,
        },
      });
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
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
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance & Preferences
            </CardTitle>
            <CardDescription>
              Customize your MealMate experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choose your preferred color scheme
              </p>
            </div>

            <div className="space-y-2">
              <Label>Daily Reminder Time</Label>
              <Select value={reminderTime} onValueChange={setReminderTime}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                  <SelectItem value="19:00">7:00 PM</SelectItem>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                When to remind you to log your meals (coming soon)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Default Category</Label>
              <Select value={defaultCategory} onValueChange={setDefaultCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mess">Mess</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Default category for new entries
              </p>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-500 text-sm">Email</Label>
              <p className="font-medium">{userProfile?.email}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Display Name</Label>
              <p className="font-medium">{userProfile?.displayName || 'Not set'}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Role</Label>
              <p className="font-medium capitalize">{userProfile?.role}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Status</Label>
              <p className="font-medium">
                {userProfile?.isApproved ? (
                  <span className="text-green-600">Approved</span>
                ) : (
                  <span className="text-amber-600">Pending Approval</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

export default function SettingsPage() {
  return <SettingsPageContent />;
}
