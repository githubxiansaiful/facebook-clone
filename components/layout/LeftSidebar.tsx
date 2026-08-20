"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  UsersRound,
  Bookmark,
  Clock,
  Calendar,
  Tv,
  Store,
  ChevronDown,
  ChevronUp,
  Flag,
  Gamepad2,
  HeartHandshake,
} from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";

interface LeftSidebarProps {
  currentUser: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
  };
  pendingRequestsCount?: number;
}

export function LeftSidebar({
  currentUser,
  pendingRequestsCount = 0,
}: LeftSidebarProps) {
  const [showMore, setShowMore] = useState(false);

  const mainItems = [
    {
      label: currentUser.name,
      href: `/profile/${currentUser.username}`,
      avatar: currentUser.avatar,
    },
    {
      label: "Friends",
      href: "/friends",
      icon: Users,
      iconColor: "text-[#1877F2]",
      badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} new` : undefined,
    },
    {
      label: "Groups",
      href: "/groups",
      icon: UsersRound,
      iconColor: "text-blue-500",
    },
    {
      label: "Saved",
      href: "/saved",
      icon: Bookmark,
      iconColor: "text-purple-500",
    },
    {
      label: "Memories",
      href: "/#memories",
      icon: Clock,
      iconColor: "text-cyan-500",
    },
    {
      label: "Events",
      href: "/#events",
      icon: Calendar,
      iconColor: "text-rose-500",
    },
  ];

  const moreItems = [
    {
      label: "Video",
      href: "/#video",
      icon: Tv,
      iconColor: "text-blue-400",
    },
    {
      label: "Marketplace",
      href: "/#marketplace",
      icon: Store,
      iconColor: "text-teal-500",
    },
    {
      label: "Pages",
      href: "/#pages",
      icon: Flag,
      iconColor: "text-amber-500",
    },
    {
      label: "Gaming",
      href: "/#gaming",
      icon: Gamepad2,
      iconColor: "text-indigo-500",
    },
    {
      label: "Fundraisers",
      href: "/#fundraisers",
      icon: HeartHandshake,
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <aside className="hidden lg:block w-[280px] xl:w-[340px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-2 select-none">
      <div className="space-y-0.5">
        {mainItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors group text-zinc-900 dark:text-zinc-100 font-semibold text-sm"
          >
            {item.avatar !== undefined ? (
              <UserAvatar src={item.avatar} name={item.label} size="sm" />
            ) : item.icon ? (
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-[#3a3b3c] group-hover:bg-zinc-200 dark:group-hover:bg-[#4e4f50] transition-colors">
                <item.icon className={`w-5 h-5 ${item.iconColor || "text-zinc-600 dark:text-zinc-300"}`} />
              </div>
            ) : null}

            <span className="flex-1 truncate">{item.label}</span>

            {item.badge && (
              <span className="text-[11px] font-semibold text-[#1877F2] bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {showMore &&
          moreItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors group text-zinc-900 dark:text-zinc-100 font-semibold text-sm animate-in fade-in duration-200"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-[#3a3b3c] group-hover:bg-zinc-200 dark:group-hover:bg-[#4e4f50] transition-colors">
                <item.icon className={`w-5 h-5 ${item.iconColor || "text-zinc-600 dark:text-zinc-300"}`} />
              </div>
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          ))}

        {/* See More Toggle */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-zinc-800 dark:text-zinc-200 font-semibold text-sm"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-[#3a3b3c] flex items-center justify-center">
            {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          <span>{showMore ? "See less" : "See more"}</span>
        </button>
      </div>

      <hr className="my-3 border-zinc-200 dark:border-[#3e4042]" />

      {/* Your Shortcuts */}
      <div className="px-3">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
          Your shortcuts
        </h4>
        <div className="space-y-1">
          <Link
            href="/groups/nextjs-developers"
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <span className="truncate">React & Next.js Developers</span>
          </Link>
          <Link
            href="/groups/photography-club"
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              📸
            </div>
            <span className="truncate">Landscape & Street Photography</span>
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 px-3 text-[11px] text-zinc-500 space-y-1">
        <p>Privacy · Terms · Advertising · Ad choices · Cookies · Meta © 2025</p>
      </div>
    </aside>
  );
}
