/* eslint-disable @next/next/no-img-element */
import React from "react";
import { User } from "lucide-react";
import { IConversation } from "@/types/messages.type";

interface SidebarProps {
  conversations: IConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}) => {
  const formatTime = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days === 0)
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (days === 1) return "Yesterday";
    if (days < 7) return d.toLocaleDateString([], { weekday: "short" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const filteredConversations = conversations.filter(
    (conv) => conv.lastMessage || (conv.messages && conv.messages.length > 0)
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500">
            {filteredConversations.length} conversations
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const otherUser = conversation.otherUser;
          const name = otherUser?.fullName || "Unknown";
          const avatar = otherUser?.avatar || "";
          const lastMsg = conversation.lastMessage;

          return (
            <div
              key={conversation._id}
              onClick={() => onSelectConversation(conversation._id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedConversationId === conversation._id
                  ? "bg-blue-50 border-r-4 border-r-blue-600"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0 w-12 h-12 border rounded-full flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {name}
                      </h3>
                      {/* Only show badge if unreadCount > 0 */}
                      {conversation.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-medium rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    {lastMsg && (
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatTime(lastMsg.createdAt)}
                      </span>
                    )}
                  </div>
                  {lastMsg ? (
                    <p className="text-sm text-gray-600 truncate">
                      {lastMsg.senderId === otherUser?._id ? "" : "You: "}{" "}
                      {lastMsg.content}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">No messages yet</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredConversations.length === 0 && (
          <div className="p-4 text-center text-gray-400">
            No conversations available
          </div>
        )}
      </div>
    </div>
  );
};
