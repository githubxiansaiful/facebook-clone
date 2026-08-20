"use client";

import React, { useState } from "react";
import { Send, Smile, Image as ImageIcon } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { CommentItem } from "./CommentItem";
import { createCommentAction } from "../../lib/actions/comments";
import { CommentItemType } from "../../types";

interface CommentSectionProps {
  postId: string;
  initialComments: CommentItemType[];
  currentUser: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export function CommentSection({
  postId,
  initialComments,
  currentUser,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItemType[]>(initialComments);
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const content = inputText.trim();
    setInputText("");

    // Optimistic temporary comment
    const tempComment: CommentItemType = {
      id: "temp-" + Date.now(),
      postId,
      authorId: currentUser.id,
      parentId: null,
      content,
      image: null,
      createdAt: new Date(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: "",
        avatar: currentUser.avatar,
      },
      reactions: [],
      replies: [],
    };

    setComments((prev) => [...prev, tempComment]);

    const res = await createCommentAction({
      postId,
      content,
    });

    if (res.success && res.comment) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === tempComment.id
            ? (res.comment as unknown as CommentItemType)
            : c
        )
      );
    }
  };

  return (
    <div className="pt-3 border-t border-zinc-100 dark:border-[#3e4042]/60">
      {/* Comment List */}
      <div className="space-y-3 mb-3 max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            currentUserId={currentUser.id}
            onDeleteComment={(id) =>
              setComments((prev) => prev.filter((c) => c.id !== id))
            }
          />
        ))}
      </div>

      {/* Write a comment input box */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <UserAvatar src={currentUser.avatar} name={currentUser.name} size="sm" />
        <div className="flex-1 relative flex items-center bg-zinc-100 dark:bg-[#3a3b3c] rounded-full px-3 py-1.5 focus-within:ring-1 focus-within:ring-[#1877F2]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none pr-8"
          />
          {inputText.trim() ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 p-1 text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-2.5 text-zinc-400">
              <Smile className="w-4 h-4" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
