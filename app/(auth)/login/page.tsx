"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction, demoLoginAction } from "../../../lib/actions/auth";
import { Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { FacebookLogo } from "../../../components/ui/FacebookLogo";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    setIsLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleDemoLogin = async (username: string) => {
    setDemoLoading(username);
    setError(null);

    const res = await demoLoginAction(username);
    if (res.error) {
      setError(res.error);
      setDemoLoading(null);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Facebook Brand Promo */}
        <div className="text-center lg:text-left space-y-4 max-w-md mx-auto lg:mx-0">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <FacebookLogo size={48} />
            <h1 className="text-5xl sm:text-6xl font-black text-[#1877F2] tracking-tighter">
              facebook
            </h1>
          </div>
          <p className="text-xl sm:text-2xl font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
            Connect with friends and the world around you on Facebook.
          </p>

          {/* Quick Demo Test-Drive Box */}
          <div className="mt-8 p-4 bg-white/80 dark:bg-[#242526]/80 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1877F2] mb-2 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> 1-Click Instant Demo Login
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              Explore with pre-seeded users and rich feeds:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: "Mark (CEO)", username: "mark" },
                { name: "Sarah (Design)", username: "sarahj" },
                { name: "Alex (Eng)", username: "alexr" },
              ].map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => handleDemoLogin(acc.username)}
                  disabled={demoLoading !== null || isLoading}
                  className="px-2.5 py-2 text-xs font-bold bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-[#1877F2] rounded-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {demoLoading === acc.username ? "Logging in..." : acc.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Login Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-[#242526] rounded-2xl shadow-xl border border-zinc-200 dark:border-[#3e4042] p-6 sm:p-8 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-600 rounded-lg border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="text"
                  name="emailOrUsername"
                  placeholder="Email or username"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2] transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 rounded-xl border border-zinc-200 dark:border-[#4e4f50] text-sm outline-none focus:ring-2 focus:ring-[#1877F2] transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || demoLoading !== null}
                className="w-full py-3 bg-[#1877F2] hover:bg-blue-600 text-white rounded-xl text-base font-bold shadow-md transition-all active:scale-98 disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>

              <div className="text-center pt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#1877F2] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="border-t border-zinc-200 dark:border-[#3e4042] my-4" />

              <div className="text-center">
                <Link
                  href="/register"
                  className="inline-block px-6 py-3 bg-[#42b72a] hover:bg-[#36a420] text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-98"
                >
                  Create new account
                </Link>
              </div>
            </form>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-6">
            <span className="font-semibold text-zinc-800 dark:text-zinc-300">
              Create a Page
            </span>{" "}
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
}
