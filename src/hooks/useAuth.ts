import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPost, apiGet } from '../services/apiClient';
import { User, OTPVerification } from '../types/auth';

// Auth API endpoints
const ENDPOINTS = {
  GENERATE_OTP: '/auth/otp/generate',
  VERIFY_OTP: '/auth/user/verify-otp',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
};

// Query keys
export const AUTH_QUERY_KEYS = {
  ME: 'auth-me',
} as const;

// Auth hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: [AUTH_QUERY_KEYS.ME],
    queryFn: async () => {
      const response = await apiGet<{ data: User }>('/auth/me');
      return response;
    },
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const useGenerateOTP = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiPost<any>('/auth/otp/generate', { email });
      return response;
    },
  });
};

export const useVerifyOTP = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OTPVerification) => {
      const response = await apiPost<any>('/auth/user/sign-in/verify-otp', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEYS.ME] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await apiPost<any>('/auth/logout');
      return response;
    },
    onSuccess: () => {
      queryClient.clear();
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      queryClient.clear();
    },
  });
};