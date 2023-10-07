import { createServer } from 'http';
import { Server } from 'socket.io';
import crypto from 'node:crypto';

const PORT = 3001;
const CHAT_ROOM_KEY = 'chat';

const CHAT_EVENT = {
  JOIN: 'JOIN_CHAT',
  LEAVE: 'LEAVE_CHAT',
  NEW_MESSAGE: 'NEW_MESSAGE',
  POST_MESSAGE: 'POST_MESSAGE',
};

const httpServer = createServer();
const io = new Server(httpServer);

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

io.on('connection', (socket) => {
  socket.on(CHAT_EVENT.JOIN, async (username, callback) => {
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
      return callback({ isSuccess: true });
    }
  });

  const handleDisconnect = async () => {
    await socket.leave(CHAT_ROOM_KEY);
    chatUsers.delete(socket);
  };

  socket.on(CHAT_EVENT.LEAVE, handleDisconnect);
  socket.on('disconnect', handleDisconnect);

  socket.on(CHAT_EVENT.POST_MESSAGE, (messageContent) => {
    const newMessage = {
      id: crypto.randomUUID(),
      content: messageContent,
      username: socket.data.username,
      timestamp: new Date().getTime(),
    };

    messages.push(newMessage);

    socket.to(CHAT_ROOM_KEY).emit(CHAT_EVENT.NEW_MESSAGE, newMessage);
  });
});

httpServer.listen(PORT);
