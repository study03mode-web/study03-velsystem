import { useQuery } from '@tanstack/react-query';
import apiClient from '../lib/axios';

export interface AccountTransaction {
  id: string;
  txnDate: string;
  txnTime: string;
  amount: number;
  type: number;
  description: string;
  category?: {
    id: string;
    name: string;
    type: number;
    color: string;
    icon: string;
    deletable: boolean;
  };
  account?: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  fromAccount?: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  toAccount?: {
    id: string;
    name: string;
    type: number;
    default: boolean;
  };
  paymentMode?: {
    id: string;
    name: string;
    type: number;
  } | null;
  fromPaymentMode?: {
    id: string;
    name: string;
    type: number;
  } | null;
  toPaymentMode?: {
    id: string;
    name: string;
    type: number;
  } | null;
  debt?: {
    id: string;
    personName: string;
    dueDate: string;
    amount: number | null;
    additionalDetail: string;
    type: number;
  };
  tags?: {
    id: string;
    name: string;
  }[];
}

export interface PaginatedAccountTransactions {
  content: AccountTransaction[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Get all transactions for an account
export const useAccountTransactions = (accountId: string, page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedAccountTransactions>({
    queryKey: ['account-transactions', accountId, 'all', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/account/${accountId}/all?page=${page}&size=${size}`);
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
    enabled: enabled && !!accountId,
  });
};

// Get debit transactions for an account
export const useAccountDebitTransactions = (accountId: string, page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedAccountTransactions>({
    queryKey: ['account-transactions', accountId, 'debit', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/account/${accountId}/debit?page=${page}&size=${size}`);
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
    enabled: enabled && !!accountId,
  });
};

// Get credit transactions for an account
export const useAccountCreditTransactions = (accountId: string, page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedAccountTransactions>({
    queryKey: ['account-transactions', accountId, 'credit', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/account/${accountId}/credit?page=${page}&size=${size}`);
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
    enabled: enabled && !!accountId,
  });
};

// Get adjustment transactions for an account
export const useAccountAdjustmentTransactions = (accountId: string, page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedAccountTransactions>({
    queryKey: ['account-transactions', accountId, 'adjustment', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/account/${accountId}/adjustment?page=${page}&size=${size}`);
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
    enabled: enabled && !!accountId,
  });
};