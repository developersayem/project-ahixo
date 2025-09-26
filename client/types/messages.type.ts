import { IUser } from "./user-type";

// Message type
export interface IMessage {
  _id: string;                 // MongoDB ObjectId
  conversationId: string;      // Conversation ID
  senderId: string;            // User ID of sender
  content: string;             // Message text
  createdAt: string;           // ISO string (from backend)
  updatedAt?: string;          // optional
  type?: "sent" | "received";  // frontend-only, optional
  readBy?: string[]; // Array of user IDs who have read the message
}

// Conversation type
export interface IConversation {
  _id: string;
  participants: IUser[];      // Array of all users in the conversation
  otherUser?: IUser;          // The participant who is NOT the current user
  messages: IMessage[];
  lastMessage: IMessage | null;
  unreadCount: number;
}
