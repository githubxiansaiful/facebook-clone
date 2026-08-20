"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, User, Users, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserAvatar } from "../ui/UserAvatar";

export function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{
    users: any[];
    groups: any[];
  }>({ users: [], groups: [] });
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ users: [], groups: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-[280px] sm:max-w-[320px]">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3 text-zinc-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search Facebook..."
          className="w-full pl-9 pr-8 py-2 bg-zinc-100 dark:bg-[#3a3b3c] hover:bg-zinc-200/80 dark:hover:bg-[#4e4f50] focus:bg-white dark:focus:bg-[#242526] text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 rounded-full text-sm outline-none ring-1 ring-transparent focus:ring-[#1877F2] transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Live Dropdown */}
      {isOpen && (query.trim().length > 0 || results.users.length > 0) && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#242526] rounded-xl shadow-xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2">
            {isLoading ? (
              <div className="p-4 text-center text-xs text-zinc-500">Searching...</div>
            ) : (
              <>
                {results.users.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      People
                    </div>
                    {results.users.map((u) => (
                      <Link
                        key={u.id}
                        href={`/profile/${u.username}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
                      >
                        <UserAvatar src={u.avatar} name={u.name} size="sm" isOnline={u.isOnline} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {u.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">@{u.username}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {results.groups.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Groups
                    </div>
                    {results.groups.map((g) => (
                      <Link
                        key={g.id}
                        href={`/groups/${g.slug || g.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1877F2]">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {g.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {g._count?.members || 1} members
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {results.users.length === 0 && results.groups.length === 0 && (
                  <div className="p-3 text-center text-xs text-zinc-500">
                    No quick results found. Press Enter to search all.
                  </div>
                )}

                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full mt-1 py-2 text-xs font-semibold text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search all results for &quot;{query}&quot;
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
