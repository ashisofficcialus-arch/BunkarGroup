'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Compass, 
  MessageSquare, 
  Bell, 
  User, 
  Users, 
  Settings,
  LogOut,
  PlusSquare
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import styles from './Sidebar.module.css';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Users, label: 'Communities', href: '/communities' },
  { icon: User, label: 'Profile', href: '/profile/alex_creates' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
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
        </div>
        <span className={styles.logoText}>Bunkar</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button className={styles.createBtn}>
        <PlusSquare size={22} />
        <span>Create Post</span>
      </button>

      <div className={styles.footer}>
        <Link href="/settings" className={styles.footerItem}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button onClick={logout} className={styles.footerItem}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {user && (
        <div className={styles.userProfile}>
          <Avatar src={user.avatar} size="sm" />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.displayName}</span>
            <span className={styles.userHandle}>@{user.username}</span>
          </div>
        </div>
      )}
    </aside>
  );
}