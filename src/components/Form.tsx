import { FormProps } from '../redux/users/types';
import React, { useState } from 'react';

export const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Type in your email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type in your password"
      />
      <button onClick={() => handleClick(email, password)}>{title}</button>
    </div>
  );
};
