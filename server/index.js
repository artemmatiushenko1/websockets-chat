import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = 3001;

const httpServer = createServer();
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(socket);
});

httpServer.listen(PORT);
