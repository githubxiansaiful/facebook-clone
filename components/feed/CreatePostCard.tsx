"use client";

import React, { useState } from "react";
import { Video, Image as ImageIcon, Smile } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { CreatePostModal } from "./CreatePostModal";

interface CreatePostCardProps {
  currentUser: {
    id: string;
    name: string;
    avatar: string | null;
  };
  groupId?: string | null;
}

export function CreatePostCard({ currentUser, groupId }: CreatePostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-3 sm:p-4 mb-4 select-none">
        {/* Top Input Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 pb-3 border-b border-zinc-100 dark:border-[#3e4042]">
          <UserAvatar src={currentUser.avatar} name={currentUser.name} size="md" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 text-left px-4 py-2.5 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200/80 dark:hover:bg-[#4e4f50] text-zinc-500 dark:text-zinc-400 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            What&apos;s on your mind, {currentUser.name.split(" ")[0]}?
          </button>
        </div>

        {/* Bottom Quick Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-600 dark:text-zinc-300"
          >
            <Video className="w-5 h-5 text-rose-500" />
            <span className="hidden sm:inline">Live video</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-600 dark:text-zinc-300"
          >
            <ImageIcon className="w-5 h-5 text-emerald-500" />
            <span>Photo/video</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-600 dark:text-zinc-300"
          >
            <Smile className="w-5 h-5 text-amber-500" />
            <span>Feeling/activity</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
        groupId={groupId}
      />
    </>
  );
}
