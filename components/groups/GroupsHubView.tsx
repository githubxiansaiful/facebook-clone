"use client";

import React, { useState } from "react";
import { Plus, UsersRound, Compass, UserCheck } from "lucide-react";
import { GroupCard } from "./GroupCard";
import { CreateGroupModal } from "./CreateGroupModal";
import { GroupItemType } from "../../types";

interface GroupsHubViewProps {
  joinedGroups: GroupItemType[];
  discoverGroups: GroupItemType[];
}

export function GroupsHubView({ joinedGroups, discoverGroups }: GroupsHubViewProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"joined" | "discover">("joined");

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1877F2]">
            <UsersRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Groups
            </h1>
            <p className="text-xs text-zinc-500">
              Connect with people who share your interests and passions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white dark:bg-[#242526] rounded-xl p-2 border border-zinc-200 dark:border-[#3e4042]">
        <button
          onClick={() => setActiveTab("joined")}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === "joined"
              ? "bg-[#1877F2] text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c]"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Your Groups ({joinedGroups.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("discover")}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === "discover"
              ? "bg-[#1877F2] text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c]"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Discover Groups ({discoverGroups.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === "joined" && (
        <div>
          {joinedGroups.length === 0 ? (
            <div className="bg-white dark:bg-[#242526] rounded-xl p-12 text-center border border-zinc-200 dark:border-[#3e4042]">
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                You haven&apos;t joined any groups yet.
              </p>
              <button
                onClick={() => setActiveTab("discover")}
                className="mt-3 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 text-[#1877F2] text-xs font-bold rounded-lg"
              >
                Discover Groups
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {joinedGroups.map((g) => (
                <GroupCard key={g.id} group={g} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "discover" && (
        <div>
          {discoverGroups.length === 0 ? (
            <div className="bg-white dark:bg-[#242526] rounded-xl p-12 text-center border border-zinc-200 dark:border-[#3e4042]">
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                No new groups to discover right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {discoverGroups.map((g) => (
                <GroupCard key={g.id} group={g} />
              ))}
            </div>
          )}
        </div>
      )}

      <CreateGroupModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
