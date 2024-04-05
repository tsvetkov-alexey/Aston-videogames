import { useAppDispatch } from '../redux/store';
import { removeUser, selectUserData, setUser } from '../redux/users/slice';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useAuth() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const { email, token, id } = useSelector(selectUserData);
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert(`Error signing out: ${error}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    isAuth: !!email,
    email,
    token,
    id,
    loading,
    signOut,
  };
}
