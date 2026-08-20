"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDropdown } from "./SearchDropdown";
import { NotificationDropdown } from "./NotificationDropdown";
import { MessengerDropdown } from "./MessengerDropdown";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { NotificationItemType, ConversationItemType } from "../../types";
import { FacebookLogo } from "../ui/FacebookLogo";
import {
  FbHomeIcon,
  FbWatchIcon,
  FbGroupsIcon,
  FbGamingIcon,
  FbMenuGridIcon,
} from "../ui/FacebookIcons";
import { Bookmark } from "lucide-react";

interface NavbarProps {
  currentUser: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    headline?: string | null;
  };
  notifications: NotificationItemType[];
  unreadNotificationsCount: number;
  conversations: ConversationItemType[];
  pendingRequestsCount?: number;
}

export function Navbar({
  currentUser,
  notifications,
  unreadNotificationsCount,
  conversations,
  pendingRequestsCount = 0,
}: NavbarProps) {
  const pathname = usePathname();

  const navTabs = [
    {
      label: "Home",
      href: "/",
      icon: FbHomeIcon,
      isActive: pathname === "/",
    },
    {
      label: "Watch",
      href: "/#watch",
      icon: FbWatchIcon,
      isActive: pathname.startsWith("/watch"),
    },
    {
      label: "Groups",
      href: "/groups",
      icon: FbGroupsIcon,
      isActive: pathname.startsWith("/groups"),
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    {
      label: "Gaming",
      href: "/#gaming",
      icon: FbGamingIcon,
      isActive: pathname.startsWith("/gaming"),
    },
    {
      label: "Saved",
      href: "/saved",
      icon: Bookmark,
      isLucide: true,
      isActive: pathname.startsWith("/saved"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#242526] border-b border-zinc-200 dark:border-[#3e4042] shadow-xs h-14 transition-colors">
      <div className="w-full h-full mx-auto px-2 sm:px-4 flex items-center justify-between">
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-2 lg:w-1/4">
          <Link
            href="/"
            className="hover:opacity-95 transition-transform active:scale-95 shrink-0"
            title="Facebook Home"
          >
            <FacebookLogo size={40} />
          </Link>
          <SearchDropdown />
        </div>

        {/* Center Section: Navigation Tabs (Desktop & Tablet) */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl h-full px-2">
          <div className="flex items-center justify-around w-full h-full">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`relative flex items-center justify-center flex-1 h-full rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-all group ${
                    tab.isActive
                      ? "text-[#1877F2]"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                  title={tab.label}
                >
                  <div className="relative py-2">
                    {tab.isLucide ? (
                      <Bookmark className="w-6 h-6" />
                    ) : (
                      <Icon size={28} fill="currentColor" />
                    )}

                    {tab.badge && (
                      <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 bg-[#e41e3f] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526]">
                        {tab.badge}
                      </span>
                    )}
                  </div>

                  {tab.isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#1877F2] rounded-t-md" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center justify-end gap-2 lg:w-1/4">
          {/* Menu Grid Button */}
          <button
            className="w-10 h-10 rounded-full bg-zinc-200/80 dark:bg-[#3a3b3c] hover:bg-zinc-300 dark:hover:bg-[#4e4f50] flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
            title="Menu"
          >
            <FbMenuGridIcon size={20} />
          </button>

          {/* Messages Dropdown */}
          <MessengerDropdown
            initialConversations={conversations}
            currentUserId={currentUser.id}
          />

          {/* Notifications Dropdown */}
          <NotificationDropdown
            initialNotifications={notifications}
            initialUnreadCount={unreadNotificationsCount}
          />

          {/* User Menu Dropdown */}
          <UserMenuDropdown currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
}
