"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MoreHorizontal, UserX, MessageCircle } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { removeFriendAction } from "../../lib/actions/friends";
import { getOrCreateDirectConversationAction } from "../../lib/actions/messages";
import { useRouter } from "next/navigation";

interface AllFriendsListProps {
  friends: any[];
}

export function AllFriendsList({ friends: initialFriends }: AllFriendsListProps) {
  const [friends, setFriends] = useState(initialFriends);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleUnfriend = async (userId: string, name: string) => {
    if (confirm(`Remove ${name} from your friends?`)) {
      setFriends((prev) => prev.filter((f) => f.id !== userId));
      await removeFriendAction(userId);
    }
  };

  const handleMessage = async (userId: string) => {
    const res = await getOrCreateDirectConversationAction(userId);
    if (res.success && res.conversationId) {
      router.push(`/messages/${res.conversationId}`);
    }
  };

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            All Friends
          </h3>
          <p className="text-xs text-zinc-500">{friends.length} total friends</p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Friends"
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-full outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center text-xs text-zinc-500">
          No friends matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-[#3a3b3c] border border-zinc-100 dark:border-[#3e4042] transition-colors"
            >
              <Link
                href={`/profile/${friend.username}`}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <UserAvatar
                  src={friend.avatar}
                  name={friend.name}
                  size="lg"
                  isOnline={friend.isOnline}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate hover:underline">
                    {friend.name}
                  </h4>
                  <p className="text-xs text-zinc-500 truncate">
                    {friend.headline || `@${friend.username}`}
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleMessage(friend.id)}
                  className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-[#4e4f50] text-[#1877F2] transition-colors"
                  title="Message"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleUnfriend(friend.id, friend.name)}
                  className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 transition-colors"
                  title="Unfriend"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
