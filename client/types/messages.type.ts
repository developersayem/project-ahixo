export interface IUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface IMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'sent' | 'received';
}

export interface IConversation {
  id: string;
  user: IUser;
  messages: IMessage[];
  lastMessage?: IMessage;
  unreadCount: number;
}