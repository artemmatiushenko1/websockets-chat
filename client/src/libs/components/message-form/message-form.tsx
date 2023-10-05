import { Icon } from '../icon/icon';

const MessageForm = () => {
  return (
    <form className="w-full flex relative">
      <input
        type="text"
        placeholder="Type your message..."
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
