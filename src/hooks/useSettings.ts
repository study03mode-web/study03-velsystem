import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { 
  UserSettings
} from '../types/settings';

// Get user settings
export const useSettings = (enabled = true) => {
  return useQuery<UserSettings>({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await apiClient.get('/settings');
      return response.data.data;
    },
    enabled
  });
};

// Update time format
export const useUpdateTimeFormat = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (formatCode: number) => {
      const response = await apiClient.patch(`/settings/time-format?formatCode=${formatCode}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      addToast({
        type: 'success',
        message: 'Time format updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update time format'
      });
    },
  });
};

// Update decimal format
export const useUpdateDecimalFormat = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (decimalCode: number) => {
      const response = await apiClient.patch(`/settings/decimal-format?decimalCode=${decimalCode}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      addToast({
        type: 'success',
        message: 'Decimal format updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update decimal format'
      });
    },
  });
};

// Update number format
export const useUpdateNumberFormat = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (formatCode: number) => {
      const response = await apiClient.patch(`/settings/number-format?formatCode=${formatCode}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      addToast({
        type: 'success',
        message: 'Number format updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update number format'
      });
    },
  });
};

// Update currency code
export const useUpdateCurrencyCode = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (currencyCode: string) => {
      const response = await apiClient.patch(`/settings/currency-code?currencyCode=${currencyCode}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      addToast({
        type: 'success',
        message: 'Currency updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update currency'
      });
    },
  });
};

// Update daily reminder
export const useUpdateDailyReminder = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (dailyReminder: boolean) => {
      const response = await apiClient.patch(`/settings/daily-reminder?dailyReminder=${dailyReminder}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      addToast({
        type: 'success',
        message: 'Daily reminder updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update daily reminder'
      });
    },
  });
};

// Clear all data
export const useClearAllData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete('/settings/data');
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      addToast({
        type: 'success',
        message: 'Data cleared'
      });
      navigate('/dashboard');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to clear data'
      });
    },
  });
};

// Delete account
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete('/settings/account');
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      addToast({
        type: 'info',
        message: 'Account deleted'
      });
      navigate('/signin');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete account'
      });
    },
  });
};