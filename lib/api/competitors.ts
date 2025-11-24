import { apiClient, ApiResponse } from './client';
import type { Competitor } from '@/types';

export const competitorsApi = {
  /**
   * Get all competitors
   */
  getAll: async (): Promise<ApiResponse<Competitor[]>> => {
    return apiClient.get<Competitor[]>('/api/competitors');
  },

  /**
   * Get a single competitor by ID
   */
  getById: async (id: string): Promise<ApiResponse<Competitor>> => {
    return apiClient.get<Competitor>(`/api/competitors/${id}`);
  },

  /**
   * Create a new competitor
   */
  create: async (data: Omit<Competitor, 'id'>): Promise<ApiResponse<Competitor>> => {
    return apiClient.post<Competitor>('/api/competitors', data);
  },

  /**
   * Update an existing competitor
   */
  update: async (id: string, data: Partial<Competitor>): Promise<ApiResponse<Competitor>> => {
    return apiClient.put<Competitor>(`/api/competitors/${id}`, data);
  },

  /**
   * Delete a competitor
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/competitors/${id}`);
  },
};
