"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThumbsUp, Trash2, CornerDownRight } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { formatFbTime } from "../../lib/utils";
import { createCommentAction, deleteCommentAction } from "../../lib/actions/comments";
import { toggleReactionAction } from "../../lib/actions/reactions";
import { CommentItemType } from "../../types";

interface CommentItemProps {
  comment: CommentItemType;
  postId: string;
  currentUserId: string;
  onDeleteComment?: (commentId: string) => void;
}

export function CommentItem({
  comment,
  postId,
  currentUserId,
  onDeleteComment,
}: CommentItemProps) {
  const [replies, setReplies] = useState<CommentItemType[]>(comment.replies || []);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.reactions?.length || 0);
  const [hasLiked, setHasLiked] = useState(
    comment.reactions?.some((r) => r.userId === currentUserId) || false
  );

  const isAuthor = comment.authorId === currentUserId;

  const handleToggleLike = async () => {
    const nextHasLiked = !hasLiked;
    setHasLiked(nextHasLiked);
    setLikesCount((prev) => (nextHasLiked ? prev + 1 : Math.max(0, prev - 1)));

    await toggleReactionAction({
      targetType: "comment",
      targetId: comment.id,
      reactionType: "LIKE",
    });
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsReplying(true);
    const res = await createCommentAction({
      postId,
      parentId: comment.id,
      content: replyText.trim(),
    });

    setIsReplying(false);
    if (res.success && res.comment) {
      setReplies((prev) => [...prev, res.comment as unknown as CommentItemType]);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this comment?")) {
      if (onDeleteComment) onDeleteComment(comment.id);
      await deleteCommentAction(comment.id);
    }
  };

  return (
    <div className="flex gap-2.5 text-xs group/item">
      <Link href={`/profile/${comment.author?.username}`}>
        <UserAvatar
          src={comment.author?.avatar}
          name={comment.author?.name}
          size="sm"
        />
      </Link>

      <div className="flex-1 min-w-0">
        {/* Comment Bubble */}
        <div className="inline-block relative bg-zinc-100 dark:bg-[#3a3b3c] rounded-2xl px-3.5 py-2 max-w-full">
          <Link
            href={`/profile/${comment.author?.username}`}
            className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline block leading-tight mb-0.5"
          >
            {comment.author?.name}
          </Link>
          <p className="text-zinc-800 dark:text-zinc-200 text-xs whitespace-pre-wrap break-words leading-relaxed">
            {comment.content}
          </p>

          {/* Comment Likes Badge */}
          {likesCount > 0 && (
            <div className="absolute -bottom-2 right-2 bg-white dark:bg-[#242526] rounded-full px-1.5 py-0.5 shadow-xs border border-zinc-200 dark:border-[#3e4042] flex items-center gap-1 text-[10px] text-zinc-600 dark:text-zinc-300">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 fill-current" />
              </span>
              <span className="font-semibold">{likesCount}</span>
            </div>
          )}
        </div>

        {/* Action Buttons below comment */}
        <div className="flex items-center gap-3 mt-1 ml-2 text-[11px] text-zinc-500 font-semibold select-none">
          <button
            onClick={handleToggleLike}
            className={`hover:underline ${
              hasLiked ? "text-[#1877F2] font-bold" : ""
            }`}
          >
            Like
          </button>
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="hover:underline"
          >
            Reply
          </button>
          <span>{formatFbTime(comment.createdAt)}</span>

          {isAuthor && (
            <button
              onClick={handleDelete}
              className="text-zinc-400 hover:text-red-500 transition-colors ml-1"
              title="Delete comment"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Reply Box */}
        {showReplyBox && (
          <form onSubmit={handleSendReply} className="flex gap-2 mt-2 ml-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${comment.author?.name}...`}
              className="flex-1 px-3 py-1.5 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-full outline-none focus:ring-1 focus:ring-[#1877F2]"
              autoFocus
            />
            <button
              type="submit"
              disabled={isReplying || !replyText.trim()}
              className="px-3 py-1 text-xs font-bold text-white bg-[#1877F2] rounded-full disabled:opacity-50"
            >
              Reply
            </button>
          </form>
        )}

        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="mt-2.5 pl-2 space-y-2 border-l-2 border-zinc-200 dark:border-[#3e4042]">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                currentUserId={currentUserId}
                onDeleteComment={(id) =>
                  setReplies((prev) => prev.filter((r) => r.id !== id))
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
