"use client";

import React from "react";
import { REACTIONS, ReactionType } from "../../lib/utils";

interface ReactionPickerProps {
  onSelect: (type: ReactionType) => void;
  onClose?: () => void;
}

export function ReactionPicker({ onSelect, onClose }: ReactionPickerProps) {
  const reactionList = Object.values(REACTIONS);

  return (
    <div
      className="absolute bottom-full left-0 mb-2.5 z-40 bg-white dark:bg-[#242526] rounded-full shadow-2xl border border-zinc-200 dark:border-[#3e4042] px-2 py-1.5 flex items-center gap-1 sm:gap-2 animate-reaction-pop select-none pointer-events-auto"
      onMouseLeave={onClose}
    >
      {reactionList.map((r, index) => (
        <button
          key={r.type}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(r.type);
            if (onClose) onClose();
          }}
          style={{ animationDelay: `${index * 30}ms` }}
          className="relative group p-1 sm:p-1.5 rounded-full hover:scale-130 transition-transform duration-200 transform origin-bottom focus:outline-none"
          title={r.label}
        >
          {/* Reaction Emoji representation */}
          <span className="text-2xl sm:text-3xl block filter drop-shadow-sm select-none">
            {r.emoji}
          </span>

          {/* Tooltip */}
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {r.label}
          </span>
        </button>
      ))}
    </div>
  );
}
