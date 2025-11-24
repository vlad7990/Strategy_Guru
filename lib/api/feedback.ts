import { apiClient, ApiResponse } from './client';
import type { CustomerFeedback } from '@/types';

export const feedbackApi = {
  /**
   * Get all customer feedback
   */
  getAll: async (): Promise<ApiResponse<CustomerFeedback[]>> => {
    return apiClient.get<CustomerFeedback[]>('/api/feedback');
  },

  /**
   * Get a single feedback by ID
   */
  getById: async (id: string): Promise<ApiResponse<CustomerFeedback>> => {
    return apiClient.get<CustomerFeedback>(`/api/feedback/${id}`);
  },

  /**
   * Create new customer feedback
   */
  create: async (data: Omit<CustomerFeedback, 'id'>): Promise<ApiResponse<CustomerFeedback>> => {
    return apiClient.post<CustomerFeedback>('/api/feedback', data);
  },

  /**
   * Update existing customer feedback
   */
  update: async (id: string, data: Partial<CustomerFeedback>): Promise<ApiResponse<CustomerFeedback>> => {
    return apiClient.put<CustomerFeedback>(`/api/feedback/${id}`, data);
  },

  /**
   * Delete customer feedback
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/feedback/${id}`);
  },
};
