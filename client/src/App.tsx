import { Icon, Message, MessageForm } from './libs/components/components';
import { TMessage } from './libs/types/types';

const ChatContainer = () => {
  const currentUserId = 1;

  const messages: TMessage[] = [
    {
      content: 'Hello Ruby',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Artem',
      userId: 2,
      date: new Date().getTime(),
      username: 'Ruby',
    },
    {
      content: 'How are you? 🙂',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Ruby',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Artem',
      userId: 2,
      date: new Date().getTime(),
      username: 'Ruby',
    },
    {
      content: 'How are you? 🙂',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Ruby',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Artem',
      userId: 2,
      date: new Date().getTime(),
      username: 'Ruby',
    },
    {
      content: 'How are you? 🙂',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Ruby',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Artem',
      userId: 2,
      date: new Date().getTime(),
      username: 'Ruby',
    },
    {
      content: 'How are you? 🙂',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Ruby',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Artem',
      userId: 2,
      date: new Date().getTime(),
      username: 'Ruby',
    },
    {
      content: 'How are you? 🙂',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Ruby',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
    {
      content: 'Hello Artem',
      userId: 2,
      date: new Date().getTime(),
      username: 'Ruby',
    },
    {
      content: 'How are you? 🙂',
      userId: 1,
      date: new Date().getTime(),
      username: 'me',
    },
  ];

  return (
    <div className="w-1/3 flex flex-col h-[90vh] justify-center gap-5">
      <div className="flex justify-start">
        <button className="flex gap-2 items-center text-sky-500">
          <Icon iconName="chevronLeft" />
          <span>Leave</span>
        </button>
      </div>
      <div className="flex-[90%] flex flex-col-reverse max-h-[90vh] overflow-auto">
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <Message
              content={message.content}
              username={message.username}
              isByCurrentUser={currentUserId === message.userId}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center flex-[10%]">
        <MessageForm />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-sky-50">
      <ChatContainer />
    </div>
  );
};

export default App;
