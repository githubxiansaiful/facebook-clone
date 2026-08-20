"use client";

import React, { useState } from "react";
import { Settings, Shield, Moon, Sun, User, Lock, Check } from "lucide-react";
import { updateProfileAction } from "../../lib/actions/profile";
import { ThemeToggle } from "../layout/ThemeToggle";

interface SettingsViewProps {
  currentUser: any;
}

export function SettingsView({ currentUser }: SettingsViewProps) {
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    bio: currentUser.bio || "",
    headline: currentUser.headline || "",
    location: currentUser.location || "",
    website: currentUser.website || "",
    work: currentUser.work || "",
    education: currentUser.education || "",
    relationship: currentUser.relationship || "Single",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateProfileAction(formData);
    setIsSubmitting(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-[#3a3b3c] flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Settings & Privacy
          </h1>
          <p className="text-xs text-zinc-500">
            Manage your personal profile, appearance, and account preferences.
          </p>
        </div>
      </div>

      {/* General Profile Settings */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-[#3e4042] pb-3">
          <User className="w-5 h-5 text-[#1877F2]" />
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Account Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSaved && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-lg text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={`@${currentUser.username}`}
                disabled
                className="w-full px-3 py-2 text-xs bg-zinc-200 dark:bg-[#2d2e2f] text-zinc-500 rounded-lg outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full px-3 py-2 text-xs bg-zinc-200 dark:bg-[#2d2e2f] text-zinc-500 rounded-lg outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Work
              </label>
              <input
                type="text"
                value={formData.work}
                onChange={(e) => setFormData({ ...formData, work: e.target.value })}
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
                className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Display & Dark Mode Settings */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-6 space-y-3">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-[#3e4042] pb-3">
          <Moon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Display & Accessibility
          </h2>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}
