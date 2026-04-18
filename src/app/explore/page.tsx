'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PostCard from '@/components/feed/PostCard';
import { SkeletonPost, SkeletonStories } from '@/components/ui/Skeleton';
import { posts as allPosts, users } from '@/data/mockData';
import { Search, TrendingUp, Hash } from 'lucide-react';
import styles from './page.module.css';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('for-you');
  const [posts, setPosts] = useState<typeof allPosts>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Instant loading - no delay
    setPosts(allPosts.slice(0, 4));
    setIsLoading(false);
  }, []);

  const filters = [
    { id: 'for-you', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'trending', label: 'Trending' },
    { id: 'media', label: 'Media' },
  ];

  const trendingHashtags = [
    { name: 'photography', posts: '245K' },
    { name: 'design', posts: '189K' },
    { name: 'travel', posts: '567K' },
    { name: 'art', posts: '342K' },
    { name: 'fitness', posts: '234K' },
  ];

  const loadMore = () => {
    const currentLength = posts.length;
    const morePosts = allPosts.slice(currentLength, currentLength + 3);
    if (morePosts.length > 0) {
      setPosts([...posts, ...morePosts]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <AppWrapper>
      <div className={`${styles.container} glass-card`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Explore</h1>
          <div className={styles.searchBar}>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
        </div>

        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className={styles.loadingFeed}>
            <SkeletonStories />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <div className={styles.posts}>
                {posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className={styles.postWrapper}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className={styles.loadMore}>
                  <Button variant="secondary" onClick={loadMore}>
                    Load More
                  </Button>
                </div>
              )}
            </div>

            <aside className={styles.sidebar}>
              <div className={`${styles.trending} glass`}>
                <h3>
                  <TrendingUp size={18} />
                  Trending
                </h3>
                <div className={styles.hashtags}>
                  {trendingHashtags.map((tag, idx) => (
                    <Link 
                      key={idx} 
                      href={`/search?q=%23${tag.name}`}
                      className={styles.hashtagItem}
                    >
                      <div className={styles.hashtagIcon}>
                        <Hash size={16} />
                      </div>
                      <div className={styles.hashtagInfo}>
                        <span className={styles.hashtagName}>#{tag.name}</span>
                        <span className={styles.hashtagCount}>{tag.posts} posts</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={`${styles.suggestions} glass`}>
                <h3>Who to follow</h3>
                <div className={styles.suggestionList}>
                  {users.slice(1, 4).map((user, idx) => (
                    <div key={idx} className={styles.suggestionItem}>
                      <Avatar src={user.avatar} size="md" />
                      <div className={styles.suggestionInfo}>
                        <span className={styles.suggestionName}>
                          {user.displayName}
                          {user.isVerified && <span className={styles.verified}>✓</span>}
                        </span>
                        <span className={styles.suggestionHandle}>@{user.username}</span>
                      </div>
                      <Button size="sm" variant="secondary">Follow</Button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </AppWrapper>
  );
}