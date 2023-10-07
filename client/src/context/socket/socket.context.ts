import { type Socket } from 'socket.io-client';
import { createContext, useContext } from 'react';

type SocketContextValue = { socket: Socket | null };

const SocketContext = createContext<SocketContextValue>({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

export { SocketContext, type SocketContextValue, useSocket };
