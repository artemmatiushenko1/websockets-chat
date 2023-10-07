import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = 3001;
const CHAT_ROOM_KEY = 'chat';

const CHAT_EVENT = {
  JOIN: 'JOIN_CHAT',
  LEAVE: 'LEAVE_CHAT',
};

const httpServer = createServer();
const io = new Server(httpServer);

const chatUsers = new Map();

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
});

httpServer.listen(PORT);
