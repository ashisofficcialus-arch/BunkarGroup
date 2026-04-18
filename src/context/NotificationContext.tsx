'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useFirebaseAuth } from './FirebaseAuthContext';

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share' | 'message';
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  postId?: string;
  isRead: boolean;
  createdAt: any;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  createNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user, isFirebaseConfigured } = useFirebaseAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Subscribe to notifications
  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.isRead).length);
    });

    return () => unsubscribe();
  }, [user, isFirebaseConfigured]);

  const markAsRead = useCallback(async (notificationId: string) => {
    if (!isFirebaseConfigured) return;

    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { isRead: true });
  }, [isFirebaseConfigured]);

  const markAllAsRead = useCallback(async () => {
    if (!user || !isFirebaseConfigured) return;

    const unreadNotifications = notifications.filter(n => !n.isRead);
    for (const notification of unreadNotifications) {
      const notificationRef = doc(db, 'notifications', notification.id);
      await updateDoc(notificationRef, { isRead: true });
    }
  }, [user, isFirebaseConfigured, notifications]);

  const createNotification = useCallback(async (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    if (!isFirebaseConfigured) return;

    const notificationsRef = collection(db, 'notifications');
    await addDoc(notificationsRef, {
      ...notification,
      isRead: false,
      createdAt: serverTimestamp()
    });
  }, [isFirebaseConfigured]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      isLoading,
      markAsRead,
      markAllAsRead,
      createNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}