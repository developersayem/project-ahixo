/* eslint-disable @next/next/no-img-element */
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Send, User } from "lucide-react";
import { IConversation, IMessage } from "@/types/messages.type";
import { useAuth } from "@/contexts/auth-context";

interface ChatAreaProps {
  conversation: IConversation | null;
  onSendMessage: (conversationId: string, content: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = React.memo(
  ({ conversation, onSendMessage }) => {
    const { user } = useAuth();
    const userId = user?._id;
    const [newMessage, setNewMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const conversationId = conversation?._id;
    const messages = useMemo(
      () => conversation?.messages || [],
      [conversation?.messages]
    );

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    const handleSendMessage = useCallback(() => {
      if (!newMessage.trim() || !conversationId || !userId) return;
      const messageContent = newMessage.trim();
      setNewMessage("");
      onSendMessage(conversationId, messageContent);
      setTimeout(() => inputRef.current?.focus(), 0);
    }, [newMessage, conversationId, userId, onSendMessage]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      },
      [handleSendMessage]
    );

    if (!conversation) {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to Messages
            </h3>
            <p className="text-gray-600 max-w-sm">
              Select a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col bg-white h-full">
        {/* Header */}
        <div className="px-4 py-3 pt-0 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center space-x-3">
          <div className="relative w-10 h-10 border rounded-full flex items-center justify-center">
            {conversation.otherUser?.avatar ? (
              <img
                src={conversation.otherUser.avatar}
                alt={conversation.otherUser.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {conversation.otherUser?.fullName || "Unknown"}
          </h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No messages yet.
            </div>
          ) : (
            messages.map((message: IMessage) => {
              const isSent = message.senderId === userId;
              return (
                <div
                  key={message._id}
                  className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isSent
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm break-words">{message.content}</p>
                    <p
                      className={`text-xs ${
                        isSent ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  newMessage.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.conversation?._id === nextProps.conversation?._id &&
    prevProps.conversation?.messages?.length ===
      nextProps.conversation?.messages?.length &&
    prevProps.conversation?.otherUser?.fullName ===
      nextProps.conversation?.otherUser?.fullName &&
    prevProps.onSendMessage === nextProps.onSendMessage
);

ChatArea.displayName = "ChatArea";
