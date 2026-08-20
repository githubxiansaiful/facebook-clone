import React from "react";
import {
  Briefcase,
  GraduationCap,
  Home,
  MapPin,
  Heart,
  Globe,
  Calendar,
  Mail,
} from "lucide-react";
import { format } from "date-fns";

interface ProfileAboutProps {
  user: any;
}

export function ProfileAbout({ user }: ProfileAboutProps) {
  const infoItems = [
    user.work && {
      icon: Briefcase,
      text: `Works at ${user.work}`,
    },
    user.education && {
      icon: GraduationCap,
      text: `Studied at ${user.education}`,
    },
    user.location && {
      icon: MapPin,
      text: `Lives in ${user.location}`,
    },
    user.relationship && {
      icon: Heart,
      text: user.relationship,
    },
    user.website && {
      icon: Globe,
      text: user.website,
      isLink: true,
    },
    user.createdAt && {
      icon: Calendar,
      text: `Joined ${format(new Date(user.createdAt), "MMMM yyyy")}`,
    },
  ].filter(Boolean);

  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">
        About
      </h3>

      {user.bio && (
        <div className="mb-4 pb-3 border-b border-zinc-100 dark:border-[#3e4042]">
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
            &ldquo;{user.bio}&rdquo;
          </p>
        </div>
      )}

      <div className="space-y-3">
        {infoItems.map((item: any, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-[#3a3b3c] flex items-center justify-center text-zinc-600 dark:text-zinc-300 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              {item.isLink ? (
                <a
                  href={item.text}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1877F2] hover:underline truncate"
                >
                  {item.text}
                </a>
              ) : (
                <span className="truncate">{item.text}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
