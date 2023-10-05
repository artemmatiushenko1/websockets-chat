import { Routes, Route } from 'react-router-dom';
import { HomePage, ChatPage } from './pages/pages.js';

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-sky-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
