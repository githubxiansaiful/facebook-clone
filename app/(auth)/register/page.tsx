"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAction } from "../../../lib/actions/auth";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await registerAction(formData);

    setIsLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] flex flex-col items-center justify-center p-4 select-none">
      <div className="mb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-[#1877F2] tracking-tighter">
          facebook
        </h1>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-[#242526] rounded-2xl shadow-xl border border-zinc-200 dark:border-[#3e4042] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-[#3e4042]">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Create a new account
          </h2>
          <p className="text-xs text-zinc-500 mt-1">It&apos;s quick and easy.</p>
        </div>

        {/* Body */}
        <form onSubmit={handleRegister} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 rounded-lg border border-red-200 dark:border-red-900">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="e.g. johndoe"
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2]"
              required
            />
          </div>

          <p className="text-[11px] text-zinc-500 leading-normal">
            By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#42b72a] hover:bg-[#36a420] text-white rounded-xl text-base font-bold shadow-md transition-all active:scale-98 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#1877F2] hover:underline"
            >
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
