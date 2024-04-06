import { Login } from '../components/Login';
import { PageLoader } from '../components/UI/PageLoader';
import { selectFilter } from '../redux/filter/slice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const SignIn = () => {
  const { loginLoading } = useSelector(selectFilter);

  return (
    <>
      {loginLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="auth-form">
            <h1>Login</h1>
            <Login />
            <Link to="/signUp" className="authTransition">
              <p>Create an account </p>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
