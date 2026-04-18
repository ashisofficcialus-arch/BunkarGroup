'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { users, hashtags, groups } from '@/data/mockData';
import { Search, TrendingUp, Users, MessageCircle } from 'lucide-react';
import styles from './page.module.css';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <AppWrapper>
      <div className={styles.container}>
        <h1 className={styles.title}>Explore</h1>

        <div className={styles.searchBar}>
          <Input
            placeholder="Search people, posts, or hashtags"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={20} />
            Trending Topics
          </h2>
          <div className={styles.hashtags}>
            {hashtags.map((tag) => (
              <Link key={tag.id} href={`/search?q=%23${tag.name}`} className={styles.hashtag}>
                <span className={styles.hashtagName}>#{tag.name}</span>
                <span className={styles.hashtagPosts}>{formatNumber(tag.posts)} posts</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Users size={20} />
            People to Follow
          </h2>
          <div className={styles.peopleGrid}>
            {users.slice(1, 7).map((user) => (
              <Card key={user.id} className={styles.personCard}>
                <Link href={`/profile/${user.username}`} className={styles.personInfo}>
                  <Avatar src={user.avatar} size="lg" />
                  <div className={styles.personDetails}>
                    <span className={styles.personName}>
                      {user.displayName}
                      {user.isVerified && <span className={styles.verified}>✓</span>}
                    </span>
                    <span className={styles.personHandle}>@{user.username}</span>
                  </div>
                </Link>
                <Button variant="secondary" size="sm">Follow</Button>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <MessageCircle size={20} />
            Popular Groups
          </h2>
          <div className={styles.groupsGrid}>
            {groups.map((group) => (
              <Link key={group.id} href={`/communities/${group.id}`} className={styles.groupCard}>
                <img src={group.coverImage} alt={group.name} className={styles.groupCover} />
                <div className={styles.groupInfo}>
                  <span className={styles.groupName}>{group.name}</span>
                  <span className={styles.groupMembers}>{formatNumber(group.memberCount)} members</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppWrapper>
  );
}