import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiRequest, PaginatedResponse } from '../services/apiClient';
import { Product, Category, Brand, ProductFilters } from '../types/products';

// Product API endpoints
const ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories/hierarchy',
  BRANDS: '/brands',
};

// Query keys
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
} as const;

// Custom hooks for products
export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.brandId) params.append('brandId', filters.brandId);
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.status) params.append('status', filters.status);
      if (filters.page !== undefined) params.append('page', filters.page.toString());
      if (filters.size !== undefined) params.append('size', filters.size.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.direction) params.append('direction', filters.direction);
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());

      const response = await apiRequest(`${ENDPOINTS.PRODUCTS}/filter?${params}`);
      return response as { message: string; data: PaginatedResponse<Product> };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      const response = await apiGet<Product>(`${ENDPOINTS.PRODUCTS}/${id}`);
      return response;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      const response = await apiGet<Category[]>(ENDPOINTS.CATEGORIES);
      return response;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANDS],
    queryFn: async () => {
      const response = await apiGet<Brand[]>(ENDPOINTS.BRANDS);
      return response;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};