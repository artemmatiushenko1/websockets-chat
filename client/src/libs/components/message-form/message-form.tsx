import { Icon } from '../icon/icon';
import { useState } from '@/libs/hooks/hooks';

type Props = {
  onFinish: (message: string) => void;
};

const MessageForm = ({ onFinish }: Props) => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    onFinish(message);
    setMessage('');
  };

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form className="w-full flex relative" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={message}
        placeholder="Type your message..."
        onChange={handleMessageInputChange}
        className="flex-1 px-6 py-3 pr-[70px] rounded-full h-[70px] shadow-xl outline-none"
      />
      <button
        type="submit"
        className="absolute flex items-center justify-center right-2 text-white top-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 h-[50px] w-[50px] rounded-full hover:bg-sky-300 active:scale-95 transition-transform"
      >
        <Icon iconName="chevronRight" />
      </button>
    </form>
  );
};

export { MessageForm };
