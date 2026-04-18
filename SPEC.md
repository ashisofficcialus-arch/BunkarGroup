# Bunkar Social - Technical Specification

## 1. Project Overview

- **Project Name**: Bunkar Social
- **Type**: Full-stack social media web application
- **Core Functionality**: A scalable social platform enabling users to create profiles, connect via friend systems, share content (text, images, videos, stories), and engage through an algorithm-driven news feed with real-time messaging and community features.
- **Target Users**: Students, local communities, and creators seeking a privacy-focused social experience

## 2. Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: CSS Modules with custom design system
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **Authentication**: JWT-based (mock implementation for MVP)
- **Database**: MongoDB (mock data for MVP)
- **Deployment**: Vercel-ready structure

## 3. UI/UX Specification

### Layout Structure

**Main Layout**
- Fixed sidebar navigation (280px) - Desktop only
- Main content area (flexible)
- Right sidebar for trending/suggestions (320px) - Desktop only
- Bottom navigation bar - Mobile only
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

**Pages**
1. **Home/Feed** - News feed with posts, stories, create post
2. **Profile** - User profile with posts, about, media tabs
3. **Messages** - Chat list and conversation view
4. **Notifications** - Activity notifications
5. **Search** - Search users, posts, hashtags
6. **Communities** - Groups/pages discovery

### Visual Design

**Color Palette**
- Background Primary: `#0a0a0b` (near black)
- Background Secondary: `#141416` (dark gray)
- Background Tertiary: `#1c1c1f` (card backgrounds)
- Accent Primary: `#6366f1` (indigo-500)
- Accent Secondary: `#8b5cf6` (violet-500)
- Accent Gradient: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`
- Text Primary: `#fafafa` (white-ish)
- Text Secondary: `#a1a1aa` (gray-400)
- Text Muted: `#71717a` (gray-500)
- Success: `#22c55e` (green-500)
- Error: `#ef4444` (red-500)
- Warning: `#f59e0b` (amber-500)
- Border: `#27272a` (gray-800)

**Typography**
- Font Family: `'Satoshi', 'DM Sans', system-ui, sans-serif`
- Headings: 
  - H1: 32px, font-weight 700
  - H2: 24px, font-weight 600
  - H3: 20px, font-weight 600
  - H4: 16px, font-weight 600
- Body: 15px, font-weight 400, line-height 1.6
- Small: 13px, font-weight 400
- Caption: 12px, font-weight 500

**Spacing System**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects**
- Card shadows: `0 4px 24px rgba(0, 0, 0, 0.4)`
- Hover transitions: 200ms ease-out
- Border radius: 12px (cards), 8px (buttons), 9999px (avatars/pills)
- Glassmorphism on modals: `backdrop-filter: blur(16px)`

### Components

**Navigation**
- Sidebar with logo, nav items, user mini-profile
- Nav items: Home, Explore, Messages, Notifications, Profile, Communities
- Active state: accent background, white text
- Hover: subtle background highlight

**Post Card**
- Author avatar, name, timestamp
- Post content (text, images, video embed)
- Engagement bar: Like, Comment, Share, Bookmark
- States: default, liked (filled heart), bookmarked

**Story Ring**
- Circular avatar with gradient border ring
- Unviewed: full gradient ring
- Viewed: muted ring

**Chat Bubble**
- Rounded corners, tail on sender side
- Sent: accent gradient background
- Received: secondary background

**Input Fields**
- Dark background (#1c1c1f)
- Border on focus (accent color)
- Placeholder text in muted color

**Buttons**
- Primary: gradient background, white text
- Secondary: transparent with border
- Ghost: transparent, text only
- Sizes: sm (32px), md (40px), lg (48px)

**Modal**
- Centered, glassmorphism backdrop
- Smooth scale-in animation

## 4. Functionality Specification

### MVP Features (Phase 1)

**Authentication**
- Login page with email/password
- Register page with username, email, password
- JWT token storage in localStorage
- Protected routes

**Profile System**
- View own profile and other users
- Edit profile (name, bio, avatar, cover)
- Follow/Unfollow users
- Follower/Following counts

**Posts & Feed**
- Create text post
- Create post with images (up to 4)
- Like/Unlike posts
- Comment on posts
- Share posts (copy link)
- Bookmark posts

**Feed Algorithm**
- Posts from followed users
- Trending posts
- Chronological fallback

**Stories**
- View stories (carousel)
- Create story (text overlay on image)
- Stories expire after 24h

**User Discovery**
- Search users by name/username
- Suggested users to follow
- Trending hashtags

**Notifications**
- Like notifications
- Comment notifications
- Follow notifications

### Phase 2 Features (UI Only)

- Real-time messaging UI
- Group chat creation
- Community/Group pages
- Creator/Business pages
- Marketplace listings

## 5. Page Routes

- `/` - Home feed (authenticated)
- `/login` - Login page
- `/register` - Registration page
- `/explore` - Discover users/hashtags
- `/messages` - Chat list
- `/messages/[id]` - Conversation
- `/notifications` - All notifications
- `/profile/[username]` - User profile
- `/settings` - Account settings
- `/communities` - Groups discovery
- `/search` - Search results

## 6. Acceptance Criteria

1. ✅ Next.js 14 project builds without errors
2. ✅ Dark theme with indigo/violet accents throughout
3. ✅ Responsive layout (mobile/tablet/desktop)
4. ✅ Login/Register pages functional
5. ✅ Home feed displays posts from mock data
6. ✅ Can create new posts with text
7. ✅ Like/Comment/Share interactions work
8. ✅ Profile page shows user info and posts
9. ✅ Navigation between all pages works
10. ✅ Stories section displays on feed
11. ✅ Messages UI with chat list
12. ✅ Notifications page
13. ✅ Search functionality
14. ✅ No critical console errors
15. ✅ Smooth animations and transitions