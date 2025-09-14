import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { 
  ScheduledTransaction, 
  CreateScheduledTransactionData, 
  UpdateScheduledTransactionData,
  PaginatedScheduledTransactions
} from '../types/scheduledTransaction';

// Get upcoming scheduled transactions with pagination
export const useUpcomingScheduledTransactions = (page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedScheduledTransactions>({
    queryKey: ['scheduled-transactions', 'upcoming', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/schedules/upcoming?page=${page}&size=${size}`);
      return response.data || {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: size,
        number: page,
        first: true,
        last: true
      };
    },
    enabled,
  });
};

// Get completed scheduled transactions with pagination
export const useCompletedScheduledTransactions = (page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedScheduledTransactions>({
    queryKey: ['scheduled-transactions', 'completed', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/schedules/completed?page=${page}&size=${size}`);
      return response.data || {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: size,
        number: page,
        first: true,
        last: true
      };
    },
    enabled,
  });
};

// Get scheduled transaction by ID
export const useScheduledTransaction = (id: string) => {
  return useQuery<ScheduledTransaction>({
    queryKey: ['scheduled-transaction', id],
    queryFn: async () => {
      const response = await apiClient.get(`/schedules/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create scheduled transaction
export const useCreateScheduledTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateScheduledTransactionData & { transactionType: 'expense' | 'income' | 'transfer' }) => {
      const { transactionType, ...scheduleData } = data;
      
      let endpoint = '/schedules/expense';
      if (transactionType === 'income') {
        endpoint = '/schedules/incoming';
      } else if (transactionType === 'transfer') {
        endpoint = '/schedules/transfer';
      }
      
      const response = await apiClient.post(endpoint, scheduleData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-transactions'] });
      addToast({
        type: 'success',
        message: 'Scheduled transaction created'
      });
      navigate('/scheduled');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create scheduled transaction'
      });
    },
  });
};

// Update scheduled transaction
export const useUpdateScheduledTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data, transactionType }: { 
      id: string; 
      data: UpdateScheduledTransactionData; 
      transactionType: 'expense' | 'income' | 'transfer' 
    }) => {
      let endpoint = `/schedules/expense`;
      if (transactionType === 'income') {
        endpoint = `/schedules/incoming`;
      } else if (transactionType === 'transfer') {
        endpoint = `/schedules/transfer`;
      }
      
      const response = await apiClient.put(endpoint, { id, ...data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-transactions'] });
      addToast({
        type: 'success',
        message: 'Scheduled transaction updated'
      });
      navigate('/scheduled');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update scheduled transaction'
      });
    },
  });
};

// Delete scheduled transaction
export const useDeleteScheduledTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/schedules/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-transactions'] });
      addToast({
        type: 'success',
        message: 'Scheduled transaction deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete scheduled transaction'
      });
    },
  });
};