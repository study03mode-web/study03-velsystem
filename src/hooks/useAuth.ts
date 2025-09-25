import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';

export interface User {
  email: string;
  name: string;
}

export const useAuth = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me');
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      addToast({
        type: 'info',
        title: 'Signed out',
        message: 'You have been successfully signed out.',
      });
      navigate('/signin');
    },
    onError: () => {
      // Even if logout fails, clear local state and redirect
      queryClient.clear();
      navigate('/signin');
    },
  });
};

export const initiateGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`;
};