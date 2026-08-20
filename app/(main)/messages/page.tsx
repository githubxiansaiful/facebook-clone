import React from "react";
import { getCurrentUser } from "../../../lib/auth";
import { getConversations } from "../../../lib/data";
import { prisma } from "../../../lib/db";
import { MessengerShell } from "../../../components/messaging/MessengerShell";
import { MessageCircle } from "lucide-react";

export default async function MessagesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const [conversations, allUsers] = await Promise.all([
    getConversations(),
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

  return (
    <MessengerShell
      conversations={conversations}
      currentUserId={currentUser.id}
      allUsers={allUsers}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-50/50 dark:bg-[#18191a]/30">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/50 text-[#1877F2] flex items-center justify-center mb-3">
          <MessageCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Your Messages
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          Select a chat from the sidebar or start a new conversation to connect with friends.
        </p>
      </div>
    </MessengerShell>
  );
}
