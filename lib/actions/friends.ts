"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

export async function sendFriendRequestAction(targetUserId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Must be logged in" };
  if (currentUser.id === targetUserId) return { error: "Cannot add yourself" };

  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { senderId: currentUser.id, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: currentUser.id },
      ],
    },
  });

  if (existing) {
    if (existing.status === "ACCEPTED") return { error: "Already friends" };
    if (existing.status === "PENDING") return { error: "Request already pending" };
  }

  const friendship = await prisma.friendship.create({
    data: {
      senderId: currentUser.id,
      receiverId: targetUserId,
      status: "PENDING",
    },
  });

  // Create notification
  await prisma.notification.create({
    data: {
      recipientId: targetUserId,
      issuerId: currentUser.id,
      type: "FRIEND_REQUEST",
      entityId: friendship.id,
      message: `sent you a friend request.`,
      link: `/friends/requests`,
    },
  });

  revalidatePath("/friends");
  revalidatePath("/friends/requests");
  return { success: true };
}

export async function acceptFriendRequestAction(friendshipId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const friendship = await prisma.friendship.findUnique({
    where: { id: friendshipId },
  });

  if (!friendship || friendship.receiverId !== currentUser.id) {
    return { error: "Friend request not found" };
  }

  await prisma.friendship.update({
    where: { id: friendshipId },
    data: { status: "ACCEPTED" },
  });

  // Notify sender
  await prisma.notification.create({
    data: {
      recipientId: friendship.senderId,
      issuerId: currentUser.id,
      type: "FRIEND_ACCEPT",
      entityId: friendship.id,
      message: `accepted your friend request.`,
      link: `/profile/${currentUser.username}`,
    },
  });

  revalidatePath("/friends");
  revalidatePath("/friends/requests");
  return { success: true };
}

export async function declineFriendRequestAction(friendshipId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const friendship = await prisma.friendship.findUnique({
    where: { id: friendshipId },
  });

  if (!friendship || friendship.receiverId !== currentUser.id) {
    return { error: "Friend request not found" };
  }

  await prisma.friendship.delete({
    where: { id: friendshipId },
  });

  revalidatePath("/friends");
  revalidatePath("/friends/requests");
  return { success: true };
}

export async function removeFriendAction(targetUserId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.friendship.deleteMany({
    where: {
      OR: [
        { senderId: currentUser.id, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: currentUser.id },
      ],
    },
  });

  revalidatePath("/friends");
  return { success: true };
}

export async function toggleFollowAction(targetUserId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: targetUserId,
      },
    },
  });

  if (existing) {
    await prisma.follow.delete({
      where: { id: existing.id },
    });
    return { success: true, following: false };
  } else {
    await prisma.follow.create({
      data: {
        followerId: currentUser.id,
        followingId: targetUserId,
      },
    });
    return { success: true, following: true };
  }
}
