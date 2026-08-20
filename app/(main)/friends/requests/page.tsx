import React from "react";
import Link from "next/link";
import { ArrowLeft, UserCheck } from "lucide-react";
import { getFriendsHubData } from "../../../../lib/data";
import { FriendRequestsList } from "../../../../components/friends/FriendRequestsList";

export default async function FriendRequestsPage() {
  const data = await getFriendsHubData();
  const requests = data?.requests || [];

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4 flex items-center gap-3">
        <Link
          href="/friends"
          className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Friend Requests
          </h1>
          <p className="text-xs text-zinc-500">
            {requests.length} pending request{requests.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <FriendRequestsList requests={requests} />
    </div>
  );
}
