import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const originPath = (location.state as { from?: string })?.from || '/movies';

    return <Navigate to={originPath} replace />;
  }

  return <Outlet />;
};
