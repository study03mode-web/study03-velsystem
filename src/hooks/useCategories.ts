import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { Category, CreateCategoryData, UpdateCategoryData } from '../types/category';

// Get category by ID
export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Get all categories
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get('/categories');
      return Array.isArray(response.data) ? response.data : [];
    },
  });
};

// Get categories by type
export const useCategoriesByType = (type: number) => {
  return useQuery<Category[]>({
    queryKey: ['categories', type === 1 ? 'expense' : 'income'],
    queryFn: async () => {
      const endpoint = type === 1 ? '/categories/expense' : '/categories/income';
      const response = await apiClient.get(endpoint);
      return Array.isArray(response.data.data) ? response.data.data : [];
    },
  });
};

// Get default category
export const useDefaultCategory = (type: number) => {
  return useQuery<Category>({
    queryKey: ['categories', type === 1 ? 'expense-default' : 'income-default'],
    queryFn: async () => {
      const endpoint = type === 1 ? '/categories/expense-default' : '/categories/income-default';
      const response = await apiClient.get(endpoint);
      return response.data.data;
    },
  });
};

// Create category
export const useCreateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const response = await apiClient.post('/categories', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      addToast({
        type: 'success',
        message: 'Category created'
      });
      navigate('/categories');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to create category'
      });
    },
  });
};

// Update category
export const useUpdateCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCategoryData }) => {
      const response = await apiClient.put(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      addToast({
        type: 'success',
        message: 'Category updated'
      });
      navigate('/categories');
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update category'
      });
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      addToast({
        type: 'success',
        message: 'Category deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete category'
      });
    },
  });
};

// Set default category
export const useSetDefaultCategory = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, type }: { id: string; type: number }) => {
      const endpoint = type === 1 ? `/categories/${id}/expense-default` : `/categories/${id}/income-default`;
      const response = await apiClient.put(endpoint);
      return response.data;
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ 
        queryKey: ['categories', type === 1 ? 'expense-default' : 'income-default'] 
      });
      addToast({
        type: 'success',
        message: 'Default category updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to set default category'
      });
    },
  });
};