"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-sm font-medium text-zinc-800 dark:text-zinc-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-[#3a3b3c] flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </div>
        <span>Display & Accessibility ({isDark ? "Dark" : "Light"})</span>
      </div>
      <div
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
          isDark ? "bg-[#1877F2]" : "bg-zinc-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </button>
  );
}
