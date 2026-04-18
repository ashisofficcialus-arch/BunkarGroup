'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import styles from '@/app/login/page.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await register(username, email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Registration failed');
    }
  };

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

        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Join Bunkar Social and connect with others</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<User size={18} />}
          />

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

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}