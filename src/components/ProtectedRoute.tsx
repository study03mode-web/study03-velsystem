import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isLoading, error } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-12 w-12 animate-pulse"></div>
              <div className="absolute inset-0 h-12 w-12 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-2">ExpenseTrace</div>
          <div className="text-sm text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return <Navigate to="/log-in-or-create-account" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}