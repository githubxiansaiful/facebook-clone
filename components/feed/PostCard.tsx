"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Bookmark,
  Trash2,
  Share2,
  MessageCircle,
  ThumbsUp,
  Globe,
  Users,
  Lock,
  Check,
  ExternalLink,
  UsersRound,
} from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { FbMoreDotsIcon } from "../ui/FacebookIcons";
import { ReactionPicker } from "./ReactionPicker";
import { PostMediaGrid } from "./PostMediaGrid";
import { CommentSection } from "./CommentSection";
import { formatFbTime, REACTIONS, ReactionType, BG_THEMES } from "../../lib/utils";
import { toggleReactionAction } from "../../lib/actions/reactions";
import { deletePostAction, toggleSavePostAction } from "../../lib/actions/posts";
import { PostItemType } from "../../types";

interface PostCardProps {
  post: PostItemType;
  currentUser: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(
    post.userReaction || null
  );
  const [reactionsList, setReactionsList] = useState(post.reactions || []);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [showComments, setShowComments] = useState(post.comments?.length > 0);
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (isDeleted) return null;

  const isAuthor = post.authorId === currentUser.id;

  // Calculate top 3 unique reactions for summary
  const reactionCountsByType: Partial<Record<ReactionType, number>> = {};
  reactionsList.forEach((r) => {
    reactionCountsByType[r.type] = (reactionCountsByType[r.type] || 0) + 1;
  });

  const sortedReactionTypes = (Object.keys(reactionCountsByType) as ReactionType[]).sort(
    (a, b) => (reactionCountsByType[b] || 0) - (reactionCountsByType[a] || 0)
  );

  const totalReactions = reactionsList.length;

  const handleSelectReaction = async (type: ReactionType) => {
    setShowReactionPicker(false);

    if (userReaction === type) {
      // Remove reaction
      setUserReaction(null);
      setReactionsList((prev) => prev.filter((r) => r.userId !== currentUser.id));
      await toggleReactionAction({
        targetType: "post",
        targetId: post.id,
        reactionType: type,
      });
    } else {
      // Set new reaction
      setUserReaction(type);
      setReactionsList((prev) => {
        const filtered = prev.filter((r) => r.userId !== currentUser.id);
        return [
          ...filtered,
          {
            id: "temp-" + Date.now(),
            type,
            userId: currentUser.id,
            user: {
              id: currentUser.id,
              name: currentUser.name,
              username: "",
              avatar: currentUser.avatar,
            },
          },
        ];
      });

      await toggleReactionAction({
        targetType: "post",
        targetId: post.id,
        reactionType: type,
      });
    }
  };

  const handleQuickLike = () => {
    if (userReaction) {
      handleSelectReaction(userReaction);
    } else {
      handleSelectReaction("LIKE");
    }
  };

  const handleToggleSave = async () => {
    setIsSaved(!isSaved);
    setShowMenu(false);
    await toggleSavePostAction(post.id);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      setIsDeleted(true);
      await deletePostAction(post.id);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
      setShowMenu(false);
    }, 1500);
  };

  const bgThemeObj = post.bgTheme
    ? BG_THEMES.find((t) => t.id === post.bgTheme)
    : null;

  const currentReactionConfig = userReaction ? REACTIONS[userReaction] : null;

  return (
    <article
      id={`post-${post.id}`}
      className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] mb-4 overflow-hidden transition-colors"
    >
      {/* Header */}
      <div className="p-3 sm:p-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <UserAvatar
              src={post.author.avatar}
              name={post.author.name}
              size="md"
              isOnline={post.author.isOnline}
            />
          </Link>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/profile/${post.author.username}`}
                className="text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:underline"
              >
                {post.author.name}
              </Link>

              {post.group && (
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <span>▶</span>
                  <Link
                    href={`/groups/${post.group.slug || post.group.id}`}
                    className="font-bold text-zinc-800 dark:text-zinc-200 hover:underline flex items-center gap-1"
                  >
                    <UsersRound className="w-3 h-3 text-[#1877F2]" />
                    {post.group.name}
                  </Link>
                </span>
              )}

              {post.feeling && (
                <span className="text-xs text-zinc-500">is {post.feeling}</span>
              )}

              {post.location && (
                <span className="text-xs text-zinc-500">
                  in <span className="font-semibold text-zinc-700 dark:text-zinc-300">{post.location}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              <span>{formatFbTime(post.createdAt)}</span>
              <span>•</span>
              {post.privacy === "PUBLIC" ? (
                <span title="Public"><Globe className="w-3.5 h-3.5" /></span>
              ) : post.privacy === "FRIENDS" ? (
                <span title="Friends"><Users className="w-3.5 h-3.5" /></span>
              ) : (
                <span title="Only me"><Lock className="w-3.5 h-3.5" /></span>
              )}
            </div>
          </div>
        </div>

        {/* 3-dot dropdown menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"
            aria-label="Post options"
          >
            <FbMoreDotsIcon size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden z-30 p-1.5 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={handleToggleSave}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors text-left"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-purple-600 text-purple-600" : ""}`} />
                <span>{isSaved ? "Unsave post" : "Save post"}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors text-left"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <ExternalLink className="w-4 h-4" />}
                <span>{copiedLink ? "Link copied!" : "Copy link"}</span>
              </button>

              {isAuthor && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors text-left"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Text Content */}
      {post.content && (
        <div className="px-3 sm:px-4 pb-2">
          {bgThemeObj && (!post.images || post.images.length === 0) ? (
            <div className={`rounded-xl ${bgThemeObj.class}`}>
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>
          ) : (
            <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </p>
          )}
        </div>
      )}

      {/* Images Media Grid */}
      {post.images && post.images.length > 0 && (
        <PostMediaGrid images={post.images} />
      )}

      {/* Reaction & Comments Metrics Bar */}
      {(totalReactions > 0 || (post.comments && post.comments.length > 0)) && (
        <div className="px-4 py-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-[#3e4042]/50 select-none">
          {/* Reaction badges */}
          <div className="flex items-center gap-1.5">
            {totalReactions > 0 && (
              <>
                <div className="flex items-center -space-x-1">
                  {sortedReactionTypes.slice(0, 3).map((rType) => (
                    <span
                      key={rType}
                      className="inline-flex items-center justify-center text-sm ring-2 ring-white dark:ring-[#242526] rounded-full"
                    >
                      {REACTIONS[rType]?.emoji || "👍"}
                    </span>
                  ))}
                </div>
                <span className="font-medium hover:underline cursor-pointer">
                  {userReaction
                    ? totalReactions === 1
                      ? "You"
                      : `You and ${totalReactions - 1} other${totalReactions > 2 ? "s" : ""}`
                    : totalReactions}
                </span>
              </>
            )}
          </div>

          {/* Comments & Shares count */}
          <div className="flex items-center gap-3">
            {post.comments && post.comments.length > 0 && (
              <button
                onClick={() => setShowComments(true)}
                className="hover:underline"
              >
                {post.comments.length} comment{post.comments.length > 1 ? "s" : ""}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons Bar */}
      <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-zinc-600 dark:text-zinc-300 border-t border-zinc-100 dark:border-[#3e4042] select-none">
        {/* Like Button with Reaction Picker */}
        <div
          className="relative flex-1"
          onMouseEnter={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setShowReactionPicker(true);
            }, 300);
          }}
          onMouseLeave={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            setShowReactionPicker(false);
          }}
        >
          {showReactionPicker && (
            <ReactionPicker
              onSelect={handleSelectReaction}
              onClose={() => setShowReactionPicker(false)}
            />
          )}

          <button
            onClick={handleQuickLike}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors ${
              currentReactionConfig ? currentReactionConfig.textColor : ""
            }`}
          >
            {currentReactionConfig ? (
              <span className="text-lg animate-bounce-slow">
                {currentReactionConfig.emoji}
              </span>
            ) : (
              <ThumbsUp className="w-4 h-4" />
            )}
            <span>{currentReactionConfig?.label || "Like"}</span>
          </button>
        </div>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comment</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>{copiedLink ? "Copied!" : "Share"}</span>
        </button>
      </div>

      {/* Expanded Comments Section */}
      {showComments && (
        <div className="px-3 sm:px-4 pb-3">
          <CommentSection
            postId={post.id}
            initialComments={post.comments || []}
            currentUser={currentUser}
          />
        </div>
      )}
    </article>
  );
}
