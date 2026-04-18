import { User, Post, Story, Notification, Conversation, Hashtag, Group } from '@/types';

export const currentUser: User = {
  id: 'user-1',
  username: 'alex_creates',
  displayName: 'Alex Rivera',
  email: 'alex@bunkar.social',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop',
  bio: 'Digital creator & photographer. Capturing moments, one frame at a time. 📸',
  location: 'San Francisco, CA',
  website: 'https://alexrivera.design',
  followers: 2450,
  following: 892,
  posts: 156,
  isVerified: true,
  createdAt: '2023-06-15T10:00:00Z'
};

export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    username: 'sarah_designs',
    displayName: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    bio: 'UX Designer | Coffee enthusiast ☕',
    location: 'New York, NY',
    followers: 5230,
    following: 412,
    posts: 89,
    isVerified: true,
    createdAt: '2023-01-20T10:00:00Z'
  },
  {
    id: 'user-3',
    username: 'mike_codes',
    displayName: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer | Open source contributor',
    followers: 1890,
    following: 234,
    posts: 67,
    createdAt: '2023-03-10T10:00:00Z'
  },
  {
    id: 'user-4',
    username: 'emma_travels',
    displayName: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel blogger | 50 countries & counting ✈️',
    followers: 12500,
    following: 890,
    posts: 234,
    isVerified: true,
    createdAt: '2022-08-05T10:00:00Z'
  },
  {
    id: 'user-5',
    username: 'david_photo',
    displayName: 'David Park',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Wildlife photographer | Nature lover',
    followers: 8900,
    following: 456,
    posts: 178,
    isVerified: false,
    createdAt: '2023-02-14T10:00:00Z'
  },
  {
    id: 'user-6',
    username: 'lisa_art',
    displayName: 'Lisa Martinez',
    email: 'lisa@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital artist | Creating dreamscapes',
    followers: 3200,
    following: 567,
    posts: 45,
    isVerified: true,
    createdAt: '2023-05-01T10:00:00Z'
  },
  {
    id: 'user-7',
    username: 'james_music',
    displayName: 'James Thompson',
    email: 'james@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    bio: 'Music producer | LA-based 🎵',
    followers: 4500,
    following: 320,
    posts: 89,
    createdAt: '2023-04-12T10:00:00Z'
  },
  {
    id: 'user-8',
    username: 'nina_fit',
    displayName: 'Nina Rodriguez',
    email: 'nina@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness coach | Your daily motivation 💪',
    followers: 8900,
    following: 234,
    posts: 167,
    isVerified: true,
    createdAt: '2023-01-08T10:00:00Z'
  }
];

export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just finished a new design system for a fintech app. The color palette took forever to get right, but I think the results are worth it! What do you think? 🎨',
    images: ['https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop'],
    likes: 342,
    comments: 28,
    shares: 12,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-15T14:30:00Z',
    tags: ['design', 'ui', 'ux']
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'Open source is amazing! Just contributed to a popular React library. If you\'ve been thinking about contributing, just do it. The community is so supportive! 🚀',
    likes: 189,
    comments: 15,
    shares: 8,
    isLiked: true,
    isBookmarked: true,
    createdAt: '2024-01-15T12:15:00Z',
    tags: ['opensource', 'react', 'coding']
  },
  {
    id: 'post-3',
    author: users[3],
    content: 'Golden hour in Santorini. This place is even more magical than the photos. Sometimes the best moments are the ones you don\'t capture through a lens.',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop'
    ],
    likes: 1245,
    comments: 89,
    shares: 45,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-14T19:45:00Z',
    tags: ['travel', 'santorini', 'sunset']
  },
  {
    id: 'post-4',
    author: users[4],
    content: 'Spent the morning photographing these magnificent creatures. Remember to respect wildlife and keep your distance. Nature doesn\'t need us, but we need nature. 🦅',
    images: ['https://images.unsplash.com/photo-1611003215366-2c8224204f4d?w=800&h=600&fit=crop'],
    likes: 567,
    comments: 34,
    shares: 23,
    isLiked: true,
    isBookmarked: false,
    createdAt: '2024-01-14T08:20:00Z',
    tags: ['wildlife', 'photography', 'nature']
  },
  {
    id: 'post-5',
    author: users[5],
    content: 'New digital piece dropping this weekend! Been working on this for months. Can\'t wait to share it with you all. 🎭',
    images: ['https://images.unsplash.com/photo-1633186223077-c73a97017e20?w=800&h=600&fit=crop'],
    likes: 892,
    comments: 56,
    shares: 34,
    isLiked: false,
    isBookmarked: true,
    createdAt: '2024-01-13T16:00:00Z',
    tags: ['digitalart', 'art', 'creativity']
  },
  {
    id: 'post-6',
    author: users[6],
    content: 'Late night studio session. There\'s something about creating music when the world is sleeping. The best ideas come in the quiet moments. 🎹',
    likes: 234,
    comments: 18,
    shares: 5,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-13T02:30:00Z',
    tags: ['music', 'producer', 'studio']
  },
  {
    id: 'post-7',
    author: users[7],
    content: 'Remember: progress, not perfection. Every workout is a step forward, even on the hard days. You\'ve got this! 💪',
    likes: 1567,
    comments: 89,
    shares: 78,
    isLiked: true,
    isBookmarked: false,
    createdAt: '2024-01-12T07:00:00Z',
    tags: ['fitness', 'motivation', 'health']
  },
  {
    id: 'post-8',
    author: users[1],
    content: 'Attending UX Conference 2024 next week! Who else is going? Would love to connect with fellow designers. Drop your handles below! 👇',
    likes: 456,
    comments: 67,
    shares: 23,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-11T15:45:00Z',
    tags: ['design', 'conference', 'ux']
  }
];

export const stories: Story[] = [
  {
    id: 'story-1',
    author: users[1],
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=700&fit=crop',
    createdAt: '2024-01-15T10:00:00Z',
    isViewed: false
  },
  {
    id: 'story-2',
    author: users[2],
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=700&fit=crop',
    createdAt: '2024-01-15T09:30:00Z',
    isViewed: false
  },
  {
    id: 'story-3',
    author: users[3],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    createdAt: '2024-01-15T08:45:00Z',
    isViewed: false
  },
  {
    id: 'story-4',
    author: users[4],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=700&fit=crop',
    createdAt: '2024-01-15T07:20:00Z',
    isViewed: true
  },
  {
    id: 'story-5',
    author: users[5],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=700&fit=crop',
    createdAt: '2024-01-14T22:00:00Z',
    isViewed: true
  },
  {
    id: 'story-6',
    author: users[6],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=700&fit=crop',
    createdAt: '2024-01-14T20:30:00Z',
    isViewed: false
  }
];

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    user: users[1],
    content: 'liked your post about open source contribution',
    isRead: false,
    createdAt: '2024-01-15T14:20:00Z',
    postId: 'post-2'
  },
  {
    id: 'notif-2',
    type: 'follow',
    user: users[3],
    content: 'started following you',
    isRead: false,
    createdAt: '2024-01-15T13:45:00Z'
  },
  {
    id: 'notif-3',
    type: 'comment',
    user: users[4],
    content: 'commented on your post: "Amazing wildlife shot!"',
    isRead: false,
    createdAt: '2024-01-15T12:30:00Z',
    postId: 'post-2'
  },
  {
    id: 'notif-4',
    type: 'like',
    user: users[5],
    content: 'liked your comment',
    isRead: true,
    createdAt: '2024-01-15T11:15:00Z'
  },
  {
    id: 'notif-5',
    type: 'mention',
    user: users[6],
    content: 'mentioned you in a post',
    isRead: true,
    createdAt: '2024-01-14T22:00:00Z'
  },
  {
    id: 'notif-6',
    type: 'share',
    user: users[7],
    content: 'shared your post to their followers',
    isRead: true,
    createdAt: '2024-01-14T18:30:00Z',
    postId: 'post-2'
  }
];

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: users[1],
    lastMessage: 'Hey! Did you see the new design I shared?',
    lastMessageTime: '2024-01-15T14:30:00Z',
    unreadCount: 2,
    messages: [
      { id: 'msg-1', senderId: 'user-2', content: 'Hey! Did you see the new design I shared?', timestamp: '2024-01-15T14:30:00Z', isRead: false },
      { id: 'msg-2', senderId: 'user-1', content: 'Not yet, send it over!', timestamp: '2024-01-15T14:25:00Z', isRead: true },
      { id: 'msg-3', senderId: 'user-2', content: 'Working on a new project. Will share soon!', timestamp: '2024-01-15T14:20:00Z', isRead: true }
    ]
  },
  {
    id: 'conv-2',
    participant: users[2],
    lastMessage: 'Thanks for the feedback on the PR!',
    lastMessageTime: '2024-01-15T12:00:00Z',
    unreadCount: 0,
    messages: [
      { id: 'msg-4', senderId: 'user-3', content: 'Thanks for the feedback on the PR!', timestamp: '2024-01-15T12:00:00Z', isRead: true },
      { id: 'msg-5', senderId: 'user-1', content: 'No problem! Great work on the implementation', timestamp: '2024-01-15T11:45:00Z', isRead: true }
    ]
  },
  {
    id: 'conv-3',
    participant: users[3],
    lastMessage: 'The photos from Santorini are incredible! 📸',
    lastMessageTime: '2024-01-14T20:00:00Z',
    unreadCount: 1,
    messages: [
      { id: 'msg-6', senderId: 'user-4', content: 'The photos from Santorini are incredible! 📸', timestamp: '2024-01-14T20:00:00Z', isRead: false },
      { id: 'msg-7', senderId: 'user-1', content: 'Wait till you see the next batch!', timestamp: '2024-01-14T19:30:00Z', isRead: true }
    ]
  },
  {
    id: 'conv-4',
    participant: users[5],
    lastMessage: 'Let\'s collab on something soon!',
    lastMessageTime: '2024-01-13T16:00:00Z',
    unreadCount: 0,
    messages: [
      { id: 'msg-8', senderId: 'user-6', content: 'Let\'s collab on something soon!', timestamp: '2024-01-13T16:00:00Z', isRead: true }
    ]
  },
  {
    id: 'conv-5',
    participant: users[7],
    lastMessage: 'New workout video dropping tomorrow! 💪',
    lastMessageTime: '2024-01-12T10:00:00Z',
    unreadCount: 0,
    messages: [
      { id: 'msg-9', senderId: 'user-8', content: 'New workout video dropping tomorrow! 💪', timestamp: '2024-01-12T10:00:00Z', isRead: true },
      { id: 'msg-10', senderId: 'user-1', content: 'Can\'t wait to see it!', timestamp: '2024-01-12T09:30:00Z', isRead: true }
    ]
  }
];

export const hashtags: Hashtag[] = [
  { id: 'tag-1', name: 'photography', posts: 245000, trend: 'up' },
  { id: 'tag-2', name: 'design', posts: 189000, trend: 'up' },
  { id: 'tag-3', name: 'travel', posts: 567000, trend: 'stable' },
  { id: 'tag-4', name: 'art', posts: 342000, trend: 'up' },
  { id: 'tag-5', name: 'coding', posts: 89000, trend: 'down' },
  { id: 'tag-6', name: 'music', posts: 456000, trend: 'stable' },
  { id: 'tag-7', name: 'fitness', posts: 234000, trend: 'up' },
  { id: 'tag-8', name: 'nature', posts: 178000, trend: 'up' }
];

export const groups: Group[] = [
  {
    id: 'group-1',
    name: 'Designers United',
    description: 'A community for UI/UX designers to share work, get feedback, and connect.',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    memberCount: 12450,
    isJoined: true
  },
  {
    id: 'group-2',
    name: 'Travel Enthusiasts',
    description: 'Share your travel stories and discover hidden gems around the world.',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    memberCount: 34500,
    isJoined: false
  },
  {
    id: 'group-3',
    name: ' Developers Hub',
    description: 'Code, learn, and grow with fellow developers. Open source friendly!',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    memberCount: 28900,
    isJoined: true
  },
  {
    id: 'group-4',
    name: 'Photography Club',
    description: 'Share your photos, learn techniques, and get inspired by others.',
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop',
    memberCount: 18700,
    isJoined: false
  }
];

export const suggestedUsers = users.slice(2, 6);

export const trendingPosts = posts.slice(0, 3);