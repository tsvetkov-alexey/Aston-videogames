import { useState } from 'react';

export const usePasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('The length of your password must be 6 or even more symbols');
    } else {
      setPasswordError('');
    }
  };

  return {
    password,
    passwordError,
    handlePasswordChange,
  };
};
