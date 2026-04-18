'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated, isAuthLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleQuickLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    console.log('Quick login clicked');
    const success = await login('alex@bunkar.social', 'demo123');
    console.log('Login result:', success);
    if (success) {
      window.location.href = '/';
    } else {
      setError('Login failed');
    }
  };

  if (isAuthLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
      </div>

      <div className={styles.card}>
        <div className={styles.logo}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" stroke="url(#logoGradient)" strokeWidth="2.5"/>
            <circle cx="16" cy="12" r="4" fill="url(#logoGradient)"/>
            <path d="M8 22C8 18.134 11.134 15 15 15C15.5523 15 16 15.4477 16 16C16 16.5523 15.5523 17 15 17C12.2386 17 10 19.2386 10 22" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M17 22C17 18.134 20.134 15 24 15C23.4477 15 23 15.4477 23 16C23 16.5523 23.4477 17 24 17C26.7614 17 29 19.2386 29 22" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#6366f1"/>
                <stop offset="1" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Bunkar</span>
        </div>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to continue to your account</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={18} />}
          />

          <div className={styles.passwordWrapper}>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />
            <button 
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className={styles.forgot}>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>

          <Button 
            type="button" 
            variant="secondary" 
            fullWidth 
            onClick={handleQuickLogin}
          >
            Quick Login (Demo)
          </Button>
        </form>

        <p className={styles.switch}>
          Don't have an account? <Link href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}