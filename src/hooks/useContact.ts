import { useMutation } from '@tanstack/react-query';
import { apiPost } from '../services/apiClient';

// Contact API endpoints
const ENDPOINTS = {
  CONTACT: '/client/contact',
};

// Types
export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

// Contact hook
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (data: ContactRequest) => {
      const response = await apiPost<ContactResponse>(ENDPOINTS.CONTACT, data);
      return response;
    },
  });
};