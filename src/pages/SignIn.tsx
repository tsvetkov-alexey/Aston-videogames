import { Header } from '../components/Header';
import { Login } from '../components/Login';
import React from 'react';
import { Link } from 'react-router-dom';

export const SignIn: React.FC = () => {
  return (
    <>
      <Header />
      <h1>Login</h1>
      <Login />
      <Link to="/signUp">
        <p>Create an account </p>
      </Link>
    </>
  );
};
