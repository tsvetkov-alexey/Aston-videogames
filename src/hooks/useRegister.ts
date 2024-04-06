import { setRegistrationLoading } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { setUser } from '../redux/users/slice';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    dispatch(setRegistrationLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .catch(() => alert('Something went wrong'))
      .finally(() => dispatch(setRegistrationLoading(false)));
  };

  return handleRegister;
}
