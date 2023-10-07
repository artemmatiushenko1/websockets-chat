import { SocketContext } from './socket.context.js';
import { useEffect, useState } from '@/libs/hooks/hooks.js';
import { io, Socket } from 'socket.io-client';

type Props = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io('/', { transports: ['websocket'] });
    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
