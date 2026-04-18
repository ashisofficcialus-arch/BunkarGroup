'use client';

import { useState, useEffect } from 'react';
import AppWrapper from '@/components/AppWrapper';
import Stories from '@/components/stories/Stories';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import { SkeletonPost, SkeletonStories } from '@/components/ui/Skeleton';
import { posts } from '@/data/mockData';
import { Sparkles, Globe } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [isLoading, setIsLoading] = useState(true);
  const [displayPosts, setDisplayPosts] = useState<typeof posts>([]);

  useEffect(() => {
    // Instant loading - no delay
    setDisplayPosts(posts);
    setIsLoading(false);
  }, []);

  return (
    <AppWrapper>
      <div className={`${styles.container} glass-card`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Home</h1>
          
          <div className={`${styles.tabs} glass`}>
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

        {!isLoading ? (
          <>
            <Stories />
            <CreatePost />
            
            <div className={styles.feed}>
              <div className={styles.feedHeader}>
                <span>Posts</span>
                <span className={styles.postCount}>{displayPosts.length} posts</span>
              </div>
              
              {displayPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className={`${styles.postWrapper} glass-card`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.loadingFeed}>
            <SkeletonStories />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        )}
      </div>
    </AppWrapper>
  );
}