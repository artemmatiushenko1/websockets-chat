import { Icon, Message, MessageForm } from '@/libs/components/components.js';
import { TMessage } from '@/libs/types/types.js';
import { useState, useRef, useEffect } from '@/libs/hooks/hooks.js';

const currentUserUsername = 'me';

const ChatPage = () => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<TMessage[]>([
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
  ]);

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

  return (
    <div className="w-1/3 flex flex-col h-[90vh] justify-center gap-5">
      <div className="flex justify-start">
        <button className="flex gap-2 items-center text-sky-500">
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
