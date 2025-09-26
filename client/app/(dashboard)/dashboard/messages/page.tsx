"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { IConversation, IMessage } from "@/types/messages.type";
import { Sidebar } from "@/components/dashboard/messages/side-bar";
import { ChatArea } from "@/components/dashboard/messages/chat-area";
import { initSocket, getSocket } from "@/utils/socket";
import { useAuth } from "@/contexts/auth-context";
import { fetcher } from "@/lib/fetcher";
import { IUser } from "@/types/user-type";
import api from "@/lib/axios";

export default function MessagesPage() {
  const { user } = useAuth();
  const userId = user?._id;
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const initialLoadedRef = useRef(false);

  // Push messages from socket
  const pushMessageToConversations = useCallback(
    (msg: IMessage) => {
      if (!userId) return;

      setConversations((prev) => {
        const convIndex = prev.findIndex((c) => c._id === msg.conversationId);
        if (convIndex === -1) return prev;

        const conv = prev[convIndex];

        // Replace temp message or add new
        const tempIndex = conv.messages.findIndex(
          (m) => m._id.startsWith("temp-") && m.content === msg.content
        );

        let updatedMessages;
        if (tempIndex !== -1) {
          updatedMessages = [...conv.messages];
          updatedMessages[tempIndex] = msg;
        } else if (!conv.messages.some((m) => m._id === msg._id)) {
          updatedMessages = [...conv.messages, msg];
        } else {
          updatedMessages = conv.messages;
        }

        // Increment unread count only for incoming messages
        const unreadCount =
          msg.senderId !== userId
            ? (conv.unreadCount || 0) + 1
            : conv.unreadCount || 0;

        const updatedConv: IConversation = {
          ...conv,
          messages: updatedMessages,
          lastMessage: msg,
          unreadCount,
        };

        const newConversations = [...prev];
        newConversations[convIndex] = updatedConv;
        return newConversations;
      });
    },
    [userId]
  );

  // Initialize conversations
  useEffect(() => {
    if (!userId || initialLoadedRef.current) return;

    const initializeConversations = async () => {
      try {
        const data: IConversation[] = await fetcher(
          `/api/v1/conversations/${userId}`
        );
        if (!data || data.length === 0) {
          setConversations([]);
          return;
        }

        const processedConversations = data.map((c) => {
          const messages = c.messages || [];
          const unreadCount = messages.filter(
            (m) => !m.readBy?.includes(userId)
          ).length;
          return {
            ...c,
            messages,
            unreadCount,
          };
        });

        setConversations(processedConversations);

        const firstConversation = processedConversations[0];
        if (firstConversation) {
          setSelectedConversationId(firstConversation._id);

          // Load messages
          const messages: IMessage[] = await fetcher(
            `/api/v1/messages/${firstConversation._id}`
          );
          setConversations((prev) =>
            prev.map((c) =>
              c._id === firstConversation._id
                ? { ...c, messages, unreadCount: 0 }
                : c
            )
          );

          // Join socket room
          const otherUser = firstConversation.participants.find(
            (p: IUser) => p._id !== userId
          );
          if (otherUser) {
            getSocket().emit("joinConversation", {
              userId,
              otherUserId: otherUser._id,
            });
          }
        }

        initialLoadedRef.current = true;
      } catch (err) {
        console.error("Failed to initialize conversations:", err);
      }
    };

    initializeConversations();
  }, [userId]);

  // Socket listener
  useEffect(() => {
    if (!userId) return;

    initSocket();
    const socket = getSocket();

    const handleReceiveMessage = (msg: IMessage) =>
      pushMessageToConversations(msg);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [userId, pushMessageToConversations]);

  // Select conversation
  const handleSelectConversation = useCallback(
    async (conversationId: string) => {
      setSelectedConversationId(conversationId);

      // Reset unread count & mark messages as read in frontend
      setConversations((prev) =>
        prev.map((c) =>
          c._id === conversationId
            ? {
                ...c,
                unreadCount: 0,
                messages: c.messages.map((m) =>
                  m.readBy?.includes(userId!)
                    ? m
                    : { ...m, readBy: [...(m.readBy || []), userId!] }
                ),
              }
            : c
        )
      );

      const conv = conversations.find((c) => c._id === conversationId);
      if (conv && userId) {
        const otherUser = conv.participants.find(
          (p: IUser) => p._id !== userId
        );
        if (otherUser) {
          getSocket().emit("joinConversation", {
            userId,
            otherUserId: otherUser._id,
          });
        }

        // Mark all messages as read on backend
        await api.post(`/api/v1/messages/mark-read/${conversationId}`, {
          userId,
        });
      }

      try {
        const messages: IMessage[] = await fetcher(
          `/api/v1/messages/${conversationId}`
        );
        setConversations((prev) =>
          prev.map((c) => (c._id === conversationId ? { ...c, messages } : c))
        );
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    },
    [conversations, userId]
  );

  // Send message
  const handleSendMessage = useCallback(
    (conversationId: string, content: string) => {
      if (!userId || !conversationId || !content) return;

      const conv = conversations.find((c) => c._id === conversationId);
      if (!conv) return;

      // Optimistic UI update
      const tempMsg: IMessage = {
        _id: `temp-${Date.now()}`,
        conversationId,
        senderId: userId,
        content,
        createdAt: new Date().toISOString(),
        type: "sent",
      };
      pushMessageToConversations(tempMsg);

      // Emit message to server
      getSocket().emit("sendMessage", {
        conversationId,
        senderId: userId,
        content,
      });
    },
    [userId, conversations, pushMessageToConversations]
  );

  const selectedConversation = useMemo(
    () => conversations.find((c) => c._id === selectedConversationId) || null,
    [conversations, selectedConversationId]
  );

  return (
    <div className="flex bg-white w-full h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />
      <ChatArea
        conversation={selectedConversation}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
