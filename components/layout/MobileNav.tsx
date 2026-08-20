"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MessageCircle, Bell, Bookmark, UsersRound } from "lucide-react";

interface MobileNavProps {
  unreadNotificationsCount?: number;
  pendingRequestsCount?: number;
}

export function MobileNav({
  unreadNotificationsCount = 0,
  pendingRequestsCount = 0,
}: MobileNavProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home, isActive: pathname === "/" },
    {
      href: "/friends",
      label: "Friends",
      icon: Users,
      isActive: pathname.startsWith("/friends"),
      badge: pendingRequestsCount,
    },
    {
      href: "/messages",
      label: "Chats",
      icon: MessageCircle,
      isActive: pathname.startsWith("/messages"),
    },
    {
      href: "/notifications",
      label: "Alerts",
      icon: Bell,
      isActive: pathname.startsWith("/notifications"),
      badge: unreadNotificationsCount,
    },
    {
      href: "/groups",
      label: "Groups",
      icon: UsersRound,
      isActive: pathname.startsWith("/groups"),
    },
    {
      href: "/saved",
      label: "Saved",
      icon: Bookmark,
      isActive: pathname.startsWith("/saved"),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-[#242526] border-t border-zinc-200 dark:border-[#3e4042] z-40 h-14 px-1 flex items-center justify-around">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 ${
              link.isActive
                ? "text-[#1877F2]"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 ${link.isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`}
              />
              {link.badge && link.badge > 0 ? (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-0.5 bg-[#e41e3f] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {link.badge > 9 ? "9+" : link.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5">
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
