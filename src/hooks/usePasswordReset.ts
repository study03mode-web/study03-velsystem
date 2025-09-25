import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { usePasswordReset } from '../contexts/PasswordResetContext';
import apiClient from '../lib/axios';

interface ForgotPasswordData {
  email: string;
}

interface VerifyOtpData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  newPassword: string;
}

// Send OTP to email
export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setEmail } = usePasswordReset();

  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await apiClient.post(`/auth/password/forgot?email=${encodeURIComponent(data.email)}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      setEmail(variables.email);
      addToast({
        type: 'success',
        message: 'OTP sent'
      });
      navigate('/verify-otp');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to send OTP'
      });
    },
  });
};

// Verify OTP
export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setOtpVerified } = usePasswordReset();

  return useMutation({
    mutationFn: async (data: VerifyOtpData) => {
      const response = await apiClient.post(
        `/auth/password/verify-otp?otp=${encodeURIComponent(data.otp)}`
      );
      return response.data;
    },
    onSuccess: () => {
      setOtpVerified(true);
      addToast({
        type: 'success',
        message: 'OTP verified'
      });
      navigate('/reset-password');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Invalid OTP'
      });
    },
  });
};

// Reset password
export const useResetPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { clearState } = usePasswordReset();

  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await apiClient.post(
        `/auth/password/reset?password=${encodeURIComponent(data.newPassword)}`
      );
      return response.data;
    },
    onSuccess: () => {
      clearState();
      addToast({
        type: 'success',
        message: 'Password reset successful'
      });
      navigate('/signin');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to reset password'
      });
    },
  });
};