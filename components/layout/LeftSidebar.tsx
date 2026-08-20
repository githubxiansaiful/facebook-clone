"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { FbSpriteIcon } from "../ui/FbSpriteIcon";
import {
  MetaAiIcon,
  DashboardIcon,
  AdCenterIcon,
  AdsManagerIcon,
  BirthdaysIcon,
  EventsIcon,
  GamingVideoIcon,
  MessengerKidsIcon,
  MetaBusinessSuiteIcon,
  OrdersPaymentsIcon,
  PagesIcon,
  PlayGamesIcon,
  RecentAdActivityIcon,
  ReelsIcon,
  FbMessengerIcon,
} from "../ui/FacebookIcons";

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

  // Top 8 visible items (before See More)
  const topItems = [
    {
      label: currentUser.name,
      href: `/profile/${currentUser.username}`,
      avatar: currentUser.avatar,
    },
    {
      label: "Meta AI",
      href: "/#meta-ai",
      customIcon: <MetaAiIcon size={36} />,
    },
    {
      label: "Friends",
      href: "/friends",
      spriteName: "friends" as const,
      badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} new` : undefined,
    },
    {
      label: "Dashboard",
      href: "/#dashboard",
      customIcon: <DashboardIcon size={36} />,
    },
    {
      label: "Marketplace",
      href: "/#marketplace",
      spriteName: "marketplace" as const,
    },
    {
      label: "Memories",
      href: "/#memories",
      spriteName: "memories" as const,
      position: "0 -185px",
    },
    {
      label: "Saved",
      href: "/saved",
      spriteName: "saved" as const,
    },
    {
      label: "Groups",
      href: "/groups",
      spriteName: "groups" as const,
    },
  ];

  // Additional items expanded with See More
  const expandedItems = [
    {
      label: "Ad Center",
      href: "/#ad-center",
      customIcon: <AdCenterIcon size={36} />,
    },
    {
      label: "Ads Manager",
      href: "/#ads-manager",
      customIcon: <AdsManagerIcon size={36} />,
    },
    {
      label: "Birthdays",
      href: "/#birthdays",
      customIcon: <BirthdaysIcon size={36} />,
    },
    {
      label: "Events",
      href: "/#events",
      customIcon: <EventsIcon size={36} />,
    },
    {
      label: "Feeds",
      href: "/",
      spriteName: "feeds" as const,
    },
    {
      label: "Gaming Video",
      href: "/#gaming-video",
      customIcon: <GamingVideoIcon size={36} />,
    },
    {
      label: "Messenger",
      href: "/messages",
      customIcon: (
        <div className="w-9 h-9 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-sm shrink-0">
          <FbMessengerIcon size={22} fill="white" />
        </div>
      ),
    },
    {
      label: "Messenger Kids",
      href: "/#messenger-kids",
      customIcon: <MessengerKidsIcon size={36} />,
    },
    {
      label: "Meta Business Suite",
      href: "/#meta-business-suite",
      customIcon: <MetaBusinessSuiteIcon size={36} />,
    },
    {
      label: "Orders and payments",
      href: "/#orders-payments",
      customIcon: <OrdersPaymentsIcon size={36} />,
    },
    {
      label: "Pages",
      href: "/#pages",
      customIcon: <PagesIcon size={36} />,
    },
    {
      label: "Play games",
      href: "/#play-games",
      customIcon: <PlayGamesIcon size={36} />,
    },
    {
      label: "Recent ad activity",
      href: "/#recent-ad-activity",
      customIcon: <RecentAdActivityIcon size={36} />,
    },
    {
      label: "Reels",
      href: "/#reels",
      customIcon: <ReelsIcon size={36} />,
    },
  ];

  return (
    <aside className="hidden lg:block w-[280px] xl:w-[340px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-2 select-none">
      <div className="space-y-0.5">
        {/* Top Items */}
        {topItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors group text-zinc-900 dark:text-zinc-100 font-semibold text-sm"
          >
            {item.avatar !== undefined ? (
              <UserAvatar src={item.avatar} name={item.label} size="sm" />
            ) : item.customIcon ? (
              item.customIcon
            ) : item.spriteName ? (
              <FbSpriteIcon
                name={item.spriteName}
                position={item.position}
                size={36}
              />
            ) : null}

            <span className="flex-1 truncate">{item.label}</span>

            {item.badge && (
              <span className="text-[11px] font-semibold text-[#1877F2] bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {/* Expanded Items */}
        {showMore &&
          expandedItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors group text-zinc-900 dark:text-zinc-100 font-semibold text-sm animate-in fade-in duration-200"
            >
              {item.customIcon ? (
                item.customIcon
              ) : item.spriteName ? (
                <FbSpriteIcon
                  name={item.spriteName}
                  size={36}
                />
              ) : null}

              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          ))}

        {/* See More / See Less Toggle */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-zinc-800 dark:text-zinc-200 font-semibold text-sm"
        >
          <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-[#3a3b3c] flex items-center justify-center">
            {showMore ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
            href="/groups"
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              ⚡
            </div>
            <span className="truncate">React & Next.js Developers</span>
          </Link>
          <Link
            href="/groups"
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
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
