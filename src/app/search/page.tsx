'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Input from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';
import PostCard from '@/components/feed/PostCard';
import { users, posts, hashtags } from '@/data/mockData';
import { Search, TrendingUp, User, FileText } from 'lucide-react';
import styles from './page.module.css';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const hasQuery = query.length > 0;
  
  const matchingUsers = hasQuery 
    ? users.filter(u => 
        u.displayName.toLowerCase().includes(query.toLowerCase()) ||
        u.username.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingPosts = hasQuery
    ? posts.filter(p => 
        p.content.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const matchingHashtags = hasQuery
    ? hashtags.filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search</h1>
      
      <div className={styles.searchBar}>
        <Input
          placeholder="Search for people, posts, or hashtags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>

      {!hasQuery && (
        <div className={styles.suggestions}>
          <h2 className={styles.sectionTitle}>
            <TrendingUp size={20} />
            Trending Hashtags
          </h2>
          <div className={styles.hashtagList}>
            {hashtags.slice(0, 8).map(tag => (
              <Link key={tag.id} href={`/search?q=%23${tag.name}`} className={styles.hashtag}>
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasQuery && (
        <div className={styles.results}>
          {matchingUsers.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.resultTitle}>
                <User size={18} />
                People ({matchingUsers.length})
              </h2>
              <div className={styles.userList}>
                {matchingUsers.map(user => (
                  <Link key={user.id} href={`/profile/${user.username}`} className={styles.userItem}>
                    <Avatar src={user.avatar} size="md" />
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>
                        {user.displayName}
                        {user.isVerified && <span className={styles.verified}>✓</span>}
                      </span>
                      <span className={styles.userHandle}>@{user.username}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {matchingHashtags.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.resultTitle}>
                <TrendingUp size={18} />
                Hashtags ({matchingHashtags.length})
              </h2>
              <div className={styles.hashtagList}>
                {matchingHashtags.map(tag => (
                  <Link key={tag.id} href={`/search?q=%23${tag.name}`} className={styles.hashtag}>
                    #{tag.name} · {tag.posts.toLocaleString()} posts
                  </Link>
                ))}
              </div>
            </section>
          )}

          {matchingPosts.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.resultTitle}>
                <FileText size={18} />
                Posts ({matchingPosts.length})
              </h2>
              <div className={styles.postList}>
                {matchingPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {matchingUsers.length === 0 && matchingPosts.length === 0 && matchingHashtags.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <AppWrapper>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </AppWrapper>
  );
}