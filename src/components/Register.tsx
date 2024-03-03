import { RegistrationContext } from '../pages/SignUp';
import { setUser } from '../redux/users/slice';
import { Form } from './Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let context = useContext(RegistrationContext);

  if (!context) {
    return null;
  }

  const { setRegistrationLoading } = context;

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    setRegistrationLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .catch(() => alert('Something went wrong'))
      .finally(() => setRegistrationLoading(false));
  };

  return (
    <>
      <Form title="register" handleClick={handleRegister} />
    </>
  );
};
