"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Minus, Send, Image as ImageIcon, Smile, ThumbsUp, MoreHorizontal } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { formatChatTime } from "../../lib/utils";
import { sendMessageAction, getOrCreateDirectConversationAction } from "../../lib/actions/messages";

interface ActiveChatUser {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  isOnline?: boolean;
}

interface FloatingChatWidgetProps {
  activeUser: ActiveChatUser | null;
  onClose: () => void;
  currentUserId: string;
}

export function FloatingChatWidget({
  activeUser,
  onClose,
  currentUserId,
}: FloatingChatWidgetProps) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or fetch direct conversation
  useEffect(() => {
    if (!activeUser) return;

    let isMounted = true;
    async function initChat() {
      setIsLoading(true);
      try {
        const res = await getOrCreateDirectConversationAction(activeUser!.id);
        if (res.success && res.conversationId && isMounted) {
          setConversationId(res.conversationId);
          // Fetch existing messages
          const msgRes = await fetch(`/api/messages?conversationId=${res.conversationId}`);
          if (msgRes.ok) {
            const data = await msgRes.json();
            if (isMounted) setMessages(data.messages || []);
          }
        }
      } catch (err) {
        console.error("Error starting chat:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    initChat();
    return () => {
      isMounted = false;
    };
  }, [activeUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isMinimized]);

  if (!activeUser) return null;

  const handleSend = async (contentToSend?: string) => {
    const text = contentToSend ?? inputText;
    if (!text.trim() || !conversationId) return;

    const tempMsg = {
      id: "temp-" + Date.now(),
      conversationId,
      senderId: currentUserId,
      content: text.trim(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, tempMsg]);
    setInputText("");

    await sendMessageAction({
      conversationId,
      content: text.trim(),
    });
  };

  return (
    <div className="fixed bottom-0 right-4 sm:right-20 z-50 w-80 bg-white dark:bg-[#242526] rounded-t-xl shadow-2xl border border-b-0 border-zinc-200 dark:border-[#3e4042] overflow-hidden flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-white dark:bg-[#242526] border-b border-zinc-100 dark:border-[#3e4042] shadow-xs cursor-pointer select-none">
        <div
          onClick={() => setIsMinimized(!isMinimized)}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          <UserAvatar
            src={activeUser.avatar}
            name={activeUser.name}
            size="sm"
            isOnline={activeUser.isOnline}
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
              {activeUser.name}
            </h4>
            <span className="text-[10px] text-[#31a24c] font-medium block leading-none">
              {activeUser.isOnline ? "Active now" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Stream */}
          <div className="h-72 overflow-y-auto p-3 space-y-2.5 bg-zinc-50/50 dark:bg-[#18191a]/40">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-xs text-zinc-400">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-zinc-400 text-xs">
                <UserAvatar src={activeUser.avatar} name={activeUser.name} size="lg" />
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 mt-2">
                  {activeUser.name}
                </p>
                <p className="text-[11px] mt-0.5">Say hello to start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-1.5 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <UserAvatar
                        src={activeUser.avatar}
                        name={activeUser.name}
                        size="xs"
                      />
                    )}
                    <div
                      className={`max-w-[75%] px-3 py-1.5 rounded-2xl text-xs break-words shadow-xs ${
                        isMe
                          ? "bg-[#1877F2] text-white rounded-br-xs"
                          : "bg-zinc-200 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 rounded-bl-xs"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="p-2 bg-white dark:bg-[#242526] border-t border-zinc-100 dark:border-[#3e4042] flex items-center gap-1.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Aa"
              className="flex-1 px-3 py-1.5 bg-zinc-100 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 text-xs rounded-full outline-none focus:ring-1 focus:ring-[#1877F2]"
            />
            {inputText.trim() ? (
              <button
                onClick={() => handleSend()}
                className="p-1.5 text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSend("👍")}
                className="p-1.5 text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors"
                title="Send a Like"
              >
                <ThumbsUp className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
