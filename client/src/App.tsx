import { Routes, Route } from 'react-router-dom';
import { HomePage, ChatPage } from './pages/pages.js';
import { AppRoute } from './libs/enums/enums.js';
import { SocketProvider } from './context/socket/socket.js';

const App = () => {
  return (
    <SocketProvider>
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-sky-50">
        <Routes>
          <Route path={AppRoute.HOME} element={<HomePage />} />
          <Route path={AppRoute.CHAT} element={<ChatPage />} />
        </Routes>
      </div>
    </SocketProvider>
  );
};

export default App;
