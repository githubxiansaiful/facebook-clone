"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, UsersRound, FileText } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { PostCard } from "../feed/PostCard";
import { GroupCard } from "../groups/GroupCard";

interface SearchResultsViewProps {
  query: string;
  users: any[];
  groups: any[];
  posts: any[];
  currentUser: any;
}

export function SearchResultsView({
  query,
  users,
  groups,
  posts,
  currentUser,
}: SearchResultsViewProps) {
  const [tab, setTab] = useState<"all" | "people" | "groups" | "posts">("all");

  const totalResults = users.length + groups.length + posts.length;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Search Header & Filter Tabs */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-5 h-5 text-[#1877F2]" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Results for &quot;{query}&quot;
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: "all", label: `All (${totalResults})` },
            { id: "people", label: `People (${users.length})` },
            { id: "groups", label: `Groups (${groups.length})` },
            { id: "posts", label: `Posts (${posts.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 ${
                tab === t.id
                  ? "bg-[#1877F2] text-white"
                  : "bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {totalResults === 0 ? (
        <div className="bg-white dark:bg-[#242526] rounded-xl p-12 text-center border border-zinc-200 dark:border-[#3e4042]">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No results found
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            We couldn&apos;t find anything matching &quot;{query}&quot;. Try different keywords.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* People Section */}
          {(tab === "all" || tab === "people") && users.length > 0 && (
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#1877F2]" /> People
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {users.map((u) => (
                  <Link
                    key={u.id}
                    href={`/profile/${u.username}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-[#3a3b3c] border border-zinc-100 dark:border-[#3e4042] transition-colors"
                  >
                    <UserAvatar
                      src={u.avatar}
                      name={u.name}
                      size="lg"
                      isOnline={u.isOnline}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {u.name}
                      </h4>
                      <p className="text-xs text-zinc-500 truncate">
                        {u.headline || `@${u.username}`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Groups Section */}
          {(tab === "all" || tab === "groups") && groups.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2 px-1">
                <UsersRound className="w-4 h-4 text-blue-500" /> Groups
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {groups.map((g) => (
                  <GroupCard key={g.id} group={g} />
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {(tab === "all" || tab === "posts") && posts.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2 px-1">
                <FileText className="w-4 h-4 text-emerald-500" /> Posts
              </h3>
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
