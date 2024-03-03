import { LoginContext } from '../pages/SignIn';
import { useAppDispatch } from '../redux/store';
import { setUser } from '../redux/users/slice';
import { Form } from './Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let context = useContext(LoginContext);

  if (!context) {
    return null;
  }

  const { setLoginLoading } = context;

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    setLoginLoading(true);
    signInWithEmailAndPassword(auth, email, password)
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
      .catch(() => alert('Invalid user'))
      .finally(() => setLoginLoading(false));
  };

  return <Form title="sign in" handleClick={handleLogin} />;
};
