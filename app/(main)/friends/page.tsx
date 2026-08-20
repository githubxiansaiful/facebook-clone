import React from "react";
import Link from "next/link";
import { UserPlus, Users, ArrowRight } from "lucide-react";
import { getFriendsHubData } from "../../../lib/data";
import { FriendRequestsList } from "../../../components/friends/FriendRequestsList";
import { FriendSuggestionsList } from "../../../components/friends/FriendSuggestionsList";
import { AllFriendsList } from "../../../components/friends/AllFriendsList";

export default async function FriendsPage() {
  const data = await getFriendsHubData();
  if (!data) return null;

  const { requests, friends, suggestions } = data;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1877F2]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Friends Hub
            </h1>
            <p className="text-xs text-zinc-500">
              Manage requests, connect with people you may know, and explore friends.
            </p>
          </div>
        </div>

        {requests.length > 0 && (
          <Link
            href="/friends/requests"
            className="px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-[#1877F2] rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1"
          >
            <span>{requests.length} Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Friend Requests Section (if any) */}
      {requests.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Friend Requests ({requests.length})
            </h2>
            <Link
              href="/friends/requests"
              className="text-xs font-semibold text-[#1877F2] hover:underline"
            >
              See all
            </Link>
          </div>
          <FriendRequestsList requests={requests} />
        </section>
      )}

      {/* People You May Know / Suggestions */}
      {suggestions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-500" /> People You May Know
            </h2>
          </div>
          <FriendSuggestionsList suggestions={suggestions} />
        </section>
      )}

      {/* All Current Friends */}
      <section>
        <AllFriendsList friends={friends} />
      </section>
    </div>
  );
}
