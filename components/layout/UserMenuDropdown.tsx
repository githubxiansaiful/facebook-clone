"use client";

import React, { useState, useEffect, useRef } from "react";
import { Settings, LogOut, Moon, Sun, UserCheck, ChevronRight, Bookmark, Users } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "../ui/UserAvatar";
import { logoutAction, demoLoginAction } from "../../lib/actions/auth";
import { ThemeToggle } from "./ThemeToggle";

interface UserMenuDropdownProps {
  currentUser: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    headline?: string | null;
  };
}

export function UserMenuDropdown({ currentUser }: UserMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const demoAccounts = [
    { name: "Mark Zuckerberg", username: "mark" },
    { name: "Sarah Jenkins", username: "sarahj" },
    { name: "Alex Rivera", username: "alexr" },
    { name: "Emily Watson", username: "emilyw" },
    { name: "Michael Chen", username: "mchen" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowDemoAccounts(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchAccount = async (username: string) => {
    setIsSwitching(true);
    await demoLoginAction(username);
    setIsOpen(false);
    setShowDemoAccounts(false);
    window.location.reload();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#1877F2] transition-transform active:scale-95"
        aria-label="Account menu"
      >
        <UserAvatar src={currentUser.avatar} name={currentUser.name} size="md" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[340px] bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 p-2">
          {/* User Profile Card */}
          <Link
            href={`/profile/${currentUser.username}`}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors shadow-xs border border-zinc-100 dark:border-[#3e4042]"
          >
            <UserAvatar src={currentUser.avatar} name={currentUser.name} size="lg" />
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {currentUser.name}
              </h4>
              <p className="text-xs text-zinc-500 truncate">@{currentUser.username}</p>
            </div>
          </Link>

          <div className="my-2 border-t border-zinc-100 dark:border-[#3e4042]" />

          {/* Quick Demo Account Switcher */}
          <div className="mb-1">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1877F2]">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span>Switch Demo User</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  showDemoAccounts ? "rotate-90" : ""
                }`}
              />
            </button>

            {showDemoAccounts && (
              <div className="mt-1 pl-11 pr-2 space-y-1">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.username}
                    onClick={() => handleSwitchAccount(acc.username)}
                    disabled={isSwitching || currentUser.username === acc.username}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors text-left ${
                      currentUser.username === acc.username
                        ? "bg-blue-50 text-[#1877F2] dark:bg-blue-950/50"
                        : "hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <span>{acc.name}</span>
                    {currentUser.username === acc.username && (
                      <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings & Theme */}
          <ThemeToggle />

          <Link
            href="/saved"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-[#3a3b3c] flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <Bookmark className="w-4 h-4 text-purple-500" />
            </div>
            <span>Saved Posts</span>
          </Link>

          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-[#3a3b3c] flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <Settings className="w-4 h-4" />
            </div>
            <span>Settings & Privacy</span>
          </Link>

          <div className="my-2 border-t border-zinc-100 dark:border-[#3e4042]" />

          {/* Logout */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-sm font-semibold text-red-600 dark:text-red-400"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600">
                <LogOut className="w-4 h-4" />
              </div>
              <span>Log Out</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
