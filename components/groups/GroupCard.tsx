"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UsersRound, Lock, Globe } from "lucide-react";
import { joinGroupAction, leaveGroupAction } from "../../lib/actions/groups";
import { GroupItemType } from "../../types";

interface GroupCardProps {
  group: GroupItemType;
}

export function GroupCard({ group }: GroupCardProps) {
  const [isMember, setIsMember] = useState(group.isMember || false);
  const [membersCount, setMembersCount] = useState(group._count?.members || 1);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleJoin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isMember) {
      setIsMember(false);
      setMembersCount((prev) => Math.max(1, prev - 1));
      await leaveGroupAction(group.id);
    } else {
      setIsMember(true);
      setMembersCount((prev) => prev + 1);
      await joinGroupAction(group.id);
    }
    setIsLoading(false);
  };

  return (
    <Link
      href={`/groups/${group.slug || group.id}`}
      className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] overflow-hidden flex flex-col hover:shadow-md transition-all group"
    >
      <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden relative">
        {group.coverPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={group.coverPhoto}
            alt={group.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#1877F2] transition-colors line-clamp-1">
            {group.name}
          </h3>

          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
            {group.privacy === "PUBLIC" ? (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Public Group
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Private Group
              </span>
            )}
            <span>•</span>
            <span>{membersCount} members</span>
          </div>

          {group.description && (
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 line-clamp-2">
              {group.description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#3e4042]">
          <button
            onClick={handleToggleJoin}
            disabled={isLoading}
            className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isMember
                ? "bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-zinc-800 dark:text-zinc-200"
                : "bg-[#1877F2] hover:bg-blue-600 text-white"
            }`}
          >
            {isMember ? "Joined" : "Join Group"}
          </button>
        </div>
      </div>
    </Link>
  );
}
