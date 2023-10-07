import { createServer } from 'http';
import { Server } from 'socket.io';
import registerChatHandlers from './chat-handlers.js';

const PORT = 3001;

const httpServer = createServer();
const io = new Server(httpServer);

const onConnection = (socket) => {
  registerChatHandlers(io, socket);
};

io.on('connection', onConnection);

httpServer.listen(PORT);
