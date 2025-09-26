/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initSocket } from "@/utils/socket";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/axios";
import { IConversation } from "@/types/messages.type";
import { fetcher } from "@/lib/fetcher";
import { Send } from "lucide-react";

interface MessageSellerModalProps {
  open: boolean;
  onClose: () => void;
  sellerId: string;
}

interface IMessage {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export function MessageSellerModal({
  open,
  onClose,
  sellerId,
}: MessageSellerModalProps) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const socket = initSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize conversation and setup socket listeners
  useEffect(() => {
    if (!open || !user) return;

    // Join conversation
    socket.emit("joinConversation", {
      userId: user._id,
      otherUserId: sellerId,
    });

    // Get conversation ID from backend
    socket.on("conversationJoined", async (convId: string) => {
      setConversationId(convId);

      try {
        const data: IConversation[] = await fetcher(
          `/api/v1/conversations/${user?._id}`
        );
        if (!data || data.length === 0) {
          setConversations([]);
          return;
        }

        const processedConversations = data.map((c) => {
          const messages = c.messages || [];
          const unreadCount = messages.filter(
            (m) => !m.readBy?.includes(user._id)
          ).length;
          return {
            ...c,
            messages,
            unreadCount,
          };
        });

        setConversations(processedConversations);

        // Fetch previous messages
        const { data: msgs } = await api.get<IMessage[]>(
          `/api/v1/messages/${convId}`
        );
        setMessages(msgs);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    });

    // Listen for incoming messages
    socket.on("receiveMessage", (msg: IMessage) => {
      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      socket.off("conversationJoined");
      socket.off("receiveMessage");
    };
  }, [open, sellerId, user, socket]);

  // Send message
  const handleSend = () => {
    if (!message.trim() || !conversationId || !user) return;

    const tempMessage: IMessage = {
      _id: `temp-${Date.now()}`,
      senderId: user._id,
      content: message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setMessage("");
    setSending(true);

    socket.emit("sendMessage", {
      conversationId,
      senderId: user._id,
      content: tempMessage.content,
    });

    setTimeout(() => setSending(false), 300);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md w-full rounded-lg shadow-lg p-0 bg-white flex flex-col h-[500px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <DialogHeader className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src={
                  conversations[0]?.otherUser?.avatar || "/default-avatar.png"
                }
                alt={conversations[0]?.otherUser?.fullName || "Seller"}
                className="w-full h-full object-cover"
              />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {conversations[0]?.otherUser?.fullName}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-2 rounded-md max-w-[80%] break-words self-end ${
                msg.senderId === user?._id
                  ? "bg-blue-100 text-black ml-auto"
                  : "bg-gray-100 text-gray-800 mr-auto"
              }`}
            >
              {msg.content}
              <div className="text-xs text-gray-400 text-right mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input - WhatsApp style */}
        <div className="p-4 border-t rounded-b-2xl border-gray-200 bg-white sticky bottom-0 z-10 flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim() || sending}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition ${
                message.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
