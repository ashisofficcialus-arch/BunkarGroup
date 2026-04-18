'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppWrapper from '@/components/AppWrapper';
import Avatar from '@/components/ui/Avatar';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { conversations } from '@/data/mockData';
import { Search, Send } from 'lucide-react';
import styles from './page.module.css';

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <AppWrapper>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h1 className={styles.title}>Messages</h1>
          
          <div className={styles.searchBar}>
            <Input placeholder="Search conversations" icon={<Search size={18} />} />
          </div>

          <div className={styles.conversationList}>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`${styles.conversationItem} ${selectedConv?.id === conv.id ? styles.active : ''}`}
                onClick={() => setSelectedConv(conv)}
              >
                <Avatar src={conv.participant.avatar} size="md" isOnline={true} />
                <div className={styles.convInfo}>
                  <div className={styles.convHeader}>
                    <span className={styles.convName}>{conv.participant.displayName}</span>
                    <span className={styles.convTime}>{formatDate(conv.lastMessageTime)}</span>
                  </div>
                  <p className={styles.convPreview}>{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className={styles.unreadBadge}>{conv.unreadCount}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chatArea}>
          {selectedConv ? (
            <>
              <div className={styles.chatHeader}>
                <Link href={`/profile/${selectedConv.participant.username}`} className={styles.chatUser}>
                  <Avatar src={selectedConv.participant.avatar} size="md" isOnline={true} />
                  <div className={styles.chatUserInfo}>
                    <span className={styles.chatUserName}>{selectedConv.participant.displayName}</span>
                    <span className={styles.chatUserHandle}>@{selectedConv.participant.username}</span>
                  </div>
                </Link>
              </div>

              <div className={styles.messages}>
                {selectedConv.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.message} ${msg.senderId === 'user-1' ? styles.sent : styles.received}`}
                  >
                    <p>{msg.content}</p>
                    <span className={styles.messageTime}>{formatTime(msg.timestamp)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.messageInput}>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className={styles.sendBtn}>
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </AppWrapper>
  );
}