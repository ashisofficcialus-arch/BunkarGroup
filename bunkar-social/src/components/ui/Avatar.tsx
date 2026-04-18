'use client';

import { ReactNode } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  showRing?: boolean;
  ringGradient?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  isOnline,
  showRing,
  ringGradient,
  className = '',
  onClick
}: AvatarProps) {
  return (
    <div 
      className={`${styles.avatar} ${styles[size]} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
    >
      {showRing && (
        <div className={styles.ring}>
          {ringGradient || <div className={styles.defaultRing} />}
        </div>
      )}
      <img src={src} alt={alt} className={styles.image} />
      {isOnline !== undefined && (
        <span className={`${styles.status} ${isOnline ? styles.online : styles.offline}`} />
      )}
    </div>
  );
}