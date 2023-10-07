import { AppRoute } from '@/libs/enums/enums.js';
import { useEffect } from '@/libs/hooks/hooks.js';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './libs/components/components';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem('username');

    if (username) {
      navigate(AppRoute.CHAT);
    }
  }, [navigate]);

  const handleFormFinish = (username: string) => {
    console.log({ username });
  };

  return <LoginForm onFinish={handleFormFinish} />;
};
export { HomePage };
