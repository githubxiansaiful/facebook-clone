import { ReactionType } from "../lib/utils";

export interface UserSummary {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  headline?: string | null;
  bio?: string | null;
  isOnline?: boolean;
}

export interface PostImageItem {
  id: string;
  url: string;
  alt: string | null;
  order: number;
}

export interface ReactionItem {
  id: string;
  type: ReactionType;
  userId: string;
  user: UserSummary;
}

export interface CommentItemType {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  content: string;
  image: string | null;
  createdAt: string | Date;
  author: UserSummary;
  reactions: {
    id: string;
    type: ReactionType;
    userId: string;
  }[];
  _count?: {
    replies: number;
    reactions: number;
  };
  replies?: CommentItemType[];
}

export interface PostItemType {
  id: string;
  authorId: string;
  content: string;
  privacy: "PUBLIC" | "FRIENDS" | "ONLY_ME" | string;
  feeling: string | null;
  location: string | null;
  bgTheme: string | null;
  groupId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  author: UserSummary;
  group?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  images: PostImageItem[];
  reactions: {
    id: string;
    type: ReactionType;
    userId: string;
    user: UserSummary;
  }[];
  comments: CommentItemType[];
  _count: {
    comments: number;
    reactions: number;
    savedBy?: number;
  };
  isSaved?: boolean;
  userReaction?: ReactionType | null;
}

export interface StoryItemType {
  id: string;
  userId: string;
  mediaUrl: string | null;
  mediaType: "IMAGE" | "TEXT";
  textContent: string | null;
  bgGradient: string | null;
  expiresAt: string | Date;
  createdAt: string | Date;
  user: UserSummary;
}

export interface NotificationItemType {
  id: string;
  recipientId: string;
  issuerId: string;
  type: string;
  entityId: string | null;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string | Date;
  issuer: UserSummary;
}

export interface MessageItemType {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  mediaUrl: string | null;
  isRead: boolean;
  createdAt: string | Date;
  sender: UserSummary;
}

export interface ConversationItemType {
  id: string;
  isGroup: boolean;
  name: string | null;
  avatar: string | null;
  updatedAt: string | Date;
  members: {
    id: string;
    userId: string;
    lastReadAt: string | Date;
    user: UserSummary;
  }[];
  messages: MessageItemType[];
  _count?: {
    messages: number;
  };
}

export interface GroupItemType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverPhoto: string | null;
  privacy: "PUBLIC" | "PRIVATE" | string;
  createdById: string;
  createdAt: string | Date;
  creator?: UserSummary;
  _count: {
    members: number;
    posts: number;
  };
  isMember?: boolean;
  userRole?: "ADMIN" | "MODERATOR" | "MEMBER" | null;
}
