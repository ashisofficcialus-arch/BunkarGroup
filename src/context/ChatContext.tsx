'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc,
  Firestore 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useFirebaseAuth } from './FirebaseAuthContext';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: any;
  isRead: boolean;
  type: 'text' | 'image' | 'video';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: any;
  unreadCount: number;
}

interface ChatContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  sendMessage: (conversationId: string, content: string, type?: 'text' | 'image' | 'video') => Promise<void>;
  setActiveConversation: (conv: Conversation | null) => void;
  createConversation: (participantId: string) => Promise<string>;
  markAsRead: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user, isFirebaseConfigured } = useFirebaseAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Listen to conversations
  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;

    const conversationsRef = collection(db, 'conversations');
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', user.uid),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Conversation));
      setConversations(convs);
    });

    return () => unsubscribe();
  }, [user, isFirebaseConfigured]);

  // Listen to messages for active conversation
  useEffect(() => {
    if (!activeConversation || !isFirebaseConfigured) return;

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('conversationId', '==', activeConversation.id),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [activeConversation, isFirebaseConfigured]);

  const sendMessage = useCallback(async (
    conversationId: string, 
    content: string, 
    type: 'text' | 'image' | 'video' = 'text'
  ) => {
    if (!user || !isFirebaseConfigured) return;

    const messagesRef = collection(db, 'messages');
    const conversationRef = doc(db, 'conversations', conversationId);

    // Add message
    await addDoc(messagesRef, {
      conversationId,
      senderId: user.uid,
      senderName: user.displayName || 'User',
      senderAvatar: user.photoURL || '',
      content,
      type,
      timestamp: serverTimestamp(),
      isRead: false
    });

    // Update conversation
    await updateDoc(conversationRef, {
      lastMessage: content,
      lastMessageTime: serverTimestamp()
    });
  }, [user, isFirebaseConfigured]);

  const createConversation = useCallback(async (participantId: string): Promise<string> => {
    if (!user || !isFirebaseConfigured) return '';

    const conversationsRef = collection(db, 'conversations');
    const docRef = await addDoc(conversationsRef, {
      participants: [user.uid, participantId],
      lastMessage: '',
      lastMessageTime: serverTimestamp(),
      unreadCount: 0
    });

    return docRef.id;
  }, [user, isFirebaseConfigured]);

  const markAsRead = useCallback((conversationId: string) => {
    if (!isFirebaseConfigured) return;
    
    const conversationRef = doc(db, 'conversations', conversationId);
    updateDoc(conversationRef, { unreadCount: 0 });
  }, [isFirebaseConfigured]);

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      messages,
      isLoading,
      sendMessage,
      setActiveConversation,
      createConversation,
      markAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}