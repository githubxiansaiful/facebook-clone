"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { Modal } from "../ui/Modal";
import { createStoryAction } from "../../lib/actions/stories";
import { StoryItemType } from "../../types";
import { FbPlusIcon } from "../ui/FacebookIcons";

interface StoriesRailProps {
  stories: StoryItemType[];
  currentUser: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
  };
}

export function StoriesRail({ stories, currentUser }: StoriesRailProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [storyType, setStoryType] = useState<"TEXT" | "IMAGE">("TEXT");
  const [textContent, setTextContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [bgGradient, setBgGradient] = useState("from-blue-600 via-indigo-600 to-purple-600");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gradients = [
    "from-blue-600 via-indigo-600 to-purple-600",
    "from-pink-500 via-rose-500 to-amber-500",
    "from-emerald-600 via-teal-600 to-cyan-500",
    "from-purple-800 via-violet-700 to-indigo-900",
    "from-amber-600 via-orange-600 to-red-600",
  ];

  // Auto advance story
  useEffect(() => {
    if (activeStoryIndex === null) {
      setProgress(0);
      return;
    }

    const interval = 50; // ms
    const duration = 5000; // 5s per story
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex((curr) => (curr !== null ? curr + 1 : null));
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStoryIndex, stories.length]);

  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await createStoryAction({
      mediaType: storyType,
      mediaUrl: storyType === "IMAGE" ? mediaUrl : null,
      textContent: storyType === "TEXT" ? textContent : null,
      bgGradient: storyType === "TEXT" ? bgGradient : null,
    });

    setIsSubmitting(false);
    setIsCreateOpen(false);
    setTextContent("");
    setMediaUrl("");
  };

  const currentStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  return (
    <div className="mb-4 select-none">
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {/* Create Story Card */}
        <div
          onClick={() => setIsCreateOpen(true)}
          className="relative w-28 sm:w-32 h-48 sm:h-52 rounded-xl bg-white dark:bg-[#242526] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden group shrink-0 border border-zinc-200 dark:border-[#3e4042] flex flex-col"
        >
          <div className="h-3/4 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                currentUser.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              }
              alt={currentUser.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="relative flex-1 flex flex-col items-center justify-end pb-2 pt-3 px-1 text-center bg-white dark:bg-[#242526]">
            <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center border-4 border-white dark:border-[#242526] shadow-sm group-hover:scale-110 transition-transform">
              <FbPlusIcon size={16} fill="white" />
            </div>
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Create story
            </span>
          </div>
        </div>

        {/* Existing Stories */}
        {stories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => {
              setActiveStoryIndex(index);
              setProgress(0);
            }}
            className="relative w-28 sm:w-32 h-48 sm:h-52 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden group shrink-0 border border-zinc-200 dark:border-[#3e4042]"
          >
            {story.mediaType === "IMAGE" && story.mediaUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={story.mediaUrl}
                alt="Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${
                  story.bgGradient || "from-blue-600 to-purple-600"
                } p-3 flex items-center justify-center text-center text-white text-xs font-bold leading-snug`}
              >
                {story.textContent}
              </div>
            )}

            {/* Gradient Overlay for visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

            {/* Author Avatar with Blue Ring */}
            <div className="absolute top-3 left-3 ring-4 ring-[#1877F2] rounded-full">
              <UserAvatar
                src={story.user?.avatar}
                name={story.user?.name}
                size="sm"
              />
            </div>

            {/* Author Name */}
            <div className="absolute bottom-2.5 inset-x-2 text-white text-xs font-bold truncate drop-shadow-md">
              {story.user?.name}
            </div>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {currentStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-150 select-none">
          {/* Close button */}
          <button
            onClick={() => setActiveStoryIndex(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Right Nav buttons */}
          {activeStoryIndex! > 0 && (
            <button
              onClick={() => {
                setActiveStoryIndex((curr) => (curr !== null ? curr - 1 : null));
                setProgress(0);
              }}
              className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {activeStoryIndex! < stories.length - 1 && (
            <button
              onClick={() => {
                setActiveStoryIndex((curr) => (curr !== null ? curr + 1 : null));
                setProgress(0);
              }}
              className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Story Container */}
          <div className="relative w-full max-w-sm h-[80vh] sm:h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 flex flex-col justify-between">
            {/* Progress Bars */}
            <div className="absolute top-3 inset-x-3 z-30 flex gap-1.5">
              {stories.map((s, idx) => (
                <div
                  key={s.id}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all ease-linear duration-50"
                    style={{
                      width:
                        idx === activeStoryIndex
                          ? `${progress}%`
                          : idx < activeStoryIndex!
                          ? "100%"
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header info */}
            <div className="absolute top-6 inset-x-4 z-30 flex items-center gap-3">
              <UserAvatar
                src={currentStory.user?.avatar}
                name={currentStory.user?.name}
                size="md"
              />
              <div className="text-white drop-shadow-md">
                <h4 className="text-sm font-bold leading-tight">
                  {currentStory.user?.name}
                </h4>
                <p className="text-[11px] text-zinc-300">24h Story</p>
              </div>
            </div>

            {/* Story Content */}
            <div className="w-full h-full flex items-center justify-center">
              {currentStory.mediaType === "IMAGE" && currentStory.mediaUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentStory.mediaUrl}
                  alt="Story"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${
                    currentStory.bgGradient || "from-blue-600 to-purple-600"
                  } flex items-center justify-center p-8 text-center text-white text-2xl font-bold leading-relaxed`}
                >
                  {currentStory.textContent}
                </div>
              )}
            </div>

            {currentStory.textContent && currentStory.mediaType === "IMAGE" && (
              <div className="absolute bottom-6 inset-x-4 z-30 p-3 rounded-xl bg-black/60 backdrop-blur-md text-white text-sm text-center">
                {currentStory.textContent}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Story Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Story"
        maxWidth="md"
      >
        <form onSubmit={handleCreateStory} className="space-y-4">
          <div className="flex rounded-lg bg-zinc-100 dark:bg-[#3a3b3c] p-1">
            <button
              type="button"
              onClick={() => setStoryType("TEXT")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                storyType === "TEXT"
                  ? "bg-white dark:bg-[#242526] text-[#1877F2] shadow-xs"
                  : "text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Text Story
            </button>
            <button
              type="button"
              onClick={() => setStoryType("IMAGE")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                storyType === "IMAGE"
                  ? "bg-white dark:bg-[#242526] text-[#1877F2] shadow-xs"
                  : "text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Photo Story
            </button>
          </div>

          {storyType === "TEXT" ? (
            <>
              <div
                className={`w-full h-44 rounded-xl bg-gradient-to-br ${bgGradient} p-4 flex items-center justify-center text-center text-white font-bold text-lg shadow-inner`}
              >
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Start typing your story..."
                  className="w-full bg-transparent text-center text-white placeholder-white/70 outline-none resize-none"
                  rows={4}
                  maxLength={150}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1.5">
                  Background Style
                </label>
                <div className="flex gap-2">
                  {gradients.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setBgGradient(g)}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} ring-2 transition-all ${
                        bgGradient === g
                          ? "ring-[#1877F2] scale-110"
                          : "ring-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-sm bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-1">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Add a caption..."
                  className="w-full px-3 py-2 text-sm bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-[#3e4042]">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-bold text-white bg-[#1877F2] hover:bg-blue-600 rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sharing..." : "Share to Story"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
