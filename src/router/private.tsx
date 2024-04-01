import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectUrl: string;
  redirectCondition: boolean;
}

export function ProtectedRoute({ redirectUrl, redirectCondition }: ProtectedRouteProps) {
  if (redirectCondition) return <Navigate to={redirectUrl} replace />;

  return <Outlet />;
}
