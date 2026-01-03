"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types';

export function useUserRole(isAdmin: boolean) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<unknown[]>([]);

  const fetchAllUsers = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const usersData: UserProfile[] = [];
      snapshot.forEach((docSnapshot) => {
        usersData.push(docSnapshot.data() as UserProfile);
      });

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const toggleUserApproval = useCallback(async (userId: string, approved: boolean) => {
    if (!isAdmin) return;

    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { isApproved: approved });

      setUsers((prev) =>
        prev.map((user) =>
          user.uid === userId ? { ...user, isApproved: approved } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user approval:', error);
      throw error;
    }
  }, [isAdmin]);

  const updateUserRole = useCallback(async (userId: string, role: 'admin' | 'user') => {
    if (!isAdmin) return;

    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { role });

      setUsers((prev) =>
        prev.map((user) =>
          user.uid === userId ? { ...user, role } : user
        )
      );
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers();

      const notificationsRef = collection(db, 'admin', 'notifications', 'alerts');
      const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
        const notifs: unknown[] = [];
        snapshot.forEach((doc) => {
          notifs.push({ id: doc.id, ...doc.data() });
        });
        setNotifications(notifs);
      });

      return () => unsubscribe();
    }
  }, [isAdmin, fetchAllUsers]);

  return {
    users,
    loading,
    notifications,
    fetchAllUsers,
    toggleUserApproval,
    updateUserRole,
  };
}
