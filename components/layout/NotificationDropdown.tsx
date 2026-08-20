"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, Heart, MessageCircle, UserPlus, Sparkles } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "../ui/UserAvatar";
import { formatFbTime } from "../../lib/utils";
import { markNotificationReadAction, markAllNotificationsReadAction } from "../../lib/actions/notifications";
import { NotificationItemType } from "../../types";

interface NotificationDropdownProps {
  initialNotifications: NotificationItemType[];
  initialUnreadCount: number;
}

export function NotificationDropdown({
  initialNotifications,
  initialUnreadCount,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(initialNotifications);
    setUnreadCount(initialUnreadCount);
  }, [initialNotifications, initialUnreadCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    await markAllNotificationsReadAction();
  };

  const handleItemClick = async (notif: NotificationItemType) => {
    if (!notif.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      await markNotificationReadAction(notif.id);
    }
    setIsOpen(false);
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case "POST_LIKE":
        return (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center border-2 border-white dark:border-[#242526]">
            <Heart className="w-2.5 h-2.5 fill-current" />
          </div>
        );
      case "POST_COMMENT":
      case "COMMENT_REPLY":
        return (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white dark:border-[#242526]">
            <MessageCircle className="w-2.5 h-2.5" />
          </div>
        );
      case "FRIEND_REQUEST":
      case "FRIEND_ACCEPT":
        return (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center border-2 border-white dark:border-[#242526]">
            <UserPlus className="w-2.5 h-2.5" />
          </div>
        );
      default:
        return (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center border-2 border-white dark:border-[#242526]">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        );
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200 dark:hover:bg-[#4e4f50] flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 bg-[#e41e3f] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#18191a]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[360px] sm:w-[380px] bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-4 border-b border-zinc-100 dark:border-[#3e4042]/50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-[#1877F2] hover:underline flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 px-4 py-2 border-b border-zinc-100 dark:border-[#3e4042]/50">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === "all"
                  ? "bg-blue-100 text-[#1877F2] dark:bg-blue-950/60 dark:text-blue-400"
                  : "bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-600 dark:text-zinc-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === "unread"
                  ? "bg-blue-100 text-[#1877F2] dark:bg-blue-950/60 dark:text-blue-400"
                  : "bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-zinc-100 dark:divide-[#3e4042]/40">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                No notifications right now.
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link || "/notifications"}
                  onClick={() => handleItemClick(notif)}
                  className={`flex items-start gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-[#3a3b3c] transition-colors relative ${
                    !notif.isRead ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <UserAvatar
                      src={notif.issuer?.avatar}
                      name={notif.issuer?.name}
                      size="md"
                    />
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-snug line-clamp-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {notif.issuer?.name || "Someone"}{" "}
                      </span>
                      {notif.message}
                    </p>
                    <span className="text-[11px] text-[#1877F2] font-semibold mt-1 block">
                      {formatFbTime(notif.createdAt)}
                    </span>
                  </div>

                  {!notif.isRead && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1877F2] shrink-0 self-center" />
                  )}
                </Link>
              ))
            )}
          </div>

          <div className="p-2 border-t border-zinc-100 dark:border-[#3e4042] text-center">
            <Link
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[#1877F2] hover:underline"
            >
              See all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
