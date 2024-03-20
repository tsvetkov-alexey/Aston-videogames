import { selectUserData } from '../redux/users/selectors';
import { useSelector } from 'react-redux';

export function useAuth() {
  const { email, token, id } = useSelector(selectUserData);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
