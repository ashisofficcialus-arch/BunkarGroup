'use client';

import { ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MobileNav from '@/components/layout/MobileNav';
import styles from './AppWrapper.module.css';

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <div className={styles.wrapper}>
      <MainLayout>
        {children}
      </MainLayout>
      <MobileNav />
    </div>
  );
}