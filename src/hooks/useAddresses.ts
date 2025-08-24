import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/apiClient';

// Address API endpoints
const ENDPOINTS = {
  ADDRESSES: '/addresses',
  ADDRESS_BY_ID: (id: string) => `/addresses/${id}`,
};

// Query keys
export const ADDRESS_QUERY_KEYS = {
  ALL: 'addresses',
  BY_ID: (id: string) => ['addresses', id],
} as const;

// Types
export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  landmark?: string;
  alternatePhone?: string;
  addressType: string;
  isDefault: boolean;
}

export interface CreateAddressRequest {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  landmark?: string;
  alternatePhone?: string;
  addressType: string;
  isDefault: boolean;
}

export interface UpdateAddressRequest extends CreateAddressRequest {}

// Address hooks
export const useAddresses = () => {
  return useQuery({
    queryKey: [ADDRESS_QUERY_KEYS.ALL],
    queryFn: async () => {
      const response = await apiGet<Address[]>(ENDPOINTS.ADDRESSES);
      return response;
    },
  });
};

export const useAddress = (id: string) => {
  return useQuery({
    queryKey: ADDRESS_QUERY_KEYS.BY_ID(id),
    queryFn: async () => {
      const response = await apiGet<Address>(ENDPOINTS.ADDRESS_BY_ID(id));
      return response;
    },
    enabled: !!id,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateAddressRequest) => {
      const response = await apiPost<Address>(ENDPOINTS.ADDRESSES, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADDRESS_QUERY_KEYS.ALL] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateAddressRequest }) => {
      const response = await apiPut<Address>(ENDPOINTS.ADDRESS_BY_ID(id), data);
      return response;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [ADDRESS_QUERY_KEYS.ALL] });
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.BY_ID(id) });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiDelete<any>(ENDPOINTS.ADDRESS_BY_ID(id));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADDRESS_QUERY_KEYS.ALL] });
    },
  });
};