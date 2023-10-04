import './App.css';

type MessageProperties = {
  isByCurrentUser: boolean;
  username: string;
  content: string;
};

const Message = ({ isByCurrentUser, content, username }: MessageProperties) => {
  return (
    <div
      className={`flex flex-col gap-2 w-full ${
        isByCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`inline-block rounded-full text-white px-5 ${
          isByCurrentUser
            ? 'self-end bg-gradient-to-r from-sky-500 to-indigo-500 rounded-br-none py-2'
            : 'self-start bg-sky-300 rounded-bl-none py-2'
        }`}
      >
        {!isByCurrentUser && (
          <div className="font-bold text-xs">{username}</div>
        )}
        <div>{content}</div>
      </div>
    </div>
  );
};

type Message = {
  userId: number;
  username: string;
  content: string;
  date: number;
};

const ChatContainer = () => {
  const currentUserId = 1;

  const messages: Message[] = [
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
    <div className="w-1/2 flex flex-col h-[90vh] justify-center gap-5">
      <div className="flex justify-start">
        <div>Leave</div>
      </div>
      <div className="grow-[9] flex flex-col-reverse max-h-[90vh] overflow-auto">
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
      <div className="flex items-center justify-center grow-[1]">
        <form className="w-2/3 flex relative">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-6 py-3 pr-[70px] rounded-full h-[70px] shadow-xl outline-none"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 h-[50px] w-[50px] rounded-full hover:bg-sky-300 active:scale-95 transition-transform"
            type="submit"
          >
            ✈
          </button>
        </form>
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
