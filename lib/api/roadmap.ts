import { apiClient, ApiResponse } from './client';
import type { RoadmapItem } from '@/types';

export const roadmapApi = {
  /**
   * Get all roadmap items
   */
  getAll: async (): Promise<ApiResponse<RoadmapItem[]>> => {
    return apiClient.get<RoadmapItem[]>('/api/roadmap');
  },

  /**
   * Get a single roadmap item by ID
   */
  getById: async (id: string): Promise<ApiResponse<RoadmapItem>> => {
    return apiClient.get<RoadmapItem>(`/api/roadmap/${id}`);
  },

  /**
   * Create a new roadmap item
   */
  create: async (data: Omit<RoadmapItem, 'id'>): Promise<ApiResponse<RoadmapItem>> => {
    return apiClient.post<RoadmapItem>('/api/roadmap', data);
  },

  /**
   * Update an existing roadmap item
   */
  update: async (id: string, data: Partial<RoadmapItem>): Promise<ApiResponse<RoadmapItem>> => {
    return apiClient.put<RoadmapItem>(`/api/roadmap/${id}`, data);
  },

  /**
   * Delete a roadmap item
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/roadmap/${id}`);
  },
};
