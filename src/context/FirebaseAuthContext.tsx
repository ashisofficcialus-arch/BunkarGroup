'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, isFirebaseConfigured, initializeFirebase } from '@/lib/firebase/config';
import { currentUser } from '@/data/mockData';

interface FirebaseAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirebaseConfigured: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Initialize Firebase
    initializeFirebase();
    
    // Check if Firebase is configured
    setIsConfigured(isFirebaseConfigured());

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isConfigured) {
      // Fallback to mock auth
      const mockUser = { ...currentUser, email };
      localStorage.setItem('bunkar_user', JSON.stringify(mockUser));
      localStorage.setItem('bunkar_token', 'mock-jwt-token');
      return true;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    if (!isConfigured) {
      // Fallback to mock auth
      const mockUser = { ...currentUser, email, id: `user-${Date.now()}` };
      localStorage.setItem('bunkar_user', JSON.stringify(mockUser));
      localStorage.setItem('bunkar_token', 'mock-jwt-token');
      return true;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async () => {
    if (isConfigured) {
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('bunkar_user');
    localStorage.removeItem('bunkar_token');
  };

  return (
    <FirebaseAuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      isFirebaseConfigured: isConfigured,
      login,
      register,
      logout
    }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}