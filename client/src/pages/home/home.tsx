import { AppRoute } from '@/libs/enums/enums.js';
import { useEffect } from '@/libs/hooks/hooks.js';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './libs/components/components';
import { useSocket } from '@/context/socket/socket.js';
import { toast } from 'react-toastify';

const HomePage = () => {
  const navigate = useNavigate();

  const { socket } = useSocket();

  useEffect(() => {
    const username = sessionStorage.getItem('username');

    if (username) {
      navigate(AppRoute.CHAT);
    }
  }, [navigate]);

  const handleFormFinish = (username: string) => {
    socket?.emit(
      'JOIN_ROOM',
      username,
      (payload: { isSuccess: boolean; message: string }) => {
        if (payload.isSuccess) {
          navigate(AppRoute.CHAT);
          sessionStorage.setItem('username', username);
        } else {
          toast.error(payload.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    );
  };

  return <LoginForm onFinish={handleFormFinish} />;
};
export { HomePage };
