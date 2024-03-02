import logo from '../assets/img/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>PlaySphere</h1>
      </div>
      <div className="auth">
        <ul>
          <Link to="/signIn">
            <li>Sign in</li>
          </Link>
          <Link to="/signUp">
            <li>Sing up</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};
