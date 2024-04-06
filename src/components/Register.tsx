import { useRegister } from '../hooks/useRegister';
import { Form } from './Form';

export const Register = () => {
  const handleRegister = useRegister();

  return (
    <>
      <Form title="register" handleClick={handleRegister} />
    </>
  );
};
