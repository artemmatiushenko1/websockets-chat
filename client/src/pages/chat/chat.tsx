import { Icon } from '@/libs/components/components.js';
import { TAppMessage } from '@/libs/types/types.js';
import {
  useState,
  useRef,
  useEffect,
  useNavigate,
  useCallback,
} from '@/libs/hooks/hooks.js';
import { Message, MessageForm } from './libs/components/components.js';
import { useSocket } from '@/context/socket/socket.js';
import { AppRoute } from '@/libs/enums/enums.js';
import { toast } from 'react-toastify';

const ChatEvent = {
  LEAVE: 'LEAVE_CHAT',
  JOIN: 'JOIN_CHAT',
  NEW_MESSAGE: 'NEW_MESSAGE',
  POST_MESSAGE: 'POST_MESSAGE',
} as const;

const MessageType = {
  USER: 'user',
  SYSTEM: 'system',
} as const;

const ChatPage = () => {
  const { socket } = useSocket();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  const [messages, setMessages] = useState<TAppMessage[]>([]);

  const currentUserUsername = sessionStorage.getItem('username') ?? '';

  const handleNewMessage = useCallback((newMessage: TAppMessage) => {
    setMessages((prevState) => [...prevState, newMessage]);
  }, []);

  const handleJoinChat = useCallback(
    (payload: { isSuccess: boolean; message: string }) => {
      if (payload.isSuccess) {
        setIsConnected(true);
      } else {
        toast.error(payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        sessionStorage.removeItem('username');

        navigate(AppRoute.HOME);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!currentUserUsername) {
      navigate(AppRoute.HOME);
      return;
    }

    if (!isConnected) {
      socket?.emit(ChatEvent.JOIN, currentUserUsername, handleJoinChat);
    }

    return () => {
      if (isConnected) {
        socket?.emit(ChatEvent.LEAVE);
        setIsConnected(false);
      }
    };
  }, [socket, navigate, currentUserUsername, isConnected, handleJoinChat]);

  useEffect(() => {
    socket?.on(ChatEvent.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket?.off(ChatEvent.NEW_MESSAGE, handleNewMessage);
    };
  }, [socket, handleNewMessage]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages.length]);

  const handleMessageFormFinish = (message: string) => {
    socket?.emit(ChatEvent.POST_MESSAGE, message);

    setMessages((prevState) => [
      ...prevState,
      {
        content: message,
        type: MessageType.USER,
        timestamp: Date.now(),
        id: crypto.randomUUID(),
        username: currentUserUsername,
      },
    ]);
  };

  const handleLeaveButtonClick = () => {
    sessionStorage.removeItem('username');

    navigate(AppRoute.HOME);
  };

  if (!isConnected) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-[90vh] justify-center gap-5 max-w-[500px] w-full">
      <div className="flex justify-start">
        <button
          onClick={handleLeaveButtonClick}
          className="flex gap-2 items-center text-sky-500"
        >
          <Icon iconName="chevronLeft" />
          <span>Leave</span>
        </button>
      </div>
      <div
        ref={messagesContainerRef}
        className="flex-[90%] flex flex-col-reverse overflow-auto"
      >
        {messages.length ? (
          <div className="flex flex-col gap-2">
            {messages.map((message) => {
              if (message.type === 'user') {
                return (
                  <Message
                    key={message.id}
                    content={message.content}
                    username={message.username}
                    timestamp={message.timestamp}
                    isByCurrentUser={currentUserUsername === message.username}
                  />
                );
              }

              if (message.type === 'system') {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="bg-sky-100 text-sky-400 px-3 py-1 rounded-full text-sm">
                      {message.content}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-300">
            No messages yet
          </div>
        )}
      </div>
      <div className="flex items-center justify-center flex-[10%]">
        <MessageForm onFinish={handleMessageFormFinish} />
      </div>
    </div>
  );
};

export { ChatPage };
