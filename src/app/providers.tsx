'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { FirebaseAuthProvider } from '@/context/FirebaseAuthContext';
import { ChatProvider } from '@/context/ChatContext';
import { NotificationProvider } from '@/context/NotificationContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <FirebaseAuthProvider>
      <AuthProvider>
        <NotificationProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </NotificationProvider>
      </AuthProvider>
    </FirebaseAuthProvider>
  );
}