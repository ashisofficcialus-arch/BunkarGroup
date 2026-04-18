'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { groups } from '@/data/mockData';
import { Search, Users, MapPin } from 'lucide-react';
import styles from './page.module.css';

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'joined' | 'discover'>('all');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const filteredGroups = groups.filter(group => {
    if (filter === 'joined') return group.isJoined;
    if (filter === 'discover') return !group.isJoined;
    return true;
  }).filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Communities</h1>
          <Button>
            <Users size={18} />
            Create Group
          </Button>
        </div>

        <div className={styles.searchBar}>
          <Input
            placeholder="Search groups"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>

        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Groups
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'joined' ? styles.active : ''}`}
            onClick={() => setFilter('joined')}
          >
            My Groups
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'discover' ? styles.active : ''}`}
            onClick={() => setFilter('discover')}
          >
            Discover
          </button>
        </div>

        <div className={styles.groupsGrid}>
          {filteredGroups.map((group) => (
            <div key={group.id} className={styles.groupCard}>
              <div className={styles.groupCover}>
                <img src={group.coverImage} alt={group.name} />
              </div>
              <div className={styles.groupContent}>
                <h3 className={styles.groupName}>{group.name}</h3>
                <p className={styles.groupDesc}>{group.description}</p>
                <div className={styles.groupMeta}>
                  <span className={styles.groupMembers}>
                    <Users size={14} />
                    {formatNumber(group.memberCount)} members
                  </span>
                </div>
                <Button 
                  variant={group.isJoined ? 'secondary' : 'primary'} 
                  fullWidth
                  size="sm"
                >
                  {group.isJoined ? 'Joined' : 'Join Group'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className={styles.emptyState}>
            <p>No groups found</p>
          </div>
        )}
      </div>
    </AppWrapper>
  );
}