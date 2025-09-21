import { IConversation, IMessage, IUser } from "@/types/messages.type";

const users: IUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '',
    status: 'online',
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '',
    status: 'offline',
  },
  {
    id: '3',
    name: 'Emily Davis',
    avatar: '',
    status: 'away',
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: '',
    status: 'online',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: '',
    status: 'offline',
  },
];

const generateMessages = (conversationId: string, count: number): IMessage[] => {
  const messages: IMessage[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (count - i) * 60000 * Math.random() * 60);
    messages.push({
      id: `${conversationId}-${i}`,
      senderId: Math.random() > 0.5 ? 'current-user' : conversationId,
      content: [
        'Hey there! How are you doing?',
        'I just wanted to check in and see how things are going.',
        'Did you see the latest news about the project?',
        'Thanks for your help earlier!',
        'Looking forward to our meeting tomorrow.',
        'Have a great day!',
        'Let me know if you need anything.',
        'The weather is amazing today!',
        'I found that document you were looking for.',
        'Can we schedule a call this week?',
      ][Math.floor(Math.random() * 10)],
      timestamp,
      type: Math.random() > 0.5 ? 'sent' : 'received',
    });
  }

  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const mockConversations: IConversation[] = users.map((user) => {
  const messages = generateMessages(user.id, Math.floor(Math.random() * 8) + 3);
  return {
    id: user.id,
    user,
    messages,
    lastMessage: messages[messages.length - 1],
    unreadCount: Math.floor(Math.random() * 4),
  };
});