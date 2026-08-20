"use client";

import React from "react";
import Link from "next/link";
import { UserAvatar } from "../ui/UserAvatar";

interface ProfileFriendsProps {
  friends: any[];
}

export function ProfileFriends({ friends }: ProfileFriendsProps) {
  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Friends
          </h3>
          <p className="text-xs text-zinc-500">{friends.length} friends</p>
        </div>
      </div>

      {friends.length === 0 ? (
        <div className="p-8 text-center text-xs text-zinc-500">
          No friends to display yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {friends.map((friend) => (
            <Link
              key={friend.id}
              href={`/profile/${friend.username}`}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors border border-zinc-100 dark:border-[#3e4042]"
            >
              <UserAvatar
                src={friend.avatar}
                name={friend.name}
                size="md"
                isOnline={friend.isOnline}
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {friend.name}
                </h4>
                <p className="text-[11px] text-zinc-500 truncate">@{friend.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
