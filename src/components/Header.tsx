import logo from '../assets/img/logo.png';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>PlaySphere</h1>
      </div>
      <div className="auth">
        <ul>
          <li>Sign in</li>
          <li>Sing up</li>
        </ul>
      </div>
    </header>
  );
};
