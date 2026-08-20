"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Edit, Users } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { formatFbTime } from "../../lib/utils";
import { ConversationItemType } from "../../types";

interface ChatListProps {
  conversations: ConversationItemType[];
  currentUserId: string;
  onNewChat: () => void;
}

export function ChatList({
  conversations,
  currentUserId,
  onNewChat,
}: ChatListProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((conv) => {
    const other = conv.members.find((m) => m.userId !== currentUserId)?.user;
    const name = conv.name || other?.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside className="w-full md:w-80 lg:w-96 shrink-0 border-r border-zinc-200 dark:border-[#3e4042] h-full flex flex-col bg-white dark:bg-[#242526]">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
          Chats
        </h2>
        <button
          onClick={onNewChat}
          className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200 dark:hover:bg-[#4e4f50] flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
          title="New Message"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Messenger..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-full outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
        </div>
      </div>

      {/* Conversation Stream */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-[#3e4042]/30">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-500">
            No conversations found.
          </div>
        ) : (
          filtered.map((conv) => {
            const otherMember = conv.members.find((m) => m.userId !== currentUserId)?.user;
            const displayName = conv.name || otherMember?.name || "Direct Message";
            const displayAvatar = conv.avatar || otherMember?.avatar;
            const lastMsg = conv.messages[0];
            const isSelected = pathname === `/messages/${conv.id}`;

            return (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className={`flex items-center gap-3 p-3 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors ${
                  isSelected ? "bg-blue-50/70 dark:bg-blue-950/30" : ""
                }`}
              >
                <UserAvatar
                  src={displayAvatar}
                  name={displayName}
                  size="lg"
                  isOnline={otherMember?.isOnline}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {displayName}
                    </h4>
                    {lastMsg && (
                      <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                        {formatFbTime(lastMsg.createdAt)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {lastMsg
                      ? `${lastMsg.senderId === currentUserId ? "You: " : ""}${lastMsg.content}`
                      : "Start a conversation"}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </aside>
  );
}
