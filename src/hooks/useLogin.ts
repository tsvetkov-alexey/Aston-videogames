import { fetchFavouriteGames } from '../redux/favourite/slice';
import { setLoginLoading, setSearchValue } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { selectUserData, setUser } from '../redux/users/slice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useSelector(selectUserData);

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    dispatch(setLoginLoading(true));
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
      .finally(() => dispatch(setLoginLoading(false)));
    if (id) {
      dispatch(fetchFavouriteGames(id));
    }
  };

  return handleLogin;
}
