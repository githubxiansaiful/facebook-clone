"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserPlus, Check } from "lucide-react";
import { sendFriendRequestAction } from "../../lib/actions/friends";

interface FriendSuggestionsListProps {
  suggestions: any[];
}

export function FriendSuggestionsList({ suggestions }: FriendSuggestionsListProps) {
  const [sentIds, setSentIds] = useState<string[]>([]);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const handleAddFriend = async (userId: string) => {
    setSentIds((prev) => [...prev, userId]);
    await sendFriendRequestAction(userId);
  };

  const handleRemoveSuggestion = (userId: string) => {
    setRemovedIds((prev) => [...prev, userId]);
  };

  const visibleSuggestions = suggestions.filter((s) => !removedIds.includes(s.id));

  if (visibleSuggestions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl p-8 text-center border border-zinc-200 dark:border-[#3e4042]">
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          No new suggestions at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {visibleSuggestions.map((user) => {
        const isSent = sentIds.includes(user.id);

        return (
          <div
            key={user.id}
            className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] overflow-hidden flex flex-col"
          >
            <div className="h-44 bg-zinc-100 dark:bg-[#18191a] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                }
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <Link
                  href={`/profile/${user.username}`}
                  className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:underline block truncate"
                >
                  {user.name}
                </Link>
                <p className="text-[11px] text-zinc-500 truncate">
                  {user.headline || `@${user.username}`}
                </p>
              </div>

              <div className="space-y-1.5 mt-3">
                {isSent ? (
                  <button
                    disabled
                    className="w-full py-1.5 bg-zinc-200 dark:bg-[#3a3b3c] text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-default"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Request Sent</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAddFriend(user.id)}
                      className="w-full py-1.5 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add friend</span>
                    </button>
                    <button
                      onClick={() => handleRemoveSuggestion(user.id)}
                      className="w-full py-1.5 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200 dark:hover:bg-[#4e4f50] text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-bold transition-colors"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
