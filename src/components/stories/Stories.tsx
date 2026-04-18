'use client';

import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import { stories as allStories } from '@/data/mockData';
import styles from './Stories.module.css';

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < allStories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.storiesContainer}>
      <div className={styles.storiesWrapper}>
        <div className={styles.storyAdd}>
          <Avatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            size="lg" 
            showRing={true}
          />
          <span className={styles.addIcon}>+</span>
          <span className={styles.addLabel}>Add Story</span>
        </div>

        {allStories.map((story, index) => (
          <div 
            key={story.id} 
            className={`${styles.storyItem} ${story.isViewed ? styles.viewed : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <Avatar 
              src={story.author.avatar} 
              size="lg" 
              showRing={!story.isViewed}
            />
            <span className={styles.storyName}>{story.author.username}</span>
          </div>
        ))}
      </div>

      {allStories[currentIndex] && (
        <div className={styles.storyViewer}>
          <img 
            src={allStories[currentIndex].image} 
            alt="Story" 
            className={styles.storyImage}
          />
          <div className={styles.storyOverlay}>
            <div className={styles.storyHeader}>
              <Avatar 
                src={allStories[currentIndex].author.avatar} 
                size="sm"
              />
              <span className={styles.storyAuthor}>
                {allStories[currentIndex].author.username}
              </span>
            </div>
            <div className={styles.storyProgress}>
              {allStories.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.progressBar} ${idx <= currentIndex ? styles.active : ''}`}
                />
              ))}
            </div>
          </div>
          <button className={styles.navBtn} onClick={handlePrev} style={{ left: 16 }}>
            ‹
          </button>
          <button className={styles.navBtn} onClick={handleNext} style={{ right: 16 }}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}