# Facebook-Style Social Media Platform (Next.js 16 + React 19)

A full-stack, production-style **Facebook Clone** built with **Next.js App Router**, **React 19**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **JWT Authentication**.

---

## ✨ Features Overview

### 1. 📱 15 Full Pages
1. **Login** (`/login`) - Clean Facebook-style login with instant 1-click demo login buttons.
2. **Register** (`/register`) - Account registration with validation.
3. **Forgot Password** (`/forgot-password`) - Account recovery workflow.
4. **Home / News Feed** (`/`) - Stories, post composer, multi-image posts, reactions, comments with nested replies.
5. **Profile** (`/profile/[username]`) - Cover photo, avatar, bio, timeline posts, about details, friends list, and photos gallery.
6. **Friends Hub** (`/friends`) - Friend requests preview, friend suggestions ("People You May Know"), all friends manager.
7. **Friend Requests** (`/friends/requests`) - Dedicated friend request management with confirm/decline.
8. **Search Results** (`/search?q=...`) - Unified multi-entity search across people, groups, and posts.
9. **Notifications** (`/notifications`) - Real-time alerts for likes, comments, replies, and friend requests.
10. **Messenger** (`/messages`) - Chat list sidebar and messaging hub.
11. **Direct Conversation** (`/messages/[conversationId]`) - Full chat thread with timestamps and quick like sticker.
12. **Groups Hub** (`/groups`) - Discover new groups and browse joined groups.
13. **Group Details** (`/groups/[groupId]`) - Group cover, member roster, join/leave toggle, and group-specific post feed.
14. **Saved Posts** (`/saved`) - Personal bookmarks collection with unsave and view links.
15. **Settings** (`/settings`) - Profile editor, dark mode / theme preferences, and account info.

---

### 2. 🖥️ Layout & Navigation
- **Top Header**:
  - Live debounce search bar with dropdown preview
  - Responsive center tabs (Home, Friends, Groups, Saved) with badges
  - Messenger popup dropdown
  - Notifications popup dropdown with unread count
  - User profile menu with 1-click demo user switcher, theme toggle, and logout
- **Three-Column Desktop Layout**:
  - **Left Sidebar**: Profile shortcut, navigation links, shortcuts, and "See more" accordion.
  - **Center Feed**: 24h stories carousel, composer card, feed filter tabs, posts stream.
  - **Right Sidebar**: Sponsored card, birthdays reminder, active contacts list with green online indicators.
- **Floating Chat Widget**: Clicking any contact in the right sidebar opens a floating Messenger popup in the bottom right!
- **Mobile Navigation**: Sticky bottom navigation bar and mobile-responsive layouts.

---

### 3. 💬 Feed & Interactions
- **Post Composer Modal**:
  - Multi-image attachments & previews
  - Feeling & activity selector (😊 happy, 🍕 eating, ✈️ traveling, ☕ coffee, etc.)
  - Location tagger placeholder
  - Colored background themes for short status updates (Sunset, Ocean, Electric Purple, Emerald, Midnight)
  - Audience privacy selector (🌐 Public, 👥 Friends, 🔒 Only Me)
- **7 Animated Reactions**: 👍 Like, ❤️ Love, 🥰 Care, 😆 Haha, 😮 Wow, 😢 Sad, 😡 Angry with hover popup and optimistic UI updates.
- **Comments System**: Nested replies, comment liking, comment deletion, and optimistic updates.
- **24-Hour Stories**: Text and photo stories with full-screen viewer and auto-advancing progress timers.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed
```bash
npx prisma db push
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Accounts (Password: `password123`)

| Name | Username | Email |
| :--- | :--- | :--- |
| **Mark Zuckerberg** | `mark` | `mark@facebook.com` |
| **Sarah Jenkins** | `sarahj` | `sarah@example.com` |
| **Alex Rivera** | `alexr` | `alex@example.com` |
| **Emily Watson** | `emilyw` | `emily@example.com` |
| **Michael Chen** | `mchen` | `michael@example.com` |
| **Jessica Taylor** | `jessicat` | `jessica@example.com` |

*(You can also use the 1-click instant login buttons on the login page or switch accounts at any time from the top-right profile menu!)*

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Server Components, Server Actions)
- **Library**: React 19
- **Database & ORM**: SQLite + Prisma ORM
- **Styling**: Tailwind CSS v4 + Custom Dark Mode Variables
- **Icons**: Lucide React
- **Validation**: Zod
- **Auth**: JWT Session Cookies (`jose`) + `bcryptjs`
- **Dates**: `date-fns` with custom Facebook-style relative time formatting
