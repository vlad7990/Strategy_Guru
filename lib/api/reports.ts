import { apiClient, ApiResponse } from './client';
import type { Report } from '@/types';

export const reportsApi = {
  /**
   * Get all reports
   */
  getAll: async (): Promise<ApiResponse<Report[]>> => {
    return apiClient.get<Report[]>('/api/reports');
  },

  /**
   * Get a single report by ID
   */
  getById: async (id: string): Promise<ApiResponse<Report>> => {
    return apiClient.get<Report>(`/api/reports/${id}`);
  },

  /**
   * Create a new report
   */
  create: async (data: Omit<Report, 'id'>): Promise<ApiResponse<Report>> => {
    return apiClient.post<Report>('/api/reports', data);
  },

  /**
   * Update an existing report
   */
  update: async (id: string, data: Partial<Report>): Promise<ApiResponse<Report>> => {
    return apiClient.put<Report>(`/api/reports/${id}`, data);
  },

  /**
   * Delete a report
   */
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete<{ message: string }>(`/api/reports/${id}`);
  },
};
