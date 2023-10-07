import { Icon } from '@/libs/components/components.js';
import { TMessage } from '@/libs/types/types.js';
import {
  useState,
  useRef,
  useEffect,
  useNavigate,
} from '@/libs/hooks/hooks.js';
import { Message, MessageForm } from './libs/components/components.js';
import { useSocket } from '@/context/socket/socket.js';
import { AppRoute } from '@/libs/enums/enums.js';
import { toast } from 'react-toastify';

const currentUserUsername = 'me';

const MOCK_MESSAGES = [
  {
    content: 'Hello Ruby',
    date: new Date().getTime(),
    username: 'me',
  },
  {
    content: 'Hello Artem',
    date: new Date().getTime(),
    username: 'Ruby',
  },
  {
    content: 'How are you? 🙂',
    date: new Date().getTime(),
    username: 'me',
  },
  {
    content: 'Hello Ruby',
    date: new Date().getTime(),
    username: 'me',
  },
  {
    content: 'Hello Artem',
    date: new Date().getTime(),
    username: 'Ruby',
  },
  {
    content: 'How are you? 🙂',
    date: new Date().getTime(),
    username: 'me',
  },
  {
    content: 'Hello Ruby',
    date: new Date().getTime(),
    username: 'me',
  },
  {
    content: 'Hello Artem',
    date: new Date().getTime(),
    username: 'Ruby',
  },
  {
    content: 'How are you? 🙂',
    date: new Date().getTime(),
    username: 'me',
  },
];

const ChatEvent = {
  LEAVE: 'LEAVE_CHAT',
  JOIN: 'JOIN_CHAT',
} as const;

const ChatPage = () => {
  const { socket } = useSocket();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  const [messages, setMessages] = useState<TMessage[]>(MOCK_MESSAGES);

  useEffect(() => {
    const username = sessionStorage.getItem('username');

    if (!username) {
      navigate(AppRoute.HOME);
      return;
    }

    console.log('render', socket);

    socket?.emit(
      ChatEvent.JOIN,
      username,
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
      }
    );

    return () => {
      socket?.emit(ChatEvent.LEAVE);
    };
  }, [socket, navigate]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scroll({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages.length]);

  const handleMessageFormFinish = (message: string) => {
    setMessages((prevState) => [
      ...prevState,
      {
        content: message,
        date: new Date().getTime(),
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
    <div className="w-1/3 flex flex-col h-[90vh] justify-center gap-5">
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
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <Message
              timestamp={message.date}
              content={message.content}
              username={message.username}
              isByCurrentUser={currentUserUsername === message.username}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center flex-[10%]">
        <MessageForm onFinish={handleMessageFormFinish} />
      </div>
    </div>
  );
};

export { ChatPage };
