import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';
import { UpdateTagData, MergeTagData, PaginatedTags } from '../types/tag';

// Get all tags
export const useTags = (page = 0, size = 10) => {
  return useQuery<PaginatedTags>({
    queryKey: ['tags', page, size],
    queryFn: async () => {
      const response = await apiClient.get(`/tags?page=${page}&size=${size}`);
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

// Update tag
export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTagData }) => {
      const response = await apiClient.put(`/tags/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      addToast({
        type: 'success',
        message: 'Tag updated'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to update tag'
      });
    },
  });
};

// Merge tag
export const useMergeTag = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MergeTagData }) => {
      const response = await apiClient.post(`/tags/merge?sourceTagId=${id}&targetTagId=${data.tagId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      addToast({
        type: 'success',
        message: 'Tag merged'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to merge tags'
      });
    },
  });
};

// Delete tag
export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/tags/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      addToast({
        type: 'success',
        message: 'Tag deleted'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        message: 'Failed to delete tag'
      });
    },
  });
};