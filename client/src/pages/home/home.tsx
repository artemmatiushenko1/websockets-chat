import { AppRoute } from '@/libs/enums/enums.js';
import { useEffect, useNavigate } from '@/libs/hooks/hooks.js';
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
    sessionStorage.setItem('username', username);

    navigate(AppRoute.CHAT);
  };

  return <LoginForm onFinish={handleFormFinish} />;
};
export { HomePage };
