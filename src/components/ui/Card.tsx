'use client';

import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  onClick
}: CardProps) {
  return (
    <div 
      className={`${styles.card} ${styles[`padding-${padding}`]} ${hover ? styles.hover : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}