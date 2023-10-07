import { AppRoute } from '@/libs/enums/enums.js';
import { useEffect, useNavigate } from '@/libs/hooks/hooks.js';
import { LoginForm } from './libs/components/components.js';
import { USERNAME_SESSION_KEY } from '@/libs/constants/constants.js';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem(USERNAME_SESSION_KEY);

    if (username) {
      navigate(AppRoute.CHAT);
    }
  }, [navigate]);

  const handleFormFinish = (username: string) => {
    sessionStorage.setItem(USERNAME_SESSION_KEY, username);

    navigate(AppRoute.CHAT);
  };

  return <LoginForm onFinish={handleFormFinish} />;
};
export { HomePage };
