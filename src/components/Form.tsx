import { useEmailValidation } from '../hooks/useEmailValidation';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { FormProps } from '../redux/users/types';
import { Button, TextField } from '@mui/material';
import React from 'react';

export const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const { email, emailError, handleEmailChange } = useEmailValidation();
  const { password, passwordError, handlePasswordChange } = usePasswordValidation();

  return (
    <>
      <TextField
        id="outlined-email-input"
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        error={!!emailError}
        helperText={emailError}
        sx={{ width: '50%', margin: '20px auto' }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        sx={{ width: '50%', margin: '0 auto' }}
      />
      <Button
        variant="contained"
        sx={{ width: '50%', margin: '20px auto', background: '#203f7b' }}
        onClick={() => handleClick(email, password)}
        disabled={!email || !password || !!passwordError || !!emailError}>
        {title}
      </Button>
    </>
  );
};
