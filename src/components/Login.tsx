import { useAppDispatch } from '../redux/store';
import { setUser } from '../redux/users/slice';
import { Form } from './Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .catch(() => alert('Invalid user'));
  };

  return <Form title="sign in" handleClick={handleLogin} />;
};
