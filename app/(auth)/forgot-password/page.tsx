"use client";

import React, { useState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "../../../lib/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const res = await forgotPasswordAction(email.trim());
    setIsLoading(false);
    setMessage(res.message);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] flex flex-col items-center justify-center p-4 select-none">
      <div className="mb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-[#1877F2] tracking-tighter">
          facebook
        </h1>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-[#242526] rounded-2xl shadow-xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden">
        <div className="p-6 border-b border-zinc-200 dark:border-[#3e4042]">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Find Your Account
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Please enter your email address to search for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message && (
            <div className="p-3 text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900">
              {message}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-[#3e4042]">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1877F2] hover:bg-blue-600 rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
