'use client';

import { useState } from 'react';
import AppWrapper from '@/components/AppWrapper';
import Stories from '@/components/stories/Stories';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import { posts } from '@/data/mockData';
import { Sparkles, Globe, Lock } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('for-you');

  return (
    <AppWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Home</h1>
          
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'for-you' ? styles.active : ''}`}
              onClick={() => setActiveTab('for-you')}
            >
              <Sparkles size={18} />
              For You
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'following' ? styles.active : ''}`}
              onClick={() => setActiveTab('following')}
            >
              <Globe size={18} />
              Following
            </button>
          </div>
        </div>

        <Stories />
        
        <CreatePost />
        
        <div className={styles.feed}>
          <div className={styles.feedHeader}>
            <span>Posts</span>
            <span className={styles.postCount}>{posts.length} posts</span>
          </div>
          
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className={styles.postWrapper}
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </AppWrapper>
  );
}