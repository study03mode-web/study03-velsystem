import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { 
  Debt, 
  DebtRecord,
  CreateDebtData, 
  UpdateDebtData,
  CreateDebtRecordData,
  UpdateDebtRecordData,
  PaginatedDebts,
  PaginatedDebtRecords,
  DebtRecordSummary,
  DebtSummary,
  DebtTransaction
} from '../types/debt';

// Debt hooks
export const useDebts = (page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedDebts>({
    queryKey: ['debts', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/debts?page=${page}&size=${size}`);
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
    enabled,
  });
};

export const useDebt = (id: string) => {
  return useQuery<Debt>({
    queryKey: ['debt', id],
    queryFn: async () => {
      const response = await apiClient.get(`/debts/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useLendingDebts = (page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedDebts>({
    queryKey: ['debts', 'lending', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/debts/lending?page=${page}&size=${size}`);
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
    enabled,
  });
};

export const useBorrowingDebts = (page = 0, size = 10, enabled = true) => {
  return useQuery<PaginatedDebts>({
    queryKey: ['debts', 'borrowing', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/debts/borrowing?page=${page}&size=${size}`);
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
    enabled,
  });
};

export const useDebtSummary = () => {
  return useQuery<DebtSummary>({
    queryKey: ['debts', 'summary'],
    queryFn: async () => {
      const response = await apiClient.get('/debts/summary');
      return response.data.data || { totalPayable: 0, totalReceivable: 0 };
    },
  });
};

// Get debt transaction summary by debt ID
export const useDebtTransactionSummary = (debtId: string) => {
  return useQuery<{ totalPaid: number; totalReceived: number }>({
    queryKey: ['debt-transaction-summary', debtId],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/${debtId}/summary`);
      return response.data.data || { totalPaid: 0, totalReceived: 0 };
    },
    enabled: !!debtId,
  });
};

export const usePayableDebts = () => {
  return useQuery<Debt[]>({
    queryKey: ['debts', 'payable'],
    queryFn: async () => {
      const response = await apiClient.get('/debts/payable');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

export const useReceivableDebts = () => {
  return useQuery<Debt[]>({
    queryKey: ['debts', 'receivable'],
    queryFn: async () => {
      const response = await apiClient.get('/debts/receivable');
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

export const useCreateDebt = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateDebtData) => {
      const response = await apiClient.post('/debts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Debt created'
      });
      navigate('/debts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create debt'
      });
    },
  });
};

export const useUpdateDebt = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDebtData }) => {
      const response = await apiClient.put(`/debts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Debt updated'
      });
      navigate('/debts');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update debt'
      });
    },
  });
};

export const useDeleteDebt = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/debts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Debt deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete debt'
      });
    },
  });
};

// Debt Transaction hooks (new API endpoints)
export const useAllDebtTransactions = (debtId: string,page = 0, size = 10, enabled = true) => {
  return useQuery<{ content: DebtTransaction[]; totalElements: number; totalPages: number; size: number; number: number; first: boolean; last: boolean }>({
    queryKey: ['debt-transactions', 'all', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/debt/${debtId}/all?page=${page}&size=${size}`);
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
    enabled,
  });
};

export const usePaidDebtTransactions = (debtId: string,page = 0, size = 10, enabled = true) => {
  return useQuery<{ content: DebtTransaction[]; totalElements: number; totalPages: number; size: number; number: number; first: boolean; last: boolean }>({
    queryKey: ['debt-transactions', 'paid', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/debt/${debtId}/paid?page=${page}&size=${size}`);
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
    enabled,
  });
};

export const useReceivedDebtTransactions = (debtId: string,page = 0, size = 10, enabled = true) => {
  return useQuery<{ content: DebtTransaction[]; totalElements: number; totalPages: number; size: number; number: number; first: boolean; last: boolean }>({
    queryKey: ['debt-transactions', 'received', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/debt/${debtId}/received?page=${page}&size=${size}`);
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
    enabled,
  });
};

export const useAdjustmentDebtTransactions = (debtId: string,page = 0, size = 10, enabled = true) => {
  return useQuery<{ content: DebtTransaction[]; totalElements: number; totalPages: number; size: number; number: number; first: boolean; last: boolean }>({
    queryKey: ['debt-transactions', 'adjustment', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/debt/${debtId}/adjustment?page=${page}&size=${size}`);
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
    enabled,
  });
};

// Legacy debt records hooks (keeping for backward compatibility)
export const useDebtRecords = (debtId: string, page = 0, size = 10) => {
  return useQuery<PaginatedDebtRecords>({
    queryKey: ['debt-records', debtId, page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/records/${debtId}/all?page=${page}&size=${size}`);
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
    enabled: !!debtId,
  });
};

export const useDebtRecord = (id: string) => {
  return useQuery<DebtRecord>({
    queryKey: ['debt-record', id],
    queryFn: async () => {
      const response = await apiClient.get(`/records/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const usePaidRecords = (debtId: string, page = 0, size = 10) => {
  return useQuery<PaginatedDebtRecords>({
    queryKey: ['debt-records', debtId, 'paid', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/records/${debtId}/paid?page=${page}&size=${size}`);
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
    enabled: !!debtId,
  });
};

export const useReceivedRecords = (debtId: string, page = 0, size = 10) => {
  return useQuery<PaginatedDebtRecords>({
    queryKey: ['debt-records', debtId, 'received', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/records/${debtId}/received?page=${page}&size=${size}`);
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
    enabled: !!debtId,
  });
};

export const useAdjustmentRecords = (debtId: string, page = 0, size = 10) => {
  return useQuery<PaginatedDebtRecords>({
    queryKey: ['debt-records', debtId, 'adjustment', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/records/${debtId}/adjustment?page=${page}&size=${size}`);
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
    enabled: !!debtId,
  });
};

export const useDebtRecordSummary = (debtId: string) => {
  return useQuery<DebtRecordSummary>({
    queryKey: ['debt-record-summary', debtId],
    queryFn: async () => {
      const [paidResponse, receivedResponse] = await Promise.all([
        apiClient.get(`/records/${debtId}/total-paid`),
        apiClient.get(`/records/${debtId}/total-received`)
      ]);
      
      return {
        totalPaid: paidResponse.data.data || 0,
        totalReceived: receivedResponse.data.data || 0,
      };
    },
    enabled: !!debtId,
  });
};

export const useCreateDebtRecord = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ debtId, data }: { debtId: string; data: CreateDebtRecordData }) => {
      const response = await apiClient.post(`/records/${debtId}`, data);
      return response.data;
    },
    onSuccess: (_, { debtId }) => {
      queryClient.invalidateQueries({ queryKey: ['debt-records', debtId] });
      queryClient.invalidateQueries({ queryKey: ['debt-record-summary', debtId] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      addToast({
        type: 'success',
        message: 'Record created'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create record'
      });
    },
  });
};

export const useUpdateDebtRecord = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDebtRecordData }) => {
      const response = await apiClient.put(`/records/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-records'] });
      queryClient.invalidateQueries({ queryKey: ['debt-record-summary'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      addToast({
        type: 'success',
        message: 'Record updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update record'
      });
    },
  });
};

export const useDeleteDebtRecord = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/records/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-records'] });
      queryClient.invalidateQueries({ queryKey: ['debt-record-summary'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      addToast({
        type: 'success',
        message: 'Record deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete record'
      });
    },
  });
};

// New debt transaction mutations
export const useCreatePaidDebtTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ debtId, data }: { debtId: string; data: CreateDebtRecordData }) => {
      const requestData = {
        type: data.type,
        txnDate: data.date,
        txnTime: data.time ? `${data.time.hour.toString().padStart(2, '0')}:${data.time.minute.toString().padStart(2, '0')}:${data.time.second.toString().padStart(2, '0')}` : '00:00:00',
        amount: data.amount,
        description: data.description,
        accountId: data.accountId,
        paymentModeId: data.paymentModeId
      };
      const response = await apiClient.post(`/transactions/debt/${debtId}/paid`, requestData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Payment recorded'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to record payment'
      });
    },
  });
};

export const useCreateReceivedDebtTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ debtId, data }: { debtId: string; data: CreateDebtRecordData }) => {
      const requestData = {
        type: data.type,
        txnDate: data.date,
        txnTime: data.time ? `${data.time.hour.toString().padStart(2, '0')}:${data.time.minute.toString().padStart(2, '0')}:${data.time.second.toString().padStart(2, '0')}` : '00:00:00',
        amount: data.amount,
        description: data.description,
        accountId: data.accountId,
        paymentModeId: data.paymentModeId
      };
      const response = await apiClient.post(`/transactions/debt/${debtId}/received`, requestData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Receipt recorded'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to record receipt'
      });
    },
  });
};

export const useCreateAdjustmentDebtTransaction = (debtId:string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: { type: string; txnDate: string; txnTime: string; amount: number; description: string }) => {
      const response = await apiClient.post(`/transactions/debt/${debtId}/adjustment`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Adjustment recorded'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to record adjustment'
      });
    },
  });
};

export const useUpdatePaidDebtTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDebtRecordData }) => {
      const requestData = {
        type: data.type,
        txnDate: data.date,
        txnTime: data.time ? {
          hour: data.time.hour,
          minute: data.time.minute,
          second: data.time.second,
          nano: data.time.nano
        } : undefined,
        amount: data.amount,
        description: data.description,
        accountId: data.accountId,
        paymentModeId: data.paymentModeId
      };
      const response = await apiClient.put(`/transactions/debt/paid/${id}`, requestData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Payment updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update payment'
      });
    },
  });
};

export const useUpdateReceivedDebtTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDebtRecordData }) => {
      const requestData = {
        type: data.type,
        txnDate: data.date,
        txnTime: data.time ? {
          hour: data.time.hour,
          minute: data.time.minute,
          second: data.time.second,
          nano: data.time.nano
        } : undefined,
        amount: data.amount,
        description: data.description,
        accountId: data.accountId,
        paymentModeId: data.paymentModeId
      };
      const response = await apiClient.put(`/transactions/debt/received/${id}`, requestData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Receipt updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update receipt'
      });
    },
  });
};

export const useUpdateAdjustmentDebtTransaction = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { type: string; txnDate: string; txnTime: string; amount: number; description: string } }) => {
      const response = await apiClient.put(`/transactions/debt/adjustment/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      addToast({
        type: 'success',
        message: 'Adjustment updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update adjustment'
      });
    },
  });
};