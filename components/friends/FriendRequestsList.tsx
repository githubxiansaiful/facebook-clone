"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserAvatar } from "../ui/UserAvatar";
import { formatFbTime } from "../../lib/utils";
import { acceptFriendRequestAction, declineFriendRequestAction } from "../../lib/actions/friends";

interface FriendRequestsListProps {
  requests: {
    id: string;
    sender: any;
    createdAt: any;
  }[];
}

export function FriendRequestsList({ requests: initialRequests }: FriendRequestsListProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAccept = async (requestId: string) => {
    setLoadingId(requestId);
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    await acceptFriendRequestAction(requestId);
    setLoadingId(null);
  };

  const handleDecline = async (requestId: string) => {
    setLoadingId(requestId);
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    await declineFriendRequestAction(requestId);
    setLoadingId(null);
  };

  if (requests.length === 0) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl p-8 text-center border border-zinc-200 dark:border-[#3e4042]">
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          No pending friend requests.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {requests.map(({ id, sender, createdAt }) => (
        <div
          key={id}
          className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] overflow-hidden flex flex-col"
        >
          <div className="h-44 bg-zinc-100 dark:bg-[#18191a] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                sender.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              }
              alt={sender.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-3 flex-1 flex flex-col justify-between">
            <div>
              <Link
                href={`/profile/${sender.username}`}
                className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:underline block truncate"
              >
                {sender.name}
              </Link>
              <p className="text-[11px] text-zinc-500 truncate">{sender.headline || `@${sender.username}`}</p>
              <p className="text-[10px] text-[#1877F2] font-semibold mt-0.5">
                {formatFbTime(createdAt)}
              </p>
            </div>

            <div className="space-y-1.5 mt-3">
              <button
                onClick={() => handleAccept(id)}
                disabled={loadingId === id}
                className="w-full py-1.5 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
              >
                Confirm
              </button>
              <button
                onClick={() => handleDecline(id)}
                disabled={loadingId === id}
                className="w-full py-1.5 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200 dark:hover:bg-[#4e4f50] text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
