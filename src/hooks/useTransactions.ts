import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { 
  Transaction, 
  CreateTransactionData, 
  UpdateTransactionData,
  PaginatedTransactions,
  TransactionFilters
} from '../types/transaction';

// Get all transactions with pagination
export const useTransactions = (page = 0, size = 10, filters?: TransactionFilters) => {
  return useQuery<PaginatedTransactions>({
    queryKey: ['transactions', page, size, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (filters?.search) params.append('search', filters.search);
      if (filters?.categoryId) params.append('categoryId', filters.categoryId);
      if (filters?.accountId) params.append('accountId', filters.accountId);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const response = await apiClient.get(`/transactions/all?${params.toString()}`);
      return response.data.data || {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: size,
        number: page,
        first: true,
        last: true
      };
    },
  });
};

// Get transaction by ID
export const useTransaction = (id: string) => {
  return useQuery<Transaction>({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Create transaction
export const useCreateTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateTransactionData & { transactionType: 'expense' | 'income' | 'transfer' }) => {
      const { transactionType, ...transactionData } = data;
      let endpoint = '/transactions/expense';
      
      if (transactionType === 'income') {
        endpoint = '/transactions/income';
      } else if (transactionType === 'transfer') {
        endpoint = '/transactions/transfer';
        // For transfer, map accountId to fromAccountId
        const transferData = {
          ...transactionData,
          fromAccountId: transactionData.accountId,
          fromPaymentModeId: transactionData.paymentModeId,
        };
        delete transferData.paymentModeId;
        delete transferData.categoryId;
        const response = await apiClient.post(endpoint, transferData);
        return response.data;
      }
      
      const response = await apiClient.post(endpoint, transactionData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Transaction created'
      });
      navigate('/transactions');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create transaction'
      });
    },
  });
};

// Update transaction
export const useUpdateTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data, transactionType }: { 
      id: string; 
      data: UpdateTransactionData; 
      transactionType: 'expense' | 'income' | 'transfer' 
    }) => {
      let endpoint = `/transactions/expense/${id}`;
      
      if (transactionType === 'income') {
        endpoint = `/transactions/income/${id}`;
      } else if (transactionType === 'transfer') {
        endpoint = `/transactions/transfer/${id}`;
        // For transfer, map accountId to fromAccountId
        const transferData = {
          ...data,
          fromAccountId: data.accountId,
          fromPaymentModeId: data.paymentModeId,
        };
        delete transferData.accountId;
        delete transferData.paymentModeId;
        delete transferData.categoryId;
        const response = await apiClient.put(endpoint, transferData);
        return response.data;
      }
      
      const response = await apiClient.put(endpoint, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Transaction updated'
      });
      navigate('/transactions');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update transaction'
      });
    },
  });
};

// Delete transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Transaction deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete transaction'
      });
    },
  });
};