'use client';

import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Image, Smile, MapPin, Video, Gift, Tag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './CreatePost.module.css';

interface CreatePostProps {
  onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    console.log('Creating post:', content);
    setContent('');
    setIsExpanded(false);
    onPostCreated?.();
  };

  return (
    <div className={`${styles.createPost} glass-card`}>
      <div className={styles.createHeader}>
        <Avatar src={user?.avatar} size="md" />
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => { setIsExpanded(true); setIsFocused(true); }}
            onBlur={() => !content && setIsFocused(false)}
            className={`${styles.input} glass-input`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.mediaPreview}>
          </div>
          <div className={styles.actions}>
            <div className={styles.mediaButtons}>
              <button className={`${styles.mediaBtn} glass-button`}>
                <Image size={18} />
                <span>Image</span>
              </button>
              <button className={`${styles.mediaBtn} glass-button`}>
                <Video size={18} />
                <span>Video</span>
              </button>
              <button className={`${styles.mediaBtn} glass-button`}>
                <Gift size={18} />
                <span>GIF</span>
              </button>
              <button className={`${styles.mediaBtn} glass-button`}>
                <Smile size={18} />
                <span>Feeling</span>
              </button>
              <button className={`${styles.mediaBtn} glass-button`}>
                <MapPin size={18} />
                <span>Location</span>
              </button>
              <button className={`${styles.mediaBtn} glass-button`}>
                <Tag size={18} />
                <span>Tag</span>
              </button>
            </div>
            <Button 
              onClick={handleSubmit} 
              disabled={!content.trim()}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}