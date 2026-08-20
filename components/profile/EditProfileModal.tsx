"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { updateProfileAction, updateAvatarAction, updateCoverPhotoAction } from "../../lib/actions/profile";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    bio?: string | null;
    headline?: string | null;
    location?: string | null;
    website?: string | null;
    work?: string | null;
    education?: string | null;
    relationship?: string | null;
    avatar?: string | null;
    coverPhoto?: string | null;
  };
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    headline: user.headline || "",
    location: user.location || "",
    website: user.website || "",
    work: user.work || "",
    education: user.education || "",
    relationship: user.relationship || "Single",
  });
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const [coverUrl, setCoverUrl] = useState(user.coverPhoto || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await updateProfileAction(formData);

    if (avatarUrl !== user.avatar && avatarUrl.trim()) {
      await updateAvatarAction(avatarUrl.trim());
    }
    if (coverUrl !== user.coverPhoto && coverUrl.trim()) {
      await updateCoverPhotoAction(coverUrl.trim());
    }

    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        {/* Profile Picture URL */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Profile Picture URL
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
        </div>

        {/* Cover Photo URL */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Cover Photo URL
          </label>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            placeholder="Describe who you are..."
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2] resize-none"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Headline / Tagline
          </label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            placeholder="e.g. Software Engineer & Tech Explorer"
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Work
            </label>
            <input
              type="text"
              value={formData.work}
              onChange={(e) => setFormData({ ...formData, work: e.target.value })}
              placeholder="e.g. Meta / Tech Company"
              className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Education
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="e.g. Stanford University"
              className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Relationship Status
            </label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            >
              <option value="Single">Single</option>
              <option value="In a relationship">In a relationship</option>
              <option value="Engaged">Engaged</option>
              <option value="Married">Married</option>
              <option value="It's complicated">It&apos;s complicated</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-[#3e4042]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1877F2] hover:bg-blue-600 rounded-lg shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
