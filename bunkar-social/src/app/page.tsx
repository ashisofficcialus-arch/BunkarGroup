'use client';

import AppWrapper from '@/components/AppWrapper';
import Stories from '@/components/stories/Stories';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';
import { posts } from '@/data/mockData';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <AppWrapper>
      <div className={styles.container}>
        <h1 className={styles.title}>Home</h1>
        
        <Stories />
        <CreatePost />
        
        <div className={styles.feed}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppWrapper>
  );
}