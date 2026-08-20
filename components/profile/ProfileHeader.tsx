"use client";

import React, { useState } from "react";
import {
  Camera,
  Edit,
  UserPlus,
  UserCheck,
  UserX,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Home,
  MapPin,
  Heart,
  Globe,
  Plus,
} from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { EditProfileModal } from "./EditProfileModal";
import {
  sendFriendRequestAction,
  acceptFriendRequestAction,
  removeFriendAction,
} from "../../lib/actions/friends";
import { getOrCreateDirectConversationAction } from "../../lib/actions/messages";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  user: any;
  currentUserId: string;
}

export function ProfileHeader({ user, currentUserId }: ProfileHeaderProps) {
  const [friendshipStatus, setFriendshipStatus] = useState<string>(
    user.friendshipStatus
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isSelf = user.id === currentUserId;

  const handleAddFriend = async () => {
    setIsLoading(true);
    setFriendshipStatus("SENT");
    await sendFriendRequestAction(user.id);
    setIsLoading(false);
  };

  const handleUnfriend = async () => {
    if (confirm(`Remove ${user.name} from your friends?`)) {
      setIsLoading(true);
      setFriendshipStatus("NONE");
      await removeFriendAction(user.id);
      setIsLoading(false);
    }
  };

  const handleMessage = async () => {
    setIsLoading(true);
    const res = await getOrCreateDirectConversationAction(user.id);
    setIsLoading(false);
    if (res.success && res.conversationId) {
      router.push(`/messages/${res.conversationId}`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#242526] shadow-xs border-b border-zinc-200 dark:border-[#3e4042] mb-4">
      {/* Cover Photo */}
      <div className="relative h-48 sm:h-72 md:h-88 max-w-6xl mx-auto bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-800 rounded-b-xl overflow-hidden">
        {user.coverPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        {isSelf && (
          <button
            onClick={() => setIsEditOpen(true)}
            className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 dark:bg-black/70 hover:bg-white text-zinc-900 dark:text-zinc-100 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Edit cover photo</span>
          </button>
        )}
      </div>

      {/* Profile Info Bar */}
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 md:-mt-8 gap-4 border-b border-zinc-200 dark:border-[#3e4042] pb-4">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
            <div className="relative">
              <UserAvatar
                src={user.avatar}
                name={user.name}
                size="2xl"
                className="ring-4 ring-white dark:ring-[#242526] shadow-lg"
              />
              {isSelf && (
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute bottom-1 right-1 p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] text-zinc-800 dark:text-zinc-200 shadow-md transition-colors"
                  title="Update profile picture"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mb-2">
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                {user.name}
              </h1>
              {user.headline && (
                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                  {user.headline}
                </p>
              )}
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-xs text-zinc-500 font-semibold">
                <span>{user.friendsCount} friends</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isSelf ? (
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200 dark:hover:bg-[#4e4f50] text-zinc-900 dark:text-zinc-100 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit profile</span>
              </button>
            ) : (
              <>
                {friendshipStatus === "FRIENDS" && (
                  <button
                    onClick={handleUnfriend}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-zinc-900 dark:text-zinc-100 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-[#1877F2]" />
                    <span>Friends</span>
                  </button>
                )}

                {friendshipStatus === "SENT" && (
                  <button
                    onClick={handleUnfriend}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-700 dark:text-zinc-300 rounded-lg text-xs sm:text-sm font-bold shadow-xs"
                  >
                    <UserX className="w-4 h-4" />
                    <span>Cancel Request</span>
                  </button>
                )}

                {friendshipStatus === "NONE" && (
                  <button
                    onClick={handleAddFriend}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add friend</span>
                  </button>
                )}

                <button
                  onClick={handleMessage}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200 dark:hover:bg-[#4e4f50] text-zinc-900 dark:text-zinc-100 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
      />
    </div>
  );
}
