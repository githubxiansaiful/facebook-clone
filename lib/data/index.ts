import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { PostItemType, StoryItemType, NotificationItemType, ConversationItemType, GroupItemType } from "../../types";
import { ReactionType } from "../utils";

export async function getFeedPosts(filter: "all" | "friends" | "saved" = "all", groupId?: string): Promise<PostItemType[]> {
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id;

  let whereClause: any = {};

  if (groupId) {
    whereClause.groupId = groupId;
  } else if (filter === "saved" && currentUserId) {
    whereClause.savedBy = {
      some: {
        userId: currentUserId,
      },
    };
  } else if (filter === "friends" && currentUserId) {
    // Get accepted friends
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: currentUserId, status: "ACCEPTED" },
          { receiverId: currentUserId, status: "ACCEPTED" },
        ],
      },
    });

    const friendIds = friendships.map((f) => (f.senderId === currentUserId ? f.receiverId : f.senderId));
    friendIds.push(currentUserId);

    whereClause = {
      authorId: { in: friendIds },
      groupId: null,
    };
  } else {
    // Normal public or visible feed
    if (!groupId) {
      whereClause.groupId = null;
    }
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          headline: true,
          bio: true,
          isOnline: true,
        },
      },
      group: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      images: {
        orderBy: { order: "asc" },
      },
      reactions: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
      comments: {
        where: { parentId: null },
        orderBy: { createdAt: "asc" },
        take: 5,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
          reactions: {
            select: {
              id: true,
              type: true,
              userId: true,
            },
          },
          replies: {
            orderBy: { createdAt: "asc" },
            take: 3,
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatar: true,
                },
              },
              reactions: {
                select: {
                  id: true,
                  type: true,
                  userId: true,
                },
              },
            },
          },
          _count: {
            select: { replies: true, reactions: true },
          },
        },
      },
      savedBy: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { id: true },
          }
        : false,
      _count: {
        select: {
          comments: true,
          reactions: true,
          savedBy: true,
        },
      },
    },
  });

  return posts.map((p) => {
    const userReactionObj = currentUserId
      ? p.reactions.find((r) => r.userId === currentUserId)
      : null;
    const isSaved = currentUserId ? (p.savedBy?.length ?? 0) > 0 : false;

    return {
      ...p,
      isSaved,
      userReaction: userReactionObj ? (userReactionObj.type as ReactionType) : null,
      reactions: p.reactions.map((r) => ({
        ...r,
        type: r.type as ReactionType,
      })),
      comments: p.comments.map((c) => ({
        ...c,
        reactions: c.reactions.map((cr) => ({ ...cr, type: cr.type as ReactionType })),
        replies: c.replies.map((rep) => ({
          ...rep,
          reactions: rep.reactions.map((rr) => ({ ...rr, type: rr.type as ReactionType })),
        })),
      })),
    };
  }) as unknown as PostItemType[];
}

export async function getStories(): Promise<StoryItemType[]> {
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          headline: true,
        },
      },
    },
  });

  return stories as unknown as StoryItemType[];
}

export async function getUserProfile(username: string) {
  const currentUser = await getCurrentUser();
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) return null;

  // Calculate friends count & status with current user
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { senderId: user.id, status: "ACCEPTED" },
        { receiverId: user.id, status: "ACCEPTED" },
      ],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  const friends = friendships.map((f) => (f.senderId === user.id ? f.receiver : f.sender));

  let friendshipStatus: "NONE" | "FRIENDS" | "SENT" | "RECEIVED" | "SELF" = "NONE";

  if (currentUser) {
    if (currentUser.id === user.id) {
      friendshipStatus = "SELF";
    } else {
      const activeFriendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { senderId: currentUser.id, receiverId: user.id },
            { senderId: user.id, receiverId: currentUser.id },
          ],
        },
      });

      if (activeFriendship) {
        if (activeFriendship.status === "ACCEPTED") {
          friendshipStatus = "FRIENDS";
        } else if (activeFriendship.senderId === currentUser.id) {
          friendshipStatus = "SENT";
        } else {
          friendshipStatus = "RECEIVED";
        }
      }
    }
  }

  // Get user's photos from posts
  const photos = await prisma.postImage.findMany({
    where: {
      post: {
        authorId: user.id,
      },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return {
    ...user,
    friendsCount: friends.length,
    friendsPreview: friends.slice(0, 9),
    allFriends: friends,
    photos,
    friendshipStatus,
  };
}

export async function getFriendsHubData() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  // 1. Pending incoming friend requests
  const pendingRequests = await prisma.friendship.findMany({
    where: {
      receiverId: currentUser.id,
      status: "PENDING",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          headline: true,
          bio: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 2. Accepted friends
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { senderId: currentUser.id, status: "ACCEPTED" },
        { receiverId: currentUser.id, status: "ACCEPTED" },
      ],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          headline: true,
          bio: true,
          isOnline: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          headline: true,
          bio: true,
          isOnline: true,
        },
      },
    },
  });

  const friends = friendships.map((f) => (f.senderId === currentUser.id ? f.receiver : f.sender));
  const friendIds = friends.map((f) => f.id);

  // 3. Friend suggestions (users who are not friends and not current user)
  const existingRelations = await prisma.friendship.findMany({
    where: {
      OR: [{ senderId: currentUser.id }, { receiverId: currentUser.id }],
    },
  });
  const excludedUserIds = new Set([
    currentUser.id,
    ...existingRelations.map((r) => (r.senderId === currentUser.id ? r.receiverId : r.senderId)),
  ]);

  const suggestions = await prisma.user.findMany({
    where: {
      id: { notIn: Array.from(excludedUserIds) },
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      headline: true,
      bio: true,
    },
    take: 10,
  });

  return {
    requests: pendingRequests.map((r) => ({
      id: r.id,
      sender: r.sender,
      createdAt: r.createdAt,
    })),
    friends,
    suggestions,
  };
}

export async function getConversations(): Promise<ConversationItemType[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  const memberships = await prisma.conversationMember.findMany({
    where: { userId: currentUser.id },
    select: { conversationId: true },
  });

  const conversationIds = memberships.map((m) => m.conversationId);

  const conversations = await prisma.conversation.findMany({
    where: { id: { in: conversationIds } },
    orderBy: { updatedAt: "desc" },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  return conversations as unknown as ConversationItemType[];
}

export async function getConversationMessages(conversationId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  // Check member
  const member = await prisma.conversationMember.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: currentUser.id,
      },
    },
  });

  if (!member) return null;

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
        },
      },
    },
  });

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return {
    conversation,
    messages,
  };
}

export async function getNotifications(): Promise<{
  notifications: NotificationItemType[];
  unreadCount: number;
}> {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { notifications: [], unreadCount: 0 };

  const notifications = await prisma.notification.findMany({
    where: { recipientId: currentUser.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      issuer: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  const unreadCount = await prisma.notification.count({
    where: {
      recipientId: currentUser.id,
      isRead: false,
    },
  });

  return {
    notifications: notifications as unknown as NotificationItemType[],
    unreadCount,
  };
}

export async function getGroups(): Promise<{
  joinedGroups: GroupItemType[];
  discoverGroups: GroupItemType[];
}> {
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id;

  const allGroups = await prisma.group.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      members: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { role: true },
          }
        : false,
      _count: {
        select: {
          members: true,
          posts: true,
        },
      },
    },
  });

  const formatted = allGroups.map((g) => {
    const isMember = currentUserId ? (g.members?.length ?? 0) > 0 : false;
    const userRole = isMember ? (g.members[0].role as any) : null;
    return {
      ...g,
      isMember,
      userRole,
    };
  });

  return {
    joinedGroups: formatted.filter((g) => g.isMember) as unknown as GroupItemType[],
    discoverGroups: formatted.filter((g) => !g.isMember) as unknown as GroupItemType[],
  };
}

export async function getGroupDetails(groupIdOrSlug: string) {
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id;

  const group = await prisma.group.findFirst({
    where: {
      OR: [{ id: groupIdOrSlug }, { slug: groupIdOrSlug }],
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
              headline: true,
              isOnline: true,
            },
          },
        },
      },
      _count: {
        select: {
          members: true,
          posts: true,
        },
      },
    },
  });

  if (!group) return null;

  const isMember = currentUserId
    ? group.members.some((m) => m.userId === currentUserId)
    : false;
  const userMembership = currentUserId
    ? group.members.find((m) => m.userId === currentUserId)
    : null;

  return {
    ...group,
    isMember,
    userRole: userMembership?.role || null,
  };
}

export async function getOnlineContacts() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  // Get friends or all users for demo
  const users = await prisma.user.findMany({
    where: {
      id: { not: currentUser.id },
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      headline: true,
      isOnline: true,
      lastSeen: true,
    },
    take: 15,
  });

  return users;
}
