'use client';

import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Avatar from '@/components/ui/Avatar';
import { notifications } from '@/data/mockData';
import { Heart, MessageCircle, UserPlus, AtSign, Share2 } from 'lucide-react';
import styles from './page.module.css';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like': return <Heart size={16} className={styles.iconLike} />;
    case 'comment': return <MessageCircle size={16} className={styles.iconComment} />;
    case 'follow': return <UserPlus size={16} className={styles.iconFollow} />;
    case 'mention': return <AtSign size={16} className={styles.iconMention} />;
    case 'share': return <Share2 size={16} className={styles.iconShare} />;
    default: return null;
  }
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'Just now';
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Notifications</h1>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount} new</span>
          )}
        </div>

        <div className={styles.notifications}>
          {notifications.map((notif) => (
            <Link 
              key={notif.id} 
              href={notif.postId ? `/?post=${notif.postId}` : `/profile/${notif.user.username}`}
              className={`${styles.notificationItem} ${!notif.isRead ? styles.unread : ''}`}
            >
              <div className={styles.notificationIcon}>
                {getNotificationIcon(notif.type)}
              </div>
              
              <Avatar src={notif.user.avatar} size="md" />
              
              <div className={styles.notificationContent}>
                <p className={styles.notificationText}>
                  <span className={styles.userName}>{notif.user.displayName}</span>
                  {' '}
                  {notif.content}
                </p>
                <span className={styles.notificationTime}>{formatTime(notif.createdAt)}</span>
              </div>
              
              {!notif.isRead && <span className={styles.dot} />}
            </Link>
          ))}
        </div>
      </div>
    </AppWrapper>
  );
}