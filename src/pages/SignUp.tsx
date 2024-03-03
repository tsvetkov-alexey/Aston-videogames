import { Header } from '../components/Header';
import { Register } from '../components/Register';
import { Loader } from '../components/UI/Loader';
import React, { createContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

interface RegistrationLoadingProps {
  registrationLoading: boolean;
  setRegistrationLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegistrationContext = createContext<RegistrationLoadingProps | null>(null);

export const SignUp: React.FC = () => {
  const [registrationLoading, setRegistrationLoading] = useState(false);

  const contextValues = useMemo(
    () => ({ registrationLoading, setRegistrationLoading }),
    [registrationLoading],
  );

  return (
    <>
      {registrationLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="auth-form">
            <h1>Registration</h1>
            {/* Pass the memoized context values */}
            <RegistrationContext.Provider value={contextValues}>
              <Register />
            </RegistrationContext.Provider>
            <p className="authTransition">
              Already have an account? <Link to="/signIn">Sign in</Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};
