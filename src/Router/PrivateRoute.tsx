import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  onlyArtist?: boolean;
}

const PrivateRoute = ({ children, onlyArtist = false }: PrivateRouteProps) => {
  const { customer, isArtist, userSigned } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userSigned) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyArtist && !isArtist) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
