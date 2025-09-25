import { Navigate } from 'react-router-dom';
import { usePasswordReset } from '../contexts/PasswordResetContext';

interface ProtectedPasswordResetRouteProps {
  children: React.ReactNode;
}

export default function ProtectedPasswordResetRoute({ children }: ProtectedPasswordResetRouteProps) {
  const { otpVerified } = usePasswordReset();

  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  return <>{children}</>;
}