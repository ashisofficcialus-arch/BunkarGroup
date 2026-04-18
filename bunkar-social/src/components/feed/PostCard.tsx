'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'Just now';
  };

  return (
    <article className={styles.post}>
      <div className={styles.postHeader}>
        <Link href={`/profile/${post.author.username}`} className={styles.author}>
          <Avatar src={post.author.avatar} size="md" showRing={post.author.isVerified} />
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>
              {post.author.displayName}
              {post.author.isVerified && <span className={styles.verified}>✓</span>}
            </span>
            <span className={styles.authorHandle}>@{post.author.username} · {formatTime(post.createdAt)}</span>
          </div>
        </Link>
        <button className={styles.moreBtn}>
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className={`${styles.images} ${post.images.length === 1 ? styles.single : ''}`}>
            {post.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Post image ${idx + 1}`} className={styles.image} />
            ))}
          </div>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className={styles.tags}>
          {post.tags.map(tag => (
            <Link key={tag} href={`/search?q=%23${tag}`} className={styles.tag}>
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className={styles.engagement}>
        <div className={styles.engagementMain}>
          <button 
            className={`${styles.engagementBtn} ${isLiked ? styles.liked : ''}`}
            onClick={handleLike}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
          </button>
          
          <button className={styles.engagementBtn}>
            <MessageCircle size={20} />
            <span>{post.comments}</span>
          </button>
          
          <button className={styles.engagementBtn}>
            <Share2 size={20} />
            <span>{post.shares}</span>
          </button>
        </div>

        <button 
          className={`${styles.engagementBtn} ${isBookmarked ? styles.bookmarked : ''}`}
          onClick={handleBookmark}
        >
          <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  );
}