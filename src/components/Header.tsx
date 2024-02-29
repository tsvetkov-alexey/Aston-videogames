import logo from '../assets/img/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <Link to={'/'}>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>PlaySphere</h1>
        </div>
      </Link>
      <div className="auth">
        <ul>
          <li>Sign in</li>
          <li>Sing up</li>
        </ul>
      </div>
    </header>
  );
};
