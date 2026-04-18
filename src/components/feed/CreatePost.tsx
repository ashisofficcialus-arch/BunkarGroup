'use client';

import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Image, Smile, MapPin, Video } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './CreatePost.module.css';

interface CreatePostProps {
  onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    console.log('Creating post:', content);
    setContent('');
    setIsExpanded(false);
    onPostCreated?.();
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.createHeader}>
        <Avatar src={user?.avatar} size="md" />
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className={styles.input}
          />
        </div>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.mediaPreview}>
          </div>
          <div className={styles.actions}>
            <div className={styles.mediaButtons}>
              <button className={styles.mediaBtn}>
                <Image size={20} />
                <span>Image</span>
              </button>
              <button className={styles.mediaBtn}>
                <Video size={20} />
                <span>Video</span>
              </button>
              <button className={styles.mediaBtn}>
                <Smile size={20} />
                <span>Feeling</span>
              </button>
              <button className={styles.mediaBtn}>
                <MapPin size={20} />
                <span>Location</span>
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