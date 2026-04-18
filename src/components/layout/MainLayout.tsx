'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
  hideRightSidebar?: boolean;
}

export default function MainLayout({ 
  children, 
  hideSidebar = false,
  hideRightSidebar = false 
}: MainLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!isAuthenticated && !isAuthPage) {
    router.push('/login');
    return null;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      {!hideSidebar && <Sidebar />}
      <main className={`${styles.main} ${hideSidebar ? styles.fullWidth : ''}`}>
        {children}
      </main>
      {!hideRightSidebar && <RightSidebar />}
    </div>
  );
}