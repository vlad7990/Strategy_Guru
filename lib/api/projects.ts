import { apiClient, ApiResponse } from './client';
import type { Project } from '@/types';

export const projectsApi = {
  /**
   * Get all projects
   */
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    return apiClient.get<Project[]>('/api/projects');
  },

  /**
   * Get a single project by ID
   */
  getById: async (id: string): Promise<ApiResponse<Project>> => {
    return apiClient.get<Project>(`/api/projects/${id}`);
  },

  /**
   * Create a new project
   */
  create: async (data: Omit<Project, 'id'>): Promise<ApiResponse<Project>> => {
    return apiClient.post<Project>('/api/projects', data);
  },

  /**
   * Update an existing project
   */
  update: async (id: string, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    return apiClient.put<Project>(`/api/projects/${id}`, data);
  },

  /**
   * Delete a project
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/projects/${id}`);
  },
};
