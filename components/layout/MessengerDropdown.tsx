"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Edit } from "lucide-react";
import { FbMessengerIcon } from "../ui/FacebookIcons";
import Link from "next/link";
import { UserAvatar } from "../ui/UserAvatar";
import { formatFbTime } from "../../lib/utils";
import { ConversationItemType } from "../../types";

interface MessengerDropdownProps {
  initialConversations: ConversationItemType[];
  currentUserId?: string;
}

export function MessengerDropdown({
  initialConversations,
  currentUserId,
}: MessengerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-zinc-200/80 dark:bg-[#3a3b3c] hover:bg-zinc-300 dark:hover:bg-[#4e4f50] flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
        aria-label="Messenger"
      >
        <FbMessengerIcon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[360px] sm:w-[380px] bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-4 border-b border-zinc-100 dark:border-[#3e4042]/50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Chats</h3>
            <Link
              href="/messages"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-zinc-100 dark:divide-[#3e4042]/40">
            {initialConversations.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                No chats yet. Start a conversation!
              </div>
            ) : (
              initialConversations.map((conv) => {
                const otherMember = conv.members.find((m) => m.userId !== currentUserId)?.user;
                const lastMessage = conv.messages[0];
                const displayName = conv.name || otherMember?.name || "Direct Message";
                const displayAvatar = conv.avatar || otherMember?.avatar;

                return (
                  <Link
                    key={conv.id}
                    href={`/messages/${conv.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-[#3a3b3c] transition-colors"
                  >
                    <UserAvatar
                      src={displayAvatar}
                      name={displayName}
                      size="md"
                      isOnline={otherMember?.isOnline}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1">
                        {lastMessage ? (
                          <>
                            <span className="truncate">
                              {lastMessage.senderId === currentUserId ? "You: " : ""}
                              {lastMessage.content}
                            </span>
                            <span>•</span>
                            <span>{formatFbTime(lastMessage.createdAt)}</span>
                          </>
                        ) : (
                          "Start chatting"
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <div className="p-2 border-t border-zinc-100 dark:border-[#3e4042] text-center">
            <Link
              href="/messages"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[#1877F2] hover:underline"
            >
              See all in Messenger
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
