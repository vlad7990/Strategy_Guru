import { apiClient, ApiResponse } from './client';
import type { Objective } from '@/types';

export const objectivesApi = {
  /**
   * Get all objectives
   */
  getAll: async (): Promise<ApiResponse<Objective[]>> => {
    return apiClient.get<Objective[]>('/api/objectives');
  },

  /**
   * Get a single objective by ID
   */
  getById: async (id: string): Promise<ApiResponse<Objective>> => {
    return apiClient.get<Objective>(`/api/objectives/${id}`);
  },

  /**
   * Create a new objective
   */
  create: async (data: Omit<Objective, 'id'>): Promise<ApiResponse<Objective>> => {
    return apiClient.post<Objective>('/api/objectives', data);
  },

  /**
   * Update an existing objective
   */
  update: async (id: string, data: Partial<Objective>): Promise<ApiResponse<Objective>> => {
    return apiClient.put<Objective>(`/api/objectives/${id}`, data);
  },

  /**
   * Delete an objective
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/objectives/${id}`);
  },
};
