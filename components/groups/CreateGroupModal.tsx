"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { createGroupAction } from "../../lib/actions/groups";
import { useRouter } from "next/navigation";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const res = await createGroupAction({
      name: name.trim(),
      description: description.trim() || undefined,
      privacy,
      coverPhoto: coverPhoto.trim() || undefined,
    });

    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else if (res.group) {
      onClose();
      router.push(`/groups/${res.group.slug || res.group.id}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Group" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Group Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Next.js Developers Worldwide"
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What is this group about?"
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Privacy
          </label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
          >
            <option value="PUBLIC">🌐 Public - Anyone can see who is in the group and what they post</option>
            <option value="PRIVATE">🔒 Private - Only members can see who is in the group and what they post</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Cover Photo URL (optional)
          </label>
          <input
            type="url"
            value={coverPhoto}
            onChange={(e) => setCoverPhoto(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
          />
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
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
