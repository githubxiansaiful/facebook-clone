import React from "react";
import { cn, getAvatarFallback } from "../../lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-20 h-20 text-2xl",
  "2xl": "w-36 h-36 text-4xl",
};

const badgeSizeClasses = {
  xs: "w-2 h-2 border-[1.5px]",
  sm: "w-2.5 h-2.5 border-[1.5px]",
  md: "w-3 h-3 border-2",
  lg: "w-3.5 h-3.5 border-2",
  xl: "w-5 h-5 border-[3px]",
  "2xl": "w-7 h-7 border-4",
};

export function UserAvatar({
  src,
  name = "User",
  size = "md",
  isOnline = false,
  className,
}: UserAvatarProps) {
  const fallback = getAvatarFallback(name || "User");

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10",
          sizeClasses[size]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name || "User Avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if broken image
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span>{fallback}</span>
        )}
      </div>

      {isOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-[#31a24c] border-white dark:border-[#242526] shadow-sm",
            badgeSizeClasses[size]
          )}
          title="Active Now"
        />
      )}
    </div>
  );
}
