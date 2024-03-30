import { useAuth } from '../hooks/useAuth';
import { LoginContext } from '../pages/SignIn';
import { fetchFavouriteGames } from '../redux/favourite/slice';
import { setSearchValue } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { setUser } from '../redux/users/slice';
import { Form } from './Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useAuth();

  let context = useContext(LoginContext);

  if (!context) {
    return null;
  }

  const { setLoginLoading } = context;

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    setLoginLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
        dispatch(setSearchValue(''));
      })
      .catch(() => alert('Invalid user'))
      .finally(() => setLoginLoading(false));
    if (id) {
      dispatch(fetchFavouriteGames(id));
    }
  };

  return <Form title="sign in" handleClick={handleLogin} />;
};
