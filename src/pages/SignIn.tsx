import { Login } from '../components/Login';
import { PageLoader } from '../components/UI/PageLoader';
import React, { createContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginLoadingProps {
  loginLoading: boolean;
  setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginLoadingProps | null>(null);

export const SignIn: React.FC = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const contextValues = useMemo(() => ({ loginLoading, setLoginLoading }), [loginLoading]);

  return (
    <>
      {loginLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="auth-form">
            <h1>Login</h1>
            <LoginContext.Provider value={contextValues}>
              <Login />
            </LoginContext.Provider>
            <Link to="/signUp" className="authTransition">
              <p>Create an account </p>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
