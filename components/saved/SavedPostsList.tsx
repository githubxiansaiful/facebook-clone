"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { formatFbTime } from "../../lib/utils";
import { toggleSavePostAction } from "../../lib/actions/posts";

interface SavedPostsListProps {
  posts: any[];
}

export function SavedPostsList({ posts: initialPosts }: SavedPostsListProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleUnsave = async (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    await toggleSavePostAction(postId);
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-[#242526] rounded-xl p-12 text-center border border-zinc-200 dark:border-[#3e4042]">
        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mx-auto mb-3">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          No saved items
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
          Save posts and videos to easily view them later from your personal collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <UserAvatar
              src={post.author?.avatar}
              name={post.author?.name}
              size="md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-xs">
                <Link
                  href={`/profile/${post.author?.username}`}
                  className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline"
                >
                  {post.author?.name}
                </Link>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500">{formatFbTime(post.createdAt)}</span>
              </div>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 mt-1 line-clamp-2">
                {post.content || "Attached photo/media"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <Link
              href={`/#post-${post.id}`}
              className="px-3 py-1.5 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Post</span>
            </Link>
            <button
              onClick={() => handleUnsave(post.id)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] text-zinc-500 hover:text-red-500 transition-colors"
              title="Remove from saved"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
