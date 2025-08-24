import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/apiClient';

// Cart API endpoints
const ENDPOINTS = {
  CART: '/cart',
  ADD_ITEM: '/cart/items',
  UPDATE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
  REMOVE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
  CLEAR_CART: '/cart/items',
};

// Query keys
export const CART_QUERY_KEYS = {
  CART: 'cart',
} as const;

// Types
export interface CartItemRequest {
  variantId: string;
  quantity: number;
}

export interface ServerCartItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    brand: {
      id: string;
      name: string;
      description: string;
      logoUrl: string;
      status: string;
      sortOrder: number;
    };
    category: {
      id: string;
      name: string;
      slug: string;
      description: string;
      imageUrl: string;
      status: string;
      sortOrder: number;
      children: string[];
    };
    status: string;
    options: any[];
    specificationGroups: any[];
    variants: any[];
  };
  variant: {
    id: string;
    sku: string;
    price: number;
    options: Array<{
      optionId: string;
      optionName: string;
      optionValue: string;
    }>;
    images: Array<{
      id: string;
      imageUrl: string;
      isPrimary: boolean;
      sortOrder: number;
    }>;
  };
}

export interface ServerCart {
  id: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  items: ServerCartItem[];
}

// Cart hooks
export const useServerCart = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [CART_QUERY_KEYS.CART],
    queryFn: async () => {
      const response = await apiGet<ServerCart>(ENDPOINTS.CART);
      return response;
    },
    enabled,
    staleTime: 0, // Always fetch fresh cart data
    refetchOnMount: true,
  });
};

export const useAddToServerCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CartItemRequest) => {
      const response = await apiPost<ServerCart>(ENDPOINTS.ADD_ITEM, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEYS.CART] });
    },
  });
};

export const useUpdateServerCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const response = await apiPut<ServerCart>(
        `${ENDPOINTS.UPDATE_ITEM(itemId)}?quantity=${quantity}`
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEYS.CART] });
    },
  });
};

export const useRemoveFromServerCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await apiDelete<ServerCart>(ENDPOINTS.REMOVE_ITEM(itemId));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEYS.CART] });
    },
  });
};

export const useClearServerCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await apiDelete<any>(ENDPOINTS.CLEAR_CART);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEYS.CART] });
    },
  });
};

export const useSyncCartToServer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (localCartItems: Array<{ variantId: string; quantity: number }>) => {
      // Add each local cart item to server
      const promises = localCartItems.map(item => 
        apiPost<ServerCart>(ENDPOINTS.ADD_ITEM, item)
      );
      
      await Promise.all(promises);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEYS.CART] });
    },
  });
};