import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict, format, isToday, isYesterday } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFbTime(dateInput: Date | string | number): string {
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 45) {
    return "Just now";
  }
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins}m`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  }
  if (date.getFullYear() === now.getFullYear()) {
    return format(date, "MMM d 'at' h:mm a");
  }
  return format(date, "MMM d, yyyy");
}

export function formatChatTime(dateInput: Date | string | number): string {
  const date = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`;
  }
  return format(date, "MMM d, h:mm a");
}

export type ReactionType = "LIKE" | "LOVE" | "CARE" | "HAHA" | "WOW" | "SAD" | "ANGRY";

export interface ReactionConfig {
  type: ReactionType;
  label: string;
  emoji: string;
  color: string;
  textColor: string;
  bgColor: string;
}

export const REACTIONS: Record<ReactionType, ReactionConfig> = {
  LIKE: {
    type: "LIKE",
    label: "Like",
    emoji: "👍",
    color: "#1877F2",
    textColor: "text-[#1877F2]",
    bgColor: "bg-blue-50 dark:bg-blue-950/40",
  },
  LOVE: {
    type: "LOVE",
    label: "Love",
    emoji: "❤️",
    color: "#F33E58",
    textColor: "text-[#F33E58]",
    bgColor: "bg-red-50 dark:bg-red-950/40",
  },
  CARE: {
    type: "CARE",
    label: "Care",
    emoji: "🥰",
    color: "#F7B125",
    textColor: "text-[#F7B125]",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
  },
  HAHA: {
    type: "HAHA",
    label: "Haha",
    emoji: "😆",
    color: "#F7B125",
    textColor: "text-[#F7B125]",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
  },
  WOW: {
    type: "WOW",
    label: "Wow",
    emoji: "😮",
    color: "#F7B125",
    textColor: "text-[#F7B125]",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
  },
  SAD: {
    type: "SAD",
    label: "Sad",
    emoji: "😢",
    color: "#F7B125",
    textColor: "text-[#F7B125]",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
  },
  ANGRY: {
    type: "ANGRY",
    label: "Angry",
    emoji: "😡",
    color: "#E9710F",
    textColor: "text-[#E9710F]",
    bgColor: "bg-orange-50 dark:bg-orange-950/40",
  },
};

export const BG_THEMES = [
  { id: "none", label: "Default", class: "bg-white dark:bg-zinc-900 text-foreground" },
  { id: "fire", label: "Sunset", class: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xl min-h-[220px] flex items-center justify-center p-8 text-center" },
  { id: "ocean", label: "Ocean Breeze", class: "bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xl min-h-[220px] flex items-center justify-center p-8 text-center" },
  { id: "neon", label: "Electric Purple", class: "bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 text-white font-bold text-xl min-h-[220px] flex items-center justify-center p-8 text-center" },
  { id: "emerald", label: "Emerald", class: "bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 text-white font-bold text-xl min-h-[220px] flex items-center justify-center p-8 text-center" },
  { id: "darkness", label: "Midnight", class: "bg-gradient-to-tr from-zinc-900 via-slate-900 to-zinc-800 text-white font-bold text-xl min-h-[220px] flex items-center justify-center p-8 text-center" },
];

export function getAvatarFallback(name: string): string {
  if (!name) return "FB";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
