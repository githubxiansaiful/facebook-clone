"use client";

import React, { useState } from "react";
import { Gift, Search, MoreHorizontal, Video, ExternalLink } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { FloatingChatWidget } from "./FloatingChatWidget";

interface ContactUser {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  headline?: string | null;
  isOnline?: boolean;
}

interface RightSidebarProps {
  contacts: ContactUser[];
  currentUserId: string;
}

export function RightSidebar({ contacts, currentUserId }: RightSidebarProps) {
  const [activeChatUser, setActiveChatUser] = useState<ContactUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <aside className="hidden xl:block w-[280px] xl:w-[320px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-3 select-none">
        {/* Sponsored Section */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Sponsored
          </h4>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80"
              alt="Next.js"
              className="w-24 h-24 rounded-lg object-cover shadow-xs group-hover:opacity-95"
            />
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                Build Next-Gen Web Apps with React 19 & Next.js
              </h5>
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1">
                nextjs.org <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>
        </div>

        <hr className="my-3 border-zinc-200 dark:border-[#3e4042]" />

        {/* Birthdays Section */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Birthdays
          </h4>
          <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1877F2] shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-snug">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Sarah Jenkins
              </span>{" "}
              and <span className="font-semibold">2 others</span> have birthdays today.
            </p>
          </div>
        </div>

        <hr className="my-3 border-zinc-200 dark:border-[#3e4042]" />

        {/* Contacts Section */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Contacts
            </h4>
            <div className="flex items-center gap-1 text-zinc-500">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-[#3a3b3c] transition-colors"
                title="Search contacts"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="mb-2 px-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts..."
                className="w-full px-2.5 py-1 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-md outline-none focus:ring-1 focus:ring-[#1877F2]"
                autoFocus
              />
            </div>
          )}

          <div className="space-y-0.5">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveChatUser(contact)}
                className="flex items-center gap-3 w-full px-2 py-1.5 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-left group"
              >
                <UserAvatar
                  src={contact.avatar}
                  name={contact.name}
                  size="sm"
                  isOnline={contact.isOnline ?? true}
                />
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate flex-1">
                  {contact.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Floating Messenger popup if contact is clicked */}
      {activeChatUser && (
        <FloatingChatWidget
          activeUser={activeChatUser}
          onClose={() => setActiveChatUser(null)}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
}
