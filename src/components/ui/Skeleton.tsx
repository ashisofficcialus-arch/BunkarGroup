'use client';

import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '8px',
  className = '' 
}: SkeletonProps) {
  return (
    <div 
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}

export function SkeletonPost() {
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Skeleton width={44} height={44} borderRadius="50%" />
        <div className={styles.postInfo}>
          <Skeleton width={120} height={14} />
          <Skeleton width={80} height={12} />
        </div>
      </div>
      <div className={styles.postContent}>
        <Skeleton height={14} />
        <Skeleton height={14} />
        <Skeleton width="60%" height={14} />
      </div>
      <div className={styles.postActions}>
        <Skeleton width={60} height={32} borderRadius="16px" />
        <Skeleton width={60} height={32} borderRadius="16px" />
        <Skeleton width={60} height={32} borderRadius="16px" />
      </div>
    </div>
  );
}

export function SkeletonStories() {
  return (
    <div className={styles.stories}>
      <Skeleton width={72} height={90} borderRadius="12px" />
      <Skeleton width={72} height={90} borderRadius="12px" />
      <Skeleton width={72} height={90} borderRadius="12px" />
      <Skeleton width={72} height={90} borderRadius="12px" />
      <Skeleton width={72} height={90} borderRadius="12px" />
      <Skeleton width={72} height={90} borderRadius="12px" />
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className={styles.profile}>
      <Skeleton width="100%" height={200} borderRadius="12px" />
      <div className={styles.profileInfo}>
        <Skeleton width={80} height={80} borderRadius="50%" />
        <Skeleton width={200} height={24} />
        <Skeleton width={150} height={16} />
      </div>
    </div>
  );
}

export function SkeletonChat() {
  return (
    <div className={styles.chat}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.chatItem}>
          <Skeleton width={48} height={48} borderRadius="50%" />
          <div className={styles.chatInfo}>
            <Skeleton width={120} height={14} />
            <Skeleton width={200} height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}