type TBaseMessage = {
  id: string;
  content: string;
  timestamp: number;
};

type TSystemMessage = TBaseMessage & {
  type: 'system';
};

type TUserMessage = TBaseMessage & {
  type: 'user';
  username: string;
};

type TAppMessage = TSystemMessage | TUserMessage;

export { type TAppMessage };
