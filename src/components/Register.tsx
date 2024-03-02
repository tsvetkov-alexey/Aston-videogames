import { setUser } from '../redux/users/slice';
import { Form } from './Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
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
      .catch(() => alert('Something went wrong'));
  };

  return <Form title="register" handleClick={handleRegister} />;
};
