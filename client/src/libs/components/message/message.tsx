type Props = {
  isByCurrentUser: boolean;
  username: string;
  content: string;
};

const Message = ({ isByCurrentUser, content, username }: Props) => {
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

export { Message };
