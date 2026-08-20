"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Smile,
  MapPin,
  Globe,
  Users,
  Lock,
  X,
  Plus,
  Palette,
  Sparkles,
} from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { Modal } from "../ui/Modal";
import { BG_THEMES } from "../../lib/utils";
import { createPostAction } from "../../lib/actions/posts";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    id: string;
    name: string;
    avatar: string | null;
  };
  groupId?: string | null;
}

const FEELINGS = [
  { label: "happy", emoji: "😊" },
  { label: "loved", emoji: "🥰" },
  { label: "excited", emoji: "🤩" },
  { label: "blessed", emoji: "🙏" },
  { label: "crazy", emoji: "🤪" },
  { label: "chill", emoji: "😎" },
  { label: "eating delicious food", emoji: "🍕" },
  { label: "drinking coffee", emoji: "☕" },
  { label: "traveling", emoji: "✈️" },
  { label: "listening to music", emoji: "🎧" },
  { label: "celebrating", emoji: "🎉" },
];

export function CreatePostModal({
  isOpen,
  onClose,
  currentUser,
  groupId,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState<"PUBLIC" | "FRIENDS" | "ONLY_ME">("PUBLIC");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [bgTheme, setBgTheme] = useState<string>("none");
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showFeelings, setShowFeelings] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
  ];

  const handleAddImage = (url: string) => {
    if (url.trim() && !images.includes(url.trim())) {
      setImages((prev) => [...prev, url.trim()]);
      setImageUrlInput("");
      setBgTheme("none"); // Disable bg theme if image attached
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) {
      setError("Please write something or attach an image.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await createPostAction({
      content: content.trim(),
      privacy,
      feeling,
      location,
      bgTheme: bgTheme !== "none" ? bgTheme : null,
      groupId: groupId || null,
      images,
    });

    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      // Reset & close
      setContent("");
      setFeeling(null);
      setLocation(null);
      setBgTheme("none");
      setImages([]);
      onClose();
    }
  };

  const selectedBgThemeObj = BG_THEMES.find((t) => t.id === bgTheme);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create post" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 rounded-lg border border-red-200 dark:border-red-900">
            {error}
          </div>
        )}

        {/* User Info Header */}
        <div className="flex items-center gap-3">
          <UserAvatar src={currentUser.avatar} name={currentUser.name} size="md" />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {currentUser.name}
              </h4>
              {feeling && (
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                  is {feeling}
                </span>
              )}
              {location && (
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                  in <strong className="font-semibold">{location}</strong>
                </span>
              )}
            </div>

            {/* Privacy Selector */}
            <div className="relative inline-block mt-0.5">
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as any)}
                className="text-[11px] font-semibold bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-700 dark:text-zinc-300 rounded-md px-2 py-0.5 border border-zinc-200 dark:border-[#4e4f50] outline-none cursor-pointer"
              >
                <option value="PUBLIC">🌐 Public</option>
                <option value="FRIENDS">👥 Friends</option>
                <option value="ONLY_ME">🔒 Only me</option>
              </select>
            </div>
          </div>
        </div>

        {/* Text Area / Styled Background Area */}
        <div
          className={`rounded-xl transition-all ${
            bgTheme !== "none" && selectedBgThemeObj
              ? selectedBgThemeObj.class
              : "bg-transparent"
          }`}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
            rows={bgTheme !== "none" ? 4 : 4}
            className={`w-full bg-transparent resize-none outline-none text-base placeholder-zinc-400 ${
              bgTheme !== "none"
                ? "text-center text-white placeholder-white/70 font-bold"
                : "text-zinc-900 dark:text-zinc-100"
            }`}
          />
        </div>

        {/* Background Theme Selector Palette */}
        {images.length === 0 && (
          <div className="flex items-center justify-between py-1">
            <button
              type="button"
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-[#1877F2] transition-colors"
            >
              <Palette className="w-4 h-4" />
              <span>Background Theme</span>
            </button>

            {showThemePicker && (
              <div className="flex items-center gap-1.5">
                {BG_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setBgTheme(theme.id)}
                    className={`w-6 h-6 rounded-md border-2 transition-all ${
                      theme.id === "none"
                        ? "bg-zinc-200 dark:bg-zinc-700"
                        : theme.class.split(" ")[0]
                    } ${
                      bgTheme === theme.id
                        ? "border-[#1877F2] scale-110"
                        : "border-transparent"
                    }`}
                    title={theme.label}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Attached Images Preview */}
        {images.length > 0 && (
          <div className="space-y-2 p-2 border border-zinc-200 dark:border-[#3e4042] rounded-xl bg-zinc-50 dark:bg-[#18191a]">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
              <span>Attached Images ({images.length})</span>
              <button
                type="button"
                onClick={() => setImages([])}
                className="text-red-500 hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((url, idx) => (
                <div key={idx} className="relative h-20 rounded-lg overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Image Input Bar */}
        {showImageInput && (
          <div className="p-3 bg-zinc-100 dark:bg-[#3a3b3c] rounded-xl space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste an image URL..."
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-[#242526] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
              />
              <button
                type="button"
                onClick={() => handleAddImage(imageUrlInput)}
                className="px-3 py-1.5 bg-[#1877F2] text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
            {/* Quick Sample Photos */}
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 block mb-1">
                Or select quick sample photos:
              </span>
              <div className="flex gap-2">
                {sampleImages.map((sUrl, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={sUrl}
                    alt="sample"
                    onClick={() => handleAddImage(sUrl)}
                    className="w-12 h-10 object-cover rounded-md cursor-pointer hover:opacity-80 border border-zinc-300 dark:border-zinc-600"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feeling / Activity selector dropdown */}
        {showFeelings && (
          <div className="p-3 bg-zinc-100 dark:bg-[#3a3b3c] rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                How are you feeling?
              </span>
              {feeling && (
                <button
                  type="button"
                  onClick={() => setFeeling(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
              {FEELINGS.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => {
                    setFeeling(`${f.emoji} ${f.label}`);
                    setShowFeelings(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#242526] text-xs font-medium text-left"
                >
                  <span className="text-base">{f.emoji}</span>
                  <span className="capitalize">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Location input */}
        {showLocationInput && (
          <div className="p-2.5 bg-zinc-100 dark:bg-[#3a3b3c] rounded-xl flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <input
              type="text"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you? (e.g. San Francisco, CA)"
              className="flex-1 text-xs bg-transparent outline-none text-zinc-900 dark:text-zinc-100"
            />
            {location && (
              <button
                type="button"
                onClick={() => setLocation(null)}
                className="text-xs text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Add to your post toolbar */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-[#3e4042] shadow-xs">
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
            Add to your post
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors ${
                showImageInput ? "bg-green-100 dark:bg-green-950/40 text-emerald-600" : "text-emerald-500"
              }`}
              title="Photo/video"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setShowFeelings(!showFeelings)}
              className={`p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors ${
                showFeelings ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600" : "text-amber-500"
              }`}
              title="Feeling/activity"
            >
              <Smile className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setShowLocationInput(!showLocationInput)}
              className={`p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors ${
                showLocationInput ? "bg-rose-100 dark:bg-rose-950/40 text-rose-600" : "text-rose-500"
              }`}
              title="Check in / Location"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || (!content.trim() && images.length === 0)}
          className="w-full py-2.5 text-sm font-bold text-white bg-[#1877F2] hover:bg-blue-600 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
    </Modal>
  );
}
