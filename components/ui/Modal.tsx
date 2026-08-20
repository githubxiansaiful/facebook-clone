"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={cn(
          "relative w-full bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200",
          maxWidthClasses[maxWidth],
          className
        )}
      >
        {/* Modal Header */}
        {title && (
          <div className="relative flex items-center justify-center px-4 py-3.5 border-b border-zinc-200 dark:border-[#3e4042]">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 text-center">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#3a3b3c] dark:hover:bg-[#4e4f50] flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
