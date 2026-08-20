"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Modal } from "../ui/Modal";
import { UserAvatar } from "../ui/UserAvatar";
import { getOrCreateDirectConversationAction } from "../../lib/actions/messages";
import { useRouter } from "next/navigation";

interface CreateConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: any[];
}

export function CreateConversationModal({
  isOpen,
  onClose,
  users,
}: CreateConversationModalProps) {
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = async (userId: string) => {
    setLoadingId(userId);
    const res = await getOrCreateDirectConversationAction(userId);
    setLoadingId(null);
    if (res.success && res.conversationId) {
      onClose();
      router.push(`/messages/${res.conversationId}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New message" maxWidth="md">
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="To: Type a name or username"
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-100 dark:bg-[#3a3b3c] rounded-lg outline-none focus:ring-1 focus:ring-[#1877F2]"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-1">
          {filtered.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelect(user.id)}
              disabled={loadingId === user.id}
              className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors text-left"
            >
              <UserAvatar
                src={user.avatar}
                name={user.name}
                size="md"
                isOnline={user.isOnline}
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {user.name}
                </h4>
                <p className="text-[11px] text-zinc-500 truncate">@{user.username}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
