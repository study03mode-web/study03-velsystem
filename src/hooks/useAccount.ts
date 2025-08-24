import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut } from '../services/apiClient';

// Account API endpoints
const ENDPOINTS = {
  ACCOUNT: '/account',
  UPDATE_INFO: '/account/info',
  EMAIL_REQUEST_OTP: '/account/email/request-otp',
  EMAIL_VERIFY_OTP: '/account/email/verify-otp',
  PHONE_REQUEST_OTP: '/account/phone/request-otp',
  PHONE_VERIFY_OTP: '/account/phone/verify-otp',
};

// Query keys
export const ACCOUNT_QUERY_KEYS = {
  INFO: 'account-info',
} as const;

// Types
export interface AccountInfo {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
}

export interface UpdatePersonalInfoRequest {
  firstName: string;
  lastName: string;
  gender: string;
}

export interface EmailUpdateRequest {
  newEmail: string;
}

export interface PhoneUpdateRequest {
  newPhoneNumber: string;
}

export interface OTPVerificationRequest {
  identifier: string;
  otp: string;
  requestId: string;
}

// Account hooks
export const useAccountInfo = () => {
  return useQuery({
    queryKey: [ACCOUNT_QUERY_KEYS.INFO],
    queryFn: async () => {
      const response = await apiGet<AccountInfo>(ENDPOINTS.ACCOUNT);
      return response;
    },
  });
};

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdatePersonalInfoRequest) => {
      const response = await apiPut<AccountInfo>(ENDPOINTS.UPDATE_INFO, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEYS.INFO] });
      queryClient.invalidateQueries({ queryKey: ['auth-me'] });
    },
  });
};

export const useRequestEmailOTP = () => {
  return useMutation({
    mutationFn: async (data: EmailUpdateRequest) => {
      const response = await apiPost<any>(ENDPOINTS.EMAIL_REQUEST_OTP, data);
      return response;
    },
  });
};

export const useVerifyEmailOTP = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OTPVerificationRequest) => {
      const response = await apiPost<AccountInfo>(ENDPOINTS.EMAIL_VERIFY_OTP, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEYS.INFO] });
      queryClient.invalidateQueries({ queryKey: ['auth-me'] });
    },
  });
};

export const useRequestPhoneOTP = () => {
  return useMutation({
    mutationFn: async (data: PhoneUpdateRequest) => {
      const response = await apiPost<any>(ENDPOINTS.PHONE_REQUEST_OTP, data);
      return response;
    },
  });
};

export const useVerifyPhoneOTP = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OTPVerificationRequest) => {
      const response = await apiPost<AccountInfo>(ENDPOINTS.PHONE_VERIFY_OTP, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_QUERY_KEYS.INFO] });
      queryClient.invalidateQueries({ queryKey: ['auth-me'] });
    },
  });
};