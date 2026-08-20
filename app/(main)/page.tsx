import React from "react";
import { getCurrentUser } from "../../lib/auth";
import { getFeedPosts, getStories } from "../../lib/data";
import { StoriesRail } from "../../components/feed/StoriesRail";
import { CreatePostCard } from "../../components/feed/CreatePostCard";
import { PostCard } from "../../components/feed/PostCard";
import Link from "next/link";

interface HomePageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { filter } = await searchParams;
  const activeFilter = filter === "friends" ? "friends" : "all";

  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const [posts, stories] = await Promise.all([
    getFeedPosts(activeFilter),
    getStories(),
  ]);

  return (
    <div className="space-y-4">
      {/* 24h Stories Rail */}
      <StoriesRail stories={stories} currentUser={currentUser} />

      {/* Create Post Card */}
      <CreatePostCard currentUser={currentUser} />

      {/* Feed Filters */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] px-4 py-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Feeds
        </h2>
        <div className="flex gap-1 bg-zinc-100 dark:bg-[#3a3b3c] p-0.5 rounded-lg">
          <Link
            href="/"
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
              activeFilter === "all"
                ? "bg-white dark:bg-[#242526] text-[#1877F2] shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            All Posts
          </Link>
          <Link
            href="/?filter=friends"
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
              activeFilter === "friends"
                ? "bg-white dark:bg-[#242526] text-[#1877F2] shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Friends
          </Link>
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-[#242526] rounded-xl p-12 text-center border border-zinc-200 dark:border-[#3e4042]">
            <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
              No posts to show
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Be the first to share an update or connect with more friends!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
}
