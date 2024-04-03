import { PageLoader } from '../components/UI/PageLoader';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../redux/store';
import { removeUser, setUser } from '../redux/users/slice';
import { ProtectedRoute } from './private';
import { authOnlyRoutes, noAuthRoutes, publicRoutes } from './routerConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

export function Router() {
  const auth = getAuth();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

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
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}

        <Route element={<ProtectedRoute redirectUrl="/" redirectCondition={isAuth} />}>
          {noAuthRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Route>

        <Route element={<ProtectedRoute redirectUrl="/signIn" redirectCondition={!isAuth} />}>
          {authOnlyRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
