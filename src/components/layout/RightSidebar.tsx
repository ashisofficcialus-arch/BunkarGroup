'use client';

import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { suggestedUsers, hashtags, groups } from '@/data/mockData';
import styles from './RightSidebar.module.css';

export default function RightSidebar() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className={styles.trendUp} />;
      case 'down': return <TrendingDown size={14} className={styles.trendDown} />;
      default: return <Minus size={14} className={styles.trendStable} />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <aside className={styles.sidebar}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Suggested for you</h3>
        <div className={styles.suggestions}>
          {suggestedUsers.map((user) => (
            <div key={user.id} className={styles.suggestionItem}>
              <Link href={`/profile/${user.username}`} className={styles.suggestionUser}>
                <Avatar src={user.avatar} size="md" />
                <div className={styles.suggestionInfo}>
                  <span className={styles.suggestionName}>
                    {user.displayName}
                    {user.isVerified && <span className={styles.verified}>✓</span>}
                  </span>
                  <span className={styles.suggestionHandle}>@{user.username}</span>
                </div>
              </Link>
              <Button variant="secondary" size="sm">Follow</Button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Trending</h3>
        <div className={styles.trending}>
          {hashtags.slice(0, 5).map((tag) => (
            <Link key={tag.id} href={`/search?q=%23${tag.name}`} className={styles.trendingItem}>
              <div className={styles.trendingInfo}>
                <span className={styles.trendingName}>#{tag.name}</span>
                <span className={styles.trendingPosts}>{formatNumber(tag.posts)} posts</span>
              </div>
              {getTrendIcon(tag.trend)}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Groups</h3>
        <div className={styles.groups}>
          {groups.slice(0, 3).map((group) => (
            <Link key={group.id} href={`/communities/${group.id}`} className={styles.groupItem}>
              <img src={group.coverImage} alt={group.name} className={styles.groupImage} />
              <div className={styles.groupInfo}>
                <span className={styles.groupName}>{group.name}</span>
                <span className={styles.groupMembers}>{formatNumber(group.memberCount)} members</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <p className={styles.copyright}>© 2024 Bunkar Social</p>
      </footer>
    </aside>
  );
}