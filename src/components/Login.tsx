import { useLogin } from '../hooks/useLogin';
import { Form } from './Form';

export const Login = () => {
  const handleLogin = useLogin();

  return <Form title="sign in" handleClick={handleLogin} />;
};
