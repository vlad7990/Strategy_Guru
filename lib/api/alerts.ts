import { apiClient, ApiResponse } from './client';
import type { Alert } from '@/types';

export const alertsApi = {
  /**
   * Get all alerts
   */
  getAll: async (): Promise<ApiResponse<Alert[]>> => {
    return apiClient.get<Alert[]>('/api/alerts');
  },

  /**
   * Get a single alert by ID
   */
  getById: async (id: string): Promise<ApiResponse<Alert>> => {
    return apiClient.get<Alert>(`/api/alerts/${id}`);
  },

  /**
   * Create a new alert
   */
  create: async (data: Omit<Alert, 'id'>): Promise<ApiResponse<Alert>> => {
    return apiClient.post<Alert>('/api/alerts', data);
  },

  /**
   * Update an existing alert
   */
  update: async (id: string, data: Partial<Alert>): Promise<ApiResponse<Alert>> => {
    return apiClient.put<Alert>(`/api/alerts/${id}`, data);
  },

  /**
   * Delete an alert
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/alerts/${id}`);
  },
};
