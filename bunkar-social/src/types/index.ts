export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing?: boolean;
  isVerified?: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Story {
  id: string;
  author: User;
  image: string;
  createdAt: string;
  isViewed: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share';
  user: User;
  content: string;
  isRead: boolean;
  createdAt: string;
  postId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface Hashtag {
  id: string;
  name: string;
  posts: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Group {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  isJoined?: boolean;
}