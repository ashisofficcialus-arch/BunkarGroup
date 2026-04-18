'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { currentUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('bunkar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email && password) {
      const userData = { ...currentUser, email };
      localStorage.setItem('bunkar_user', JSON.stringify(userData));
      localStorage.setItem('bunkar_token', 'mock-jwt-token');
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (username && email && password) {
      const userData = { 
        ...currentUser, 
        username, 
        email,
        id: `user-${Date.now()}`
      };
      localStorage.setItem('bunkar_user', JSON.stringify(userData));
      localStorage.setItem('bunkar_token', 'mock-jwt-token');
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('bunkar_user');
    localStorage.removeItem('bunkar_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      isAuthLoading: isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAuthLoading: false,
      login: async () => false,
      register: async () => false,
      logout: () => {},
    };
  }
  return context;
}