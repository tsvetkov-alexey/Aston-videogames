import { Register } from '../components/Register';
import { PageLoader } from '../components/UI/PageLoader';
import { selectFilter } from '../redux/filter/slice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const { registrationLoading } = useSelector(selectFilter);

  return (
    <>
      {registrationLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="auth-form">
            <h1>Registration</h1>
            <Register />
            <p className="authTransition">
              Already have an account? <Link to="/signIn">Sign in</Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};
