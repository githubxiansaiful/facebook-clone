"use client";

import React, { useState } from "react";
import { ChatList } from "./ChatList";
import { CreateConversationModal } from "./CreateConversationModal";
import { ConversationItemType } from "../../types";

interface MessengerShellProps {
  conversations: ConversationItemType[];
  currentUserId: string;
  allUsers: any[];
  children?: React.ReactNode;
}

export function MessengerShell({
  conversations,
  currentUserId,
  allUsers,
  children,
}: MessengerShellProps) {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto h-[calc(100vh-5rem)] bg-white dark:bg-[#242526] rounded-2xl shadow-md border border-zinc-200 dark:border-[#3e4042] overflow-hidden flex">
      {/* Left Chat List */}
      <ChatList
        conversations={conversations}
        currentUserId={currentUserId}
        onNewChat={() => setIsNewChatOpen(true)}
      />

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>

      <CreateConversationModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        users={allUsers}
      />
    </div>
  );
}
