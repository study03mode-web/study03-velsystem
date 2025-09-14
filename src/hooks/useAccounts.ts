import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { 
  Account, 
  PaymentMode, 
  CreateBankAccountData, 
  CreateWalletData, 
  CreateCreditCardData,
  UpdateBankAccountData,
  UpdateWalletData,
  UpdateCreditCardData,
  CreatePaymentModeData,
  UpdatePaymentModeData,
  AccountSummary,
  DefaultPaymentMode
} from '../types/account';

// Get all accounts
export const useAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/all');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

// Get account by ID
export const useAccount = (id: string) => {
  return useQuery<Account>({
    queryKey: ['account', id],
    queryFn: async () => {
      const response = await apiClient.get(`/accounts/account/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Get accounts by type
export const useBankAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts', 'bank'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/bank');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

export const useWalletAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts', 'wallet'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/wallet');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

export const useCreditCardAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts', 'credit-card'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/credit-card');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

export const useCashAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['accounts', 'cash'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/cash');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

// Get account summary
export const useAccountSummary = () => {
  return useQuery<AccountSummary>({
    queryKey: ['accounts', 'summary'],
    queryFn: async () => {
      const [availableResponse, creditResponse, outstandingResponse] = await Promise.all([
        apiClient.get('/accounts/available-amount'),
        apiClient.get('/accounts/credit/available'),
        apiClient.get('/accounts/credit/outstanding')
      ]);
      
      return {
        availableAmount: availableResponse.data.data || 0,
        availableCredit: creditResponse.data.data || 0,
        outstandingCredit: outstandingResponse.data.data || 0,
      };
    },
  });
};

// Get default payment mode
export const useDefaultPaymentMode = () => {
  return useQuery<DefaultPaymentMode>({
    queryKey: ['accounts', 'default-payment-mode'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/default-payment-mode');
      return response.data.data;
    },
  });
};

// Create accounts
export const useCreateBankAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateBankAccountData) => {
      const response = await apiClient.post('/accounts/bank', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Bank account created'
      });
      navigate('/accounts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create account'
      });
    },
  });
};

export const useCreateWallet = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateWalletData) => {
      const response = await apiClient.post('/accounts/wallet', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Wallet created'
      });
      navigate('/accounts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create wallet'
      });
    },
  });
};

export const useCreateCreditCard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCreditCardData) => {
      const response = await apiClient.post('/accounts/debit-card', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Credit card added'
      });
      navigate('/accounts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to add credit card'
      });
    },
  });
};

// Update accounts
export const useUpdateBankAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBankAccountData }) => {
      const response = await apiClient.put(`/accounts/bank/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
      addToast({
        type: 'success',
        message: 'Account updated'
      });
      navigate('/accounts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update account'
      });
    },
  });
};

export const useUpdateWallet = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateWalletData }) => {
      const response = await apiClient.put(`/accounts/wallet/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Wallet updated'
      });
      navigate('/accounts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update wallet'
      });
    },
  });
};

export const useUpdateCreditCard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCreditCardData }) => {
      const response = await apiClient.put(`/accounts/credit-card/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Credit card updated'
      });
      navigate('/accounts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update credit card'
      });
    },
  });
};

// Delete account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/accounts/account/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      addToast({
        type: 'success',
        message: 'Account deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete account'
      });
    },
  });
};

// Set default payment mode
export const useSetDefaultPaymentMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.put(`/accounts/${id}/default-payment-mode`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', 'default-payment-mode'] });
    },
  });
};

// Payment mode hooks
export const usePaymentModes = () => {
  return useQuery<PaymentMode[]>({
    queryKey: ['payment-modes'],
    queryFn: async () => {
      const response = await apiClient.get('/accounts/payment-modes/all');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

export const usePaymentModesByAccount = (accountId: string) => {
  return useQuery<PaymentMode[]>({
    queryKey: ['payment-modes', accountId],
    queryFn: async () => {
      const response = await apiClient.get(`/accounts/payment-modes/${accountId}/all`);
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
    enabled: !!accountId,
  });
};

export const usePaymentMode = (id: string) => {
  return useQuery<PaymentMode>({
    queryKey: ['payment-mode', id],
    queryFn: async () => {
      const response = await apiClient.get(`/accounts/payment-modes/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePaymentMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ accountId, data }: { accountId: string; data: CreatePaymentModeData }) => {
      const response = await apiClient.post(`/accounts/payment-modes/${accountId}/add`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-modes'] });
    },
  });
};

export const useUpdatePaymentMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePaymentModeData }) => {
      const response = await apiClient.put(`/accounts/payment-modes/${id}/update`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-modes'] });
    },
  });
};

export const useDeletePaymentMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/accounts/payment-modes/${id}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-modes'] });
    },
  });
};