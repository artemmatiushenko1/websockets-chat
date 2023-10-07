import crypto from 'node:crypto';
import { CHAT_ROOM_KEY, ChatEvent, MessageType } from './constants.js';

const chatUsers = new Map();
const messages = [];

const getSocketByUsername = (targetUsername) => {
  for (const [socket, username] of chatUsers.entries()) {
    if (username === targetUsername) {
      return socket;
    }
  }

  return null;
};

export default (io, socket) => {
  const handleJoin = async (username, callback) => {
    const isUserAlreadyExists = getSocketByUsername(username);

    if (isUserAlreadyExists) {
      return callback({
        isSuccess: false,
        message: `User with name ${username} already exists!`,
      });
    } else {
      await socket.join(CHAT_ROOM_KEY);
      socket.data.username = username;
      chatUsers.set(socket, username);

      callback({ isSuccess: true });

      socket.to(CHAT_ROOM_KEY).emit(ChatEvent.NEW_MESSAGE, {
        timestamp: Date.now(),
        type: MessageType.SYSTEM,
        id: crypto.randomUUID(),
        content: `${username} joined the chat`,
      });
    }
  };

  const handleDisconnect = async () => {
    if (!chatUsers.get(socket)) {
      return;
    }

    await socket.leave(CHAT_ROOM_KEY);
    chatUsers.delete(socket);

    io.to(CHAT_ROOM_KEY).emit(ChatEvent.NEW_MESSAGE, {
      timestamp: Date.now(),
      type: MessageType.SYSTEM,
      id: crypto.randomUUID(),
      content: `${socket.data.username} left the chat`,
    });
  };

  const handlePostMessage = (messageContent) => {
    const newMessage = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: MessageType.USER,
      content: messageContent,
      username: socket.data.username,
    };

    messages.push(newMessage);
    socket.to(CHAT_ROOM_KEY).emit(ChatEvent.NEW_MESSAGE, newMessage);
  };

  socket.on('disconnect', handleDisconnect);
  socket.on(ChatEvent.JOIN, handleJoin);
  socket.on(ChatEvent.LEAVE, handleDisconnect);
  socket.on(ChatEvent.POST_MESSAGE, handlePostMessage);
};
