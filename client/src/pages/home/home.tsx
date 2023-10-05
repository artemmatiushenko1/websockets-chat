import { Icon } from '@/libs/components/components.js';

const HomePage = () => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center gap-3 max-w-sm w-full h-12"
    >
      <input
        type="text"
        placeholder="Enter your username..."
        className="w-full px-8 outline-none rounded-full rounded-br-none rounded-tr-none"
      />
      <button className="rounded-full rounded-bl-none rounded-tl-none bg-gradient-to-r from-sky-500 to-indigo-500 px-4 text-white gap-3 shrink-0 flex items-center justify-center">
        <Icon iconName="plus" />
        <span>Join</span>
      </button>
    </form>
  );
};
export { HomePage };
