import { apiClient, ApiResponse } from './client';
import type { Metric } from '@/types';

export const metricsApi = {
  /**
   * Get all metrics
   */
  getAll: async (): Promise<ApiResponse<Metric[]>> => {
    return apiClient.get<Metric[]>('/api/metrics');
  },

  /**
   * Get a single metric by ID
   */
  getById: async (id: string): Promise<ApiResponse<Metric>> => {
    return apiClient.get<Metric>(`/api/metrics/${id}`);
  },

  /**
   * Create a new metric
   */
  create: async (data: Omit<Metric, 'id'>): Promise<ApiResponse<Metric>> => {
    return apiClient.post<Metric>('/api/metrics', data);
  },

  /**
   * Update an existing metric
   */
  update: async (id: string, data: Partial<Metric>): Promise<ApiResponse<Metric>> => {
    return apiClient.put<Metric>(`/api/metrics/${id}`, data);
  },

  /**
   * Delete a metric
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/metrics/${id}`);
  },
};
