import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. While the AuthContext is checking for a token, show a loading message.
  //    This prevents a flicker where the user is briefly redirected to /signin.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 2. If loading is finished and the user is not authenticated, redirect to the sign-in page.
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // 3. If the user is authenticated, render the page content.
  return <>{children}</>;
};

export default ProtectedRoute;