import React from "react";
import { getNotifications } from "../../../lib/data";
import { NotificationDropdown } from "../../../components/layout/NotificationDropdown";
import { UserAvatar } from "../../../components/ui/UserAvatar";
import { formatFbTime } from "../../../lib/utils";
import { Heart, MessageCircle, UserPlus, Sparkles, Check } from "lucide-react";
import Link from "next/link";

interface NotificationsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function NotificationsPage({ searchParams }: NotificationsPageProps) {
  const { filter = "all" } = await searchParams;
  const { notifications, unreadCount } = await getNotifications();

  const filtered =
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
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 bg-red-100 dark:bg-red-950/50 text-red-600 text-xs font-bold rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Link
            href="/notifications"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              filter === "all"
                ? "bg-blue-100 dark:bg-blue-950/60 text-[#1877F2]"
                : "bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-600 dark:text-zinc-300"
            }`}
          >
            All
          </Link>
          <Link
            href="/notifications?filter=unread"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              filter === "unread"
                ? "bg-blue-100 dark:bg-blue-950/60 text-[#1877F2]"
                : "bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Unread
          </Link>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] overflow-hidden divide-y divide-zinc-100 dark:divide-[#3e4042]/50">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500">
            No notifications to display.
          </div>
        ) : (
          filtered.map((notif) => (
            <Link
              key={notif.id}
              href={notif.link || "/notifications"}
              className={`flex items-center gap-3 p-4 hover:bg-zinc-50 dark:hover:bg-[#3a3b3c] transition-colors ${
                !notif.isRead ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
              }`}
            >
              <div className="relative shrink-0">
                <UserAvatar
                  src={notif.issuer?.avatar}
                  name={notif.issuer?.name}
                  size="lg"
                />
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {notif.issuer?.name || "Someone"}{" "}
                  </span>
                  {notif.message}
                </p>
                <span className="text-xs text-[#1877F2] font-semibold mt-1 block">
                  {formatFbTime(notif.createdAt)}
                </span>
              </div>

              {!notif.isRead && (
                <div className="w-3 h-3 rounded-full bg-[#1877F2] shrink-0 self-center" />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
