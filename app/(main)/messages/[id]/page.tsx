import React from "react";
import { notFound } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth";
import { getConversations, getConversationMessages } from "../../../../lib/data";
import { prisma } from "../../../../lib/db";
import { MessengerShell } from "../../../../components/messaging/MessengerShell";
import { ChatWindow } from "../../../../components/messaging/ChatWindow";
import { MessageItemType } from "../../../../types";

interface MessageDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MessageDetailPage({ params }: MessageDetailPageProps) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const [conversations, chatData, allUsers] = await Promise.all([
    getConversations(),
    getConversationMessages(id),
    prisma.user.findMany({
      where: { id: { not: currentUser.id } },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        isOnline: true,
      },
    }),
  ]);

  if (!chatData || !chatData.conversation) {
    notFound();
  }

  return (
    <MessengerShell
      conversations={conversations}
      currentUserId={currentUser.id}
      allUsers={allUsers}
    >
      <ChatWindow
        conversation={chatData.conversation}
        initialMessages={chatData.messages as unknown as MessageItemType[]}
        currentUserId={currentUser.id}
      />
    </MessengerShell>
  );
}
