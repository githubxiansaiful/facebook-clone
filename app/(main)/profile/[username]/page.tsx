import React from "react";
import { notFound } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth";
import { getUserProfile, getFeedPosts } from "../../../../lib/data";
import { ProfileHeader } from "../../../../components/profile/ProfileHeader";
import { ProfileAbout } from "../../../../components/profile/ProfileAbout";
import { ProfileFriends } from "../../../../components/profile/ProfileFriends";
import { ProfilePhotos } from "../../../../components/profile/ProfilePhotos";
import { CreatePostCard } from "../../../../components/feed/CreatePostCard";
import { PostCard } from "../../../../components/feed/PostCard";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { username } = await params;
  const { tab = "posts" } = await searchParams;

  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const userProfile = await getUserProfile(username);
  if (!userProfile) {
    notFound();
  }

  // Get this user's posts
  const allPosts = await getFeedPosts("all");
  const userPosts = allPosts.filter((p) => p.authorId === userProfile.id);

  const isSelf = currentUser.id === userProfile.id;

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "about", label: "About" },
    { id: "friends", label: `Friends (${userProfile.friendsCount})` },
    { id: "photos", label: `Photos (${userProfile.photos.length})` },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Profile Header Card with cover & avatar */}
      <ProfileHeader user={userProfile} currentUserId={currentUser.id} />

      {/* Navigation Tabs Bar */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] px-4 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/profile/${username}?tab=${t.id}`}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              tab === t.id
                ? "border-[#1877F2] text-[#1877F2]"
                : "border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c]"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Tab Contents */}
      {tab === "posts" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Intro / About Widget */}
          <div className="md:col-span-5 space-y-4">
            <ProfileAbout user={userProfile} />
            <ProfilePhotos photos={userProfile.photos} />
            <ProfileFriends friends={userProfile.friendsPreview} />
          </div>

          {/* Right Posts Stream */}
          <div className="md:col-span-7 space-y-4">
            {isSelf && <CreatePostCard currentUser={currentUser} />}

            {userPosts.length === 0 ? (
              <div className="bg-white dark:bg-[#242526] rounded-xl p-8 text-center border border-zinc-200 dark:border-[#3e4042]">
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  No posts yet
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  {isSelf
                    ? "Share your first post to let people know what's new."
                    : `${userProfile.name} hasn't posted anything yet.`}
                </p>
              </div>
            ) : (
              userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                />
              ))
            )}
          </div>
        </div>
      )}

      {tab === "about" && <ProfileAbout user={userProfile} />}

      {tab === "friends" && (
        <ProfileFriends friends={userProfile.allFriends || []} />
      )}

      {tab === "photos" && <ProfilePhotos photos={userProfile.photos} />}
    </div>
  );
}
