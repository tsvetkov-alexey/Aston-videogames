import { PageLoader } from '../components/UI/PageLoader';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute } from './private';
import { authOnlyRoutes, noAuthRoutes, publicRoutes } from './routerConfig';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

export function Router() {
  const { isAuth } = useAuth();

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
