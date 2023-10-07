type Props = {
  isByCurrentUser: boolean;
  username: string;
  content: string;
  timestamp: number;
};

const MAX_TIMEPART_LENGTH = 2;

const Message = ({ content, username, timestamp, isByCurrentUser }: Props) => {
  const date = new Date(timestamp);
  const timeString = `${date
    .getHours()
    .toString()
    .padStart(MAX_TIMEPART_LENGTH, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(MAX_TIMEPART_LENGTH, '0')}`;

  return (
    <div
      className={`flex flex-col gap-2 w-full ${
        isByCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`inline-block rounded-xl text-white px-5 max-w-1/2 overflow-hidden ${
          isByCurrentUser
            ? 'self-end bg-gradient-to-r from-sky-500 to-indigo-500 rounded-br-none py-2 text-right'
            : 'self-start bg-sky-300 rounded-bl-none py-2 text-left'
        }`}
      >
        {!isByCurrentUser && (
          <div className="font-bold text-xs">{username}</div>
        )}
        <div className="break-words">{content}</div>
        <div className="text-[10px]">{timeString}</div>
      </div>
    </div>
  );
};

export { Message };
