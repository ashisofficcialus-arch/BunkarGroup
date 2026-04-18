'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MessageSquare, Bell, User } from 'lucide-react';
import styles from './MobileNav.module.css';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: User, label: 'Profile', href: '/profile/alex_creates' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
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
  );
}