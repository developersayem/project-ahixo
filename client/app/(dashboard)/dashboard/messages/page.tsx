"use client";

import React, { useState } from "react";
import { mockConversations } from "./data";
import { IConversation, IMessage } from "@/types/messages.type";
import { Sidebar } from "@/components/dashboard/messages/side-bar";
import { ChatArea } from "@/components/dashboard/messages/chat-area";

function Messages() {
  const [conversations, setConversations] =
    useState<IConversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const selectedConversation =
    conversations.find((conv) => conv.id === selectedConversationId) || null;

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);

    // Mark conversation as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage: IMessage = {
      id: `${Date.now()}-${Math.random()}`,
      senderId: "current-user",
      content,
      timestamp: new Date(),
      type: "sent",
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, newMessage];
          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: newMessage,
          };
        }
        return conv;
      })
    );

    // Simulate a response after 2 seconds
    setTimeout(() => {
      const responseMessage: IMessage = {
        id: `${Date.now()}-${Math.random()}`,
        senderId: conversationId,
        content: getRandomResponse(),
        timestamp: new Date(),
        type: "received",
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const updatedMessages = [...conv.messages, responseMessage];
            return {
              ...conv,
              messages: updatedMessages,
              lastMessage: responseMessage,
              unreadCount:
                selectedConversationId === conversationId
                  ? 0
                  : conv.unreadCount + 1,
            };
          }
          return conv;
        })
      );
    }, 2000);
  };

  const getRandomResponse = (): string => {
    const responses = [
      "Thanks for your message!",
      "I appreciate you reaching out.",
      "That sounds great!",
      "Let me get back to you on that.",
      "Absolutely, I agree.",
      "Thanks for letting me know.",
      "I'll look into that right away.",
      "Perfect timing!",
      "That works for me.",
      "I'll keep you posted.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex  bg-gray-100 w-full h-full">
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

export default Messages;
