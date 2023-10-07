import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = 3001;
const CHAT_ROOM_KEY = 'chat';

const httpServer = createServer();
const io = new Server(httpServer);

const chatUsers = new Map();

io.on('connection', (socket) => {
  socket.on('JOIN_ROOM', async (username, callback) => {
    if (chatUsers.has(username)) {
      callback({
        isSuccess: false,
        message: `User with name ${username} already exists!`,
      });
    } else {
      await socket.join(CHAT_ROOM_KEY);
      chatUsers.set(socket, username);
      callback({ isSuccess: true });
    }
  });
});

httpServer.listen(PORT);
