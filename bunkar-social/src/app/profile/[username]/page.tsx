'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import PostCard from '@/components/feed/PostCard';
import { users, posts as allPosts } from '@/data/mockData';
import { MapPin, Link as LinkIcon, Calendar, Image, MessageCircle, UserPlus, UserCheck } from 'lucide-react';
import styles from './page.module.css';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const user = users.find(u => u.username === username) || users[0];
  const userPosts = allPosts.filter(p => p.author.id === user.id);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'about'>('posts');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <AppWrapper>
      <div className={styles.container}>
        <div className={styles.coverImage}>
          {user.coverImage && (
            <img src={user.coverImage} alt="Cover" />
          )}
        </div>

        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <Avatar src={user.avatar} size="xl" />
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.nameRow}>
              <div className={styles.nameSection}>
                <h1 className={styles.displayName}>
                  {user.displayName}
                  {user.isVerified && <span className={styles.verified}>✓</span>}
                </h1>
                <span className={styles.username}>@{user.username}</span>
              </div>

              <div className={styles.actions}>
                <Button variant="secondary" size="sm">
                  <MessageCircle size={18} />
                  Message
                </Button>
                <Button 
                  variant={isFollowing ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <><UserCheck size={18} /> Following</>
                  ) : (
                    <><UserPlus size={18} /> Follow</>
                  )}
                </Button>
              </div>
            </div>

            <p className={styles.bio}>{user.bio}</p>

            <div className={styles.meta}>
              {user.location && (
                <span className={styles.metaItem}>
                  <MapPin size={16} />
                  {user.location}
                </span>
              )}
              {user.website && (
                <a href={user.website} target="_blank" className={styles.metaItem}>
                  <LinkIcon size={16} />
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              <span className={styles.metaItem}>
                <Calendar size={16} />
                Joined {formatDate(user.createdAt)}
              </span>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{user.followers.toLocaleString()}</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{user.following.toLocaleString()}</span>
                <span className={styles.statLabel}>Following</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{user.posts}</span>
                <span className={styles.statLabel}>Posts</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'media' ? styles.active : ''}`}
            onClick={() => setActiveTab('media')}
          >
            <Image size={18} />
            Media
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'about' ? styles.active : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'posts' && (
            <div className={styles.postsList}>
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No posts yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'media' && (
            <div className={styles.mediaGrid}>
              {userPosts.filter(p => p.images).flatMap(p => 
                p.images?.map((img, idx) => (
                  <img key={`${p.id}-${idx}`} src={img} alt="Media" className={styles.mediaItem} />
                ))
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className={styles.aboutSection}>
              <div className={styles.aboutCard}>
                <h3>Bio</h3>
                <p>{user.bio || 'No bio yet'}</p>
              </div>
              <div className={styles.aboutCard}>
                <h3>Info</h3>
                <div className={styles.aboutInfo}>
                  <p><strong>Location:</strong> {user.location || 'Not specified'}</p>
                  <p><strong>Website:</strong> {user.website || 'Not specified'}</p>
                  <p><strong>Joined:</strong> {formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppWrapper>
  );
}