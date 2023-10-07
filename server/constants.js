const CHAT_ROOM_KEY = 'chat';

const ChatEvent = {
  JOIN: 'JOIN_CHAT',
  LEAVE: 'LEAVE_CHAT',
  NEW_MESSAGE: 'NEW_MESSAGE',
  POST_MESSAGE: 'POST_MESSAGE',
};

const MessageType = {
  USER: 'user',
  SYSTEM: 'system',
};

export { CHAT_ROOM_KEY, ChatEvent, MessageType };
