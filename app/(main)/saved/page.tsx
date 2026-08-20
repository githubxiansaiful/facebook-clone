import React from "react";
import { getFeedPosts } from "../../../lib/data";
import { SavedPostsList } from "../../../components/saved/SavedPostsList";
import { Bookmark } from "lucide-react";

export default async function SavedPage() {
  const savedPosts = await getFeedPosts("saved");

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600">
          <Bookmark className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Saved Posts
          </h1>
          <p className="text-xs text-zinc-500">
            {savedPosts.length} saved item{savedPosts.length === 1 ? "" : "s"} in your collection
          </p>
        </div>
      </div>

      <SavedPostsList posts={savedPosts} />
    </div>
  );
}
