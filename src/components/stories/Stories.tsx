'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { stories as allStories } from '@/data/mockData';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send } from 'lucide-react';
import styles from './Stories.module.css';

export default function Stories() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = allStories[currentIndex];

  useEffect(() => {
    if (isViewerOpen && !isPaused) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentIndex < allStories.length - 1) {
              setCurrentIndex((idx) => idx + 1);
              return 0;
            } else {
              setIsViewerOpen(false);
              return 100;
            }
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isViewerOpen, isPaused, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < allStories.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setProgress(0);
    } else {
      setIsViewerOpen(false);
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
    setProgress(0);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setProgress(0);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <>
      <div className={styles.storiesContainer}>
        <div className={styles.storiesWrapper}>
          <div className={styles.storyAdd}>
            <div className={styles.addAvatarWrapper}>
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                size="lg"
              />
              <div className={styles.addButton}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </div>
            <span className={styles.addLabel}>Add Story</span>
          </div>

          {allStories.map((story, index) => (
            <div 
              key={story.id} 
              className={`${styles.storyItem} ${story.isViewed ? styles.viewed : ''}`}
              onClick={() => openViewer(index)}
            >
              <div className={`${styles.avatarRing} ${!story.isViewed ? styles.unviewed : ''}`}>
                <Avatar src={story.author.avatar} size="lg" />
              </div>
              <span className={styles.storyName}>{story.author.username}</span>
              {!story.isViewed && <span className={styles.unviewedDot} />}
            </div>
          ))}
        </div>
      </div>

      {isViewerOpen && currentStory && (
        <div className={styles.viewerOverlay} onClick={closeViewer}>
          <div className={styles.viewerContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.progressContainer}>
              {allStories.map((_, idx) => (
                <div key={idx} className={styles.progressWrapper}>
                  <div 
                    className={`${styles.progressBar} ${
                      idx < currentIndex ? styles.completed : 
                      idx === currentIndex ? styles.inProgress : ''
                    }`}
                    style={{ 
                      width: idx < currentIndex ? '100%' : 
                             idx === currentIndex ? `${progress}%` : '0%' 
                    }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.viewerHeader}>
              <div className={styles.viewerUser}>
                <Avatar src={currentStory.author.avatar} size="sm" />
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{currentStory.author.displayName}</span>
                  <span className={styles.userHandle}>@{currentStory.author.username}</span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={closeViewer}>
                <X size={24} />
              </button>
            </div>

            <img 
              src={currentStory.image} 
              alt="Story" 
              className={styles.storyImage}
            />

            <div className={styles.viewerActions}>
              <input 
                type="text" 
                placeholder="Send message..." 
                className={styles.replyInput}
              />
              <button className={styles.actionBtn}>
                <Heart size={22} />
              </button>
              <button className={styles.actionBtn}>
                <MessageCircle size={22} />
              </button>
              <button className={styles.actionBtn}>
                <Send size={22} />
              </button>
            </div>

            <button 
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={handleNext}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}