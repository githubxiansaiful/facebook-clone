"use client";

import React, { useState } from "react";
import { UsersRound, Globe, Lock, Plus, UserCheck } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { CreatePostCard } from "../feed/CreatePostCard";
import { PostCard } from "../feed/PostCard";
import { joinGroupAction, leaveGroupAction } from "../../lib/actions/groups";
import { PostItemType } from "../../types";
import Link from "next/link";

interface GroupDetailsViewProps {
  group: any;
  posts: PostItemType[];
  currentUser: any;
}

export function GroupDetailsView({ group, posts, currentUser }: GroupDetailsViewProps) {
  const [isMember, setIsMember] = useState(group.isMember);
  const [membersCount, setMembersCount] = useState(group._count.members);
  const [tab, setTab] = useState<"discussion" | "members" | "about">("discussion");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleJoin = async () => {
    setIsLoading(true);
    if (isMember) {
      setIsMember(false);
      setMembersCount((prev: number) => Math.max(1, prev - 1));
      await leaveGroupAction(group.id);
    } else {
      setIsMember(true);
      setMembersCount((prev: number) => prev + 1);
      await joinGroupAction(group.id);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Cover Banner */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] overflow-hidden">
        <div className="h-48 sm:h-64 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-800 overflow-hidden">
          {group.coverPhoto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={group.coverPhoto}
              alt={group.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-[#3e4042] pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {group.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                {group.privacy === "PUBLIC" ? (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Public group
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Private group
                  </span>
                )}
                <span>•</span>
                <span>{membersCount} members</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleJoin}
                disabled={isLoading}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                  isMember
                    ? "bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-zinc-900 dark:text-zinc-100"
                    : "bg-[#1877F2] hover:bg-blue-600 text-white"
                }`}
              >
                {isMember ? "Joined" : "+ Join Group"}
              </button>
            </div>
          </div>

          {/* Group Navigation Tabs */}
          <div className="flex gap-2 pt-2">
            {[
              { id: "discussion", label: "Discussion" },
              { id: "members", label: `Members (${group.members?.length || membersCount})` },
              { id: "about", label: "About" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
                  tab === t.id
                    ? "bg-blue-50 dark:bg-blue-950/50 text-[#1877F2]"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Discussion Tab */}
      {tab === "discussion" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 space-y-4">
            {isMember ? (
              <CreatePostCard currentUser={currentUser} groupId={group.id} />
            ) : (
              <div className="bg-white dark:bg-[#242526] rounded-xl p-4 text-center border border-zinc-200 dark:border-[#3e4042]">
                <p className="text-xs text-zinc-500">
                  Join this group to post and interact with other members.
                </p>
              </div>
            )}

            {posts.length === 0 ? (
              <div className="bg-white dark:bg-[#242526] rounded-xl p-8 text-center border border-zinc-200 dark:border-[#3e4042]">
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  No group posts yet
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Be the first to share something with the group!
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

          <div className="md:col-span-5 space-y-4">
            {/* About Card */}
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                About this group
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                {group.description || "No description provided."}
              </p>
              <div className="text-xs text-zinc-500 space-y-1.5 pt-2 border-t border-zinc-100 dark:border-[#3e4042]">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span>
                    <strong>{group.privacy === "PUBLIC" ? "Public" : "Private"}</strong> -{" "}
                    {group.privacy === "PUBLIC"
                      ? "Anyone can see who's in the group."
                      : "Only members can see group posts."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-zinc-400" />
                  <span>Created by {group.creator?.name || "Admin"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {tab === "members" && (
        <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            Group Members ({group.members?.length || 0})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.members?.map((m: any) => (
              <Link
                key={m.id}
                href={`/profile/${m.user?.username}`}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-[#3a3b3c] border border-zinc-100 dark:border-[#3e4042] transition-colors"
              >
                <UserAvatar
                  src={m.user?.avatar}
                  name={m.user?.name}
                  size="md"
                  isOnline={m.user?.isOnline}
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {m.user?.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 capitalize">{m.role.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* About Tab */}
      {tab === "about" && (
        <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-6 max-w-2xl">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            About {group.name}
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            {group.description || "A wonderful community to discuss and share experiences."}
          </p>
          <div className="space-y-2 text-xs text-zinc-500 pt-3 border-t border-zinc-100 dark:border-[#3e4042]">
            <p>Admin: {group.creator?.name}</p>
            <p>Total Posts: {group._count.posts}</p>
            <p>Total Members: {group._count.members}</p>
          </div>
        </div>
      )}
    </div>
  );
}
