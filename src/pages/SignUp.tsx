import { Header } from '../components/Header';
import { Register } from '../components/Register';
import React from 'react';
import { Link } from 'react-router-dom';

export const SignUp: React.FC = () => {
  return (
    <>
      <Header />
      <h1>Register</h1>
      <Register />
      <p>
        Already have an account? <Link to="/signIn">Sign in</Link>
      </p>
    </>
  );
};
