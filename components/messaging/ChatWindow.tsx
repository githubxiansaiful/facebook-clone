"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Video,
  Info,
  Send,
  Smile,
  Image as ImageIcon,
  ThumbsUp,
  MoreVertical,
  CheckCheck,
} from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { formatChatTime } from "../../lib/utils";
import { sendMessageAction } from "../../lib/actions/messages";
import { MessageItemType } from "../../types";

interface ChatWindowProps {
  conversation: any;
  initialMessages: MessageItemType[];
  currentUserId: string;
}

export function ChatWindow({
  conversation,
  initialMessages,
  currentUserId,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageItemType[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const otherMember = conversation.members.find(
    (m: any) => m.userId !== currentUserId
  )?.user;
  const displayName = conversation.name || otherMember?.name || "Chat";
  const displayAvatar = conversation.avatar || otherMember?.avatar;

  const handleSend = async (customContent?: string) => {
    const text = customContent ?? inputText;
    if (!text.trim()) return;

    const content = text.trim();
    setInputText("");

    const tempMsg: MessageItemType = {
      id: "temp-" + Date.now(),
      conversationId: conversation.id,
      senderId: currentUserId,
      content,
      mediaUrl: null,
      isRead: false,
      createdAt: new Date(),
      sender: {
        id: currentUserId,
        name: "You",
        username: "",
        avatar: null,
      },
    };

    setMessages((prev) => [...prev, tempMsg]);

    await sendMessageAction({
      conversationId: conversation.id,
      content,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#242526]">
      {/* Top Chat Header */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-[#3e4042] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <UserAvatar
            src={displayAvatar}
            name={displayName}
            size="md"
            isOnline={otherMember?.isOnline}
          />
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {displayName}
            </h3>
            <span className="text-[11px] text-zinc-500 font-medium">
              {otherMember?.isOnline ? "Active now" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#1877F2]">
          <button
            onClick={() => alert("Starting voice call placeholder...")}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
            title="Start voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert("Starting video call placeholder...")}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-[#3a3b3c] transition-colors"
            title="Start video chat"
          >
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/50 dark:bg-[#18191a]/30">
        {/* Intro */}
        <div className="flex flex-col items-center justify-center p-6 text-center text-zinc-500">
          <UserAvatar src={displayAvatar} name={displayName} size="xl" />
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-2">
            {displayName}
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            You&apos;re connected on Facebook Messenger.
          </p>
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUserId;
          const showAvatar =
            !isMe &&
            (index === messages.length - 1 ||
              messages[index + 1]?.senderId !== msg.senderId);

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <div className="w-7 h-7">
                  {showAvatar && (
                    <UserAvatar
                      src={msg.sender?.avatar || displayAvatar}
                      name={msg.sender?.name || displayName}
                      size="xs"
                    />
                  )}
                </div>
              )}

              <div className="max-w-[70%] space-y-0.5">
                <div
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm break-words shadow-xs ${
                    isMe
                      ? "bg-[#1877F2] text-white rounded-br-xs"
                      : "bg-zinc-200 dark:bg-[#3a3b3c] text-zinc-900 dark:text-zinc-100 rounded-bl-xs"
                  }`}
                >
                  {msg.content}
                </div>
                <div
                  className={`text-[10px] text-zinc-400 px-1 ${
                    isMe ? "text-right" : "text-left"
                  }`}
                >
                  {formatChatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Composer Bar */}
      <div className="p-3 border-t border-zinc-200 dark:border-[#3e4042] flex items-center gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex-1 flex items-center bg-zinc-100 dark:bg-[#3a3b3c] rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-[#1877F2]"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none placeholder-zinc-500"
          />
        </form>

        {inputText.trim() ? (
          <button
            onClick={() => handleSend()}
            className="p-2.5 text-white bg-[#1877F2] hover:bg-blue-600 rounded-full transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => handleSend("👍")}
            className="p-2 text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors"
            title="Send a Like"
          >
            <ThumbsUp className="w-5 h-5 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}
