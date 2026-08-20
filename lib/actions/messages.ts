"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { SendMessageSchema } from "../validations";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(formData: {
  conversationId: string;
  content: string;
  mediaUrl?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const validation = SendMessageSchema.safeParse(formData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid message" };
  }

  const { conversationId, content, mediaUrl } = validation.data;

  // Ensure member
  const member = await prisma.conversationMember.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: currentUser.id,
      },
    },
  });

  if (!member) {
    return { error: "Not a member of this conversation" };
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: currentUser.id,
      content,
      mediaUrl: mediaUrl || null,
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
    },
  });

  // Update conversation timestamp
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  revalidatePath(`/messages`);
  revalidatePath(`/messages/${conversationId}`);
  return { success: true, message };
}

export async function getOrCreateDirectConversationAction(targetUserId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };
  if (currentUser.id === targetUserId) return { error: "Cannot message yourself" };

  // Find direct conversation between these two
  const existingConv = await prisma.conversation.findFirst({
    where: {
      isGroup: false,
      AND: [
        { members: { some: { userId: currentUser.id } } },
        { members: { some: { userId: targetUserId } } },
      ],
    },
    select: { id: true },
  });

  if (existingConv) {
    return { success: true, conversationId: existingConv.id };
  }

  // Create new conversation
  const newConv = await prisma.conversation.create({
    data: {
      isGroup: false,
      members: {
        create: [{ userId: currentUser.id }, { userId: targetUserId }],
      },
    },
  });

  revalidatePath("/messages");
  return { success: true, conversationId: newConv.id };
}
