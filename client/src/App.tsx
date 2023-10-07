import { Routes, Route } from 'react-router-dom';
import { HomePage, ChatPage } from './pages/pages.js';
import { useEffect } from './libs/hooks/hooks.js';
import { io } from 'socket.io-client';
import { AppRoute } from './libs/enums/enums.js';

const App = () => {
  useEffect(() => {
    io('/', { transports: ['websocket'] });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-sky-50">
      <Routes>
        <Route path={AppRoute.HOME} element={<HomePage />} />
        <Route path={AppRoute.CHAT} element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
